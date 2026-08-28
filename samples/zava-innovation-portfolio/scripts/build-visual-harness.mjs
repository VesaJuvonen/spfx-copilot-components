import { build } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const out=path.join(root,'temp','visual-harness');
fs.rmSync(out,{recursive:true,force:true});fs.mkdirSync(out,{recursive:true});
fs.copyFileSync(path.join(root,'scripts','visual-harness','index.html'),path.join(out,'index.html'));
await build({entryPoints:[path.join(root,'scripts','visual-harness','entry.tsx')],outfile:path.join(out,'bundle.js'),bundle:true,platform:'browser',format:'iife',target:['chrome100'],loader:{'.jpg':'dataurl','.jpeg':'dataurl','.png':'dataurl','.scss':'local-css'},sourcemap:false,minify:false});
console.log(path.join(out,'index.html'));
