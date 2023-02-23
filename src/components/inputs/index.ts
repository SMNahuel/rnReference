/* eslint-disable no-unused-vars */
import type { StyleProp } from '../';
import type { IconProps } from '../icons';

import Default from './default';
import Icon from './icon';

export { Default, Icon };

export interface InputProps {
  allowFontScaling?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoFocus?: boolean;
  blurOnSubmit?: boolean;
  defaultValue?: string;
  editable?: boolean;
  maxLength?: number;
  onBlur?: (e?: any) => void;
  onChange?: (e?: any) => void;
  onChangeText?: (e?: any) => void;
  onEndEditing?: (e?: any) => void;
  onPressIn?: (e?: any) => void;
  onFocus?: (e?: any) => void;
  onKeyPress?: (e?: any) => void;
  placeholder?: string;
  placeholderTextColor?: string;
  secureTextEntry?: boolean;
  value?: string | number;
  _ref?: unknown;
  iconLeft?: IconProps;
  iconRight?: IconProps;
  style?: StyleProp;
  error?: string;
  errorStyle?: StyleProp;
}
