/*
 * @Author: wxh4321
  * @Date: 2019-08-05 16:14:55
 * @Last Modified by: wxh
 * @Last Modified time: 2019-09-09 11:40:18
  */
 import React,{Component} from 'react'
 import { ListView,Flex,Button,Icon,Steps,WhiteSpace} from 'antd-mobile';
 import {getapplyTypeAndColor} from '@/utils/utilOilcard';
 import {requestOilApplyOperateList,queryOilApplyOperateList} from '@/services/api';
 import console from '@/utils/consoleprintControl';//控制打印
 import LoadMore from '@/components/LoadMore';
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
      //  item:[],
      // //  hasDetailsMessage:[],
      //  hasMore:true,
      //  detaildata:[],
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
     this.loadData();
   }
   
   loadData = async()=>{
     var params = this.props.params;
     if(!params){
       params = this.state.params; 
     }
    //  const response = requestOilApplyOperateList(params);
     try {
      const res = await requestOilApplyOperateList(params);
      // console.log(res);
      if (res.code === 200) {
        data = res.data;
        if (res.data !== undefined) {
          NUM_ROWS = res.data.length;
        }
        else {
          NUM_ROWS = 0;
        }
        setTimeout(()=>{
          this.init_data();
         },800);
         setTimeout(() => {
           this.rData = genData();
           this.setState({
             dataSource: this.state.dataSource.cloneWithRows(this.rData),
             isLoading: false,
           });
         }, 600);
         
      }
    } catch (err) {
      console.log(err);
    }
    //  response.then((res)=>{
    //    console.log(res);
    //    if(res.code===200){
    //      data = res.data;
    //     if(res.data!==undefined){
    //       NUM_ROWS=res.data.length;
    //     }
    //     else{
    //       NUM_ROWS=0;
    //     }
    //    }
    //  }).catch(err=>console.log(err));
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
            count=res.data.length;
            this.setState({detaildata:res.data});
          }
          else{
            count=0;
            this.setState({detaildata:[]});
          }
       }
     }).catch((err)=>{console.log(err)});
   }
  
   init_data = ()=>{
     console.log("item init ....");
     const tmp_item = this.state.item;
    //  const tmp_detailsMessage = this.state.hasDetailsMessage;
     for(let i=0;i<data.length;i++){
       tmp_item[i] = false;
      //  tmp_detailsMessage[i] = false;
     }
     this.setState({item:tmp_item});
    //  this.setState({hasDetailsMessage:tmp_detailsMessage});

   }
   
  //  onEndReached = (event) => {
  //    // load new data
  //    // hasMore: from backend data, indicates whether it is the last page, here is false
  //    if (!this.state.hasMore) {
  //      return;
  //    }
  //    console.log('reach end', event);
  //    this.loadData();
  //    this.setState({ isLoading: true });
  //    setTimeout(() => {
  //      this.rData = { ...this.rData, ...genData(++pageIndex) };
  //      this.setState({
  //        dataSource: this.state.dataSource.cloneWithRows(this.rData),
  //        isLoading: false,
  //      });
  //    }, 1000);
  //  }
 
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
     let index = 0;
     let index1 = 0;
     const row = (rowData, sectionID, rowID) => {
       if (index >data.length-1) {
         index = 0;
       }
       const obj = data[index++];
       return (
         <div>
         {obj!==undefined?
         <div key={rowID} style={{ padding: '0 5px',display: '-webkit-box', display: 'flex'}}>
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
                 style={{paddingLeft:'5px',paddingRight:'5px',height:"20px",lineHeight:"22px",borderRadius:"35px",textAlign:"center",fontSize:12
                 ,marginBottom: '8px',border:"1px solid #FF6E27",color:"#FF6E27"}}
                 onClick={(e)=>{
                   e.isDefaultPrevented();
                   this.submitqueryapplicationDetails(obj);
                   setTimeout(()=>{
                      const tmp_item = this.state.item;
                      tmp_item.map((value,index)=>{
                        if(index==rowID){
                          if(value){tmp_item[rowID]=false;}else{tmp_item[rowID]=true;}
                        }
                      });
                      this.setState({item:tmp_item});
                      // const tmp_detailsMessage = this.state.hasDetailsMessage;
                      // tmp_detailsMessage.map((value,index)=>{
                      //   if(index==rowID){
                      //     if(value){tmp_detailsMessage[rowID]=false;}else{tmp_detailsMessage[rowID]=true;}
                      //   }
                      // });
                      // this.setState({hasDetailsMessage:tmp_detailsMessage});
                   },100);
                 }}
               >详情<Icon style={{width:"13px",height:"13px",lineHeight:"15px",verticalAlign:'text-top'}} type={!this.state.item[rowID]?"down":"up"} /></Button>
             </Flex>
           </div>
         </div>:null}
         {this.state.item[rowID]?
          <div style={{ padding: '0 15px',}}>
          <div style={{fontSize: 14,fontWeight: "bold",paddingTop:"8px",borderTopColor:"#eee",borderTopStyle:"solid",borderTopWidth:"1px"}}>
            <Flex><div style={{ width: "4px", height: "13px", background: "#ff650b", marginRight: "2px",borderRadius:"1px" }}/>申请流程
            {obj.CanBuKa?<div style={{width:"66vw"}}><Button  style={{float:"right",width:"48px",height:"20px",lineHeight:"22px",textAlign:"center",fontSize:10
                 ,background:"#FF6E27",color:"#fff"}}
                 onClick={()=>{window.location.href = '/oilcard/entityCardreissue/'+obj.OilCardNo;}}
                 >补卡</Button></div>:''}
            </Flex>
            </div>
          <WhiteSpace size="lg" />
          <Steps current={count} style={{fontSize:14}}>
            { 
              this.state.detaildata.map((data)=>{
                return(
                  <Step key={index1++} title={data.OperateResult} status="finish" description={data.OperateTime}/>
                );
              })
            }
            {/* <Step title="寄出油卡" status="finish" description="time1 time2 "/>
            <Step title="Step 2" status="finish"/>
            <Step title="Step 3" status="finish"/>
            <Step title="Step 4" /> */}
          </Steps>
        </div>:!this.state.item[rowID]?'':<span style={{padding: '0 15px',}}>暂无信息</span>
         }
         </div>
       );
     };
     return (
       <ListView
         ref={el => this.lv = el}
         dataSource={this.state.dataSource}
         // renderHeader={() => <span>header</span>}
         renderFooter={() => (<div style={{ padding: 15, textAlign: 'center' }}>
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
        //  onEndReached={this.onEndReached}
         onEndReachedThreshold={10}
       />
     );
   }
 }
 
 export default ListView1;
 