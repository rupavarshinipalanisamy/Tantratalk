import {StyleSheet} from 'react-native';
import { colors } from '../../utils/colors';

export const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight:'500',
    marginBottom: 5,
    color:colors.black1,
  },
  textBox: {
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: 'black',
    width: '100%',
    backgroundColor:colors.lightgrey
    // marginBottom: 10,
  },
  error: {
    borderColor: 'red',
  },
  fullWidth: {
    width: '100%',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  labelContainer: {
    flex: 1,
  },
  // textInputContainer: {
  //   flex: 2,
  // },
});