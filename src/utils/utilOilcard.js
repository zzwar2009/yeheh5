const colors = {blue:'#1890ff',orange:'#FF6E27',yellow:'#ffc53d',red:'#f5222d',black:'#000',gray:'#888',green:'#bae637'};
const getRewardWay=(order)=>{
  if(order.RewardWay === 30 && order.RewardRatio>0){
    order.rewardway='卡';
  }
  else if(order.RewardWay === 15  && order.RewardRatio>0){
    order.rewardway='现金';
  }
  else if(order.RewardWay === 40  && order.RewardRatio>0){
    order.rewardway='油';
  }
}
const getapplyTypeAndColor=(obj)=>{
  switch(obj.ApplyType){
    case '油卡挂失':
      obj.bgcolor = colors.yellow;
      obj.applytype = 2;
      break;
    case '油卡申请':
      obj.bgcolor =  colors.orange;
      obj.applytype = 1;
      break;
    case '补卡申请':
      obj.bgcolor = colors.blue;
      obj.applytype = 3;
      break;
    case '油卡补办':
      obj.bgcolor = colors.blue;
      obj.applytype = 3;
      break;
    default:
      obj.bgcolor = '#000';
      // obj.applytype = 2;
  }
}
const getDealDeatil=(order)=>{
  switch (order.BillType) {
    case 12007:
      order.billType = '分';
      order.StatusColor=colors.blue;
      order.add=false;
      break;	
    case 1205:
      order.billType = '退';
      order.StatusColor=colors.black;
      order.add=false;
      break;	
    case 1303:
      order.billType = '撤';
      order.StatusColor=colors.gray;
      order.add=false;
      break;	
    case 12008:
      order.billType = '集';
      order.StatusColor=colors.yellow;
      order.add=true;
      break
    case 21006:
      order.billType = '提';
      order.StatusColor=colors.red;
      order.add=false;
      break
    case 16005:
      order.billType = '充';
      order.StatusColor=colors.orange;
      order.add=true;
      break
    case 12002:
      order.billType = '充';
      order.StatusColor=colors.orange;
      order.add=true;
      break
    case 12009:
      order.billType = '转';
      order.StatusColor=colors.orange;
      order.add=false;
      break
    default:
      order.billType = '未';
      order.StatusColor=colors.green;
      order.add=false;
}
}

const getOilcarddetailType=(order)=>{
  switch (order.BillType) {
    case true:
      if (order.ID === -2) {
        order.jiajian = '+';
        order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
        order.billTypeText = '充值失败';
        order.billType = '败';
        order.add=true;
        break;
      }

    case 1103:
      order.jiajian = '-';
      order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
      order.billTypeText = '承包商集油';
      order.billType = '集';
      order.add=false;
      break;
    case 1205:
      order.jiajian = '+';
      order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
      order.billTypeText = '油卡充值奖励';
      order.billType = '奖';
      order.add=true;
      break;
    case 1110:
      order.jiajian = '-';
      order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
      order.billTypeText = '承包商集油';
      order.billType = '集';
      order.add=false;
      break;
    case 1105:
      if (order.Status === -23) {
        order.jiajian = '-';
        order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
        order.billTypeText = '承包商充值';
        order.billType = '充';
        order.add=false;
        break;
      } else if (order.Status === -13) {
        order.jiajian = '+';
        order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
        order.billTypeText = '承包商充值';
        order.billType = '充';
        order.add=true;
        break;
      } else
      order.jiajian = '+';
      order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
      order.billTypeText = '承包商充值';
      order.billType = '充';
      order.add=true;
      break;
    case 1107:
      if (order.Status === -23) {
        order.jiajian = '-';
        order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
        order.billTypeText = '承包商充值';
        order.billType = '充';
        order.add=false;
        break;
      } else if (order.Status === -13) {
        order.jiajian = '+';
        order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
        order.billTypeText = '承包商充值';
        order.billType = '充';
        order.add=true;
        break;
      } else
        order.jiajian = '+';
        order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
        order.billTypeText = '承包商分油';
        order.billType = '分';
        order.add=true;
      break;
    case 1101:
      if (order.Status === -23) {
        order.jiajian = '-';
        order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
        order.billTypeText = '承包商充值';
        order.billType = '充';
        order.add=false;
        break;
      } else if (order.Status === -13) {
        order.jiajian = '+';
        order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
        order.billTypeText = '承包商充值';
        order.billType = '充';
        order.add=true;
        break;
      } else
      order.jiajian = '+';
      order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
      order.billTypeText = '承包商充值';
      order.billType = '充';
      order.add=true;
      break;
    case -100:
      if (order.Status === -23) {
        order.jiajian = '-';
        order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
        order.billTypeText = '承包商充值';
        order.billType = '充';
        order.add=false;
        break;
      } else if (order.Status === -13) {
        order.jiajian = '+';
        order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
        order.billTypeText = '承包商充值';
        order.billType = '充';
        order.add=true;
        break;
      } else
      order.jiajian = '+';
      order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
      order.billTypeText = '承包商充值';
      order.billType = '充';
      order.add=true;
      break;
    case 11055:
      if (order.Status === -23) {
        order.jiajian = '-';
        order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
        order.billTypeText = '承包商充值';
        order.billType = '充';
        order.add=false;
        break;
      } else if (order.Status === -13) {
        order.jiajian = '+';
        order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
        order.billTypeText = '承包商充值';
        order.billType = '充';
        order.add=true;
        break;
      } else
      order.jiajian = '+';
      order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
      order.billTypeText = '承包商充值';
      order.billType = '充';
      order.add=true;
      break;
    case -168:
      order.jiajian = '-';
      order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
      order.billTypeText = '油卡消费';
      order.billType = '费';
      order.add=false;
      break;
    case 1135:
      order.jiajian = '-';
      order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
      order.billTypeText = '油卡消费';
      order.billType = '费';
      order.add=false;
      break;
    case 1301:
      order.jiajian = '-';
      order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
      order.billTypeText = '油卡转出';
      order.billType = '转';
      order.add=false;
      break;
    case 1302:
      order.jiajian = '+';
      order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
      order.billTypeText = '油卡圈存';
      order.billType = '存';
      order.add=true;
      break;
    case 1303:
      order.jiajian = '-';
      order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
      order.billTypeText = '充值撤回';
      order.billType = '撤';
      order.add=false;
      break;
    default:
      order.jiajian = '-';
      order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
      order.billTypeText = '未知类型';
      order.billType = '未';
      order.add=false;
  };

}
const getcollectDetailList=(order)=>{
  switch (order.BillType) {
    case 1103:
      order.jiajian = '-';
      order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
      order.billTypeText = '承包商集油';
      order.billType = '集';
      order.add=false;

      break;
    case 1110:
      order.jiajian = '-';
      order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
      order.billTypeText = '承包商集油';
      order.billType = '集';
      order.add=false;
      break;
    case 1205:
      if (order.Status === -23) {
        order.jiajian = '-';
        order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
        order.billTypeText = '油卡充值奖励';
        order.billType = '奖';
        order.add=false;
        break;
      } else if (order.Status === -13) {
        order.jiajian = '+';
        order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
        order.billTypeText = '油卡充值奖励';
        order.billType = '奖';
        order.add=true;
        break;
      } else
      order.jiajian = '+';
      order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
      order.billTypeText = '油卡充值奖励';
      order.billType = '奖';
      order.add=true;
      break;

    case 1105:
      if (order.Status === -23) {
        order.jiajian = '-';
        order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
        order.billTypeText = '承包商充值';
        order.billType = '充';
        order.add=false;
        break;
      } else if (order.Status === -13) {
        order.jiajian = '+';
        order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
        order.billTypeText = '承包商充值';
        order.billType = '充';
        order.add=true;
        break;
      } else
      order.jiajian = '+';
      order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
      order.billTypeText = '承包商充值';
      order.billType = '充';
      order.add=true;
      break;
    case 1107:
      if (order.Status === -23) {
        order.jiajian = '-';
        order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
        order.billTypeText = '承包商充值';
        order.billType = '充';
        order.add=false;
        break;
      } else if (order.Status === -13) {
        order.jiajian = '+';
        order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
        order.billTypeText = '承包商充值';
        order.billType = '充';
        order.add=true;
        break;
      } else
      order.jiajian = '+';
      order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
      order.billTypeText = '承包商充值';
      order.billType = '充';
      order.add=true;
      break;
    case 1101:
      if (order.Status === -23) {
        order.jiajian = '-';
        order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
        order.billTypeText = '承包商充值';
        order.billType = '充';
        order.add=false;
        break;
      } else if (order.Status === -13) {
        order.jiajian = '+';
        order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
        order.billTypeText = '承包商充值';
        order.billType = '充';
        order.add=true;
        break;
      } else
      order.jiajian = '+';
      order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
      order.billTypeText = '承包商充值';
      order.billType = '充';
      order.add=true;
      break;
    case -100:
      if (order.Status === -23) {
        order.jiajian = '-';
        order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
        order.billTypeText = '承包商充值';
        order.billType = '充';
        order.add=false;
        break;
      } else if (order.Status === -13) {
        order.jiajian = '+';
        order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
        order.billTypeText = '承包商充值';
        order.billType = '充';
        order.add=true;
        break;
      } else
      order.jiajian = '+';
      order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
      order.billTypeText = '承包商充值';
      order.billType = '充';
      order.add=true;
      break;
    case 11055:
      if (order.Status === -23) {
        order.jiajian = '-';
        order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
        order.billTypeText = '承包商充值';
        order.billType = '充';
        order.add=false;
        break;
      } else if (order.Status === -13) {
        order.jiajian = '+';
        order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
        order.billTypeText = '承包商充值';
        order.billType = '充';
        order.add=true;
        break;
      } else
      order.jiajian = '+';
      order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
      order.billTypeText = '承包商充值';
      order.billType = '充';
      order.add=true;
      break;
    case -168:
      order.jiajian = '-';
      order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
      order.billTypeText = '油卡消费';
      order.billType = '费';
      order.add=false;
      break;
    case 1135:
      order.jiajian = '-';
      order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
      order.billTypeText = '油卡消费';
      order.billType = '费';
      order.add=false;
      break;
    case 1301:
      order.jiajian = '-';
      order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
      order.billTypeText = '油卡转出';
      order.billType = '转';
      order.add=false;
      break;
    case 1302:
      order.jiajian = '+';
      order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
      order.billTypeText = '油卡转入';
      order.billType = '转';
      order.add=true;
      break;
    case 1305:
        order.jiajian = '+';
        order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
        order.billTypeText = '充值撤回';
        order.billType = '撤';
        order.add=true;
        break;
    default:
      order.jiajian = '-';
      order.StatusColor = order.jiajian==='+'?colors.yellow:colors.orange;
      order.billTypeText = '未知类型';
      order.billType = '未';
      order.add=false;
  }
}

const getOilCardList=(obj) => {
    if(!obj){
      console.log('getOilCardList obj data error');
      return false;
    }
    switch (obj.CardType) {
      case '万金油电子油卡':
        obj.picture = require('@/res/oilcard/wjy.png');
        break;
      case '找油网电子油卡':
        obj.picture = require('@/res/oilcard/zyw.png');
        break;
      case '中石化加油卡':
        obj.picture = 'http://dfs.tjyunshi.com/1/default/20190513/17/56/5/bda8345a43d347ff4de6bba314318601.png';
        break;
      case '中石油加油卡':
        obj.picture = 'http://dfs.tjyunshi.com/1/default/20190513/17/56/4/26e28069d705f2c197c252990a2d8437.png';
        break;
      case '狮桥油卡':
        obj.picture = require('@/res/oilcard/lion_logo.png');
        break;
      default:
        obj.picture = 'http://dfs.tjyunshi.com/1/default/20190513/17/57/5/5a7715b412ffa691a9358bff95e7b67c.png';
        break;
      }
      return true;
    }
const GetQueryString=()=>{
        var url = window.location.search;
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
         var str = url.substr(1);//substr()方法返回从参数值开始到结束的字符串；
         str = decodeURIComponent(decodeURIComponent(str));
         var strs = str.split("&");
         for(var i = 0; i < strs.length; i ++) {
          theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
         }
         }
         return theRequest;
    }

module.exports ={
    getOilCardList:getOilCardList,
    GetQueryString:GetQueryString,
    getOilcarddetailType:getOilcarddetailType,
    getRewardWay:getRewardWay,
    getDealDeatil:getDealDeatil,
    getcollectDetailList:getcollectDetailList,
    getapplyTypeAndColor:getapplyTypeAndColor
}
  