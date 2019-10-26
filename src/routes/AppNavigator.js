import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

// Screens
import LoginScreen from '../screens/LoginScreen'
import RoomScreen from '../screens/RoomScreen'
import CustomerScreen from '../screens/CustomerScreen'
import CheckinScreen from '../screens/CheckinScreen'

const Auth = createStackNavigator({
  Login: { screen: LoginScreen, navigationOptions: {header: null} },
})

const App = createBottomTabNavigator({
  Checkin: { screen: CheckinScreen, navigationOptions: {title: "Checkin"} },
  Room: { screen: RoomScreen, navigationOptions: {title: "Room"} },
  Customer: { screen: CustomerScreen, navigationOptions: {title: "Customer"} }
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