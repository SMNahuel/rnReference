import { TextInput, View } from 'react-native';

import { Texts, Icons, colorCommon } from '@components/';
import { colors } from '@styles/theme';
import styles from './styles';

import type { InputProps } from '.';
import type { StyleProp } from '..';

interface Props extends InputProps {
  label?: string;
  containerStyle?: StyleProp;
}

const InputIcon = ({
  value,
  iconLeft,
  iconRight,
  placeholder,
  style,
  onBlur,
  onChangeText,
  label,
  containerStyle,
  errorStyle,
  error,
  secureTextEntry,
}: Props): JSX.Element => (
  <View style={[styles.container, containerStyle]}>
    {label && (
      <Texts.Default
        style={{
          color: style?.color || colors[colorCommon],
          ...styles.label,
          ...style,
        }}
        text={label}
      />
    )}
    <View style={[styles.textInput, style]}>
      {iconLeft && <Icons.FontAwesome5 {...iconLeft} />}
      <TextInput
        value={value}
        style={styles.valueStyle}
        placeholder={placeholder}
        onChangeText={onChangeText}
        onBlur={onBlur}
        secureTextEntry={secureTextEntry}
      />
      {iconRight && <Icons.FontAwesome5 {...iconRight} />}
    </View>
    {error && (
      <Texts.Default
        style={{ color: style?.color || colors[colorCommon], ...errorStyle }}
        text={error}
      />
    )}
  </View>
);

export default InputIcon;
