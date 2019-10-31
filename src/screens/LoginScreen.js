import React, { Component } from 'react'
import { ActivityIndicator, ToastAndroid, Image, View, StatusBar, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import axios from 'axios'
import { connect } from 'react-redux'

import { getUser } from '../_redux/_actions/user'

import colors from '../assets/colors'
import fonts from '../assets/fonts'
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
    // backgroundColor: colors.white,
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

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(LoginScreen)