import { Text } from 'react-native';

import { colorCommon, sizeCommon } from '../';
import { colors, fonts } from '@styles/theme';

import type { TextProps } from './';

const Default = ({
  text,
  size,
  variant,
  color,
  style,
  ...props
}: TextProps): JSX.Element => (
  <Text
    style={[
      fonts[size || sizeCommon][variant || 'normal'],
      { color: colors[color || colorCommon] },
      style,
    ]}
    {...props}>
    {text}
  </Text>
);

export default Default;
