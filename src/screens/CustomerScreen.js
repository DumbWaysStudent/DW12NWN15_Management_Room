import React, { Component } from 'react'
import { Modal, Image, ScrollView, ActivityIndicator, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import Fa from 'react-native-vector-icons/FontAwesome'

import { connect } from 'react-redux'

import Header from '../components/Header'
import colors from '../assets/colors'
import { getCustomer } from '../_redux/_actions/customer'
import Axios from 'axios'
import config from '../configs/config'

class CustomerScreen extends Component {
  constructor() {
    super()
    this.state = {
      id: null,
      iName: '',
      iDentity: '',
      iPhone: '',
      iModalVisible: false,
      eModalVisible: false
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
              <TouchableOpacity key={item.id} onPress={() => this._setEModalVisibility(true, item.id, item.name, item.identity_number, item.phone)}>
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
        <TouchableOpacity style={styles.fab} onPress={() => this._setIModalVisibility(true)}>
          <Fa name="plus" size={22} color={colors.white} />
        </TouchableOpacity>

        {/* Modal input */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.iModalVisible}
        >
          <View style={styles.modal}>
            <Text>Add Customer</Text>
            <View>
              <Text>Name*</Text>
              <View>
                <TextInput 
                  placeholder="Name"
                  onChangeText={val => this.setState({iName: val})}
                />
              </View>
            </View>

            <View>
              <Text>Identity Number*</Text>
              <View>
                <TextInput 
                  placeholder="Identity number"
                  onChangeText={val => this.setState({iDentity: val})}
                />
              </View>
            </View>

            <View>
              <Text>Phone Number*</Text>
              <View>
                <TextInput 
                  placeholder="Phone"
                  onChangeText={val => this.setState({iPhone: val})}
                />
              </View>
            </View>

            <View>
              <Text>Phone Number*</Text>
              <Text>*Camera Icon*</Text>
            </View>

            <View>
              <TouchableOpacity onPress={() => this._setIModalVisibility(!this.state.iModalVisible)}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._addCustomer}>
                <Text>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal edit */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.eModalVisible}
        >
          <View style={styles.modal}>
            <Text>Edit Customer</Text>
            <View>
              <Text>Name*</Text>
              <View>
                <TextInput 
                  placeholder="Name"
                  onChangeText={val => this.setState({iName: val})}
                  value={this.state.iName}
                />
              </View>
            </View>

            <View>
              <Text>Identity Number*</Text>
              <View>
                <TextInput 
                  placeholder="Identity number"
                  onChangeText={val => this.setState({iDentity: val})}
                  value={this.state.iDentity}
                />
              </View>
            </View>

            <View>
              <Text>Phone Number*</Text>
              <View>
                <TextInput 
                  placeholder="Phone"
                  onChangeText={val => this.setState({iPhone: val})}
                  value={this.state.iPhone}
                />
              </View>
            </View>

            <View>
              <Text>Phone Number*</Text>
              <Text>*Camera Icon*</Text>
            </View>

            <View>
              <TouchableOpacity onPress={() => this._setEModalVisibility(!this.state.eModalVisible)}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._updateCustomer}>
                <Text>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    const name = this.state.iName
    const identity_number = this.state.iDentity
    const phone = this.state.iPhone
    try {
      await Axios.post(config.host.concat(`customer`), {name, identity_number, phone}, {headers: {'Authorization': `Bearer ${this.props.user.token}`}}).then(() => {
        this._setIModalVisibility(!this.state.iModalVisible)
        this.props.dispatch(getCustomer(this.props.user.token))
      })
    } catch (error) {
      alert(error)      
    }
  }

  _updateCustomer = async () => {
    const id = this.state.id
    const name = this.state.iName
    const identity_number = this.state.iDentity
    const phone = this.state.iPhone
    try {
      await Axios.put(config.host.concat(`customer/${id}`), {name, identity_number, phone}, {headers: {'Authorization': `Bearer ${this.props.user.token}`}}).then(() => {
        this._setEModalVisibility(!this.state.eModalVisible)
        this.props.dispatch(getCustomer(this.props.user.token))
      })
    } catch (error) {
      alert(error)      
    }
  }

  _setIModalVisibility = (visible) => {
    this.setState({iModalVisible: visible})
  }

  _setEModalVisibility = (visible, id, iName, iDentity, iPhone) => {
    this.setState({id, iName, iDentity, iPhone})
    this.setState({eModalVisible: visible})
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  body: {
    backgroundColor: colors.white,
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
  }
})

const mapStateToProps = (state) => ({
  user: state.user,
  customer: state.customer
})

export default connect(mapStateToProps)(CustomerScreen)