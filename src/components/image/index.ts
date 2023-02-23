/* eslint-disable no-unused-vars */
import Default from './default';
export { Default };

type ImageSource = {
  uri: string;
  width?: number;
  height?: number;
  scale?: number;
  method?: string;
  headers?: string;
};

export type ImageProps = {
  accessibilityLabel?: string;
  blurRadius?: number;
  defaultSource?: string;
  loadingIndicatorSource?: ImageSource;
  onError?: ({ nativeEvent: { error } }: any) => void;
  onLoadEnd?: () => void;
  onProgress?: ({ nativeEvent: { loaded, total } }: any) => void;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  source?: JSX.Element;
  style?: React.CSSProperties;
  height?: number;
  width?: number;
};
