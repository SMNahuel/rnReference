import { StyleSheet } from 'react-native';

import { colors, fontFamily, fontsSizes } from '@styles/theme';

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    padding: 10,
    marginTop: 20,
    width: '100%',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '90%',
  },
  heading: {
    fontFamily,
    fontSize: 24,
    color: colors.slate100,
    marginBottom: 20,
  },
  heagingText: { marginBottom: 20, textAlign: 'center' },
  input: {
    color: colors.slate100,
    marginBottom: 10,
    ...fontsSizes.big,
  },
  inputContainer: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    padding: 60,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 20,
    elevation: 5,

    width: 450,
  },
  logo: {
    height: 80,
    width: 80,
    marginBottom: 20,
    top: 30,
  },
});

export default styles;
