import { StyleSheet } from 'react-native'
import colors from '../colors'
import fonts from '../fonts'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
    minHeight: 93.2,
    minWidth: 93.2,
    maxHeight: 93.2,
    maxWidth: 93.2,
    padding: 10,
    margin: 10,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.sub,
    backgroundColor: colors.sub,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  booked: {
    backgroundColor: colors.primary
  },
  listText: {
    fontFamily: fonts.montserrat.normal,
    fontSize: 18,
    textAlign: 'center',
    color: colors.white
  },

  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  btnText: {
    fontFamily: fonts.montserrat.normal,
    fontSize: 18
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
    borderRadius: 4,
  },
  inputBoxDisabled: {
    backgroundColor: colors.sub
  },
  modalBtnGroup: {
    marginVertical: 10,
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

  input: {
    fontFamily: fonts.montserrat.normal,
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  
  picker: {
    height: 40,
  },

  durationTitle: {
    fontFamily: fonts.montserrat.semiBold,
    fontSize: 28,
    textAlign: 'center'
  },
  timerBody: {
    marginVertical: 25
  },
  timeContent: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  time: {
    fontFamily: fonts.montserrat.semiBold,
    fontSize: 28
  },
  timeLeft: {
    fontFamily: fonts.montserrat.normal,
    fontSize: 14
  }
})

export default styles