import axios from 'axios'

// https://documenter.getpostman.com/view/10808728/SzS8rjbc?version=latest
const API = 'https://api.covid19api.com/summary'

export const fetchCovid = () => {
  return (dispatch) => {
    dispatch(fetchCovidRequest())
    axios
      .get(API)
      .then(response => {
        const covid = response.data
        setTimeout(() => {  // to emulate some network delay
          dispatch(fetchCovidSuccess(covid))
        }, 2000)
      })
      .catch(error => {
        dispatch(fetchCovidFailure(error.message))
      })
  }
}

export const fetchCovidRequest = () => {
  return {
    type: 'FETCH_COVID_REQUEST'
  }
}

export const fetchCovidSuccess = covid => {
  return {
    type: 'FETCH_COVID_SUCCESS',
    payload: covid
  }
}

export const fetchCovidFailure = error => {
  return {
    type: 'FETCH_COVID_FAILURE',
    payload: error
  }
}
