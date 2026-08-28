import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import unzipper from 'unzipper';

const root=path.resolve(import.meta.dirname,'..');
const packageConfig=JSON.parse(fs.readFileSync(path.join(root,'config','package-solution.json'),'utf8'));
const bundleConfig=JSON.parse(fs.readFileSync(path.join(root,'config','config.json'),'utf8'));
const packagePath=path.resolve(root,'sharepoint',packageConfig.paths.zippedPackage);
const agentPath=path.join(root,'teams','zava-innovation-hub.zip');
const evidencePath=path.join(root,'assets','release-evidence.json');
const limits={maximumEntryBytes:Number(process.env.MAX_PRODUCTION_ENTRY_BYTES||2*1024*1024),maximumJavaScriptBytes:Number(process.env.MAX_PRODUCTION_JS_BYTES||4*1024*1024),maximumPackageBytes:Number(process.env.MAX_SPPKG_BYTES||10*1024*1024)};
const assert=(condition,message)=>{if(!condition)throw new Error(message);};
const hash=buffer=>crypto.createHash('sha256').update(buffer).digest('hex');
const mediaPattern=/\.(?:avif|gif|jpe?g|png|svg|webp)$/i;
const hashedJavaScriptPattern=/_[0-9a-f]{20}\.js$/i;

assert(fs.existsSync(packagePath),`Production package is missing: ${packagePath}`);
assert(fs.existsSync(agentPath),`Generated agent package is missing: ${agentPath}`);
const archive=await unzipper.Open.file(packagePath);
const files=archive.files.filter(entry=>entry.type==='File');
const clientAssets=files.filter(entry=>entry.path.startsWith('ClientSideAssets/'));
const javascript=clientAssets.filter(entry=>entry.path.endsWith('.js'));
const media=clientAssets.filter(entry=>mediaPattern.test(entry.path));
const packagedAgent=clientAssets.find(entry=>entry.path.endsWith('/zava-innovation-hub.zip'));
const stale=clientAssets.filter(entry=>/hot-update|\.map$|\/zava-innovation-components\.js$/i.test(entry.path));
const unhashed=javascript.filter(entry=>!hashedJavaScriptPattern.test(entry.path));
const bundles=Object.values(bundleConfig.bundles||{});
const components=bundles.flatMap(bundle=>bundle.components||[]);
const uniqueManifests=new Set(components.map(component=>component.manifest));
assert(components.length===uniqueManifests.size,'Configured bundle contains duplicate component manifests.');
assert(javascript.length===bundles.length,`Expected ${bundles.length} production JavaScript entry, found ${javascript.length}.`);
assert(stale.length===0,`Stale production output found: ${stale.map(entry=>entry.path).join(', ')}`);
assert(unhashed.length===0,`Unhashed production JavaScript found: ${unhashed.map(entry=>entry.path).join(', ')}`);
assert(packagedAgent,'The SPPKG does not contain zava-innovation-hub.zip.');
const agentBytes=fs.readFileSync(agentPath);
assert(hash(await packagedAgent.buffer())===hash(agentBytes),'The SPPKG contains a stale agent ZIP.');

const agentArchive=await unzipper.Open.file(agentPath);
const iconHashes={};
for(const name of ['color.png','outline.png']){
  const icon=agentArchive.files.find(entry=>entry.path===name);
  assert(icon,`Agent ZIP does not contain ${name}.`);
  const packagedBytes=await icon.buffer();
  const sourceBytes=fs.readFileSync(path.join(root,'copilot',name));
  assert(hash(packagedBytes)===hash(sourceBytes),`Agent ZIP contains a stale ${name}.`);
  iconHashes[name]=hash(packagedBytes);
}

const mediaHashes=new Map();
for(const entry of media){
  const digest=hash(await entry.buffer());
  mediaHashes.set(digest,[...(mediaHashes.get(digest)||[]),entry.path]);
}
const duplicateMedia=[...mediaHashes.values()].filter(paths=>paths.length>1);
assert(duplicateMedia.length===0,`Duplicate packaged media found: ${duplicateMedia.map(paths=>paths.join(' = ')).join('; ')}`);
let totalJavaScriptBytes=0;
let largestJavaScript={path:'',bytes:0};
let fluentIconFontPayload=false;
for(const entry of javascript){
  const source=(await entry.buffer()).toString('utf8');
  totalJavaScriptBytes+=entry.uncompressedSize;
  if(entry.uncompressedSize>largestJavaScript.bytes)largestJavaScript={path:entry.path,bytes:entry.uncompressedSize};
  fluentIconFontPayload||=/FluentSystemIcons-(?:Regular|Filled)|data:font\/(?:woff|woff2)/.test(source);
}
assert(!fluentIconFontPayload,'A Fluent icon-font payload was bundled; use SVG icon imports.');
const packageBytes=fs.readFileSync(packagePath);
assert(largestJavaScript.bytes<=limits.maximumEntryBytes,`Largest JavaScript entry exceeds ${limits.maximumEntryBytes} bytes.`);
assert(totalJavaScriptBytes<=limits.maximumJavaScriptBytes,`Total JavaScript exceeds ${limits.maximumJavaScriptBytes} bytes.`);
assert(packageBytes.length<=limits.maximumPackageBytes,`SPPKG exceeds ${limits.maximumPackageBytes} bytes.`);
const report={schemaVersion:1,generatedAt:new Date().toISOString(),package:path.relative(root,packagePath).replaceAll('\\','/'),packageBytes:packageBytes.length,packageSha256:hash(packageBytes),agentPackage:path.relative(root,agentPath).replaceAll('\\','/'),agentPackageBytes:agentBytes.length,agentPackageSha256:hash(agentBytes),agentIconHashes:iconHashes,configuredBundles:bundles.length,configuredComponents:components.length,productionJavaScriptFiles:javascript.length,totalJavaScriptBytes,largestJavaScript,packagedMediaFiles:media.length,duplicateMediaHashes:duplicateMedia.length,staleOutputFiles:stale.length,fluentIconFontPayload,limits};
fs.writeFileSync(evidencePath,`${JSON.stringify(report,null,2)}\n`,'utf8');
console.log(`Verified production package output: ${components.length} components, ${javascript.length} JavaScript file, ${packageBytes.length} package bytes.`);
