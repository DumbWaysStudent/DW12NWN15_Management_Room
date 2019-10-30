const initialState = {
  data: [],
  token: '',
  isLogin: false
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER': 
      return {
        data: action.payload.data,
        token: action.payload.token,
        isLogin: true
      }
    case 'LOGOUT':
      return {
        data: [],
        token: '',
        isLogin: false
      }

    default:
      return state
  }
}

export default user