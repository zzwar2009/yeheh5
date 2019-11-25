import React from 'react';
import { ListView,Button,Toast} from 'antd-mobile';
import {getOilcarddetailType,getcollectDetailList} from '@/utils/utilOilcard';
import {submitOilCardPayBack,getoilcarddealdetail} from '@/services/api';
import LoadMore from '@/components/LoadMore';
import {GetQueryString} from '@/utils/utilOilcard';
var classNames = require('classnames');
// function MyBody(props) {
//   return (
//     <div className="am-list-body my-body">
//       <span style={{ display: 'none' }}>you can custom body wrap element</span>
//       {props.children}
//     </div>
//   );
// }
const colors = {blue:'#1890ff',orange:'#FF6E27',yelllow:'#ffc53d',red:'#f5222d'};

// const words = {fei:'费',cun:'存'};
let that;
class ListViewOilcardDealDetails extends React.Component {
  constructor(props) {
    super(props);
    that = this;
    this.state = {
      // dataSource,
      // isLoading: true,
      // height: document.documentElement.clientHeight*3/4,
      // item:[],
      // res:{},
      // hasMore:true,
      params:{},
      // firstload:true,

      data:[], //详细数据
      page:1,//第一页
      //  ps:10,//每页10条
      loading:false,
      completed:false
    };
  }

  // getoilcarddeal=(params)=>{
  //   const request = async()=>{
  //     try{
  //       const res = await getoilcarddealdetail(params);
  //       if(res.code===200){
  //         console.log(res.data);
  //         data = res.data;
  //         if(res.data===undefined||res.data.length<10){
  //           this.setState({hasMore:false});
  //           if(res.data!==undefined){
  //             NUM_ROWS=res.data.length;
  //           }
  //           else{
  //             NUM_ROWS=0;
  //           }
  //         }
  //     }
  //     }
  //     catch(err){console.log(err)}
  //   }
  //   request();
  // }
  componentWillReceiveProps(data){
    console.log('componentWillReceiveProps');
    console.log(data)
    if(data.params1){
      this.setState({params:data.params1},function(){
        that.getCardData(1);
      });
     
    }
  }
  
  componentDidMount() {
    console.log(this.props)
    
    // this.setState({params:params},function(){
    //   that.getCardData(1);
    // });
    
  }
  handleLoadMore = () =>{
      var nextpage = parseInt(that.state.page)+1;
      that.getCardData(nextpage);
  }

  getCardData(page){
      //todo params get
      let {params} = this.state;
      // 当前页数
      params.data.page = page;
      const response =  getoilcarddealdetail(params);
      this.setState({
          loading:true
      })
      response.then(res => {
          console.log(res);
          Toast.hide();
          const { code, description } = res;
          if (code !== 200) {
              Toast.fail(description || "请求失败");
              return;
          }else{
              const {data} = res;
              
              if(data.length >= 0 ){
                  //如果有数据继续绑定
                  
                  //组合列表
                  let newData = [];
                  if(page == 1 ){
                    newData = res.data;
                  }else{
                    newData = that.state.data.concat(res.data);
                  }
                  // let newData = that.state.data.concat(res.data);
                  that.setState({
                      loading:false,
                      completed:false,
                      page,//改变当前页数
                      data:newData//结合上一次的数据
                  })
              }

              //是否有下一页
              if(data && data.length == 10 ){
              }else{
                  that.setState({
                      loading:false,
                      completed:true,
                  })
              }
          }
      })
      .catch(err => {
          Toast.fail("网络异常");
      });
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

  render() {
    const {loading,data,completed} = this.state;
    let moreClz = classNames('new-dj-btn',{'hide':!(loading)});
    console.log(moreClz)
    let that = this;
    let lis = data.map(function(obj,i){
      return <div key={i} style={{ width:"80vw",height:obj.Address?"65px":"35px",borderRadius:"15px",padding: '15px 10px',display: '-webkit-box', display: 'flex',marginBottom:"1vh"}}>
            {getcollectDetailList(obj)}
            
            <div>
              <div style={{
                  background: obj.StatusColor, color: "#fff", width: "30px", height: "30px", marginLeft:"3px",marginBottom: '8px', borderRadius: "20px",
                  textAlign: "center", lineHeight: "30px", fontSize: 18,}}
              >{obj.billType}</div>
              {obj.Status===-2?<div><Button style={{height:"25px"}} size='small' onClick={e=>{e.preventDefault();console.log('撤回');this.cancelDeal(obj.ID);}}>撤回</Button></div>:''}
              {/* <Button style={{height:"25px"}} size='small' onClick={e=>{e.preventDefault();console.log('撤回');this.cancelDeal(obj.ID);}}>撤回</Button> */}
            </div>
          <div style={{  marginLeft:"15px" }}>
            <div style={{fontSize: 16, marginBottom: '8px',width:"48vw"}}>{obj.billTypeText}
            </div>
            <div style={{ fontSize: 12,color:'#888',marginBottom: '8px',width:"48vw"}}>{obj.ModifyTime}</div>
            {obj.Address?<div style={{ fontSize: 12,color:'#888',marginBottom: '8px',width:"48vw"}}>{obj.Address}</div>:''}
          </div>
          <div>
            <div style={{textAlign:"left",fontSize:16,fontWeight:"bold",width:"20px",height:"20px",lineHeight:"20px",marginBottom: '8px'}}><span style={{color:obj.add?colors.orange:"",textAlign:"right"}}>{obj.jiajian}{obj.OilFee}</span></div>
            <div style={{ textAlign:"left",fontSize: 12,color:'#888',marginBottom: '8px',width:"80px"}}><span>{obj.CardBalanceUse?`可集金额：${obj.CardBalanceUse}`:''}{`余额：${obj.CardBalance}`}</span></div>
          </div>
        </div>
    })
    // const row = (rowData, sectionID, rowID) => {
    //   if(data){
    //     if (index >data.length-1) {
    //       index = 0;
    //     }
    //   }
    //   else{
    //     console.log('data is null');
    //     data=[];
    //   }
    //   const obj = data[index++];
    //   return (
    //   <div>
    //     {obj!==undefined?
    //     <div key={rowID} style={{ width:"80vw",height:obj.Address?"65px":"35px",borderRadius:"15px",padding: '15px 10px',display: '-webkit-box', display: 'flex',marginBottom:"1vh"}}>
    //         {getcollectDetailList(obj)}
    //         <div>
    //           <div style={{
    //               background: obj.StatusColor, color: "#fff", width: "30px", height: "30px", marginLeft:"3px",marginBottom: '8px', borderRadius: "20px",
    //               textAlign: "center", lineHeight: "30px", fontSize: 18,}}
    //           >{obj.billType}</div>
    //           {obj.Status===-2?<div><Button style={{height:"25px"}} size='small' onClick={e=>{e.preventDefault();console.log('撤回');this.cancelDeal(obj.ID);}}>撤回</Button></div>:''}
    //           {/* <Button style={{height:"25px"}} size='small' onClick={e=>{e.preventDefault();console.log('撤回');this.cancelDeal(obj.ID);}}>撤回</Button> */}
    //         </div>
    //       <div style={{  marginLeft:"15px" }}>
    //         <div style={{fontSize: 16, marginBottom: '8px',width:"48vw"}}>{obj.billTypeText}
    //         </div>
    //         <div style={{ fontSize: 12,color:'#888',marginBottom: '8px',width:"48vw"}}>{obj.ModifyTime}</div>
    //         {obj.Address?<div style={{ fontSize: 12,color:'#888',marginBottom: '8px',width:"48vw"}}>{obj.Address}</div>:''}
    //       </div>
    //       <div>
    //         <div style={{textAlign:"left",fontSize:16,fontWeight:"bold",width:"20px",height:"20px",lineHeight:"20px",marginBottom: '8px'}}><span style={{color:obj.add?colors.orange:"",textAlign:"right"}}>{obj.jiajian}{obj.OilFee}</span></div>
    //         <div style={{ textAlign:"left",fontSize: 12,color:'#888',marginBottom: '8px',width:"80px"}}><span>{obj.CardBalanceUse?`可集金额：${obj.CardBalanceUse}`:''}{obj.CardBalance?`余额：${obj.CardBalance}`:''}</span></div>
    //       </div>
    //     </div>:''}
    //     </div>
    //   );
    // };
    return (
      <LoadMore loading={loading}
          completed={completed}
          onLoadMore={this.handleLoadMore}  
          distance={20}
          indicator={{
              loading:<div className='new-dj-btn'>加载中...</div>,
              completed:<div className='new-dj-btn'>没有更多</div>
          }
      }
      >
          <ul className="card-detail-list">
              {lis}
          </ul>
      </LoadMore>
    );
  }
}

export default ListViewOilcardDealDetails;
