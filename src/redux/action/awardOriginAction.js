export default {
    setAppName(appName) {
        return (dispatch) => {
            dispatch({
                type: 'SETAPPNAME',
                value: appName
            })
        }
    }
}