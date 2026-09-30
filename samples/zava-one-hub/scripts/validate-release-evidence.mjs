import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { zavaCapabilityCatalog } from '../config/zava-capabilities.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const evidence = JSON.parse(readFileSync(resolve(root, 'ux-review/evidence/phase-6-matrix.json'), 'utf8'));
const errors = [];

for (const artifact of evidence.artifacts || []) {
  const path = resolve(root, artifact.path);
  if (!existsSync(path)) {
    errors.push(`Missing release artifact: ${artifact.path}.`);
    continue;
  }
  const bytes = readFileSync(path);
  const sha256 = createHash('sha256').update(bytes).digest('hex');
  if (statSync(path).size !== artifact.bytes || sha256 !== artifact.sha256) errors.push(`Release artifact evidence is stale: ${artifact.path}.`);
}

function manifestFiles(path) {
  return readdirSync(path, { withFileTypes: true }).flatMap((entry) => {
    const child = resolve(path, entry.name);
    if (entry.isDirectory()) return manifestFiles(child);
    return entry.name.endsWith('.manifest.json') ? [child] : [];
  });
}

function parseJsonc(path) {
  const parsed = ts.parseConfigFileTextToJson(path, readFileSync(path, 'utf8'));
  if (parsed.error) throw new Error(`Invalid JSONC manifest: ${path}.`);
  return parsed.config;
}

const manifests = manifestFiles(resolve(root, 'src'));
const manifestRecords = manifests.map((path) => ({ path, manifest: parseJsonc(path) }));
const ids = manifestRecords.map((record) => record.manifest.id);
const webParts = manifestRecords.filter((record) => record.path.includes(`${resolve(root, 'src', 'webparts')}`));
const teamsEnabled = webParts.filter((record) => (record.manifest.supportedHosts || []).some((host) => host.startsWith('Teams')));
const fullPage = webParts.filter((record) => (record.manifest.supportedHosts || []).includes('SharePointFullPage'));

if (zavaCapabilityCatalog.length !== 35) errors.push(`Expected 35 capabilities, found ${zavaCapabilityCatalog.length}.`);
if (manifestRecords.length !== evidence.catalog.totalSpfxComponents) errors.push(`Manifest count ${manifestRecords.length} differs from evidence ${evidence.catalog.totalSpfxComponents}.`);
if (new Set(ids).size !== manifestRecords.length) errors.push('SPFx manifest GUIDs must be unique.');
if (teamsEnabled.length !== 3) errors.push(`Expected 3 Teams-enabled web parts, found ${teamsEnabled.length}.`);
if (fullPage.length !== 3) errors.push(`Expected 3 SharePoint full-page web parts, found ${fullPage.length}.`);
if (teamsEnabled.some((record) => !record.manifest.alias?.includes('Workspace'))) errors.push('A feature web part is unexpectedly Teams-enabled.');
if ((evidence.publicationScreenshots || []).length !== evidence.validation.publicationGalleryImages) errors.push('Publication screenshot evidence count is inconsistent.');
if (evidence.validation.jestTests !== 29 || evidence.validation.jestFailures !== 0) errors.push('Jest release evidence is stale.');

const expectedPackageBytes = evidence.artifacts?.find((artifact) => artifact.path.endsWith('.sppkg'))?.bytes;
const formattedPackageBytes = Number(expectedPackageBytes).toLocaleString('en-US');
for (const path of ['README.md', 'todo.md']) {
  const content = readFileSync(resolve(root, path), 'utf8');
  if (!content.includes(formattedPackageBytes)) errors.push(`${path} does not contain the current SPPKG size ${formattedPackageBytes}.`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Validated release evidence for ${manifestRecords.length} SPFx manifests, ${zavaCapabilityCatalog.length} capabilities, ${teamsEnabled.length} Teams workspaces, and ${evidence.artifacts.length} artifacts.`);