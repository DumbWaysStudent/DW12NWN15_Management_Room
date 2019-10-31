import React from 'react'
import { View, Text, StyleSheet } from 'react-native' 
import colors from '../assets/colors'
import fonts from '../assets/fonts'

const Header = (props) => (
  <View style={styles.container}>
    <Text style={styles.title}>{props.title}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    height: 65,
    paddingVertical: 10,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    elevation: 2,
  },
  title: {
    fontFamily: fonts.montserrat.semiBold,
    fontSize: 22,
    color: colors.white,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2
  }
})

export default Header