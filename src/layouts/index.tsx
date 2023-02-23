import { useContext } from 'react';
import { Platform, StatusBar, SafeAreaView, ScrollView } from 'react-native';

import { AppContext } from '@providers/providerContext';
import { height, width } from '@utils/_dimensions';

import { Loaders } from '@components';

const StackProvider = ({
  children,
  loading,
  style,
}: {
  children: JSX.Element;
  loading?: boolean;
  style?: React.CSSProperties;
}) => {
  const { dark } = useContext(AppContext);

  return (
    <SafeAreaView edges={['top', 'left', 'right']}>
      <StatusBar
        animated={true}
        barStyle={
          Platform.OS === 'ios'
            ? dark
              ? 'dark-content'
              : 'light-content'
            : dark
            ? 'dark'
            : 'light'
        }
      />
      {loading ? (
        <Loaders.Default />
      ) : (
        <ScrollView
          contentContainerStyle={[
            {
              minHeight: height,
              minWidth: width,
            },
            style,
          ]}>
          {children}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default StackProvider;
