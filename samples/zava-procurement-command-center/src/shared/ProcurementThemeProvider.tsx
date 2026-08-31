import * as React from 'react';
import { FluentProvider, IdPrefixProvider, createDarkTheme, createLightTheme, type BrandVariants } from '@fluentui/react-components';
import { createDOMRenderer, makeStyles, RendererProvider } from '@griffel/react';

const brand:BrandVariants={10:'#061F1A',20:'#0B2D26',30:'#103B31',40:'#174C3E',50:'#1D5D4C',60:'#26705B',70:'#31846C',80:'#439A7F',90:'#63AE94',100:'#82C1A9',110:'#A0D1BD',120:'#BCE0D0',130:'#D4ECE1',140:'#E6F5ED',150:'#F2FAF6',160:'#FAFDFC'};
const light=createLightTheme(brand);
const dark=createDarkTheme(brand);
light.colorBrandForeground1='#173F35'; light.colorBrandBackground='#173F35'; light.colorBrandBackground2='#EDF0E8';
dark.colorBrandForeground1='#82C1A9'; dark.colorBrandBackground='#26705B'; dark.colorBrandBackground2='#102B25';
const useStyles=makeStyles({root:{width:'100%',minWidth:0,backgroundColor:'transparent'}});

const Inner:React.FunctionComponent<React.PropsWithChildren<{readonly darkMode:boolean;readonly targetDocument:Document}>>=({darkMode,targetDocument,children})=>{
  const styles=useStyles();
  return <IdPrefixProvider value="zpc-"><FluentProvider className={styles.root} targetDocument={targetDocument} theme={darkMode?dark:light}>{children}</FluentProvider></IdPrefixProvider>;
};
const ProcurementThemeProvider:React.FunctionComponent<React.PropsWithChildren<{readonly theme?:string;readonly targetDocument:Document}>>=({theme,targetDocument,children})=>{
  const renderer=React.useMemo(()=>createDOMRenderer(targetDocument),[targetDocument]);
  return <RendererProvider renderer={renderer} targetDocument={targetDocument}><Inner darkMode={theme==='dark'} targetDocument={targetDocument}>{children}</Inner></RendererProvider>;
};
export default ProcurementThemeProvider;