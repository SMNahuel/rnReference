import { useContext } from 'react';
import { ScrollView } from 'react-native';

import { AppContext } from '../../providers/providerContext';

const Simple = ({ children }: any) => {
  const { styles } = useContext(AppContext);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      contentInsetAdjustmentBehavior="automatic">
      {children}
    </ScrollView>
  );
};

export default Simple;
