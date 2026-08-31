import { build } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const output=path.join(root,'temp','visual-harness');
fs.rmSync(output,{recursive:true,force:true});fs.mkdirSync(output,{recursive:true});
fs.copyFileSync(path.join(root,'scripts','visual-harness','index.html'),path.join(output,'index.html'));
await build({entryPoints:[path.join(root,'scripts','visual-harness','entry.tsx')],outfile:path.join(output,'bundle.js'),bundle:true,platform:'browser',format:'iife',target:['chrome100'],loader:{'.jpg':'dataurl','.jpeg':'dataurl','.png':'dataurl'},sourcemap:false,minify:false});
console.log(path.join(output,'index.html'));
