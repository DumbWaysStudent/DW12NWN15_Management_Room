const initialState = {
  data: [],
  isLoading: true,
  error: false
}

const room = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ROOM_PENDING':
      return {
        data: action.payload,
        isLoading: true,
        error: false
      }
    case 'GET_ROOM':
      return {
        ...action.payload,
        isLoading: true,
        error: false
      }
    case 'GET_ROOM_FULFILLED':
      return {
        data: action.payload,
        isLoading: false,
        error: false
      }
      
    case 'GET_ROOM_REJECTED':
      return {
        ...action.payload,
        isLoading: false,
        error: true
      }

    default:
      return state
  }
}

export default room