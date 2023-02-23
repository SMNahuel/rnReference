import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  textInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    borderColor: '#6cc',
  },
  container: { width: '100%' },
  valueStyle: {
    color: '#000',
    fontSize: 16,
    height: 55,
    flexGrow: 1,
    marginHorizontal: 5,
  },
  label: {
    marginBottom: 5,
  },
});

export default styles;
