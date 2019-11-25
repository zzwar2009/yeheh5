import awardIndex from '../state/awardIndexState';
export default (state=awardIndex,action)=>{
    switch (action.type) {
        case 'UPDATA':{
            return {...state,updataInfo:action.updataInfo}
        }
        case 'UPDATA1':{
            return {...state,init:action.init}
        }
        case 'UPDATAVALUE':{
            return {...state,value:action.value}
        }
        default:
            return state;
    }
}