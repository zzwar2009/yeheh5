import originState from "../state/originState"

export default (state = originState, action) => {
  switch(action.type) {
    case 'SETAPPNAME':
      let apk = 30
      switch (action.value) {
        case '狮桥在线':
          apk = 10
          break
        case '道上':
          apk = 30
          break
        default:
          break
      }
      return {
        appName: action.value,
        apk: apk
      }
    default:
      return state
  }
}