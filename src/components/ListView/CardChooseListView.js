import React from 'react'
import { ListView,SwipeAction,Toast} from 'antd-mobile';
import {queryCBSoilcardlist} from '@/services/api';
import console from '@/utils/consoleprintControl';//控制打印
import {getOilCardList} from '@/utils/utilOilcard';
function MyBody(props) {
  return (
    <div className="am-list-body my-body">
      <span style={{ display: 'none' }}>you can custom body wrap element</span>
      {props.children}
    </div>
  );
}
let logo = require('@/res/中石化logo.png');
const images = {0:logo};
var NUM_ROWS = 10;
let pageIndex = 0;
var data = [];
function genData(pIndex = 0) {
  const dataBlob = {};
  if(NUM_ROWS<10){//解决行数小于指定行数造成显示多行的问题
    for (let i = 0; i < NUM_ROWS; i++) {
      const ii = (pIndex * NUM_ROWS)*10 + i;
      dataBlob[`${ii}`] = `row - ${ii}`;
    }
  }
  else{
    for (let i = 0; i < NUM_ROWS; i++) {
      const ii = (pIndex * NUM_ROWS) + i;
      dataBlob[`${ii}`] = `row - ${ii}`;
    }
  }
  console.log(dataBlob);
  return dataBlob;
}

class CardChooseListView extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      isLoading: true,
      height: document.documentElement.clientHeight * 6 / 7,
      res:{},
      params :{
        "method":"POST",
        "data":{
         "cardType": 0,
         "where": "",
         "page": 1,
         "pageSize": 10
        }
       },
       hasMore:true,
       fistVisit:true
    };
  }
  loaddata=(params)=>{
    const request=async()=>{
      try{
        const res =  await queryCBSoilcardlist(params);
        console.log(res);
        if(res.code===200){
          this.setState({res:res});
          data = res.data;
          if(res.data===undefined||res.data.length<10){
            this.setState({hasMore:false});
            if(res.data!==undefined){NUM_ROWS=res.data.length;}
            else{NUM_ROWS=0;}
          }
        }
        else{
          Toast.fail('网络错误'+res.code);
        }
      }
      catch(err){console.log(err)}
    }
    request();
  }
  componentDidMount() {
    // you can scroll to the specified position
    // setTimeout(() => this.lv.scrollTo(0, 120), 800);
    // simulate initial Ajax
    if(this.state.res.data!==undefined){
      NUM_ROWS = this.state.res.data.length;
    }
    else{
      NUM_ROWS = 10;
    }
    var params = this.state.params;
    const newdata = this.props.params;
    if (params.data.cardType !== newdata.data.cardType) {
      params.data.cardType = newdata.data.cardType;
    }
    if (params.data.where.toString() !== newdata.data.where.toString()) {
      params.data.where = newdata.data.where;
    }
    this.setState({params:params});
    this.loaddata(params);
    setTimeout(() => {
      this.rData = genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 1000);
    console.log('componentDidMount');
  }
  
  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.dataSource !== this.props.dataSource) {
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
  //     });
  //   }
  // }
  

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (!this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
    const params = this.state.params;
    params.data.page +=1;
    this.setState({params:params});
    this.loaddata(params);
    setTimeout(() => {
      this.rData = { ...this.rData, ...genData(++pageIndex) };
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 1500);
  }

  render() {
    if(!data){
      if(!localStorage.getItem('token')){
        Toast.fail('数据加载失败，请重新确定是否有权限');
        return(<div style={{textAlign:"center",color:"#ff0000"}}>数据有误，请联系管理员</div>);
      }
    }
    
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );
    let index = 0;
    const row = (rowData, sectionID, rowID) => {
      if(data){
        if (index >data.length-1) {
          index = 0;
        }
      }
      else{
        data=[];
      }
      const obj = data[index++];
      return (
        <div>
          {/** 油卡主界面*/}
         {obj!==undefined?
         <div className="listview-oilcard-info"
                 onClick={()=>{
                   console.log(rowID);
                   this.setState({fistVisit:false});
                   if(this.state.fistVisit){
                     console.log('this.state.fistVisit');
                    const params = 
                    'PlateNum='+obj.PlateNum+'&'+
                    'CardMobile='+obj.CardMobile+'&'+
                    'OilCardNo='+obj.OilCardNo+'&'+
                    'LastOilFee='+obj.LastOilFee+'&'+
                    'AllOilFee='+obj.CardBalance+'&'+ // fixbug.这个是卡余额字段名就不改了
                    'CardType='+obj.CardType+'&'+
                    'RewardRatio='+obj.RewardRatio+'&'+
                    'Remark='+obj.Remark+'&'+
                    'RewardStr='+obj.RewardStr;
                   window.location.href='/recharge?'+encodeURIComponent(encodeURIComponent(params));
                   }
                   else{
                    this.props.TransferKeyState('activeKey','');
                    this.props.TransferKeyState('showinfo',true);
                    this.props.TransferKeyState('obj',obj);
                   }
                  
                }}
            >
                {getOilCardList(obj)}
                <img className="listview-oilcard-info-img" src={obj.picture} alt="" />
                <div className="listview-oilcard-info-div1">
                    <div
                       className="listview-oilcard-info-div1-div11"
                    >{obj.PlateNum}{`(${obj.CardMobile})`}</div>
                    <div className="listview-oilcard-info-div1-div12">
                        <div className="listview-oilcard-info-div1-div12-div121">油卡卡号：{obj.OilCardNo}</div>
                        <div className="listview-oilcard-info-div1-div12-div122">最后一次充值<span className="listview-oilcard-info-div1-div12-div122-span1">{obj.LastOilFee}</span>元，油卡余额<span style={{color:"#FF6E27"}}>{obj.CardBalance}</span>元</div>
                        <div><span className="listview-oilcard-info-div1-div12-span1">备注：{obj.Remark}</span></div>
                    </div>
                </div>
                {obj.RewardStr&&obj.RewardRatio!==0.0?
                <div className="listview-oilcard-info-cardinfo-red-flag">
                    <p className="listview-oilcard-info-cardinfo-red-flag-p1">{parseFloat(obj.RewardRatio).toFixed(1)}</p>
                    <p className="listview-oilcard-info-cardinfo-red-flag-p2">{obj.RewardStr}</p>
                </div>:''}
            </div>
            :''}
        </div>
      );
    };
    return (
      <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        // renderHeader={() => <span>header</span>}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? '加载中...' : '加载完成'}
        </div>)}
        renderRow={row}
        renderSeparator={separator}
        className="am-list"
        pageSize={4}
        style={{
            height: this.state.height,
            overflow: 'auto',
          }}
        // useBodyScroll
        renderBodyComponent={() => <MyBody />}
        onScroll={() => { console.log('scroll'); }}
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
      />
    );
  }
}

export default CardChooseListView;
/***
 *  <div style={{ background:'white', display: '-webkit-box', display: 'flex',borderRadius:'10px', }}
                 onClick={()=>{
                   console.log(rowID);
                   this.setState({fistVisit:false});
                   if(this.state.fistVisit){
                     console.log('this.state.fistVisit');
                    const params = 
                    'PlateNum='+obj.PlateNum+'&'+
                    'CardMobile='+obj.CardMobile+'&'+
                    'OilCardNo='+obj.OilCardNo+'&'+
                    'LastOilFee='+obj.LastOilFee+'&'+
                    'AllOilFee='+obj.AllOilFee+'&'+
                    'CardType='+obj.CardType+'&'+
                    'RewardRatio='+obj.RewardRatio+'&'+
                    'Remark='+obj.Remark+'&'+
                    'RewardStr='+obj.RewardStr;
                   
                   window.location.href='/recharge?'+encodeURIComponent(encodeURIComponent(params));
                   }
                   else{
                    this.props.TransferKeyState('activeKey','');
                    this.props.TransferKeyState('showinfo',true);
                    this.props.TransferKeyState('obj',obj);
                   }
                  
                }}
            >
                {getOilCardList(obj)}
                <img style={{ height: '45px', width: '45px', padding: '5px 0', marginTop:'10px',marginLeft:'4px',marginRight: '10px' }} src={obj.picture} alt="" />
                <div style={{ width:'62vw',padding: '5px 0',marginBottom:'10px'}}>
                    <div
                        style={{
                            lineHeight: '30px',
                            color: '#000',
                            fontSize: 16,
                            borderBottom: '1px dashed #e9e9e9',
                        }}
                    >{obj.PlateNum}{`(${obj.CardMobile})`}</div>
                    <div style={{ lineHeight: 1 }}>
                        <div style={{ marginBottom: '8px', fontSize: 12,color: '#666',}}>油卡卡号：{obj.OilCardNo}</div>
                        <div style={{ width:'70vw',marginBottom: '8px', fontSize: 12,color: '#666', }}>最后一次充值<span style={{color:"#FF6E27"}}>{obj.LastOilFee}</span>元，油卡余额<span style={{color:"#FF6E27"}}>{obj.CardBalance}</span>元</div>
                        <div><span style={{ fontSize: 12,color: '#666',}}>备注：{obj.Remark}</span></div>
                    </div>
                </div>
                {obj.RewardStr&&obj.RewardRatio!==0.0?
                <div style={{  right:0,top:0,height:'52px',width:'52px',boxSizing: 'border-box',
                                backgroundImage:'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG0AAABmCAMAAAD24e+nAAAAnFBMVEUAAAD/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/Fxf/FxfBNlo5AAAAM3RSTlMAAvj8B/MK6E/u4t/Sy8SHKA/bvaqlfkA0GRPYtJ+XkXVuXVlTRy4jIB0WBbewaGM5jDsElt9jAAABv0lEQVRo3r3ZS1bCUBBF0UsSgYgSQURUVBD84Qe05j83G1l6wX6dM4HdfHfV09lxZFcMLtaV2l5vAmjcV9vmNIiaTsuNhkHUqK07D6K+2t4uAui4UlvnLoBW+q2J/Cb6axHpDeS2ZSRXSG5dRHLa7/EoctNBuzpS02FPvchM/3oehEvXdHUSLl3TtZ8EQFP3PFy6puojXLqmzm24NM3cfbg0zU3D5WtahsvX9FCSmvoFqenyiNQ065GaZzui6WVMatqcQJpnO6ep+05qqiaM5tkOaOYaQnMLVNNnSWpaFYjm2U5q+q4RzbMd0TzbGc2XHELzbCc1jc5JTdWc0XzJITTPdkJzU1TTktE82xHNsx3RPNtJTbOa1HTWQzTPdkTzJYfUdD1ENF9yEM2zHdF8ySE0c1+E5qaM5tlOalqVpKZ+gWh+EkhNsx6i+ZKDaJ7tpKbNKalpNCQ1deeI5tmOaL7kEJprUE0LVNO2JDWtC0TzJYfUtKsRzZccRPMlB9E82xHNlxxE82wnNVUfiObZTmjm7gnNTVFNS1TTQ4lonu2k5tkupFnNaZ7tgnoZU5qfBGGNhozmD1iBVRNlt1/nB8vrPSx7I58HAAAAAElFTkSuQmCC)',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: '52px 52px',
                                backgroundPosition: 'top right'}}>
                    <p style={{ fontSize:'13px',color:'#fff',textAlign: 'right'}}>{parseFloat(obj.RewardRatio).toFixed(1)}</p>
                    <p style={{ marginTop:'2px',fontSize:'10px',color:'#fff',textAlign: 'right' }}>{obj.RewardStr}</p>
                </div>:''}
            </div>
 */