import React, { Component } from 'react'
import { ActivityIndicator, View, StatusBar, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import axios from 'axios'
import { connect } from 'react-redux'

import { getUser } from '../_redux/_actions/user'

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
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <View style={styles.top}>
          <Text style={styles.title}>WeRoom</Text>
          <Text style={styles.sub}>Room management App</Text>
        </View>

        <View style={styles.bottom}>
          <View style={styles.formGroup}>
            <Text style={styles.lable}>Username</Text>
            <View style={styles.inputBox}>
              <TextInput 
                style={styles.input}
                autoCapitalize="none"
                placeholder="username"
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
                onChangeText={val => this.setState({password: val})}
                secureTextEntry={true}
              />
            </View>
          </View>
          {this.state.isLoading === true ? (
            <ActivityIndicator size="large" color={colors.primary} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary
  },
  top: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 33,
    letterSpacing: 5.6,
    textTransform: 'uppercase',
    color: colors.white
  },
  sub: {
    fontSize: 16,
    color: colors.sub,
    justifyContent: 'center',
    textAlign: 'center'
  },

  bottom: {
    minHeight: '45%',
    backgroundColor: colors.white,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  formGroup: {
    marginVertical: 10
  },
  lable: {
    fontSize: 14, 
  },
  inputBox: {
    borderBottomWidth: 1,
    borderBottomColor: colors.black
  },
  input: {
    paddingVertical: 10,
    fontSize: 14,
  },

  btn: {
    marginTop: 10,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryDarken,
    paddingVertical: 15
  },
  btnText: {
    fontSize: 16,
    textTransform: 'uppercase',
    color: colors.white
  }
})

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(LoginScreen)