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
    paddingHorizontal: 10,
  },
  imgFrame: {
    padding: 4,
    backgroundColor: colors.pureWhite,
    borderRadius: 258 / 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  img: {
    width: 150, 
    height: 150,
    borderRadius: 150 / 2
  },
  content: {
    marginTop: 20,
    alignItems: 'center'
  },
  contentTitle: {
    color: colors.black,
    fontFamily: fonts.montserratAlt.semiBold,
    fontSize: 26,
    textTransform: 'capitalize',
    textShadowColor: '#00000022',
    textShadowRadius: 4,
    textShadowOffset: {
      width: 2,
      height: 2
    }
  },
  contentSub: {
    color: colors.overlay,
    marginTop: 5,
    fontFamily: fonts.montserrat.semiBold,
    fontSize: 14,
  },

  title: {
    flex: 1,
    maxHeight: 40
  },
  btn: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: colors.primary,
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
  btnText: {
    color: colors.white,
    fontFamily: fonts.montserrat.semiBold,
    fontSize: 14,
    textTransform: 'uppercase'
  },

  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  modalTitle: {
    marginTop: 10,
    fontFamily: fonts.montserrat.normal,
    fontSize: 16
  },
  modalBtnGroup: {
    flexDirection: 'row',
    marginTop: 20
  },
  modalBtn: {
    marginHorizontal: 2,
    padding: 10,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
  },
  modalBtnLeft: {
    backgroundColor: colors.primary,
    marginRight: 5
  },
  modalBtnRight: {
    backgroundColor: colors.danger,
    marginLeft: 5
  }
})

export default styles