import React, { Component } from 'react'
import { Image, View, Text, StatusBar, TouchableOpacity, StyleSheet } from 'react-native'
import Fa from 'react-native-vector-icons/FontAwesome'
import styles from '../assets/styles/settingScreenStyle'

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
        <StatusBar backgroundColor={colors.primary} />
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

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(SettingScreen)