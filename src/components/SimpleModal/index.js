
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


        const headeritems = ['勾搭指南','版本功能'].map((current,index) =>{
            let  clstabheaderitem = classNames('tab-header-item',{"active":index==activeIndex})
        return <li className={clstabheaderitem} onClick={(e) => { e.stopPropagation();this.openTab(index)} }>{current}</li>
        })
        const contentitems = [0,1].map((index) =>{
            let  clscontentitem = classNames('tab-content',{"active":index==activeIndex})
            if(index ==0){
                return <div className={clscontentitem}>
                        <img src={s_banner1} className='s_banner'/>
                        <p className='somequestion'>“今天有什么好文推荐？”</p>
                        <p className='somequestion'>“帮我找套视频社交产品的UI模板”</p>
                        <p className='somequestion'>“《交互设计精髓》电子书有吗”</p>
                        <p className='somequestion'>“想看帅哥美女图~”</p>
                        <p className='somequestion'>“上班摸鱼，有小丑的电影资源吗”</p>
                        <p className='somequestion'>……</p>
                </div>
            }
            if(index == 1){
                return <div className={clscontentitem}>
                    <img src={s_banner2} className='s_banner2'/>
                    <p className='version-text'>加入产品开发社区，共同调教也贺</p>
                    <p className='version-text'><span className='imp'>成为</span>AI 语聊训练师</p>
                    <p className='version-text'><span className='imp'>解锁</span>发语音、发图片功能</p>
                    <p className='version-text'><span className='imp'>解锁</span>分类收藏功能</p>
                    <p className='version-text'><span className='imp'>获得</span>永久免费体验权 ……</p>
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