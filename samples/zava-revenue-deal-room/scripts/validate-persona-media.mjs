import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const provenance = JSON.parse(fs.readFileSync(path.join(root, 'assets', 'asset-provenance.json'), 'utf8'));
const mediaSource = fs.readFileSync(path.join(root, 'src', 'shared', 'media.ts'), 'utf8');
const hash = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const assert = (condition, message) => { if (!condition) throw new Error(message); };

assert(provenance.assets.length === 7, `Expected 7 persona assets, received ${provenance.assets.length}.`);
assert(provenance.redistributionStatus === 'Pending final public media-rights review', 'Media rights status must remain explicit.');
for (const asset of provenance.assets) {
  const runtimePath = path.join(root, asset.path);
  const sourcePath = path.join(root, asset.sourceCopy);
  assert(fs.existsSync(runtimePath), `Missing runtime portrait: ${asset.path}`);
  assert(fs.existsSync(sourcePath), `Missing source portrait: ${asset.sourceCopy}`);
  assert(hash(runtimePath) === asset.sha256, `Runtime portrait hash drift: ${asset.path}`);
  assert(hash(sourcePath) === asset.sha256, `Source portrait hash drift: ${asset.sourceCopy}`);
  const personKey = path.basename(asset.path, '.jpg').replace('-', ' ');
  assert(mediaSource.includes(`'${personKey}'`), `Portrait is absent from the typed media catalog: ${personKey}`);
}
console.log(JSON.stringify({ portraits: provenance.assets.length, sourceCopies: provenance.assets.length, hashMismatches: 0, rightsStatus: provenance.redistributionStatus }));