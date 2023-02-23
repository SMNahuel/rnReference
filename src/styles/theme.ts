import { Platform } from 'react-native';

import { wp } from '@utils/_dimensions';

export type ThemeProps = {
  color?:
    | 'slate700'
    | 'slate500'
    | 'slate300'
    | 'slate200'
    | 'slate100'
    | 'purple900'
    | 'purple800'
    | 'purple700'
    | 'purple600'
    | 'purple200'
    | 'purple100'
    | 'yellow600'
    | 'yellow400'
    | 'yellow200'
    | 'yellow100'
    | 'blue800'
    | 'blue600'
    | 'red800'
    | 'red700'
    | 'red500'
    | 'red100'
    | 'orange600'
    | 'orange100'
    | 'emerald600'
    | 'emerald100'
    | 'sky600';
  size?:
    | 'huggest'
    | 'huge'
    | 'biggest'
    | 'bigger'
    | 'big'
    | 'normal'
    | 'small'
    | 'smallest';
  variant?: 'normal' | 'regular' | 'bold' | 'semiBold';
};
export declare type Theme = {
  fontsSizes?: ThemeProps['size'];
  fonts: ThemeProps['size'];
  colors: ThemeProps['color'];
};

const fontFamily = Platform.OS === 'ios' ? 'Arial' : 'Fontiso',
  fontsSizes = {
    huggest: {
      fontSize: wp(9),
    },
    huge: {
      fontSize: wp(8),
    },
    biggest: {
      fontSize: wp(7),
    },
    bigger: {
      fontSize: wp(6),
    },
    big: {
      fontSize: wp(5),
    },
    normal: {
      fontSize: wp(4),
    },
    small: {
      fontSize: wp(3),
    },
    smallest: {
      fontSize: wp(2),
    },
  },
  fonts = {
    huggest: {
      normal: {
        ...fontsSizes.huggest,
        fontFamily,
        fontWeight: 'normal',
      },
      regular: {
        ...fontsSizes.huggest,
        fontFamily,
        fontWeight: 'regular',
      },
      bold: {
        ...fontsSizes.huggest,
        fontFamily,
        fontWeight: 'bold',
      },
      semiBold: {
        ...fontsSizes.huggest,
        fontFamily,
        fontWeight: 'semi-bold',
      },
    },
    huge: {
      normal: {
        ...fontsSizes.huge,
        fontFamily,
        fontWeight: 'normal',
      },
      regular: {
        ...fontsSizes.huge,
        fontFamily,
        fontWeight: 'regular',
      },
      bold: {
        ...fontsSizes.huge,
        fontFamily,
        fontWeight: 'bold',
      },
      semiBold: {
        ...fontsSizes.huge,
        fontFamily,
        fontWeight: 'semi-bold',
      },
    },
    biggest: {
      normal: {
        ...fontsSizes.biggest,
        fontFamily,
        fontWeight: 'normal',
      },
      regular: {
        ...fontsSizes.biggest,
        fontFamily,
        fontWeight: 'regular',
      },
      bold: {
        ...fontsSizes.biggest,
        fontFamily,
        fontWeight: 'bold',
      },
      semiBold: {
        ...fontsSizes.biggest,
        fontFamily,
        fontWeight: 'semi-bold',
      },
    },
    bigger: {
      normal: {
        ...fontsSizes.bigger,
        fontFamily,
        fontWeight: 'normal',
      },
      regular: {
        ...fontsSizes.bigger,
        fontFamily,
        fontWeight: 'regular',
      },
      bold: {
        ...fontsSizes.bigger,
        fontFamily,
        fontWeight: 'bold',
      },
      semiBold: {
        ...fontsSizes.bigger,
        fontFamily,
        fontWeight: 'semi-bold',
      },
    },
    big: {
      normal: {
        ...fontsSizes.big,
        fontFamily,
        fontWeight: 'normal',
      },
      regular: {
        ...fontsSizes.big,
        fontFamily,
        fontWeight: 'regular',
      },
      bold: {
        ...fontsSizes.big,
        fontFamily,
        fontWeight: 'bold',
      },
      semiBold: {
        ...fontsSizes.big,
        fontFamily,
        fontWeight: 'semi-bold',
      },
    },
    normal: {
      normal: {
        ...fontsSizes.normal,
        fontFamily,
        fontWeight: 'normal',
      },
      regular: {
        ...fontsSizes.normal,
        fontFamily,
        fontWeight: 'regular',
      },
      bold: {
        ...fontsSizes.normal,
        fontFamily,
        fontWeight: 'bold',
      },
      semiBold: {
        ...fontsSizes.normal,
        fontFamily,
        fontWeight: 'semi-bold',
      },
    },
    small: {
      normal: {
        ...fontsSizes.small,
        fontFamily,
        fontWeight: 'normal',
      },
      regular: {
        ...fontsSizes.small,
        fontFamily,
        fontWeight: 'regular',
      },
      bold: {
        ...fontsSizes.small,
        fontFamily,
        fontWeight: 'bold',
      },
      semiBold: {
        ...fontsSizes.small,
        fontFamily,
        fontWeight: 'semi-bold',
      },
    },
    smallest: {
      normal: {
        ...fontsSizes.smallest,
        fontFamily,
        fontWeight: 'normal',
      },
      regular: {
        ...fontsSizes.smallest,
        fontFamily,
        fontWeight: 'regular',
      },
      bold: {
        ...fontsSizes.smallest,
        fontFamily,
        fontWeight: 'bold',
      },
      semiBold: {
        ...fontsSizes.smallest,
        fontFamily,
        fontWeight: 'semi-bold',
      },
    },
  },
  colors = {
    slate700: '#394555',
    slate500: '#6C7582',
    slate300: '#C3C6CA',
    slate200: '#E3E4E6',
    slate100: '#F6F7F7',
    purple900: '#36165F',
    purple800: '#4C3569',
    purple700: '#5F4F76',
    purple600: '#756987',
    purple200: '#D7D5DB',
    purple100: '#EFEEF1',
    yellow600: '#F6A800',
    yellow400: '#FAD293',
    yellow200: '#FAD293',
    yellow100: '#FFFBF6',
    blue800: '#193275',
    blue600: '#2447A6',
    red800: '#7B1212',
    red700: '#961616',
    red500: '#C25959',
    red100: '#F8F2F2',
    orange600: '#BD7115',
    orange100: '#FAF5F2',
    emerald600: '#006F54',
    emerald100: '#DDE5E2',
    sky600: '#0D9BDB',
  };

export { fonts, fontsSizes, colors };
