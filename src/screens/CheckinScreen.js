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
      iModalVisible: false,
      eModalVisible: false
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
            {this.props.checkin.data.map((item) => (
              <TouchableOpacity key={item.id} style={[styles.list, item.orders.length > 0 && (item.orders[0]['is_booked'] === true ? styles.booked : styles.unBooked)]} onPress={() => this._setEModalVisible(true, item.id, item.name)}>
                <Text style={[styles.listText, item.orders.length > 0 && styles.listTextUnbooked]}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )} 

        <Modal
          animationType="slide"
          transparent={false}
          presentationStyle={styles.modal}
          visible={this.state.iModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.modal}>
            <View>
              <Text>Add Room</Text>
              <Text>Room Name</Text>
              <View>
                <TextInput
                  onChangeText={val => this.setState({iName: val})}
                  placeholder="Room name"
                />
              </View>

              <TouchableOpacity onPress={() => this._setIModalVisible(!this.state.eModalVisible)}>
                <Text>Cancel</Text>                
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this._addRoom()}>
                <Text>Save</Text>                
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={false}
          presentationStyle={styles.modal}
          visible={this.state.eModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.modal}>
            <View>
              <Text>Edit Room</Text>
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
    flexWrap: "wrap",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 10
  },

  list: {
    flex: 1,
    minHeight: 95,
    minWidth: 95,
    maxHeight: 95,
    maxWidth: 95,
    padding: 10,
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 5,
    borderColor: colors.primaryDarken,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  booked: {
    backgroundColor: colors.primaryDarken
  },
  unBooked: {
    borderColor: colors.sub,
    backgroundColor: colors.sub
  },
  listText: {
    fontSize: 18,
    textAlign: 'center'
  },
  listTextUnbooked: {
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