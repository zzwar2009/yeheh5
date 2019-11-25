const initialState = {
    lat:'',// 维度
    lng:'' // 经度
};
export default (state = initialState, action) => {
    switch (action.type) {
        case "getgeo":
            return { ...state, ...action.payload };
        case "setgeo": {
            return { ...state, ...action.payload };
        }
        default:
        return state;
    }
};
  