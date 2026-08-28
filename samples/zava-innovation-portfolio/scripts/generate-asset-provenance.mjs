import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const check=process.argv.includes('--check');
const root=path.resolve(import.meta.dirname,'..');
const hash=(file)=>crypto.createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex');
const portraits=['Diego-Siciliani','Grady-Archie','Isaiah-Langer','Johanna-Lorenz','Joni-Sherman','Lee-Gu','Megan-Bowen','Miriam-Graham','Nestor-Wilke','Patti-Fernandez','Pradeep-Gupta'];
const references=['innovation-portfolio-command-center.png','innovation-portfolio-funding-workspace.png','innovation-portfolio-inline-canvas.png','innovation-portfolio-my-innovation-view.png'];
const assets=[];
for(const name of portraits){
  const runtime=`src/shared/assets/faces/${name}.jpg`;
  const source=`assets/faces/${name}.jpeg`;
  const runtimeHash=hash(runtime);
  const sourceHash=hash(source);
  if(runtimeHash!==sourceHash)throw new Error(`Package portrait differs from source copy: ${name}`);
  assets.push({path:runtime,source:`../zava-project-tracker/assets/faces/${name}.jpeg`,sourceCopy:source,sha256:runtimeHash,sourceCopySha256:sourceHash,intendedUse:`Fictional Microsoft 365 demo persona portrait for ${name.replace('-', ' ')} in accountable innovation roles.`,note:'Byte-identical package-source JPG and approved sibling-sample JPEG; initials remain the runtime fallback.',redistributionStatus:'Pending final public media-rights review.'});
}
assets.push({path:'copilot/color.png',source:'Generated locally by scripts/generate-agent-icons.ps1',sha256:hash('copilot/color.png'),intendedUse:'192 by 192 Zava Innovation Hub color app icon.',note:'Original geometric lightbulb, creative spark, and narrowing stage-gate motif on the grape brand field.'});
assets.push({path:'copilot/outline.png',source:'Generated locally by scripts/generate-agent-icons.ps1',sha256:hash('copilot/outline.png'),intendedUse:'32 by 32 monochrome Zava Innovation Hub outline icon.',note:'White transparent small-size form generated from the same source mark.'});
for(const name of references)assets.push({path:`assets/${name}`,source:'User-supplied design brief',sha256:hash(`assets/${name}`),intendedUse:'Design reference only.',note:'Not presented as an implementation screenshot and not loaded at runtime.'});
const manifest={$schema:'./asset-provenance.schema.json',reviewedOn:'2026-08-28',assets};
const output=`${JSON.stringify(manifest,null,2)}\n`;
const target=path.join(root,'assets','asset-provenance.json');
if(check){if(!fs.existsSync(target)||fs.readFileSync(target,'utf8')!==output)throw new Error('assets/asset-provenance.json is stale. Run npm run generate:assets.');console.log(`Verified ${assets.length} provenance records.`);}else{fs.writeFileSync(target,output);console.log(`Generated ${assets.length} provenance records.`);}
