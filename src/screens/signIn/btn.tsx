/**
 * Login Button
 *
 * @component
 */

import { Buttons } from '@components';

import styles from './styles';

import type { ThemeProps } from '../../styles/theme';

type BtnLogin = {
  backgroundColor: ThemeProps['color'];
  icon: string;
  loading?: boolean;
  title: string;
  onPress: () => void;
};

const DemoScreen = ({
  backgroundColor,
  icon,
  loading = false,
  title,
  onPress,
}: BtnLogin) => (
  <Buttons.Simple
    color="slate100"
    onPress={onPress}
    title={title}
    disabled={loading}
    iconLeft={{ name: icon, size: 'bigger' }}
    loading={loading}
    contentStyle={{
      backgroundColor,
      color: 'slate100',
      textAlign: 'center',
    }}
    size="bigger"
    style={styles.button}
  />
);

export default DemoScreen;
