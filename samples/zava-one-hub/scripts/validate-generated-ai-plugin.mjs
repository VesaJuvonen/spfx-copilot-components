import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const zipPath = resolve(root, 'teams/zava-one.zip');

if (!existsSync(zipPath)) {
  console.error('Generated agent ZIP is missing: teams/zava-one.zip');
  process.exit(1);
}

const plugin = JSON.parse(execFileSync('tar', ['-xOf', zipPath, 'ai-plugin.json'], { encoding: 'utf8' }));
const manifest = JSON.parse(execFileSync('tar', ['-xOf', zipPath, 'manifest.json'], { encoding: 'utf8' }));
const agent = JSON.parse(execFileSync('tar', ['-xOf', zipPath, 'declarativeAgent.json'], { encoding: 'utf8' }));
const packagedColorIcon = execFileSync('tar', ['-xOf', zipPath, 'color.png']);
const packagedOutlineIcon = execFileSync('tar', ['-xOf', zipPath, 'outline.png']);
const functions = plugin.functions || [];
const errors = [];
const webPartOnlyParameters = new Set([
  'allowActions',
  'defaultScope',
  'density',
  'layout',
  'maxItems',
  'primaryView',
  'showImages',
  'showAgenda',
  'showTasks',
  'showMail',
  'showLearning',
  'showCompanyHighlights',
  'showPlanMyDay',
  'showSource',
  'title'
]);

if (plugin.schema_version !== 'v2.4') errors.push(`Expected plugin v2.4, found ${plugin.schema_version}.`);
if (!plugin.name_for_human || plugin.name_for_human.length > 20) errors.push('name_for_human must be 1-20 characters.');
if (!plugin.description_for_human || plugin.description_for_human.length > 100) errors.push('description_for_human must be 1-100 characters.');
if (!plugin.description_for_model || plugin.description_for_model.length > 2048) errors.push('description_for_model must be 1-2048 characters.');
if (functions.length !== 37) errors.push(`Expected 37 generated functions, found ${functions.length}.`);
if (manifest.name?.short !== 'Zava One') errors.push(`Expected agent short name Zava One, found ${manifest.name?.short}.`);
if (!manifest.name?.full?.startsWith('Zava One')) errors.push(`Expected agent full name to start with Zava One, found ${manifest.name?.full}.`);
if (manifest.accentColor !== '#075FCE') errors.push(`Expected Zava blue accent #075FCE, found ${manifest.accentColor}.`);
if (manifest.icons?.color !== 'color.png' || manifest.icons?.outline !== 'outline.png') errors.push('Agent manifest icon paths are invalid.');
if (!packagedColorIcon.equals(readFileSync(resolve(root, 'copilot/color.png')))) errors.push('Packaged color.png differs from the source icon.');
if (!packagedOutlineIcon.equals(readFileSync(resolve(root, 'copilot/outline.png')))) errors.push('Packaged outline.png differs from the source icon.');

const names = new Set();
const descriptions = new Set();
for (const fn of functions) {
  if (!fn.name || names.has(fn.name)) errors.push(`Duplicate or missing function name: ${fn.name}`);
  names.add(fn.name);
  const description = fn.description || '';
  if (descriptions.has(description)) errors.push(`Duplicate function description: ${fn.name}.`);
  descriptions.add(description);
  if (!description.startsWith('Use when ') || description.indexOf('Do not use when ') < 0) {
    errors.push(`Routing boundary missing for ${fn.name}.`);
  }
  if (fn.parameters?.type !== 'object') errors.push(`Invalid parameter root for ${fn.name}.`);
  for (const parameterName of Object.keys(fn.parameters?.properties || {})) {
    if (webPartOnlyParameters.has(parameterName)) {
      errors.push(`Web-part-only parameter ${parameterName} leaked into ${fn.name}.`);
    }
  }
  if (!agent.instructions?.includes(fn.name)) errors.push(`Agent instructions do not route ${fn.name}.`);
}

const starters = agent.conversation_starters || [];
if (starters.length !== 6) errors.push(`Expected 6 conversation starters, found ${starters.length}.`);
if (new Set(starters.map((starter) => starter.title)).size !== starters.length) errors.push('Conversation starter titles must be unique.');
if (new Set(starters.map((starter) => starter.text)).size !== starters.length) errors.push('Conversation starter prompts must be unique.');
if (starters.at(-1)?.text !== 'Show me all the company and employee experiences Zava One can help with.') {
  errors.push('Capability Explorer must be the final conversation starter.');
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Validated generated plugin v2.4 with ${functions.length} functions and Zava One branding.`);