import React, { Component } from 'react'
import { ScrollView, ToastAndroid, View, StatusBar, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import Fa from 'react-native-vector-icons/FontAwesome'

import { connect } from 'react-redux'

import Header from '../components/Header'
import WeDal from '../components/Modal'
import colors from '../assets/colors'
import { getRoom } from '../_redux/_actions/room'
import { getCheckin } from '../_redux/_actions/checkin'
import Axios from 'axios'
import config from '../configs/config'
import NoConnection from '../components/NoConnection'
import Loading from '../components/Loading'
import fonts from '../assets/fonts'

class RoomScreen extends Component {
  constructor() {
    super()
    this.state = {
      id: null,
      name: '',

      modalVisible: false,
      editMode: false,
      btnDisabled: false
    }
  }
  
  render() {
    console.log(this.props.room.data)
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.primary} />
        <Header title="Room" />
        {this.props.room.isLoading === true ? (
          <Loading />
        ) : this.props.room.error === false ? (
          <ScrollView contentContainerStyle={styles.body}>
            <View style={styles.listBody}>
              {this.props.room.data.map((item) => (
                <TouchableOpacity key={item.id} style={styles.list} onPress={() => this._setModalVisibility(true, {id: item.id, name: item.name})}>
                  <Text style={styles.listText}>{item.name}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity onPress={() => this._setModalVisibility(true)} style={styles.btn}>
                <Fa color={colors.white} name="plus" size={22} />
                <Text style={styles.btnText}>Add room</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : (<NoConnection reload={this._getRooms} />)} 

        <WeDal 
          visibility={this.state.modalVisible} 
          onBackButtonPress={() => this._setModalVisibility(!this.state.modalVisible)}
          onOverlayPress={() => this._setModalVisibility(!this.state.modalVisible)}>
          <Text style={styles.modalTitle}>{this.state.editMode === true ? 'Edit' : 'Add'} Room</Text>
          <View style={styles.formGroup}>
            <Text style={styles.lable}>Room Name</Text>
            <View style={styles.inputBox}>
              <TextInput
                onChangeText={val => this.setState({name: val})}
                style={styles.input}
                placeholder="Room name"
                value={this.state.name}
              />
            </View>

            <View style={styles.modalBtnGroup}>
              <TouchableOpacity style={[styles.modalBtn, styles.btnLeft]} disabled={this.state.btnDisabled === true ? true : false} onPress={() => this._setModalVisibility(!this.state.modalVisible)}>
                <Text style={styles.modalBtnText}>Cancel</Text>                
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, styles.btnRight]} disabled={this.state.btnDisabled === true ? true : false} onPress={this.state.editMode ? this._editRoom : this._addRoom}>
                <Text style={styles.modalBtnText}>Save</Text>                
              </TouchableOpacity>
            </View>
          </View>
        </WeDal>


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
    const name = this.state.name
    this.setState({btnDisabled: true})
    try {
      await Axios.post(config.host.concat(`room`), {name}, {headers: {'Authorization': `Bearer ${this.props.user.token}`}}).then(() => {
        this.props.dispatch(getRoom(this.props.user.token))
        this.props.dispatch(getCheckin(this.props.user.token))
        this._showMessage('Success adding new room!')
        this.setState({btnDisabled: false})
        this._setModalVisibility(!this.state.modalVisible)
      })
    } catch (error) {
      alert(error)      
    }
  }

  _editRoom = async () => {
    const id = this.state.id
    const name = this.state.name
    this.setState({btnDisabled: true})
    try {
      await Axios.put(config.host.concat(`room/${id}`), {name}, {headers: {'Authorization': `Bearer ${this.props.user.token}`}}).then(() => {
        this.props.dispatch(getRoom(this.props.user.token))
        this.props.dispatch(getCheckin(this.props.user.token))
        this._showMessage('Success editing room!')
        this.setState({btnDisabled: false})
        this._setModalVisibility(!this.state.modalVisible)
      })
    } catch (error) {
      alert(error)      
    }
  }

  _setModalVisibility = (visible, data = null) => {
    if(data !== null)
      this.setState({id: data.id, name: data.name, editMode: true})
    else
      this.setState({editMode: false, id: null, name: ''})
    
    this.setState({modalVisible: visible})
  }

  _showMessage = (message = 'no message') => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50,
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
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
    backgroundColor: colors.white,
    minHeight: 93.2,
    minWidth: 93.2,
    borderWidth: 1,
    maxHeight: 93.2,
    maxWidth: 93.2,
    borderColor: colors.sub,
    padding: 10,
    margin: 10,
    borderRadius: 4,
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
  listText: {
    fontFamily: fonts.montserrat.normal,
    fontSize: 18,
    color: colors.black,
    textAlign: 'center'
  },

  btn: {
    flex: 1,
    flexDirection: 'column',
    minHeight: 93.2,
    minWidth: 93.2,
    maxHeight: 93.2,
    maxWidth: 93.2,
    padding: 4,
    borderWidth: 1,
    margin: 5,
    borderColor: colors.primary,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  btnText: {
    fontFamily: fonts.montserrat.semiBold,
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: colors.white
  },

  modalTitle: {
    fontFamily: fonts.montserrat.semiBold,
    fontSize: 26,
    marginBottom: 10
  },
  formGroup: {
    marginVertical: 10
  },
  lable: {
    fontFamily: fonts.montserrat.normal,
    marginBottom: 10
  },
  inputBox: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.sub,
    borderRadius: 4
  },
  input: {
    fontFamily: fonts.montserrat.normal,
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  modalBtnGroup: {
    marginTop: 20,
    marginBottom: 10,
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
    fontFamily: fonts.montserrat.semiBold,
    color: colors.white,
    textTransform: 'uppercase'
  },
})

const mapStateToProps = (state) => ({
  user: state.user,
  room: state.room
})

export default connect(mapStateToProps)(RoomScreen)