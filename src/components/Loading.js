import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native' 
import colors from '../assets/colors'
import fonts from '../assets/fonts'

const Loading = () => (
  <View style={styles.container}>
    <Image source={require('../assets/images/rave.gif')} style={styles.img} resizeMode="contain" />
    <Text style={styles.title}>Loading..</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    height: 250,
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

export default Loading