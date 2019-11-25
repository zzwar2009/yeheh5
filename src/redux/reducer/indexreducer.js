import indexstate from "../state/indexstate";
export default (state=indexstate,action)=>{
    switch(action.type){
        case "UPDATA":
            return {...state,updataInfo:action.updataInfo}
            // return {...state,cardInfo:action.cardInfo}
        case "UPDATA1":
            return {...state,init:action.init}
        // return {...state,cardInfo:action.cardInfo}
        case "UPDATAVALUE":
            return {...state,value:action.value}
        default:
            return state
    }
}