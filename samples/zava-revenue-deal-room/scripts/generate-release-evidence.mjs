import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import unzipper from 'unzipper';

const root = path.resolve(import.meta.dirname, '..');
const outputPath = path.join(root, 'assets', 'release-evidence.json');
const packageConfig = JSON.parse(fs.readFileSync(path.join(root, 'config', 'package-solution.json'), 'utf8'));
const config = JSON.parse(fs.readFileSync(path.join(root, 'config', 'config.json'), 'utf8'));
const gallery = JSON.parse(fs.readFileSync(path.join(root, 'assets', 'gallery-evidence.json'), 'utf8'));
const packagePath = path.join(root, 'sharepoint', packageConfig.paths.zippedPackage);
const agentPath = path.join(root, 'teams', 'zava-revenue-deal-room.zip');
const hash = (buffer) => crypto.createHash('sha256').update(buffer).digest('hex');
const packageBytes = fs.readFileSync(packagePath);
const archive = await unzipper.Open.file(packagePath);
const javascript = archive.files.filter((entry) => /ClientSideAssets\/.*\.js$/i.test(entry.path));
const media = archive.files.filter((entry) => /ClientSideAssets\/.*\.(?:jpg|jpeg|png|webp)$/i.test(entry.path));
const mediaHashes = await Promise.all(media.map(async (entry) => hash(await entry.buffer())));
const entries = Object.values(config.bundles).flatMap((bundle) => bundle.components || []);
const evidence = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  package: 'sharepoint/solution/zava-revenue-deal-room.sppkg',
  packageBytes: packageBytes.length,
  packageSha256: hash(packageBytes),
  agentPackage: 'teams/zava-revenue-deal-room.zip',
  agentPackageBytes: fs.statSync(agentPath).size,
  agentPackageSha256: hash(fs.readFileSync(agentPath)),
  configuredBundles: Object.keys(config.bundles).length,
  configuredComponents: entries.length,
  productionJavaScriptFiles: javascript.length,
  totalJavaScriptBytes: javascript.reduce((sum, entry) => sum + (entry.uncompressedSize || 0), 0),
  largestJavaScriptBytes: Math.max(...javascript.map((entry) => entry.uncompressedSize || 0)),
  packagedMediaFiles: media.length,
  duplicateMediaHashes: media.length - new Set(mediaHashes).size,
  visualCaptures: gallery.totalCaptures,
  visualFailures: gallery.failureCount,
  externalPrerequisite: 'Authenticated Microsoft 365 tenant for Workbench CSP, model routing, iframe focus, forced colors, and screen-reader host validation.'
};
const stable = (value) => JSON.stringify({ ...value, generatedAt: undefined }, null, 2);
if (process.argv.includes('--check')) {
  if (!fs.existsSync(outputPath)) throw new Error('Release evidence is missing. Run npm run generate:release-evidence.');
  const current = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
  if (stable(current) !== stable(evidence)) throw new Error('Release evidence is stale. Run npm run generate:release-evidence.');
  console.log(JSON.stringify({ packageBytes: evidence.packageBytes, components: evidence.configuredComponents, media: evidence.packagedMediaFiles, captures: evidence.visualCaptures, current: true }));
} else {
  fs.writeFileSync(outputPath, `${JSON.stringify(evidence, null, 2)}\n`, 'utf8');
  console.log(`Generated release evidence for ${evidence.packageBytes} package bytes.`);
}
