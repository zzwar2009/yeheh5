import axios from 'axios';
import URLPath from '../../config/URLPath';
export default {
    updataUser (params,callback=()=>{}){
        return (dispatch) =>{
            axios.get(URLPath.yunshiIP+'/PhoneCsmHandler.ashx',{
                params:Object.assign(params,{mt:50060})
            }).then(res =>{
                dispatch({
                    type:"UPDATA",
                    updataInfo:res.data.data
                })
                callback(res);
            })
        }
    },
    updata1(params){

        return (dispatch)=>{
            dispatch({
                type:"UPDATA1",
                init:params
            })
        }
    },
    upcbsvalue(params){

        return (dispatch)=>{
            dispatch({
                type:"UPDATAVALUE",
                value:params
            })


        }
    },
}