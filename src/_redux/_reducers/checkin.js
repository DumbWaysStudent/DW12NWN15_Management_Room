const initialState = {
  data: [],
  isLoading: true
}

const checkin = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CHECKIN_PENDING':
      return {
        data: action.payload,
        isLoading: true,
        error: false
      }
    case 'GET_CHECKIN':
      return {
        ...action.payload,
        isLoading: true,
        error: false
      }
    case 'GET_CHECKIN_FULFILLED':
        return {
          data: action.payload,
          isLoading: false,
          error: false
        }

    case 'GET_CHECKIN_REJECTED':
      return {
        data: action.payload,
        isLoading: false,
        error: true
      }

    default:
      return state
  }
}

export default checkin