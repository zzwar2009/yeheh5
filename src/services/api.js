import { stringify } from 'qs';
import request from '../utils/request';
import UrlConfig from '../config/host.config';
export  async function queryCBSoilcardlist(params){
    return request(UrlConfig.api_host, 'OilCard/cbsoilcardlist',params);
}
export async function queryCbsoilcardzrlist(params){
    return request(UrlConfig.api_host, 'OilCard/cbsoilcardzrlist',params);
}

export  function unbindOilCardCbsUse(params){
    return request(UrlConfig.api_host, 'OilCard/DeleteOilCardCbsUse',params);
}
export async function getoilcarddealdetail(params){
    return request(UrlConfig.api_host, 'OilCard/GetOilCardList',params);
}
export async function querycollectoildetail(params){
    return request(UrlConfig.api_host, 'OilCard/CarrierOilGatherGetDetail',params);
}
export function getOilcardInfo(url,params){
    return request(UrlConfig.api_host, url,params);
}
export function submitOilCardPayBack(params){
    return request(UrlConfig.api_host, 'OilCard/CreateOilCardPayBack',params);
}
export async function getOilAccountDetail(params){
    return request(UrlConfig.api_host, 'OilCard/OilAccountListGetByWSAndPage',params);
}
export function executeChangePasswd(params){
    return request(UrlConfig.api_host, 'Pay/paypasswordmodifier',params);
}
export function getIdentifyingCodeOfPayPassword(params) {
    return request(UrlConfig.api_host, 'Pay/paypasswordvalidatecode', params);
}
export function executeReportloss(params){
    return request(UrlConfig.api_host, 'LBOnline/CreateOilCardLoseRepost', params);
}

export async function requestOilApplyOperateList(params){
    return request(UrlConfig.api_host, 'LBOnline/CbsPhysicalCardApplyRecordList', params);
}
export function queryOilApplyOperateList(params){
    return request(UrlConfig.api_host, 'LBOnline/OilApplyOperateListForHFive', params);
}

// export function requestwechatphoneCsmHandler(params) {
//     return request(UrlConfig.ms_ip, '/PhoneCsmHandler.ashx', {
//         method: 'GET',
//         data:{...params}
//     });
// }
export function requestwechatphoneCsmHandler(params) {
    return request(UrlConfig.api_host, 'Pay/payorder', params);
}


{/**这是分界线 */}
export async function queryProjectNotice() {
    return request(UrlConfig.api_host, '/api/project/notice');
}

export async function queryActivities() {
    return request(UrlConfig.api_host, '/api/activities');
}

export async function queryRule(params) {
    return request(UrlConfig.api_host, `/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
    return request(UrlConfig.api_host, '/api/rule', {
        method: 'POST',
        body: {
            ...params,
            method: 'delete',
        },
    });
}

export async function addRule(params) {
    return request(UrlConfig.api_host, '/api/rule', {
        method: 'POST',
        body: {
            ...params,
            method: 'post',
        },
    });
}

export async function updateRule(params) {
    return request(UrlConfig.api_host, '/api/rule', {
        method: 'POST',
        body: {
            ...params,
            method: 'update',
        },
    });
}

export async function fakeSubmitForm(params) {
    return request(UrlConfig.api_host, '/api/forms', {
        method: 'POST',
        body: params,
    });
}

export async function fakeChartData() {
    return request(UrlConfig.api_host, '/users/as/', { method: 'POST' });
}

export async function queryTags() {
    return request(UrlConfig.api_host, '/api/tags');
}

export async function queryBasicProfile() {
    return request(UrlConfig.api_host, '/api/profile/basic');
}

export async function queryAdvancedProfile() {
    return request(UrlConfig.api_host, '/api/profile/advanced');
}

export async function queryFakeList(params) {
    return request(UrlConfig.api_host, `/api/fake_list?${stringify(params)}`);
}

export async function queryCBSInfo(params) {
    return request(UrlConfig.api_host_v1, `/auto/vcarrier/?${stringify(params)}`);
}

export async function removeFakeList(params) {
    const { count = 5, ...restParams } = params;
    return request(UrlConfig.api_host, `/api/fake_list?count=${count}`, {
        method: 'POST',
        body: {
            ...restParams,
            method: 'delete',
        },
    });
}

export async function addFakeList(params) {
    const { count = 5, ...restParams } = params;
    return request(UrlConfig.api_host, `/api/fake_list?count=${count}`, {
        method: 'POST',
        body: {
            ...restParams,
            method: 'post',
        },
    });
}

export async function updateFakeList(params) {
    const { count = 5, ...restParams } = params;
    return request(UrlConfig.api_host, `/api/fake_list?count=${count}`, {
        method: 'POST',
        body: {
            ...restParams,
            method: 'update',
        },
    });
}

export async function fakeAccountLogin(params) {
    // console.log('params', params)
    return request(UrlConfig.api_host, '/users/login', {
        method: 'POST',
        data: params,
    });
}

export async function fakeRegister(params) {
    return request(UrlConfig.api_host, '/api/register', {
        method: 'POST',
        body: params,
    });
}

export async function queryNotices() {
    return request(UrlConfig.api_host, '/api/notices');
}

export async function getFakeCaptcha(mobile) {
    return request(UrlConfig.api_host, `/api/captcha?mobile=${mobile}`);
}

// CBS统一代理请求接口
export async function requestCbsHandler(params) {
    const data = { proxy_host: UrlConfig.ms_ip, proxy_url: '/CbsHandler.ashx', ...params };
    return request(UrlConfig.api_ip, '/MSHandler/', {
        method: 'POST',
        data,
    });
}

// 货主端统一代理请求接口
export async function requestCustomerHandler(params) {
    const data = { proxy_host: UrlConfig.ms_ip, proxy_url: '/CustomerHandler.ashx', ...params };
    return request(UrlConfig.api_ip, '/MSHandler/', {
        method: 'POST',
        data,
    });
}

// 原接口统一代理请求接口
export async function requestPhoneCsmHandler(params) {
    const data = { proxy_host: UrlConfig.ms_ip, proxy_url: '/PhoneCsmHandler.ashx', ...params };
    return request(UrlConfig.api_ip, '/MSHandler/', {
        method: 'POST',
        data,
    });
}

export async function phoneCsmHandler(params) {
    const data = { proxy_host: UrlConfig.ms_ip, proxy_url: '/phoneCsmHandler.ashx', ...params };
    return request(UrlConfig.api_ip, '/MSHandler/', {
        method: 'POST',
        data,
    });
}

export async function requestOperateHandle(params) {
    const data = { proxy_host: UrlConfig.ms_ip, proxy_url: '/OperateHandle.ashx', ...params };
    return request(UrlConfig.api_ip, '/MSHandler/', {
        method: 'POST',
        data,
    });
}

export async function requestExcel(params) {
    // console.log(params);
    const data = { ...params };
    return request(UrlConfig.api_host, '/export_excel?', {
        method: 'GET',
        data,
    });
}






//======================

//申请电子油卡
export async function CarrierCreateOilCard(params) {
    const data = { ...params };
    return request(UrlConfig.api_host, 'OilCard/CarrierCreateOilCard', {
        method: 'POST',
        data,
    });
}
//获取验证码
export async function getVerfiyCode(params) {
    const data = { ...params };
    return request(UrlConfig.api_host, 'Account/phonecode', {
        method: 'POST',
        data,
    });
}

//燃油账户登录
export async function Login(params) {
    // console.log('params', params)
    return request(UrlConfig.api_host, 'Account/login', {
        method: 'POST',
        data: params,
    });
}

//燃油账户 注册
export async function Regist(params) {
    // console.log('params', params)
    return request(UrlConfig.api_host, 'Account/register', {
        method: 'POST',
        data: params,
    });
}

//申请实体油卡
export async function applyEntityCard(params) {
    return request(UrlConfig.api_host, 'LBOnline/DSOrLBNewOilCardApplyRecord', {
        method: 'POST',
        data: params,
    });
}

//申请补卡实体油卡
export async function applyLostEntityCard(params) {
    return request(UrlConfig.api_host, 'LBOnline/CommitNewBuKaApplyInfo', {
        method: 'POST',
        data: params,
    });
}


//加油服务时获取电子油卡信息及消费信息
export async function getElecCardInfo(params) {
    return request(UrlConfig.api_host, 'OilCard/GetCbsOilCardCZNew', {
        method: 'POST',
        data: params,
    });
}

//加油服务时获取万金油页面链接
export async function getWjyLink(params) {
    return request(UrlConfig.api_host, 'OilCard/WanJinYouAuthMember', {
        method: 'POST',
        data: params,
    });
}


//加油服务时获取找油网页面链接
export async function getZywLink(params) {
    return request(UrlConfig.api_host, 'OilCard/ZhaoYouWangAuthMember', {
        method: 'POST',
        data: params,
    });
}

//加油服务司机出示二维码
export async function GetPayCode(params) {
    return request(UrlConfig.api_host, 'OilCard/GetAddOilPayCode', {
        method: 'POST',
        data: params,
    });
}

//通过实体卡id查询卡信息

export async function BuKaApplyInfoGetByOilCardNo(params) {
    return request(UrlConfig.api_host, 'LBOnline/BuKaApplyInfoGetByOilCardNo', {
        method: 'POST',
        data: params,
    });
}

//付款接口
export async function pay(params) {
    return request(UrlConfig.api_host, 'Pay/payorder', {
        method: 'POST',
        data: params,
    });
}

//查询加油扫码后状态
export async function GetPayIDStatus(params) {
    return request(UrlConfig.api_host, 'OilCard/GetAddOilPayIDStatus', {
        method: 'POST',
        data: params,
    });
}

//查询补卡后是否成功
export async function ComfirmBKZhiFuSuccess(params) {
    return request(UrlConfig.api_host, 'LBOnline/ComfirmBKZhiFuSuccess', {
        method: 'POST',
        data: params,
    });
}


//申请实体卡的须知图片请求
export async function GetOilCardPrecondition(params) {
    return request(UrlConfig.api_host, 'LBOnline/GetOilCardPrecondition', {
        method: 'POST',
        data: params,
    });
}
//获取客服支持文字接口
export async function getKefuSupportInfo(params) {
    return request(UrlConfig.api_host, 'SyncStatic/syncStatics', {
        method: 'GET',
        data: params,
    });
}


//获取可以开卡卡种类的列表
export async function GetOilCardKaikaPic(params) {
    return request(UrlConfig.api_host, 'SyncStatic/syncStatics?serial=OilKaiKaPic', {
        method: 'POST',
        data: params,
    });
}

//获取可以选择的油品常量
export async function GetOilTypes(params) {
    return request(UrlConfig.api_host, 'SyncStatic/syncStatics?serial=OilTypeItem', {
        method: 'POST',
        data: params,
    });
}

//获取开卡须知页面的图片
export async function GetCreateCardPic(params) {
    return request(UrlConfig.api_host, 'SyncStatic/syncStatics?serial=YouHuoCreateCardPic', {
        method: 'POST',
        data: params,
    });
}


//获取充值活动的信息
export async function getChargeActivityInfo(params) {
    return request(UrlConfig.api_host, 'OilCard/GetFRewardRatioList', {
        method: 'POST',
        data: params,
    });
}

//获取加油站列表
export async function getStations(params) {
    return request(UrlConfig.api_host, 'OilCard/GetJiaYouZhanDian', {
        method: 'POST',
        data: params,
    });
}



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


