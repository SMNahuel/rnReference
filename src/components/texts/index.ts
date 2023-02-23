import { StyleProp } from '../';
import type { ThemeProps } from '../../styles/theme';

import Default from './default';

export { Default };

export type TextProps = ThemeProps & {
  accessibilityState?: boolean;
  accessible?: boolean;
  adjustsFontSizeToFit?: boolean;
  allowFontScaling?: boolean;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  style?: StyleProp;
  text: string;
  size?: ThemeProps['size'];
  variant?: ThemeProps['variant'];
};
