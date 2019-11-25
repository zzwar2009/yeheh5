/*
 * @Author: wxh4321
  * @Date: 2019-08-08 13:55:59
 * @Last Modified by: wxh
 * @Last Modified time: 2019-09-10 14:42:19
  */
import React from 'react'
import { ListView} from 'antd-mobile';
import {getOilAccountDetail} from '@/services/api';
import {getDealDeatil} from '@/utils/utilOilcard'
function MyBody(props) {
  return (
    <div className="am-list-body my-body">
      <span style={{ display: 'none' }}>you can custom body wrap element</span>
      {props.children}
    </div>
  );
}
const colors = {blue:'#1890ff',orange:'#FF6E27',yelllow:'#ffc53d',red:'#f5222d'};
const words = {chong:'充',fen:'分',ji:'集',ti:'提'};
var data=[];
var NUM_ROWS = 10;
let pageIndex = 0;

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
  return dataBlob;
}

class ListViewDetails extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      hasMore:true,
      dataSource,
      isLoading: true,
      height: document.documentElement.clientHeight*3/4,
      item:[],
      hasDetailsMessage:[],
      res:{},
      params:{},
    };
  }
  componentDidMount() {
    const params = {
      method:'POST',
      data:{
          fieldName: "",
          page: 1,
          pageSize: 10,
          sequenceFlag: 0,
          where: ""
      }
    };
    this.setState({params:params});
    this.getOillAccountDetails(params);
    setTimeout(() => {
      this.rData = genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 600);
  }
  getOillAccountDetails=(params)=>{
    const request = async()=>{
      try{
        const res = await getOilAccountDetail(params);
        if(res.code===200){
          console.log(res.data);
          data = res.data;
          if(res.data===undefined||res.data.length<10){
            this.setState({hasMore:false});
            if(res.data!==undefined){
              NUM_ROWS = res.data.length;
            }
            else{
              NUM_ROWS  = 0;
            }
          }
          // this.setState({res:res.data});
        }
      }
      catch(err){console.log(err)}
    }
    request();
  }
  
  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (!this.state.hasMore) {
      return;
    }
    const params = this.state.params;
    params.data.page+=1;
    this.setState({params:params});
    console.log('reach end', event);
    this.setState({ isLoading: true });
    this.getOillAccountDetails(params);
    setTimeout(() => {
      this.rData = { ...this.rData, ...genData(++pageIndex) };
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 1500);
  }

  render() {
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
    // let index = data.length - 1;
    // const row = (rowData, sectionID, rowID) => {
    //   if (index < 0) {
    //     index = data.length - 1;
    //   }
    //   const obj = data[index--];
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
        {obj!==undefined?
        <div key={rowID} style={{ width:"80vw",height:"5vh",borderRadius:"15px",padding: '15px 15px',display: '-webkit-box', display: 'flex',marginBottom:"1vh"}}>
            {getDealDeatil(obj)}
            <div style={{
                background: obj.StatusColor, color: "#fff", width: "40px", height: "40px", marginBottom: '8px', borderRadius: "20px",
                textAlign: "center", lineHeight: "40px", fontSize: 20,}}
            >{obj.billType}</div>
          <div style={{  marginLeft:"15px" }}>
            <div style={{fontSize: 18, marginBottom: '8px',width:"45vw"}}>{obj.BillTypeName}
            </div>
            <div style={{ fontSize: 14,marginBottom: '8px',width:"45vw"}}>{obj.CreateTime}</div>
          </div>
          <div style={{textAlign:"right",fontSize:18,fontWeight:"bold",width:"20vw",height:"5vh",lineHeight:"5vh"}}><span style={{color:obj.InFund?colors.orange:"",textAlign:"right"}}>{obj.InFund?`+${parseFloat(obj.InFund).toFixed(2)}`:`-${parseFloat(obj.FeeFund).toFixed(2)}`}</span></div>
        </div>:''}
        </div>
      );
    };
    return (
      <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        // renderHeader={() => <span>header</span>}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? '加载中...' : '加载完毕'}
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


export default ListViewDetails;
