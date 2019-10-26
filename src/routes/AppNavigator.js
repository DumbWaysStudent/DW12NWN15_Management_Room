import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

// Screens
import LoginScreen from '../screens/LoginScreen'
import RoomScreen from '../screens/RoomScreen'

const Auth = createStackNavigator({
  Login: { screen: LoginScreen, navigationOptions: {header: null} },
})

const App = createBottomTabNavigator({
  Room: { screen: RoomScreen, navigationOptions: {title: "Rooms"} }
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