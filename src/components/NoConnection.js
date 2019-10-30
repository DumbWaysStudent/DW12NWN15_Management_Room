import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native' 
import colors from '../assets/colors'
import fonts from '../assets/fonts'

const NoConnection = (props) => (
  <View style={styles.container}>
    <Image source={require('../assets/images/noConnection.png')} style={styles.img} resizeMode="contain" />
    <Text style={styles.title}>Connection Failed</Text>
    <TouchableOpacity onPress={props.reload}>
      <Text style={styles.try}>Try Again</Text>
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    height: 150,
    width: 250,
  },
  title: {
    marginBottom: 10,
    fontSize: 28,
    color: colors.black,
    textAlign: 'center',
    textTransform: 'capitalize',
    fontFamily: fonts.montserratAlt.normal
  },
  try: {
    fontFamily: fonts.montserratAlt.normal,
    fontSize: 14,
    color: colors.black,
  }
})

export default NoConnection