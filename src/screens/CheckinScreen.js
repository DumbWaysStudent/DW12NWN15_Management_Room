import React, { Component } from 'react'
import { Modal, ScrollView, ActivityIndicator, View, StatusBar, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'

import { connect } from 'react-redux'

import Header from '../components/Header'
import colors from '../assets/colors'
import Axios from 'axios'
import config from '../configs/config'

import { getCheckin } from '../_redux/_actions/checkin'

class CheckinScreen extends Component {
  constructor() {
    super()
    this.state = {
      id: null,
      iName: '',
      eName: '',
      modalVisible: false,
    }
  }
  
  render() {
    console.log(this.props.checkin.data)
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.primaryDarken} />
        <Header title="Checkin" />
        {this.props.checkin.isLoading === true ? (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.body}>
            <View style={styles.listBody}>
              {this.props.checkin.data.map((item) => (
                <TouchableOpacity key={item.id} style={[styles.list, item.orders.length > 0 && (item.orders[0]['is_booked'] === true && styles.booked)]} onPress={() => this._setEModalVisible(true, item.id, item.name)}>
                  <Text style={[styles.listText, item.orders.length > 0 && styles.listTextUnbooked]}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )} 

        <Modal
          animationType="slide"
          transparent={false}
          presentationStyle={styles.modal}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.modal}>
            <View>
              <Text>Checkin</Text>
              <Text>Room Name</Text>
              <View>
                <TextInput
                  onChangeText={val => this.setState({iName: val})}
                  placeholder="Room name"
                  value={this.state.iName}
                />
              </View>

              <TouchableOpacity onPress={() => this._setEModalVisible(!this.state.eModalVisible)}>
                <Text>Cancel</Text>                
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this._editRoom()}>
                <Text>Save</Text>                
              </TouchableOpacity>
            </View>
          </View>
        </Modal>


      </View>
    )
  }

  async componentDidMount() {
    this._getCheckin()
  }

  _getCheckin = async () => {
    await this.props.dispatch(getCheckin(this.props.user.token))
  }

  _setEModalVisible = (visible, id, name) => {
    this.setState({iName: name})
    this.setState({id})
    this.setState({eModalVisible: visible});
  }
  
  _setIModalVisible = (visible) => {
    this.setState({iModalVisible: visible});
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

  modal: {
    flex: 1,
    width: '50%',
    height: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  }
})

const mapStateToProps = (state) => ({
  user: state.user,
  checkin: state.checkin
})

export default connect(mapStateToProps)(CheckinScreen)