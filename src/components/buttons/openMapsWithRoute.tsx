import SendIntentAndroid from 'react-native-send-intent';

import Simple from './simple';

import type { ButtonProps } from './';

export interface OpenURLButton extends ButtonProps {
  direction: string;
  driveMode?: string;
}

const MapsWithRoute = ({
  direction,
  driveMode = 'd',
  ...props
}: OpenURLButton) => (
  <Simple
    {...props}
    onPress={() => SendIntentAndroid.openMapsWithRoute(direction, driveMode)}
  />
);

export default MapsWithRoute;
