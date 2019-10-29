import React, { Component } from 'react'
import { ToastAndroid, Image, ScrollView, ActivityIndicator, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import Fa from 'react-native-vector-icons/FontAwesome'

import { connect } from 'react-redux'

import Header from '../components/Header'
import colors from '../assets/colors'
import { getCustomer } from '../_redux/_actions/customer'
import Axios from 'axios'
import config from '../configs/config'
import WeDal from '../components/Modal'

class CustomerScreen extends Component {
  constructor() {
    super()
    this.state = {
      id: null,
      name: '',
      identity: '',
      phone: '',
      modalVisible: false,
      editMode: false
    }
  }
  
  render() {
    return(
      <View style={styles.container}>
        <Header title="Customer" />
        {this.props.customer.isLoading === true ? (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.body}>
            {this.props.customer.data.map((item) => (
              <TouchableOpacity key={item.id} onPress={() => this._setModalVisibility(true, {id: item.id, name: item.name, identity: item.identity_number, phone: item.phone})}>
                <View style={styles.customerBox}>
                  <View style={styles.profile}>
                    <Image style={styles.img} source={{uri: item.image}} />
                  </View>
                  <View style={styles.desc}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.sub}>{item.identity_number}</Text>
                    <Text style={styles.sub}>{item.phone}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}

          </ScrollView>
        )}
        <TouchableOpacity style={styles.fab} onPress={() => this._setModalVisibility(true)}>
          <Fa name="plus" size={22} color={colors.white} />
        </TouchableOpacity>

        <WeDal visibility={this.state.modalVisible} onOverlayPress={() => this._setModalVisibility(!this.state.modalVisible)}>
          <View style={styles.modal}>
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
              <TouchableOpacity style={[styles.modalBtn, styles.btnLeft]} onPress={() => this._setModalVisibility(!this.state.modalVisible)}>
                <Text style={styles.modalBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, styles.btnRight]} onPress={this.state.editMode === true ? this._updateCustomer : this._addCustomer}>
                <Text style={styles.modalBtnText}>Save</Text>
              </TouchableOpacity>
            </View>
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
    try {
      await Axios.post(config.host.concat(`customer`), {name, identity_number, phone}, {headers: {'Authorization': `Bearer ${this.props.user.token}`}}).then(() => {
        this._setModalVisibility(!this.state.modalVisible)
        this.props.dispatch(getCustomer(this.props.user.token))
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
    try {
      await Axios.put(config.host.concat(`customer/${id}`), {name, identity_number, phone}, {headers: {'Authorization': `Bearer ${this.props.user.token}`}}).then(() => {
        this._setModalVisibility(!this.state.modalVisible)
        this.props.dispatch(getCustomer(this.props.user.token))
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  body: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  customerBox: {
    borderWidth: 2,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginBottom: 10,
    backgroundColor: "#ffffff",
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  profile: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
    marginRight: 10,
    overflow: 'hidden',
    backgroundColor: colors.sub
  },
  img: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2
  },

  desc: {
    flex: 1,
    color: colors.black,
    justifyContent: 'space-around'
  },
  title: {
    fontSize: 18,
    color: colors.black
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
  input: {
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
    color: colors.white,
    textTransform: 'uppercase'
  },
})

const mapStateToProps = (state) => ({
  user: state.user,
  customer: state.customer
})

export default connect(mapStateToProps)(CustomerScreen)