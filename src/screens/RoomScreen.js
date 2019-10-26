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
      id: null,
      iName: '',
      eName: '',
      iModalVisible: false,
      eModalVisible: false
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
              <TouchableOpacity key={item.id} style={styles.list} onPress={() => this._setEModalVisible(true, item.id, item.name)}>
                <Text style={styles.listText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => this._setIModalVisible(true)} style={styles.btn}>
              <Text>+</Text>
              <Text style={styles.btnText}>Add room</Text>
            </TouchableOpacity>
          </ScrollView>
        )} 

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
        this._setIModalVisible(!this.state.iModalVisible)
      })
    } catch (error) {
      alert(error)      
    }
  }

  _editRoom = async () => {
    const id = this.state.id
    const name = this.state.iName
    try {
      await Axios.put(config.host.concat(`room/${id}`), {name}, {headers: {'Authorization': `Bearer ${this.props.user.token}`}}).then(() => {
        this.props.dispatch(getRoom(this.props.user.token))
        this._setEModalVisible(!this.state.eModalVisible)
      })
    } catch (error) {
      alert(error)      
    }
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