import { StyleSheet } from 'react-native'
import colors from '../colors'
import fonts from '../fonts'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  body: {
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 75,
  },
  cardImg: {
    borderRadius: 4
  },
  customerBox: {
    backgroundColor: colors.pureWhite,
    borderRadius: 4,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  profile: {
    padding: 4,
    borderRadius: 88 / 2,
    marginRight: 10,
    overflow: 'hidden',
    backgroundColor: colors.pureWhite,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,

    elevation: 1,

  },
  img: {
    width: 85,
    height: 85,
    borderRadius: 85 / 2
  },

  desc: {
    flex: 1,
    color: colors.black,
    justifyContent: 'space-evenly'
  },
  descTop: {
    flex: 1,
    justifyContent: 'center'
  },
  descBottom: {
    flex: 1,
    marginTop: 5,
    borderRadius: 4,
    paddingVertical: 5,
    paddingRight: 10,
  },
  row: {
    flexDirection: 'row'
  },
  title: {
    marginBottom: 5,
    fontSize: 20,
    fontFamily: fonts.montserratAlt.bold,
    color: colors.pureWhite,
    textShadowColor: '#00000033',
    textShadowRadius: 4,
    textShadowOffset: {
      width: 2,
      height: 2
    }
  },
  sub: {
    color: colors.black,
    fontFamily: fonts.montserrat.normal,
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    backgroundColor: colors.primary,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50 / 2,
    bottom: 20,
    right: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 4,
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
  input: {
    fontFamily: fonts.montserrat.normal,
    paddingVertical: 5,
    paddingHorizontal: 10
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
})

export default styles