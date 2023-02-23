import { StyleSheet } from 'react-native';

import { colors } from './theme';

const distance = 10,
  styles = StyleSheet.create({
    centered: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    safeArea: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
      backgroundColor: 'transparent',
      marginBottom: distance * 2,
      paddingBottom: distance * 2,
    },
    mainContainer: {
      borderColor: colors.emerald600,
      borderWidth: 1,
      flex: 1,
      height: '100%',
      color: '#000',
      backgroundColor: 'transparent',
    },
    input: {
      backgroundColor: '#c6c6',
      borderColor: '#666',
      borderWidth: 1,
      padding: 12,
      margin: 5,
    },
    text: {
      color: '#000',
    },
    divider: {
      borderBottomColor: colors.slate100,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    columns: {
      flex: 0,
      flexDirection: 'column',
    },
    row: {
      flex: 0,
      flexDirection: 'row',
      alignItems: 'center',
    },
    marginVertical: {
      marginBottom: distance,
      marginTop: distance,
    },
  });

export default styles;
