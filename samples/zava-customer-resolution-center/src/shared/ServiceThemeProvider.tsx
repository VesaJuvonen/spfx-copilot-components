import * as React from 'react';
import { FluentProvider, IdPrefixProvider, createDarkTheme, createLightTheme, type BrandVariants, type Theme } from '@fluentui/react-components';
import { createDOMRenderer, makeStyles, RendererProvider } from '@griffel/react';

const serviceBrand: BrandVariants = {
  10:'#061A18',20:'#0A2724',30:'#0B3530',40:'#0A433D',50:'#07524A',60:'#046159',70:'#027168',80:'#087F75',
  90:'#169087',100:'#2AA198',110:'#47B2A9',120:'#68C3BB',130:'#8CD4CD',140:'#B1E4DF',150:'#D5F3F0',160:'#EEFBF9'
};
const lightTheme: Theme = {
  ...createLightTheme(serviceBrand), colorNeutralBackground1:'#F4F7F6', colorNeutralBackground2:'#E9EFED',
  colorNeutralBackground3:'#DDE7E4', colorNeutralForeground1:'#172124', colorNeutralForeground2:'#445255',
  colorNeutralStroke1:'#BBC9C6', colorNeutralStroke2:'#D3DEDB'
};
const darkTheme: Theme = {
  ...createDarkTheme(serviceBrand), colorNeutralBackground1:'#10191B', colorNeutralBackground2:'#172426',
  colorNeutralBackground3:'#203033', colorNeutralForeground1:'#F4F7F6', colorNeutralForeground2:'#C2CFCC',
  colorNeutralStroke1:'#49605D', colorNeutralStroke2:'#304542'
};
const useStyles = makeStyles({ provider:{width:'100%',minWidth:0,minHeight:'100%',backgroundColor:'transparent'} });

export interface IServiceThemeProviderProps { readonly theme?: string; readonly targetDocument: Document; readonly children?: React.ReactNode; }
export default function ServiceThemeProvider(props: IServiceThemeProviderProps): React.ReactElement {
  const renderer = React.useMemo(() => createDOMRenderer(props.targetDocument), [props.targetDocument]);
  const styles = useStyles();
  return <RendererProvider renderer={renderer} targetDocument={props.targetDocument}><IdPrefixProvider value="zcr-">
    <FluentProvider theme={props.theme === 'dark' ? darkTheme : lightTheme} targetDocument={props.targetDocument} className={styles.provider}>{props.children}</FluentProvider>
  </IdPrefixProvider></RendererProvider>;
}
