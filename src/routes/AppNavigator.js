import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Fa from 'react-native-vector-icons/FontAwesome5'

// Screens
import LoginScreen from '../screens/LoginScreen'
import RoomScreen from '../screens/RoomScreen'
import CustomerScreen from '../screens/CustomerScreen'
import CheckinScreen from '../screens/CheckinScreen'
import SettingScreen from '../screens/SettingScreen'
import colors from '../assets/colors'
import fonts from '../assets/fonts'

const Auth = createStackNavigator({
  Login: { screen: LoginScreen, navigationOptions: {header: null} },
})

const App = createBottomTabNavigator({
  Checkin: { screen: CheckinScreen, navigationOptions: {title: "Checkin"} },
  Room: { screen: RoomScreen, navigationOptions: {title: "Room"} },
  Customer: { screen: CustomerScreen, navigationOptions: {title: "Customer"} },
  Setting: { screen: SettingScreen, navigationOptions: {title: "Setting"} }
},
{
  defaultNavigationOptions: ({navigation}) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state
      let iconName = ''
      if (routeName === "Checkin") {
        iconName = "check-circle"
      } else if (routeName === "Room") {
        iconName = "dungeon"
      } else if (routeName === "Customer") {
        iconName = "address-card"
      } else if (routeName === "Setting") {
        iconName = "cog"
      }

      return <Fa name={iconName} size={25} color={tintColor} />
    },
  }),
  initialRouteName: 'Room',
  tabBarOptions: {
    keyboardHidesTabBar: true,
    inactiveTintColor: colors.sub,
    activeTintColor: colors.white,
    labelStyle: {
      fontFamily: fonts.montserrat.normal
    },
    style: {
      backgroundColor: colors.primary,
      elevation: 1,
      borderTopColor: 'transparent',
      height: 65,
      paddingVertical: 10,
    }
  }
})

const switchNavigator = createSwitchNavigator(
{
  Auth,
  App,
}, 
{
  initialRouteName: 'Auth'
})

const AppNavigator = createAppContainer(switchNavigator)

export default AppNavigator