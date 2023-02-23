import { Text, TouchableOpacity } from 'react-native';

import { Icons, sizeCommon, colorCommon } from '@components';
import { fonts, fontsSizes, colors } from '@styles/theme';

import styles from '@styles/screens';

import type { ButtonProps } from '.';

type Props = ButtonProps;

const Simple = ({
  color,
  contentStyle,
  loading = false,
  disabled,
  title,
  accessibilityLabel,
  style,
  testID,
  iconLeft,
  iconRight,
  size,
  variant,
  onPress,
}: Props) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={Boolean(disabled)}
    testID={String(testID)}
    accessibilityLabel={String(accessibilityLabel || title)}
    style={[
      styles.row,
      {
        backgroundColor: contentStyle?.backgroundColor
          ? colors[contentStyle?.backgroundColor]
          : 'transparent',
        ...style,
      },
    ]}>
    {iconLeft && (
      <Icons.FontAwesome5
        loading={loading}
        color={color}
        style={{ marginRight: 10 }}
        {...iconLeft}
      />
    )}
    <Text
      style={[
        { ...fonts[size || sizeCommon][variant || 'normal'] },
        {
          ...contentStyle,
          color: colors[color || colorCommon],
          fontSize: fontsSizes[size || sizeCommon].fontSize,
          backgroundColor: 'transparent',
          width: '90%',
        },
      ]}>
      {title}
      {iconRight && <Icons.FontAwesome5 color={color} {...iconRight} />}
    </Text>
  </TouchableOpacity>
);

export default Simple;
