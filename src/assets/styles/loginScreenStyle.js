import { StyleSheet } from 'react-native'
import colors from '../colors'
import fonts from '../fonts'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary
  },
  top: {
    flex: 1,
    height: '50%',
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },

  bottom: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 20,
    flex: 1,
    height: '50%',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  formGroup: {
    marginBottom: 15
  },
  lable: {
    marginBottom: 5,
    fontSize: 14,
    fontFamily: fonts.montserrat.semiBold,
    textTransform: 'uppercase',
    color: colors.white,
  },
  inputBox: {
    borderBottomWidth: .5,
    borderBottomColor: colors.sub
  },
  input: {
    fontFamily: fonts.montserrat.normal,
    paddingVertical: 5,
    paddingHorizontal: 0,
    fontSize: 16,
    color: colors.white
  },

  btn: {
    marginTop: 5,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.white,
    paddingVertical: 15,
    borderRadius: 30
  },
  btnText: {
    fontFamily: fonts.montserrat.normal,
    fontSize: 16,
    letterSpacing: 4,
    textTransform: 'uppercase',
    color: colors.white
  }
})

export default styles