import React, { Component } from 'react'
import { View, StatusBar, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'

import Header from '../components/Header'
import colors from '../assets/colors'

class RoomScreen extends Component {
  render() {
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.primaryDarken} />
        <Header title="Rooms" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary
  }
})

export default RoomScreen