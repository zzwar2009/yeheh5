import React from 'react';
import { ListView,Button} from 'antd-mobile';
import console from '@/utils/consoleprintControl';//控制打印
import {getOilcarddetailType,getcollectDetailList} from '@/utils/utilOilcard';
import {submitOilCardPayBack,querycollectoildetail} from '@/services/api';

function MyBody(props) {
  return (
    <div className="am-list-body my-body">
      <span style={{ display: 'none' }}>you can custom body wrap element</span>
      {props.children}
    </div>
  );
}
const colors = {blue:'#1890ff',orange:'#FF6E27',yelllow:'#ffc53d',red:'#f5222d'};
// const words = {fei:'费',cun:'存'};

var NUM_ROWS = 10;
let pageIndex = 0;
var data;
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

class ListViewOilcardDealDetails extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      isLoading: true,
      height: document.documentElement.clientHeight*3/4,
      item:[],
      res:{},
      hasMore:true,
      params1:{},
      firstload:true
    };
  }

  getcollectinfodetail=(params)=>{
    const request = async()=>{
      const res = await querycollectoildetail(params);
      if(res.code===200){
        console.log(res.data);
        data = res.data;
        if(res.data===undefined||res.data.length<10){
          this.setState({hasMore:false});
          if(res.data!==undefined){
            NUM_ROWS=res.data.length;
          }
          else{
            NUM_ROWS=0;
          }
        }
      }
    }
    request();
  }
  componentWillReceiveProps(newprops){
    if(newprops.params){
        const params = newprops.params;
        this.getcollectinfodetail(params);
        if(data){
            NUM_ROWS = data.length;
        }
    }
  }
  componentDidMount() {
    {/**生成序列 */}
    setTimeout(() => {
      this.rData = genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 600);
  }
  
  cancelDeal=(ID)=>{//撤回操作
    const params ={
      method:'POST',
      data:{
        czid: ID
      }
    };
    const response = submitOilCardPayBack(params);
    response.then((res)=>{
      console.log(res);
      this.props.refreshList();
    }).catch(err=>{console.log(err)});
  }
  onEndReached = (event) => {
    console.log('onEndReached');
    // if (!this.state.hasMore) {
    //   return;
    // }
    // this.setState({ isLoading: true });
    // const params = this.state.params;
    // params.data.page +=1;
    // this.setState({params:params});
    // this.getcollectinfodetail(params);
    // setTimeout(() => {
    //   this.rData = { ...this.rData, ...genData(++pageIndex) };
    //   this.setState({
    //     dataSource: this.state.dataSource.cloneWithRows(this.rData),
    //     isLoading: false,
    //   });
    // }, 1500);
  }

  render() {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          // height: 8,
          // borderTop: '1px solid #ECECED',
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
        console.log('data is null');
        data=[];
      }
      const obj = data[index++];
      return (
      <div>
        {obj!==undefined?
        <div key={rowID} style={{ width:"80vw",height:obj.Address?"70px":"35px",borderRadius:"15px",padding: '15px 10px',display: '-webkit-box', display: 'flex',marginBottom:"1vh"}}>
            {getcollectDetailList(obj)}
            <div>
              <div style={{
                  background: obj.StatusColor, color: "#fff", width: "30px", height: "30px",lineHeight:"30px", marginLeft:"3px", marginBottom:"5px", borderRadius: "15px",
                  textAlign: "center", fontSize: 18,}}
              >{obj.billType}</div>
              {obj.Status===-2?<div><Button style={{height:"20px",lineHeight:"20px",width:"38px"}} size='small' onClick={e=>{e.preventDefault();console.log('撤回');this.cancelDeal(obj.ID);}}>撤回</Button></div>:''}
              {/* <Button style={{height:"20px",lineHeight:"20px",width:"38px"}} size='small' onClick={e=>{e.preventDefault();console.log('撤回');this.cancelDeal(obj.ID);}}>撤回</Button> */}
            </div>
          <div style={{  marginLeft:"5px" }}>
            <div style={{fontSize: 16, marginBottom: '8px',width:"45vw"}}>{obj.billTypeText}
            </div>
            <div style={{ fontSize: 12,color:'#888',marginBottom: '8px',width:"45vw"}}>{obj.ModifyTime}</div>
            {obj.Address?<div style={{ fontSize: 12,color:'#888',marginBottom: '8px',width:"45vw"}}>{obj.Address}</div>:''}
          </div>
          <div>
            <div style={{textAlign:"right",fontSize:16,fontWeight:"bold",width:"20vw",height:"4vh",lineHeight:"4vh",marginBottom: '8px'}}><span style={{color:obj.add?colors.orange:"",textAlign:"right"}}>{obj.jiajian}{obj.OilFee}</span></div>
            <div style={{ textAlign:"right",fontSize: 12,color:'#888',marginBottom: '8px', width:"33vw"}}><span>可集金额：{obj.CardBalanceUse?obj.CardBalanceUse:0}</span></div>
          </div>
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

export default ListViewOilcardDealDetails;
