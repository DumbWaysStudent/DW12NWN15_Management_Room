import React, { Component } from 'react'
import { ToastAndroid, Image, ScrollView, ImageBackground, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import Fa from 'react-native-vector-icons/FontAwesome'
import styles from '../assets/styles/customerScreenStyle'

import { connect } from 'react-redux'

import Header from '../components/Header'
import colors from '../assets/colors'
import { getCustomer } from '../_redux/_actions/customer'
import { getCheckin } from '../_redux/_actions/checkin'
import Axios from 'axios'
import config from '../configs/config'
import WeDal from '../components/Modal'
import Loading from '../components/Loading'
import NoConnection from '../components/NoConnection'

class CustomerScreen extends Component {
  constructor() {
    super()
    this.state = {
      id: null,
      name: '',
      identity: '',
      phone: '',

      modalVisible: false,
      editMode: false,
      btnDisabled: false
    }
  }
  
  render() {
    return(
      <View style={styles.container}>
        <Header title="Customer" />
        {this.props.customer.isLoading === true ? (
          <Loading />
        ) : this.props.customer.error === false ? (
          <ScrollView contentContainerStyle={styles.body}>
            {this.props.customer.data.map((item) => (
              <TouchableOpacity key={item.id} onPress={() => this._setModalVisibility(true, {id: item.id, name: item.name, identity: item.identity_number, phone: item.phone})}>
                <ImageBackground source={require('../assets/images/card.png')} imageStyle={styles.cardImg} resizeMode="cover" style={styles.customerBox}>
                  <View style={styles.profile}>
                    <Image style={styles.img} source={item.image === '' || item.image === null ? require('../assets/images/profile.png') : {uri: item.image}} />
                  </View>
                  <View style={styles.desc}>
                    <View style={styles.descTop}>
                      <Text style={styles.title}>{item.name}</Text>
                    </View>
                    <View style={styles.descBottom}>
                      <View style={styles.row}>
                        <Text style={[styles.sub, {flex: 1}]}>Identity:</Text>
                        <Text style={[styles.sub, {flex: 2}]}>{item.identity_number}</Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={[styles.sub, {flex: 1}]}>Phone:</Text>
                        <Text style={[styles.sub, {flex: 2}]}>{item.phone}</Text>
                      </View>
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}

          </ScrollView>
        ) : (<NoConnection reload={this._getCustomer} />)}
        <TouchableOpacity style={styles.fab} onPress={() => this._setModalVisibility(true)}>
          <Fa name="plus" size={22} color={colors.white} />
        </TouchableOpacity>

        <WeDal 
          visibility={this.state.modalVisible} 
          onBackButtonPress={() => this._setModalVisibility(!this.state.modalVisible)}
          onOverlayPress={() => this._setModalVisibility(!this.state.modalVisible)}>
          <Text style={styles.modalTitle}>{ this.state.editMode === true  ? 'Edit' : 'Add'} Customer</Text>
          <View style={styles.formGroup}>
            <Text style={styles.lable}>Name</Text>
            <View style={styles.inputBox}>
              <TextInput 
                placeholder="Name"
                style={styles.input}
                onChangeText={name => this.setState({name})}
                value={this.state.name}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.lable}>Identity Number</Text>
            <View style={styles.inputBox}>
              <TextInput 
                placeholder="Identity number"
                style={styles.input}
                onChangeText={identity => this.setState({identity})}
                value={this.state.identity}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.lable}>Phone Number</Text>
            <View style={styles.inputBox}>
              <TextInput 
                placeholder="Phone"
                style={styles.input}
                onChangeText={phone => this.setState({phone})}
                value={this.state.phone}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.lable}>Camera</Text>
            <TouchableOpacity style={{marginLeft: 10}}>
              <Fa name="camera" size={22} />
            </TouchableOpacity>
          </View>

          <View style={styles.modalBtnGroup}>
            <TouchableOpacity style={[styles.modalBtn, styles.btnLeft]} disabled={this.state.btnDisabled === true ? true : false} onPress={() => this._setModalVisibility(!this.state.modalVisible)}>
              <Text style={styles.modalBtnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalBtn, styles.btnRight]} disabled={this.state.btnDisabled === true ? true : false} onPress={this.state.editMode === true ? this._updateCustomer : this._addCustomer}>
              <Text style={styles.modalBtnText}>Save</Text>
            </TouchableOpacity>
          </View>
        </WeDal>
      </View>
    )
  }

  async componentDidMount() {
    this._getCustomer()
  }

  _getCustomer = async () => {
    await this.props.dispatch(getCustomer(this.props.user.token))
  }

  _addCustomer = async () => {
    const name = this.state.name
    const identity_number = this.state.identity
    const phone = this.state.phone

    this.setState({btnDisabled: true})

    try {
      await Axios.post(config.host.concat(`customer`), {name, identity_number, phone}, {headers: {'Authorization': `Bearer ${this.props.user.token}`}}).then(() => {
        this._setModalVisibility(!this.state.modalVisible)
        this.props.dispatch(getCustomer(this.props.user.token))
        this.props.dispatch(getCheckin(this.props.user.token))
        this.setState({btnDisabled: false})
        this._showMessage('Successfully recorded!')
      })
    } catch (error) {
      alert(error)      
    }
  }

  _updateCustomer = async () => {
    const id = this.state.id
    const name = this.state.name
    const identity_number = this.state.identity
    const phone = this.state.phone

    this.setState({btnDisabled: true})

    try {
      await Axios.put(config.host.concat(`customer/${id}`), {name, identity_number, phone}, {headers: {'Authorization': `Bearer ${this.props.user.token}`}}).then(() => {
        this._setModalVisibility(!this.state.modalVisible)
        this.props.dispatch(getCustomer(this.props.user.token))
        this.props.dispatch(getCheckin(this.props.user.token))
        this.setState({btnDisabled: false})
        this._showMessage('Successfully updated!')
      })
    } catch (error) {
      alert(error)      
    }
  }

  _setModalVisibility = (visible, data = null) => {
    if(data !== null)
      this.setState({editMode: true, id: data.id, name: data.name, identity: data.identity, phone: data.phone})
    else 
      this.setState({editMode: false, id: '', name: '', identity: '', phone: ''})

    this.setState({modalVisible: visible})
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
}

const mapStateToProps = (state) => ({
  user: state.user,
  customer: state.customer
})

export default connect(mapStateToProps)(CustomerScreen)