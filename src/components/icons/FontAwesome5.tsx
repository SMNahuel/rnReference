import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { fontsSizes, colors } from '@styles/theme';
import { sizeCommon, colorCommon } from '@components/';

import type { IconProps } from '.';

const FontAwesome5 = ({
  name,
  size,
  color,
  style,
  loading,
  disabled,
  onPress,
}: IconProps) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    style={[
      {
        padding: 0,
        margin: 0,
      },
      style,
    ]}>
    {/* @ts-ignore */}
    <Icon
      name={loading ? 'spinner' : name}
      size={fontsSizes[size || sizeCommon].fontSize}
      color={colors[color || colorCommon]}
    />
  </TouchableOpacity>
);

export default FontAwesome5;
