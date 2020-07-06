const initialState = {
  loading: false,
  data: [],
  error: ''
}

const covidReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_COVID_REQUEST':
      return {
        ...state,
        loading: true
      }
    case 'FETCH_COVID_SUCCESS':
      return {
        loading: false,
        data: action.payload,
        error: ''
      }
    case 'FETCH_COVID_FAILURE':
      return {
        loading: false,
        data: [],
        error: action.payload
      }
    default: return state
  }
}

export default covidReducer
