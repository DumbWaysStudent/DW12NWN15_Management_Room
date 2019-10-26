const initialState = {
  data: [],
  isLoading: true
}

const checkin = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CHECKIN_PENDING':
      return {
        data: action.payload,
        isLoading: true
      }
    case 'GET_CHECKIN':
      return {
        ...action.payload,
        isLoading: true
      }
    case 'GET_CHECKIN_FULFILLED':
        return {
          data: action.payload,
          isLoading: false
        }

    default:
      return state
  }
}

export default checkin