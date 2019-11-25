const H5 = 'H5';
const IOS = 'IOS';
const ANDROID = 'ANDROID';
const SQZX = 'sqzx';
const DS = 'ds';
const SQZX_CHINESE_NAME = '狮桥在线';
const DS_CHINESE_NAME = '道上';
const H5_CHINESE_NAME = '网页H5';

const parseParams = (str) => {
    let params = {}
    str = str.replace('?', '')
        str = str.split('&')
        for (let i in str) {
            let dict = str[i].split('=')
            if (dict.length > 1) {
                params[dict[0]] = dict[1]
            }
        }

        return params
}

const checkField = (fn,text)  => (rule,value,callback) => {
    var newFn = typeof fn != 'function' ? fn.test : fn;
    try{
        if(!newFn.call(fn,value)){
            callback(text)
        }else{
            callback()
        }
    }catch(e){
        console.log(e)
    }
    
}

const getEnv = () =>{
    //在这里可以获取一下环境 是h5 还是app ，具体是哪个app
    let env = {
        system:H5,
        appName:H5,
        appId:'',
        appVer:'',
        chinesename :H5_CHINESE_NAME
    } 
    if (navigator.userAgent.indexOf('SQOnlineRNApp') > -1) {
        //狮桥Android 或者ios，在我们网页里没有感知
        env['system'] = IOS+ANDROID;
        env['appName'] = SQZX;
        env['appId'] = 10;
        env['appVer'] = '';
        env['chinesename'] = SQZX_CHINESE_NAME;
    }else if (window.webkit && window.webkit.messageHandlers) {
        //道上IOS
        env['system'] = IOS;
        env['appName'] = DS;
        env['appId'] = 30;
        env['appVer'] = '';
        env['chinesename'] = DS_CHINESE_NAME;
    }else if (window.DSApp && window.DSApp.setTopBarVisibility) {
        //道上android
        env['system'] = ANDROID;
        env['appName'] = DS;
        env['appId'] = 30;
        env['appVer'] = '';
        env['chinesename'] = DS_CHINESE_NAME;
    }
    window.env = env;
    return env;
}

const Tools = {
    parseParams,
    checkField,
    getEnv,
    SQZX,
    DS,
    ANDROID,
    IOS,
    H5,
    SQZX_CHINESE_NAME,
    DS_CHINESE_NAME,
    H5_CHINESE_NAME
}

module.exports = Tools
