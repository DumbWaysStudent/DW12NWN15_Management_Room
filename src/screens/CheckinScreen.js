import React, { Component } from 'react'
import { ScrollView, ToastAndroid, Picker, ActivityIndicator, View, StatusBar, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import WeDal from '../components/Modal'
import moment from 'moment'

import { connect } from 'react-redux'

import Header from '../components/Header'
import colors from '../assets/colors'
import Axios from 'axios'
import config from '../configs/config'

import { getCheckin } from '../_redux/_actions/checkin'
import { getCustomer } from '../_redux/_actions/customer'

class CheckinScreen extends Component {
  constructor() {
    super()
    this.state = {
      orderId: null,
      room: '',
      roomId: null,
      customerId: 1,
      duration: 10,
      endTime: null,
      checkout: false,

      firstLoad: true,
      modalVisible: false,
      timerVisible: false
    }
  }
  
  render() {
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.primaryDarken} />
        <Header title="Checkin" />
        {(this.props.checkin.isLoading === true) ? (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.body}>
            <View style={styles.listBody}>
              {this.props.checkin.data.map((item) => (
                <TouchableOpacity 
                  key={item.id} 
                  style={[styles.list, item.customers.length > 0 && (item.customers[0].orders.is_booked === true && styles.booked)]} 
                  onPress={() => this._setModalVisible(true, {id : item.id, name : item.name, isBooked : (item.customers.length > 0 && (item.customers[0].orders.is_booked === true) ? true : false), orderId: (item.customers.length > 0 ? item.customers[0].orders.id : 0), customerId: (item.customers.length > 0 ? item.customers[0].id : 0), endTime: item.customers.length > 0 ? item.customers[0].orders.order_end_time : null})}
                  onLongPress={() => this._setTimerVisible(true, {isBooked: item.customers.length > 0 && (item.customers[0].orders.is_booked === true) ? true : false, duration: item.customers.length > 0 ? item.customers[0].orders.duration : this.state.duration, endTime: item.customers.length > 0 ? item.customers[0].orders.order_end_time : null })}                  
                  >
                  <Text style={[styles.listText, item.customers.length > 0 && styles.listTextUnbooked]}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )} 

        <WeDal 
          visibility={this.state.modalVisible} 
          onBackButtonPress={() => this._setModalVisible(!this.state.modalVisible)}
          onOverlayPress={() => this._setModalVisible(!this.state.modalVisible)}>
          <Text style={styles.modalTitle}>{this.state.checkout === true ? 'Checkout' : 'Checkin'}</Text>

          <View style={styles.formGroup}>
            <Text style={styles.lable}>Room Name</Text>
            <View style={[styles.inputBox, styles.inputBoxDisabled]}>
              <TextInput 
                placeholder="Room Name"
                editable={false}
                style={styles.input}
                value={this.state.room}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.lable}>Customer</Text>
            <View style={styles.inputBox}>
              {this.props.customer.isLoading === true ? (
                <ActivityIndicator size="large" color={colors.primary} />
              ) : (
                <Picker selectedValue={this.state.customerId} style={styles.picker} enabled={this.state.checkout === true ? false : true} onValueChange={customerId => {
                  this.setState({customerId})
                }}>
                  {this.props.customer.data.map(item => (
                    <Picker.Item key={item.id} label={`${item.name} - ${item.phone}`} value={item.id} />
                  ))}
                </Picker>
              )}
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.lable}>Duration (Minutes)</Text>
            <View style={[styles.inputBox, this.state.checkout && styles.inputBoxDisabled]}>
              <TextInput 
                keyboardType="numeric"
                placeholder="10"
                editable={this.state.checkout === true ? false : true}
                onChangeText={duration => this.setState({duration})}
                style={styles.input}
                value={this.state.duration.toString()}
              />
            </View>
          </View>
          
          <View style={styles.modalBtnGroup}>
            <TouchableOpacity style={[styles.modalBtn, styles.btnLeft]} onPress={() => this._setModalVisible(!this.state.modalVisible)}>
              <Text style={styles.modalBtnText}>Cancel</Text>                
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalBtn, styles.btnRight]} onPress={this.state.checkout === true ? this._doCheckout : this._doCheckin }>
              <Text style={styles.modalBtnText}>{this.state.checkout === true ? 'Checkout' : 'Save'}</Text>                
            </TouchableOpacity>
          </View>
        </WeDal>

        <WeDal 
          visibility={this.state.timerVisible} 
          onOverlayPress={() => this._setTimerVisible(!this.state.timerVisible)}
          onBackButtonPress={() => this._setTimerVisible(!this.state.timerVisible)}>

          <Text style={styles.durationTitle}>Time left</Text>
          <View style={styles.timerBody}>
            {/* <Text>{moment(this.state.endTime).diff(new Date()).minutes()}</Text> */}
            {moment(this.state.endTime).diff(moment(new Date()), 'hours') > 0 && (
              <View style={styles.timeContent}>
                <Text style={styles.time}>{moment(this.state.endTime).diff(moment(new Date()), 'hours')}</Text>
                <Text style={styles.timeLeft}>Hour(s) left</Text>
              </View>
            )}
            {moment(this.state.endTime).diff(moment(new Date()), 'minutes') <= 60 && (
              <View style={styles.timeContent}>
                <Text style={styles.time}>{moment(this.state.endTime).diff(moment(new Date()), 'minutes')}</Text>
                <Text style={styles.timeLeft}>Minute(s) left</Text>
              </View>
            )}
          </View>
        </WeDal>
      </View>
    )
  }

  async componentDidMount() {
    this._getData()
  }

  _doCheckin = async () => {
    const room_id = this.state.roomId
    const customer_id = this.state.customerId
    const duration = this.state.duration
    
    try {
      await Axios.post(config.host.concat(`checkin`), {room_id, customer_id, duration}, {headers: {'Authorization': `Bearer ${this.props.user.token}`}}).then(() => {
        this._setModalVisible(!this.state.modalVisible)
        this._getData()
        this._showMessage('Checkin success!')
      })
    } catch (error) {
      alert(error)      
    }
    this._setModalVisible(false)
  }

  _doCheckout = async () => {
    const id = this.state.orderId

    try {
      await Axios.put(config.host.concat(`order/${id}`), { id }, {headers: {'Authorization': `Bearer ${this.props.user.token}`}}).then(() => {
        this._setModalVisible(!this.state.modalVisible)
        this._getData()
        this._showMessage('Checkout success!')
      })
    } catch (error) {
      alert(error)      
    }
    this._setModalVisible(false)
  }

  _timedCheckout = async ( id ) => {
    try {
      await Axios.put(config.host.concat(`order/${id}`), { id }, {headers: {'Authorization': `Bearer ${this.props.user.token}`}}).then(() => {
        this._getData()
      })
    } catch (error) {
      alert(error)      
    }
  }

  _getData = async () => {
    await this.props.dispatch(getCheckin(this.props.user.token))
    await this.props.dispatch(getCustomer(this.props.user.token))
    this.timer()
  }

  _setModalVisible = (visible, data = null) => {
    if(data !== null) {
      if(data.isBooked === true) {
        const duration = moment(data.endTime).diff(moment(new Date()), 'minutes')
        this.setState({checkout: true, duration: duration, orderId: data.orderId, customerId: data.customerId})
      }
      else
        this.setState({checkout: false, duration: 10})

      this.setState({roomId: data.id, room: data.name})
    }
    this.setState({modalVisible: visible});
  }

  _setTimerVisible = (visible, data = null) => {
    if(data !== null)
      if(data.isBooked === true)
        this.setState({ duration: data.duration, endTime: data.endTime, checkout: true })
      else
        this.setState({ duration: data.duration, checkout: false })

    if(this.state.checkout === true)
      this.setState({timerVisible: visible})
  }

  _showMessage = (message = 'no message') => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    )
  }

  timer = async () => {
    if(this.props.checkin.isLoading === false && this.state.firstLoad === true) {
      this.setState({firstLoad: false})
      this.props.checkin.data.map((item) => {
        if(item.customers.length > 0) {
          const time = setInterval(() => {
            const endTime = item.customers[0].orders.order_end_time
            const duration = moment(endTime).diff(moment(new Date()), 'minutes')      
            if(duration < 0) {
              this._showMessage(`Timeout for checkout of customer ${item.customers[0].name} at room ${item.name}`)
              this._timedCheckout(item.customers[0].orders.id)
              clearInterval(time)
            }
          }, 1000)
        }
      })
    } else if(this.props.checkin.isLoading === false) {
      this.setState({firstLoad: true})
    }
  }
}

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
    borderWidth: 1,
    margin: 10,
    borderColor: colors.primaryDarken,
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
    backgroundColor: colors.primaryDarken
  },
  listText: {
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
    fontSize: 18
  },

  modalTitle: {
    fontSize: 26,
    marginBottom: 10
  },
  formGroup: {
    marginVertical: 10
  },
  lable: {
    marginBottom: 10
  },
  inputBox: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.sub,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,

    elevation: 1,
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
    color: colors.white,
    textTransform: 'uppercase'
  },

  input: {
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  
  picker: {
    height: 40
  },

  durationTitle: {
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
    fontSize: 28
  },
  timeLeft: {
    fontSize: 14
  }
})

const mapStateToProps = (state) => ({
  user: state.user,
  checkin: state.checkin,
  customer: state.customer
})

export default connect(mapStateToProps)(CheckinScreen)