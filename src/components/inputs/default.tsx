import { TextInput as ReactTextInput } from 'react-native';

import styles from './styles';

import type { InputProps } from '.';

const Default = ({ style, ...props }: InputProps) => (
  <ReactTextInput style={[styles.valueStyle, style]} {...props} />
);

export default Default;
