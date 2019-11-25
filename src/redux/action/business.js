import { get, post } from "../../utils/request";
import { Toast, Modal } from "antd-mobile";
import URLPath from "../../config/URLPath";
import lodash from "lodash";

const ValidateParamsInfo = {
  custname: "客户名称",
  hyguishu: "客户所属行业",
  shipment: "运输货物",
  monthywvalue: "月业务量",
  character: "客户性质",
  yunyinmodle: "客户运营模式",
  custman: "联系人",
  custmanmobile: "联系人电话",
  email: "联系人邮箱",
  corpadd: "联系地址",
  ywtype: "业务类型",
  downaccountmethod: "下游结算方式",
  downpayee: "下游收款人",
  gpsrate: "GPS覆盖率",
  servicefeerate: "服务费率",
  billdemander: "票据需求方",
  canacceptbillcorp: "可接受的开票公司",
  billmobile: "联系人电话",
  firstdeveloper: "第一开发人员",
  firstrate: "占比",
  frontidcardpath: "法人身份证正面",
  backidcardpath: "法人身份证反面",
  businesslicencepath: "营业执照",
  type: "合同类型",
  contractpath: "合同照片"
};

const paramKeys = [
  "custname",
  "hyguishu",
  "shipment",
  "monthywvalue",
  "character",
  "yunyinmodle",
  "custman",
  "custmanmobile",
  "email",
  "corpadd",
  "ywtype",
  "downaccountmethod",
  "istimebill",
  "downpayee",
  "isuseapp",
  "gpsrate",
  "servicefeerate",
  "billdemander",
  "canacceptbillcorp",
  "billmobile",
  "isneedvalueaddservice",
  "isneedoilservice",
  "oilseparationratio",
  "oiltype",
  "oilrebaterate",
  "isneedtyreservice",
  "isneedadvancemoney",
  "advancemoneyperiod",
  "reconciliationtime",
  "interest",
  "isneedshuntingservice",
  "isneedyunyinman",
  "downcarrier",
  "shuntingserviceremark",
  "sellcargkservice",
  "sellcarnum",
  "isrebatecust",
  "rebateratecust",
  "isneedleaseservice",
  "rentcarnum",
  "vtrucktype",
  "vtrucklengh",
  "leaseterm",
  "isautorecordbill",
  "custremark",
  "firstdeveloper",
  "firstrate",
  "seconddeveloper",
  "secondrate",
  "thriddeveloper",
  "thirdrate",
  "frontidcardpath",
  "backidcardpath",
  "businesslicencepath",
  "contractpath",
  "advancelimit",
  "type",
  "Uid",
  "mt",
  "id"
];
export const update = (payload = {}) => dispatch => {
  dispatch({
    type: "SQ_BUSINESS_UPDATE",
    payload
  });
};

export const reset = () => dispatch => {
  dispatch({
    type: "SQ_BUSINESS_RESET"
  });
};

export const resetBusiness = business => dispatch => {
  const payload = convertBusinessToReduxState(business);
  dispatch(update(payload));
};

const convertBusinessToReduxState = (business = {}) => {
  const infos = {
    1: "格式合同",
    2: "非格式合同"
  };
  const payload = {};
  Object.keys(business).forEach(key => {
    payload[lodash.toLower(key)] = business[key];
  });
  const { vtrucktype, vtrucklengh, type, ...other } = payload;
  const carinfo = [vtrucktype, Number(vtrucklengh)];
  return {
    ...other,
    type: infos[type],
    carinfo
  };
};

export const loadDetail = (payload = {}) => dispatch => {
  Toast.loading("", 0);
  const { id, callback = () => {} } = payload;
  get(URLPath.rscIP + `/CustomerHandler.ashx?mt=2005&where=t1.id=${id}`)
    .then(res => {
      Toast.hide();
      const { code, description, data } = res;
      if (code !== 200 || data.length === 0) {
        Toast.fail(description || "请求失败");
        return;
      }
      const business = convertBusinessToReduxState(data[0]);
      dispatch(update(business));
      callback(data[0], business.carinfo);
    })
    .catch(err => {
      Toast.hide();
      Toast.fail("请求失败");
      console.error(err);
    });
};

export const submit = (payload = {}) => dispatch => {
  Toast.loading("提交中...", 0);
  const { carinfo = [], type, ...other } = payload;
  const [vtrucktype, vtrucklengh] = carinfo;
  const uid = localStorage.getItem("sq_business_review_uid");
  let typeId = "";
  if (type === "格式合同") {
    typeId = 1;
  } else if (type === "非格式合同") {
    typeId = 2;
  }
  const params = lodash.pick(
    {
      ...other,
      vtrucktype,
      vtrucklengh,
      type: typeId,
      Uid: uid,
      mt: 2004
    },
    paramKeys
  );

  const validateFailParams = [];
  Object.keys(ValidateParamsInfo).forEach(key => {
    const currentValue = String(params[key]);
    if (currentValue === "undefined" || currentValue.length === 0) {
      validateFailParams.push(ValidateParamsInfo[key]);
    }
  });

  if (validateFailParams.length > 0) {
    const message = validateFailParams.join(", ") + "为必填项";
    Modal.alert("提示", message);
    Toast.hide();
    return;
  }

  let formData = new FormData();
  Object.keys(params).forEach(key => {
    const value = params[key];
    if (value !== undefined) {
      if (typeof value === "boolean") {
        formData.append(key, value ? 1 : 0);
      } else {
        formData.append(key, value);
      }
    }
  });

  post(URLPath.rscIP + "/CustomerHandler.ashx", formData)
    .then(res => {
      console.log(res);
      Toast.hide();
      const { code, description } = res;
      if (code !== 200) {
        Toast.fail(description || "请求失败");
        return;
      }
      Toast.success("提交成功");
      if (!params.id) {
        //新建提交成功后，重置数据
        dispatch(reset());
      }
    })
    .catch(err => {
      Toast.hide();
      Toast.fail("请求失败");
      console.error(err);
    });
};
