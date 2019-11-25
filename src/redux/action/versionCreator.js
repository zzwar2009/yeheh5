export default {
  setVersionNumber(number) {
    return (dispatch) => {
      dispatch({
        type: 'SETVERNUM',
        value: number
      })
    }
  },
  setSystem(number) {
    return (dispatch) => {
      dispatch({
        type: 'SETSYS',
        value: number
      })
    }
  }
}