import { useCallback } from 'react';
import { Alert, Linking } from 'react-native';

import Simple from './simple';

import type { ButtonProps } from './';

export interface OpenURLButton extends ButtonProps {
  url: string;
}

const OpenURL = ({ url, ...props }: OpenURLButton) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Simple {...props} onPress={handlePress} />;
};

export default OpenURL;
