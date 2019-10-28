import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Fa from 'react-native-vector-icons/FontAwesome'

// Screens
import LoginScreen from '../screens/LoginScreen'
import RoomScreen from '../screens/RoomScreen'
import CustomerScreen from '../screens/CustomerScreen'
import CheckinScreen from '../screens/CheckinScreen'
import colors from '../assets/colors'

const Auth = createStackNavigator({
  Login: { screen: LoginScreen, navigationOptions: {header: null} },
})

const App = createBottomTabNavigator({
  Checkin: { screen: CheckinScreen, navigationOptions: {title: "Checkin"} },
  Room: { screen: RoomScreen, navigationOptions: {title: "Room"} },
  Customer: { screen: CustomerScreen, navigationOptions: {title: "Customer"} }
},
{
  defaultNavigationOptions: ({navigation}) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state
      let iconName = ''
      if (routeName === "Checkin") {
        iconName = "check-circle"
      } else if (routeName === "Room") {
        iconName = "bed"
      } else if (routeName === "Customer") {
        iconName = "id-card-o"
      }

      return <Fa name={iconName} size={25} color={tintColor} />
    },
  }),
  initialRouteName: 'Room',
  tabBarOptions: {
    inactiveTintColor: colors.sub,
    activeTintColor: colors.white,
    tabStyle: {
      backgroundColor: colors.primaryDarken,
    },
    style: {
      backgroundColor: colors.primaryDarken,
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