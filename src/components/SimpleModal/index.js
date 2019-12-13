
import React, { Component } from 'react';
import s_banner1 from '@/res/s_banner1.png';

import s_banner2 from '@/res/s_banner2.png';
import { supportsHistory } from 'history/DOMUtils';
var classNames = require('classnames');
export default class SimpleModal extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            show:props.show,
            activeIndex:0,
        })
    }
    
    componentDidMount() {
        
    
    }

    openTab = (index) =>{
        //点击切换
        this.setState({
            activeIndex:index
        })
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            show:nextProps.show
        })
    }
    render() {
        const {show,activeIndex} = this.state;
        const {closeFun} = this.props;
        let  clsNames = classNames('page-mask',{"hide":!show});
        // let  clstabheaderitem = classNames('tab-header-item,{"active":!show});


        const headeritems = ['对话指南','研发社区'].map((current,index) =>{
            let  clstabheaderitem = classNames('tab-header-item',{"active":index==activeIndex})
        return <li key={index} className={clstabheaderitem} onClick={(e) => { e.stopPropagation();this.openTab(index)} }>{current}</li>
        })
        const contentitems = [0,1].map((index) =>{
            let  clscontentitem = classNames('tab-content',{"active":index==activeIndex})
            if(index ==0){
                return <div className={clscontentitem} key={"fffff"}>
                        <p className='somequestion'>也贺会主动推送优质内容<br/>记得有空常来看看鸭</p>
                        <p className='somequestion-t'>搜索行业资源</p>
                        <p className='somequestion-d'>“帮我找社交类的sketch资源”</p>
                        <p className='somequestion-t'>储存行业知识</p>
                        <p className='somequestion-d'>“手机状态栏高度是多少”</p>
                        <p className='somequestion-t'>整合行业信息</p>
                        <p className='somequestion-d'>“今天的推荐文章”</p>
                        <p className='somequestion-t'>蕴藏娱乐资源</p>
                        <p className='somequestion-d'>“电影：小丑”</p>
                        <p className='somequestion-d'>……</p>
                </div>
            }
            if(index == 1){
                return <div className={clscontentitem} key={"fdsfds"}>
                    <img src={s_banner2} className='s_banner'/>
                    <p className='somequestion-t'>扫码加入研发社区，见证AI成长</p>
                    <p className='somequestion-d'><span className='imp'>加入</span>也贺智囊团</p>
                    <p className='somequestion-d'><span className='imp'>解锁</span>隐藏语聊功能</p>
                    <p className='somequestion-d'><span className='imp'>解锁</span>分类收藏功能</p>
                    <p className='somequestion-d'><span className='imp'>获得</span>永久免费体验权</p>
                    <p className='somequestion-d'>……</p>
                </div>
            }
            
        })
        return <div className={clsNames} onClick={closeFun}>
            <div className="app-modal">
                <div className="tab-wrap">
                    <ul className='tab-header'>
                        {headeritems}
                    </ul>
                    <div className="tab-content-wrap">
                        {contentitems}
                    </div>
                </div>
            </div>
        </div>  
    }
}