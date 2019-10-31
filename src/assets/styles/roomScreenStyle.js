import { StyleSheet } from 'react-native'
import colors from '../colors'
import fonts from '../fonts'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 10
  },
  listBody: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
  },

  list: {
    flex: 1,
    backgroundColor: colors.white,
    minHeight: 93.2,
    minWidth: 93.2,
    borderWidth: 1,
    maxHeight: 93.2,
    maxWidth: 93.2,
    borderColor: colors.sub,
    padding: 10,
    margin: 10,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  listText: {
    fontFamily: fonts.montserrat.normal,
    fontSize: 18,
    color: colors.black,
    textAlign: 'center'
  },

  btn: {
    flex: 1,
    flexDirection: 'column',
    minHeight: 93.2,
    minWidth: 93.2,
    maxHeight: 93.2,
    maxWidth: 93.2,
    padding: 4,
    borderWidth: 1,
    margin: 5,
    borderColor: colors.primary,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  btnText: {
    fontFamily: fonts.montserrat.semiBold,
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: colors.white
  },

  modalTitle: {
    fontFamily: fonts.montserrat.semiBold,
    fontSize: 26,
    marginBottom: 10
  },
  formGroup: {
    marginVertical: 10
  },
  lable: {
    fontFamily: fonts.montserrat.normal,
    marginBottom: 10
  },
  inputBox: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.sub,
    borderRadius: 4
  },
  input: {
    fontFamily: fonts.montserrat.normal,
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  modalBtnGroup: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row'
  },
  modalBtn: {
    flex: 1,
    padding: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  btnLeft: {
    backgroundColor: colors.warning,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  btnRight: {
    backgroundColor: colors.primary,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  modalBtnText: {
    fontFamily: fonts.montserrat.semiBold,
    color: colors.white,
    textTransform: 'uppercase'
  },
})

export default styles