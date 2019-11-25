import React from 'react'
import { SwipeAction,Toast,Modal} from 'antd-mobile';
import {queryCBSoilcardlist,queryCbsoilcardzrlist,unbindOilCardCbsUse} from '@/services/api';
import {getOilCardList,getRewardWay} from '@/utils/utilOilcard';
import LoadMore from '@/components/LoadMore';
import { Item } from 'antd-mobile/lib/tab-bar';
let logo = require('@/res/中石化logo.png');
var classNames = require('classnames');
const alert = Modal.alert;


const images = {0:logo};
let that;
class ListView2 extends React.Component {
  constructor(props) {
    super(props);
    that = this;

    this.state = {
      // dataSource,
      // isLoading: true,
      // height: document.documentElement.clientHeight*1/2,
      // res:{},
      params :{
        "method":"POST",
        "data":{
         "cardType": 0,
         "where": "",
         "page": 1,
         "pageSize": 10
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
    var params = this.state.params;
    const newdata = this.props.params;
    if (params.data.cardType !== newdata.data.cardType) {
      params.data.cardType = newdata.data.cardType;
      // if(params.data.where){params.data.where="";}
    }
    if (params.data.where.toString() !== newdata.data.where.toString()) {
      params.data.where = newdata.data.where;
    }
    this.setState({params:params});
    this.getCardData(1);
  }
  
  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.dataSource !== this.props.dataSource) {
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
  //     });
  //   }
  // }
  

  
  unBindCard = (obj)=>{
    const params = {
      method:"POST",
      data:{
        cardAlias: obj.PlateNum,
        cardMobile: obj.CardMobile,
        oilCard: obj.OilCardNo
      }
    };
    const response = unbindOilCardCbsUse(params);
    response.then((res)=>{
      if(res.description){
        Toast.info(res.description);
      }
      if(res.code===200){
        this.props.refreshList();
      }
    }
    ).catch(err=>console.log(err));
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
      const response =  queryCBSoilcardlist(params);
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
                  let newData = that.state.data.concat(res.data);
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
  render() {
    const {loading,data,completed} = this.state;
    let moreClz = classNames('new-dj-btn',{'hide':!(loading)});
    console.log(moreClz)
    let that = this;
    let lis = data.map(function(obj,i){
        return (
          <div className='service-card-item' key={i}>
             <SwipeAction
              style={{ backgroundColor: 'white' }}
              right={[
                {
                  text: '解绑',
                  onPress: () => {
                    console.log('解绑');console.log(obj)
                    alert('提示', '确定要解绑如下油卡吗？    \r\n' +obj.PlateNum+'('+obj.CardMobile+')', [
                      { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
                      { text: '确定', onPress: () => {
                        that.unBindCard(obj)}
                      }
                    ]);
                  },
                  style: { backgroundColor: '#FF6E27', color: 'white' },
                },
              ]}
              onOpen={() => console.log('open')}
              onClose={() => console.log('close')}
            >
            {/** 油卡主界面*/}
          {obj!==undefined?
          <div className="listview-oilcard-info"
                    onClick={()=>{that.props.showActionSheet(obj);
                    }}
                >
                    {getOilCardList(obj) }{getRewardWay(obj)}
                    <img className="listview-oilcard-info-img" src={obj.picture} alt="" />
                    <div className="listview-oilcard-info-div1">
                        <div
                            className="listview-oilcard-info-div1-div11"
                        >{obj.PlateNum}{`(${obj.CardMobile})`}</div>
                        <div className="listview-oilcard-info-div1-div12">
                            <div className="listview-oilcard-info-div1-div12-div121">油卡卡号：{obj.OilCardNo}</div>
                            <div className="listview-oilcard-info-div1-div12-div122">最后一次充值<span className="listview-oilcard-info-div1-div12-div122-span1">{parseFloat(obj.LastOilFee).toFixed(2)}</span>元，油卡余额<span className="listview-oilcard-info-div1-div12-div122-span1">{parseFloat(obj.CardBalance).toFixed(2)}</span>元</div>
                            <div><span className="listview-oilcard-info-div1-div12-span1">备注：{obj.Remark}</span></div>
                        </div>
                    </div>
                    {obj.rewardway&&obj.RewardRatio!==0.0?
                    <div className="listview-oilcard-info-cardinfo-red-flag">
                        <p className="listview-oilcard-info-cardinfo-red-flag-p1">{`${parseFloat(obj.RewardRatio * 100).toFixed(2)}%`}</p>
                        <p className="listview-oilcard-info-cardinfo-red-flag-p2">{obj.rewardway}</p>
                    </div>:''}
                </div>
              :''}
            </SwipeAction>
          </div>
        );


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

export default ListView2;