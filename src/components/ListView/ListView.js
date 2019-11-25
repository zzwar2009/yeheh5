/*
 * @Author: wxh4321
  * @Date: 2019-08-05 16:14:55
 * @Last Modified by: wxh
 * @Last Modified time: 2019-09-09 11:40:18
  */
 import React,{Component} from 'react'
 import { withRouter } from "react-router-dom";
 import { ListView,Flex,Button,Icon,Steps,WhiteSpace,Toast} from 'antd-mobile';
 import {getapplyTypeAndColor} from '@/utils/utilOilcard';
 import {requestOilApplyOperateList,queryOilApplyOperateList} from '@/services/api';
 import console from '@/utils/consoleprintControl';//控制打印
 import LoadMore from '@/components/LoadMore';
 var classNames = require('classnames');

 const Step = Steps.Step;
 
 let that;
 class ListView1 extends Component {
   constructor(props) {
     super(props);
     that = this;
     this.state = {
      //  dataSource,
      //  isLoading: true,
      //  height: document.documentElement.clientHeight*2/3,
      // item:[],// 记录展开收起
      hasDetailsMessage:[],
      //  hasMore:true,
      // detaildata:[], // 详情数据

      applyInfoList:[], // 申请列表具体数据[{},{applyno:1111,show::true/false,data:[{},{},{}]}]
    
      params:{
        method:'POST',
        data:{
        "likeSearch": "",
        "typeSearch": "",
        "statusSearch": "",
        "datetimeSearch": ""
        }
      },
      data:[], //详细数据
      page:1,//第一页
      //  ps:10,//每页10条
      loading:false,
      completed:false
     };
   }
   componentDidMount() {
    //  requestOilApplyOperateList
    const {params} = this.props;
    this.setState({
      params,
    },function(){
      that.getCardData(1);
    })
    
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
      const response =  requestOilApplyOperateList(params);
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
   
   
   submitqueryapplicationDetails=(obj)=>{
     const params = {
       method:'POST',
       data:{
        "applyNo": obj.ApplyNo,
        "applyType": obj.applytype
       }
     };
     const response = queryOilApplyOperateList(params);
     response.then((res)=>{
       console.log(res);
       if(res.code===200){
          if(res.data.length!==undefined){
            // count=res.data.length;
            this.setState({detaildata:res.data});
          }
          else{
            // count=0;
            this.setState({detaildata:[]});
          }
       }
     }).catch((err)=>{console.log(err)});
   }
   open= (obj)=>{ //点击展开收起操作
    console.log(obj)
    // this.submitqueryapplicationDetails(obj);
    let {applyInfoList} = this.state;
    const {history} = this.props;
    history.push({ 
      pathname:'/oilcard/applystep',
      state:obj 
    })
    // history.push(`oilcard/applystep/applyno/${obj.ApplyNo}/type/${obj.applytype}`)
    // applyInfoList.push({
    //   'id':obj.applyNo,
    //   'show':1,
    //   'data':
    // })
  }
   render() {
    const {loading,data,completed} = this.state;
    let moreClz = classNames('new-dj-btn',{'hide':!(loading)});
    console.log(moreClz)
    let that = this;
    let lis = data.map(function(obj,i){
      return <div key={i}>
             <div  style={{ padding: '0 5px',display: '-webkit-box', display: 'flex',borderBottom:'1px solid rgba(0,0,0,0.1)'}}>
                {getapplyTypeAndColor(obj)}
                <div style={{  padding: '5px 0',width:'100%' }}>
                  <Flex style={{
                    display:'flex',
                    justifyContent:'space-between'
                  }}>
                      <div style={{fontSize: 14, marginBottom: '8px'}}> 申请单号：{obj.ApplyNo}
                      </div>
                      <div style={{
                        background:obj.bgcolor, color: "#fff",paddingLeft:'5px',paddingRight:'5px', height: "22px",marginBottom: '8px' ,borderRadius: "10px",
                        textAlign:"center",lineHeight:"22px",fontSize:12,'whiteSpace': 'nowrap'
                      }}>{obj.ApplyType}</div>
                  </Flex>
                  <div style={{ fontSize: 14,marginBottom: '8px'}}>申请时间：{obj.CreateTime}</div>
                  <Flex style={{
                    display:'flex',
                    justifyContent:'space-between'
                  }}>
                    <div style={{fontSize: 14, marginBottom: '8px',width:"70vw"}}>
                      <span style={{ fontSize: 14 }}>申请卡号：{obj.OilCardNo}</span>
                    </div>
                    <Button 
                      style={{paddingLeft:'10px',paddingRight:'10px',height:"20px",lineHeight:"20px",borderRadius:"8px",textAlign:"center",fontSize:12
                      ,marginBottom: '8px',border:"1px solid #FF6E27",color:"#FF6E27"}}
                      onClick={()=>{
                        that.open(obj)
                      }}
                    >详情</Button>
                  </Flex>
                </div>
            </div>
            
        </div>
    })
  
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
 
 export default withRouter(ListView1);
 