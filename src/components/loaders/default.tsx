import { ActivityIndicator, View } from 'react-native';

import { width } from '@utils/_dimensions';

const loaderStyle = {
  width,
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
};

const Default = ({ size = 100 }) => (
  <View style={loaderStyle}>
    <ActivityIndicator size={size} />
  </View>
);

export default Default;
