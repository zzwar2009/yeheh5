import React from 'react'
import { ListView,SwipeAction,Toast} from 'antd-mobile';
import {queryCbsoilcardzrlist} from '@/services/api';
import console from '@/utils/consoleprintControl';//控制打印
import {getOilCardList} from '@/utils/utilOilcard';
import LoadMore from '@/components/LoadMore';
var classNames = require('classnames');

let that;
class CtoCTransferListView extends React.Component {
  constructor(props) {
    super(props);
    that = this;
    

    this.state = {
      data:[], //详细数据
      page:1,//第一页
      //  ps:10,//每页10条
      loading:false,
      completed:false,
      params:{},
    };
  }
  componentDidMount() {
    var params = {
      method:'POST',
      data:{
        oilCardNo: this.props.params.OilCardNo,
        where: "", 
        page: 1, 
        pageSize: 10
      }
    };
    this.setState({params:params},function(){
      that.getCardData(1);
    });
   
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
      const response =  queryCbsoilcardzrlist(params);
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
          <li  style={{"border-bottom":"1px solid rgba(0,0,0,0.1)"}}>
            <div className="listview-oilcard-info"
                  onClick={()=>{that.props.TransferKeyState('activeKey','');
                  that.props.TransferKeyState('listOn',false);
                  that.props.TransferKeyState('showinfo',true);
                  that.props.TransferKeyState('obj',obj);
                }}
            >{getOilCardList(obj)}
                <img  className="listview-oilcard-info-img" src={obj.picture} alt="" />
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
                {obj.RewardStr&&obj.RewardRatio!==0?
                <div className="listview-oilcard-info-cardinfo-red-flag">
                    <p className="listview-oilcard-info-cardinfo-red-flag-p1">{`${obj.RewardRatio}%`}</p>
                    <p className="listview-oilcard-info-cardinfo-red-flag-p2">{obj.RewardStr}</p>
                </div>:''}
            </div>
          </li>
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

export default CtoCTransferListView;