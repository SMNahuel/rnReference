/**
 * Buttons Props
 * @param {string} iconLeft - render left icon, select name,.
 * @return Component
 */
import type { ThemeProps } from '../../styles/theme';
import type { TextProps } from '../texts';
import type { IconProps } from '../icons';
import type { StyleProp } from '../';

import { colors } from '@styles/theme';

import Simple from './simple';
import OpenURL from './openURL';
import MapsWithRoute from './openMapsWithRoute';
import SigninGoogle from './loginGoogle';

export { Simple, OpenURL, MapsWithRoute, SigninGoogle };

interface ButtonProps {
  color?: ThemeProps['color'] | typeof colors;
  loading?: boolean;
  disabled?: boolean;
  title: TextProps['text'];
  accessibilityLabel?: string;
  contentStyle?: StyleProp;
  style?: StyleProp;
  labelStyle?: StyleProp;
  testID?: string;
  iconLeft?: IconProps;
  iconRight?: IconProps;
  size?: ThemeProps['size'];
  variant?: ThemeProps['variant'];
  onPress: () => void;
}
export type { ButtonProps };
