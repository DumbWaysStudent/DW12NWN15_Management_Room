import React from 'react'
import { View, Modal, TouchableOpacity, ScrollView, StyleSheet } from 'react-native' 
import colors from '../assets/colors'

const WeDal = (props) => (
  <Modal
    animationType="fade"
    onRequestClose={props.onBackButtonPress}
    transparent={true}
    visible={props.visibility}
    >
    <ScrollView contentContainerStyle={styles.modalOverlay}>
      <TouchableOpacity style={styles.modalBtnOverlay} onPress={props.onOverlayPress} />
      <View style={styles.modal}>
        {props.children}
      </View>
    </ScrollView>
  </Modal>
)

const styles = StyleSheet.create({
  modalOverlay: {
    minHeight: '100%',
    minWidth: '100%',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.overlay
  },
  modalBtnOverlay: {
    flex: 1,
    minHeight: '100%',
    minWidth: '100%',
    height: '100%',
    position: 'absolute'
  },
  modal: {
    borderRadius: 4,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: colors.white,
    minWidth: '85%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
})

export default WeDal