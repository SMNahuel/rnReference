import type { ThemeProps } from '../styles/theme';
import * as Buttons from './buttons';
import * as Icons from './icons';
import * as Images from './image';
import * as Inputs from './inputs';
import * as Loaders from './loaders';
import * as Texts from './texts';
const sizeCommon = 'normal',
  colorCommon = 'purple800';

export {
  sizeCommon,
  colorCommon,
  Icons,
  Buttons,
  Texts,
  Inputs,
  Loaders,
  Images,
};
export type StyleProp = React.CSSProperties & {
  backgroundColor?: ThemeProps['color'] | undefined;
  color?: ThemeProps['color'] | undefined;
  size?: ThemeProps['size'] | undefined;
};
