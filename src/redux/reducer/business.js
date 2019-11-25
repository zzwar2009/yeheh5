const initStatus = {
  isneedvalueaddservice: false,
  isneedoilservice: false,
  isneedshuntingservice: false,
  sellcargkservice: false,
  isneedleaseservice: false,
  type: "格式合同",
  frontidcardpath: "",
  backidcardpath: "",
  businesslicencepath: "",
  carinfo: []
};

// const initStatus = {
//   isneedvalueaddservice: true,
//   isneedoilservice: true,
//   isneedshuntingservice: true,
//   sellcargkservice: true,
//   isneedleaseservice: true,
//   custname: "123",
//   hyguishu: "三方物流",
//   shipment: "123",
//   monthywvalue: "123",
//   character: "国有企业",
//   yunyinmodle: "自营车队",
//   custman: "123",
//   email: "123",
//   custmanmobile: "123",
//   corpadd: "123",
//   ywtype: "后市场业务",
//   downaccountmethod: "下游价格不固定",
//   istimebill: true,
//   isuseapp: true,
//   downpayee: "123",
//   gpsrate: "123",
//   servicefeerate: "123",
//   billdemander: "上游客户",
//   canacceptbillcorp: "123",
//   billmobile: "213",
//   oilseparationratio: "132",
//   oiltype: "12",
//   oilrebaterate: "312",
//   isneedtyreservice: true,
//   isneedadvancemoney: true,
//   advancemoneyperiod: "12",
//   reconciliationtime: "321",
//   interest: "32",
//   isneedyunyinman: true,
//   downcarrier: "3",
//   shuntingserviceremark: "2",
//   sellcarnum: "12",
//   isrebatecust: true,
//   rebateratecust: "123",
//   rentcarnum: "132",
//   carinfo: ["铁厢", 7.6],
//   leaseterm: "132",
//   isautorecordbill: true,
//   custremark: "123",
//   firstdeveloper: "123",
//   firstrate: "12",
//   seconddeveloper: "1",
//   secondrate: "1",
//   thriddeveloper: "2",
//   thirdrate: "12",
//   type: '格式合同',
//   frontidcardpath:
//     "http://123.196.126.55:8098/Upload/Images/1008888/1009//636882404861718751.jpg",
//   backidcardpath:
//     "http://123.196.126.55:8098/Upload/Images/1008888/1010//636882405027506032.jpg",
//   businesslicencepath:
//     "http://123.196.126.55:8098/Upload/Images/1008888/1008//636882405052818471.jpg",
//   contractpath:
//     "http://123.196.126.55:8098/Upload/Images/1008888/1015//636882405083756346.jpg;http://123.196.126.55:8098/Upload/Images/1008888/1015//636882405113287659.jpg"
// };

export default (state = initStatus, action) => {
  switch (action.type) {
    case "SQ_BUSINESS_UPDATE":
      return { ...state, ...action.payload };
    case "SQ_BUSINESS_RESET": {
      return initStatus;
    }
    default:
      return state;
  }
};
