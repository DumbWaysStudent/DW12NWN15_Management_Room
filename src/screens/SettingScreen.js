import React, { Component } from 'react'
import { Image, View, Text, StatusBar, TouchableOpacity, StyleSheet } from 'react-native'
import Fa from 'react-native-vector-icons/FontAwesome'

import { connect } from 'react-redux'

import Header from '../components/Header'
import colors from '../assets/colors'
import { logout } from '../_redux/_actions/user'
import WeDal from '../components/Modal'

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
          <Image style={styles.img} source={{uri: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/00/00d8f5cda3cd1279af30b1748dbc5ff295ead40c.jpg'}} />
          <View style={styles.content}>
            <View style={styles.title}>
              <Text style={styles.text}>{this.props.user.username}</Text>
            </View>
            <TouchableOpacity style={styles.btn} onPress={() => this._setModalVisibility(true)}>
              <Text style={styles.btnText}>Log out</Text>
            </TouchableOpacity>
          </View>
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 10,
  },
  img: {
    width: 100, 
    height: 100,
    borderRadius: 50
  },

  content: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'space-between'
  },
  text: {
    textTransform: 'capitalize',
    fontSize: 22,
  },

  title: {
    flex: 1,
    maxHeight: 40
  },
  btn: {
    flex: 1,
    maxHeight: 45,
    borderRadius: 4,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    fontSize: 16,
    textTransform: 'uppercase',
    color: colors.white
  },

  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  modalTitle: {
    marginTop: 10,
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