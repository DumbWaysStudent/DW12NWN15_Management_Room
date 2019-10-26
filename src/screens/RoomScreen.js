import React, { Component } from 'react'
import { Modal, ScrollView, ActivityIndicator, View, StatusBar, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'

import { connect } from 'react-redux'

import Header from '../components/Header'
import colors from '../assets/colors'
import { getRoom } from '../_redux/_actions/room'
import Axios from 'axios'
import config from '../configs/config'

class RoomScreen extends Component {
  constructor() {
    super()
    this.state = {
      iName: '',
      modalVisible: false
    }
  }
  
  render() {
    console.log(this.props.room.data)
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.primaryDarken} />
        <Header title="Rooms" />
        {this.props.room.isLoading === true ? (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.body}>
            {this.props.room.data.map((item) => (
              <TouchableOpacity key={item.id} style={styles.list}>
                <Text style={styles.listText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => this._setModalVisible(true)} style={styles.btn}>
              <Text>+</Text>
              <Text style={styles.btnText}>Add room</Text>
            </TouchableOpacity>
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
              <Text>Add Room</Text>
              <Text>Room Name</Text>
              <View>
                <TextInput
                  onChangeText={val => this.setState({iName: val})}
                  placeholder="Room name"
                />
              </View>

              <TouchableOpacity onPress={() => this._setModalVisible(!this.state.modalVisible)}>
                <Text>Cancel</Text>                
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this._addRoom()}>
                <Text>Save</Text>                
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    )
  }

  async componentDidMount() {
    this._getRooms()
  }

  _getRooms = async () => {
    await this.props.dispatch(getRoom(this.props.user.token))
  }

  _addRoom = async () => {
    const name = this.state.iName
    try {
      await Axios.post(config.host.concat(`room`), {name}, {headers: {'Authorization': `Bearer ${this.props.user.token}`}}).then(() => {
        this.props.dispatch(getRoom(this.props.user.token))
        this._setModalVisible(!this.state.modalVisible)
      })
    } catch (error) {
      alert(error)      
    }
  }

  _setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    backgroundColor: colors.white,
    flexWrap: "wrap",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 10
  },

  list: {
    minHeight: 80,
    minWidth: 80,
    borderWidth: 1,
    margin: 10,
    borderBottomColor: colors.primaryDarken,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listText: {
    fontSize: 18
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
  room: state.room
})

export default connect(mapStateToProps)(RoomScreen)