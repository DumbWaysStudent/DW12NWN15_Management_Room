import React, { Component } from 'react'
import { Image, View, Text, StatusBar, TouchableOpacity, StyleSheet } from 'react-native'
import Fa from 'react-native-vector-icons/FontAwesome'

import { connect } from 'react-redux'

import Header from '../components/Header'
import colors from '../assets/colors'
import { logout } from '../_redux/_actions/user'
import WeDal from '../components/Modal'
import fonts from '../assets/fonts'

class SettingScreen extends Component {
  constructor() {
    super()
    this.state = {
      modalVisible: false
    }
  }
  
  render() {
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.primaryDarken} />
        <Header title="Setting" />
        
        <View style={styles.body}>
          <View style={styles.imgFrame}>
            <Image style={styles.img} source={this.props.user.data.photo === '' ? require('../assets/images/profile.png') : {uri: this.props.user.data.photo}} />
          </View>
          <View style={styles.content}>
            <Text style={styles.contentTitle}>{this.props.user.data.name}</Text>
            <Text style={styles.contentSub}>{this.props.user.data.email}</Text>
          </View>
          <TouchableOpacity style={styles.btn} onPress={() => this._setModalVisibility(true)}>
            <Text style={styles.btnText}>Log out</Text>
          </TouchableOpacity>
        </View>

        <WeDal 
          visibility={this.state.modalVisible}
          onBackButtonPress={() => this._setModalVisibility(!this.state.modalVisible)}
          onOverlayPress={() => this._setModalVisibility(!this.state.modalVisible)}>

          <View style={styles.modal}>
            <Fa name="sign-out" size={85} />
            <Text style={styles.modalTitle}>Are you sure want to log out?</Text>

            <View style={styles.modalBtnGroup}>
              <TouchableOpacity style={[styles.modalBtn, styles.modalBtnLeft]} onPress={() => this._setModalVisibility(!this.state.modalVisible)}>
                <Fa name="close" color={colors.white} size={22}  /> 
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, styles.modalBtnRight]} onPress={this._doLogout}>
                <Fa name="check" color={colors.white} size={22} /> 
              </TouchableOpacity>
            </View>
          </View>
        </WeDal>
      </View>

    )
  }

  _setModalVisibility = async (visibility) => {
    this.setState({modalVisible: visibility})
  }

  _doLogout = async () => {
    this.props.dispatch(logout())
    this.props.navigation.navigate('Auth')
  }
}

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
    backgroundColor: '#ffffff',
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
    backgroundColor: colors.primaryDarken,
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

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(SettingScreen)