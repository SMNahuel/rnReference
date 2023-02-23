import type { ThemeProps } from '../../styles/theme';
import type { StyleProp } from '../';

import FontAwesome5 from './FontAwesome5';

export { FontAwesome5 };

export type IconProps = {
  name: string;
  size?: ThemeProps['size'];
  color?: ThemeProps['color'];
  style?: StyleProp;
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
};
