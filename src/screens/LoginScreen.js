import React, { Component } from 'react'
import { ActivityIndicator, ToastAndroid, Image, View, StatusBar, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import axios from 'axios'
import { connect } from 'react-redux'

import { getUser } from '../_redux/_actions/user'

import styles from '../assets/styles/loginScreenStyle'
import colors from '../assets/colors'
import configs from '../configs/config'

class LoginScreen extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      isLoading: false
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
        <View style={styles.top}>
          <Image source={require('../assets/images/logo.png')} resizeMode="contain" style={{width: 250, height: 250}} />
        </View>

        <View style={styles.bottom}>
          <View style={styles.formGroup}>
            <Text style={styles.lable}>Username</Text>
            <View style={styles.inputBox}>
              <TextInput 
                style={styles.input}
                autoCapitalize="none"
                placeholder="username"
                editable={this.state.isLoading === true ? false : true}
                placeholderTextColor={colors.sub}
                onChangeText={val => this.setState({username: val})}
              />
            </View>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.lable}>Password</Text>
            <View style={styles.inputBox}>
              <TextInput 
                style={styles.input}
                autoCapitalize="none"
                placeholder="password"
                editable={this.state.isLoading === true ? false : true}
                placeholderTextColor={colors.sub}
                onChangeText={val => this.setState({password: val})}
                secureTextEntry={true}
              />
            </View>
          </View>
          {this.state.isLoading === true ? (
            <ActivityIndicator size="large" color={colors.white} style={{marginTop: 25}} />
          ) : (
            <TouchableOpacity style={styles.btn} onPress={this._handleLogin}>
              <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    )
  }

  _handleLogin = () => {
    const { username, password } = this.state
    this.setState({isLoading: true})

    if(username === '' || password === '') {
      ToastAndroid.showWithGravityAndOffset(
        'Username / Password cannot be empty!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      )
      this.setState({isLoading: false})
    } else {
      try {
        axios.post(configs.host.concat('login'), {username, password})
        .then(res => {
          if(typeof res.data.token !== 'undefined') {
            if(res.data.error === true) {
              alert('Wrong username/password!')
            } else {
              this.props.dispatch(getUser(res.data))
              this.setState({isLoading: false})
              this.props.navigation.navigate('Room')
            }
          } else {
            alert('Wrong username/password!')
            this.setState({isLoading: false})
          }
        }).catch((error) => {
          alert(error)
          this.setState({isLoading: false})
        })
      } catch (error) {
        alert(error)
      }
    }
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(LoginScreen)