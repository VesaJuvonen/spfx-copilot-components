export interface ISessionReceipt {readonly id:string;readonly intent:string;readonly actor:string;readonly detail:string;readonly createdAt:string;}
const key='zava-innovation-receipts-v1';
let memory:readonly ISessionReceipt[]=[];
const read=():readonly ISessionReceipt[]=>{try{const value=window.sessionStorage.getItem(key);return value?JSON.parse(value) as ISessionReceipt[]:memory;}catch{return memory;}};
export const addReceipt=(intent:string,actor:string,detail:string):ISessionReceipt=>{const receipt={id:`ZIH-${Date.now()}`,intent,actor,detail,createdAt:new Date().toISOString()};memory=[...read(),receipt];try{window.sessionStorage.setItem(key,JSON.stringify(memory));}catch{/* sandbox-safe memory fallback */}return receipt;};
export const getReceipts=():readonly ISessionReceipt[]=>read();
export const resetReceipts=():void=>{memory=[];try{window.sessionStorage.removeItem(key);}catch{/* sandbox-safe memory fallback */}};