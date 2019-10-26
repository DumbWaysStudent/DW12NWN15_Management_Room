import React from 'react'
import { Provider } from 'react-redux'
import store from './src/_redux/store'
import AppNavigator from './src/routes/AppNavigator'

class App extends React.Component {
  render() {
    return(
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    )
  }
}

export default App;
