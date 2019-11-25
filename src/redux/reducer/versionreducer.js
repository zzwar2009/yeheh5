import versionState from "../state/versionState";
export default (state=versionState,action)=>{
    switch(action.type){
        case "SETVERNUM":
            return {...state,value:action.value}
            // return {...state,cardInfo:action.cardInfo}
        case "SETSYS":
        return {...state,system:action.value}

        default:
            return state
    }
}