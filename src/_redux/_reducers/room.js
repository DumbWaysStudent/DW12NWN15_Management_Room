const initialState = {
  data: [],
  isLoading: true
}

const room = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ROOM_PENDING':
      return {
        data: action.payload,
        isLoading: true
      }
    case 'GET_ROOM':
      return {
        ...action.payload,
        isLoading: true
      }
    case 'GET_ROOM_FULFILLED':
        return {
          data: action.payload,
          isLoading: false
        }

    default:
      return state
  }
}

export default room