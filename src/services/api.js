import { stringify } from 'qs';
import request from '../utils/request';
import UrlConfig from '../config/host.config';


// 授权API地址是：/api/client/v1/user/login?code=xxx&state=xxx

//获取微信code- 进一步》换取token
export async function getToken(code,state) {
    return request(UrlConfig.new_api_host, 'user/login', {
        method: 'GET',
        data: {
            code,
            state
        },
    });
}


export async function getCardDetail(id) {
    return request(UrlConfig.new_api_host, `resource/getDetails/${id}`, {
        method: 'GET',
        // data: {
        //     code,
        //     state
        // },
    });
}



export async function addClickNum(id) {
    return request(UrlConfig.new_api_host, `resource/addClickNum/${id}`, {
        method: 'GET',
        // data: {
        //     code,
        //     state
        // },
    });
}

export async function getWeChatSignature(url) {
    return request(UrlConfig.new_api_host, `wechat/signature`, {
        method: 'GET',
        data: {
            url:url,
        },
    });
}

//历史消息
export async function historyMessage(data) {
    return request(UrlConfig.new_api_host, `message/pageMessage`, {
        method: 'POST',
        data:JSON.stringify(data),
    });
}
// /api/client/v1/message/pageMessage
// /api/client/v1/wechat/signature


// /api/client/v1/resource/getDetails/{id}

// /api/client/v1/resource/addClickNum/{id}

