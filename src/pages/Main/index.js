
import React, { Component } from 'react';
import {Modal,Toast,Button} from 'antd-mobile';
import { Link } from "react-router-dom";
import './main.less';

import mainLoading from '@/res/mainloading.svg'; 
import app_icon from '@/res/yeheavada@3x.png';
import temp_avatar from '@/res/avatar.png';
import loadingSvg from '@/res/loading.svg';
import msgSendingSvg from '@/res/msg.svg';
import sendFailSvg from '@/res/sendfail.svg';
import closeSvg from '@/res/close.svg';

import SimpleModal from  '@/components/SimpleModal';
import {isInWeiXin,getUrlParam} from '@/utils/Tools';


import {getToken} from '@/services/api';

// type 0是发  1是收
const  data = [
    {"send_loading":true,"userid":"","type":"0","username":"../../assets/avatar.png","avatar":"","message":"可将团队的其他小程序添加展示在小程序的资料页"},
    {"userid":"","username":"小助手","type":"1","avatar":"../../assets/avatar.png","message":"可将团队的其他小程序添加展示在小程序的资料页"},
    {"userid":"","type":"0","username":"../../assets/avatar.png","avatar":"","message":"fdsfds"},
    {"userid":"","username":"小助手","type":"1","avatar":"../../assets/avatar.png","message":"sdfsdf"},
    {"userid":"","type":"0","username":"../../assets/avatar.png","avatar":"","message":"woshini",send_result:false},
    {"userid":"","username":"小助手","type":"1","avatar":"../../assets/avatar.png","message":"inihsow"},
    {"userid":"","type":"0","username":"../../assets/avatar.png","avatar":"","message":"qqqq"},
    {"userid":"","type":"0","username":"../../assets/avatar.png","avatar":"","message":"张铮"},
    {"userid":"","username":"小助手","type":"1","avatar":"../../assets/avatar.png","message":"铮张"},
    {"userid":"","type":"0","username":"../../assets/avatar.png","avatar":"","message":"非多福多寿"},
    {"userid":"","username":"小助手","type":"1","avatar":"../../assets/avatar.png","message":"寿多福多非"},
    {"userid":"","type":"0","username":"../../assets/avatar.png","avatar":"","message":"房贷首付"},
    {"userid":"","username":"小助手","type":"1","avatar":"../../assets/avatar.png","message":"付首贷房"},
    {"userid":"","type":"0","username":"../../assets/avatar.png","avatar":"","message":"fds"},
    {"userid":"","username":"小助手","type":"1","avatar":"../../assets/avatar.png","message":"sdf"},
    {"userid":"","type":"0","username":"../../assets/avatar.png","avatar":"","message":"test"},
    {"userid":"","username":"小助手","type":"1","avatar":"../../assets/avatar.png","message":"tset"},
    {"userid":"","type":"0","username":"../../assets/avatar.png","avatar":"","message":"yrdy"},
    {"userid":"","username":"小助手","type":"1","avatar":"../../assets/avatar.png","message":"ydry"},
    {"userid":"","type":"0","username":"../../assets/avatar.png","avatar":"","message":"ff"},
    {"userid":"","username":"小助手","type":"1","avatar":"../../assets/avatar.png","message":"ff"},
    {"userid":"","type":"0","username":"../../assets/avatar.png","avatar":"","message":"fdsf"},
    {"userid":"","username":"小助手","type":"1","avatar":"../../assets/avatar.png","message":"fsdf"}]
const CHATKEY = 'CHATKEY';

const appid = 'wxc67539da0be022b4';
const redirect_uri	= encodeURI('http://senioryehe.com/');

let messageData = localStorage.getItem(CHATKEY) || [];
export default class Main extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            modalShow:false,
            loading:true,
            data:[],
            scrollTop: 0,
            userInfo:{
                avatarUrl:'',
            },
            value:''
        })
    }
    connect = (userid) =>{
        const that = this;
        this.userid = userid;
        var url = "http://senioryehe.com/yehe/ws";
		var sock = new window.SockJS(url);
        var ws = window.Stomp.over(sock);
        window.ws = ws;
		// var userId = "aaaa-ddd-4dsdd-43a";
		var payload = {
			"userId": userid,
			"content": ""
		};
		ws.connect({}, function() {
            // alert("connect");
            that.connectStatus = 1;//链接成功;
			ws.send("/app/consult", {}, JSON.stringify(payload));
			ws.subscribe("/topic/"+userid, function(resp) {
                console.log(resp.body);
                const messageobj = resp.body ? JSON.parse(resp.body) : {}
                const {sessionId,message,messageType,greet,type} = messageobj;
                let { data }= that.state;

                // {
                // "type":"4",
                // "messageType":0,
                // "greet":{
                //     "id":3,
                //     "img":"[]",
                //     "createTime":"2019-11-29 00:26:50",
                //     "updateTime":"2019-11-29 00:26:50",
                //     "greetExtendsList":[
                //         {"content":"我就是也贺，能帮你找资料找素材，需要什么可以找我要。🦄\n别问都能找什么，我不敢说。😝"},
                //         {"content":"有好玩的行业新闻我会推给你，记得经常来摸鱼鸭"}]
                //     }
                // }

                if(type == 4 && greet){
                    console.log(greet);
                    const {greetExtendsList} = greet;
                    greetExtendsList.forEach(function(item){
                        const {content} = item;
                        data.push({
                            "userid":sessionId,
                            "username":"小助手",
                            "type":"1",
                            "avatar":"../../assets/avatar.png",
                            // sessionId,
                            message:content,
                            messageType:0
        
                        })
                    })
                }else{
                    data.push({
                        "userid":sessionId,
                        "username":"小助手",
                        "type":"1",
                        "avatar":"../../assets/avatar.png",
                        // sessionId,
                        message,
                        messageType,
                        ...messageobj
    
                    })
                }

                // {"sessionId":"71e68aa6ec864673a66f2b38dcfd6e30","message":"您这个问题太难了，也贺还不能解答，我会好好努力学习的！","messageType":0}
               
                console.log(data);
                that.setState({
                    data
                })
			});
		}, function(err) {
			alert(err);
        });
    }
    componentDidMount() {
        // this.connect();

        let that = this;

        
        let token = localStorage.getItem('token');
        let userid = localStorage.getItem('userid');
        // alert("token:   "+token)
        if(!token){
            // 在微信打开情况 去获取token
            if(isInWeiXin()){
                const code = getUrlParam('code');
                const state = getUrlParam('state');
                if(code){
                    // 获取到code 情况下，去后端请求openID
                    console.log('微信授权code===')
                    console.log(code)
                    getToken(code,state).then(function(res){
                        console.log(res)
                        console.log('+++++++++')
                        const { status ,errorCode,errorDescription,entity} = res;
                        // {"status":"FAIL","errorCode":4002005,"errorDescription":"获取微信 access_token 时失败: 40029-invalid code, hints: [ req_id: JkoffDYIRa-4pzZoa ]"}
                        if(status == "OK"){
//                             refreshToken: "eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1NzUxMjQ0NTUsImp0aSI6IlVfU0htSkNfUXM2dUlOekpqSHUybXciLCJzdWIiOiJ7XCJ1c2VySWRcIjpcIjBmMDExZTYzLWRkYWItNDZiNS1hNzQ3LWIwZDYwYjI1YTRkMVwiLFwidG9rZW5cIjpcImV5SmhiR2NpT2lKSVV6VXhNaUo5LmV5SmxlSEFpT2pFMU56VXdNems0TlRVc0ltcDBhU0k2SWpGc1VEUm5lV2szWHpJMVNFZExNalJEV2pOUWNVRWlMQ0p6ZFdJaU9pSjdYQ0oxYzJWeVNXUmNJanBjSWpCbU1ERXhaVFl6TFdSa1lXSXRORFppTlMxaE56UTNMV0l3WkRZd1lqSTFZVFJrTVZ3aWZTSjkucE5sd2p0TGc5emQzSTBkbFBjODYycFNuVlduM1VWaEJ3YTU2eWdDU2FfTFJQVXhISld2YTFkVFNfUlJQUF81cGhaSkZUWURFU0hvTkRNZFFiYTJTb2dcIn0ifQ.VOQdk6UdoEAiBGojxlmcCpq-taZf11A9vjhlkERENOYAoxr9l0yOl3IFF2unsA_GA4iRp-Z1zTuXWIRnnY2CvA"
// token: "eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1NzUwMzk4NTUsImp0aSI6IjFsUDRneWk3XzI1SEdLMjRDWjNQcUEiLCJzdWIiOiJ7XCJ1c2VySWRcIjpcIjBmMDExZTYzLWRkYWItNDZiNS1hNzQ3LWIwZDYwYjI1YTRkMVwifSJ9.pNlwjtLg9zd3I0dlPc862pSnVWn3UVhBwa56ygCSa_LRPUxHJWva1dTS_RRPP_5phZJFTYDESHoNDMdQba2Sog"
// userId: "0f011e63-ddab-46b5-a747-b0d60b25a4d1"
                            const {refreshToken,token,userId} = entity;
                            localStorage.setItem('token',token)
                            localStorage.setItem('refreshToken',refreshToken)
                            localStorage.setItem('userId',userId)

                            // 获取token成功后 关闭loading
                            setTimeout(function(){
                                that.setState({
                                    loading:false
                                })
                            },1000)
                            that.connect(userId);
                        }else if(status == "FAIL"){
                            if(errorCode == '4002006'){
                                // openid不存在
                                // const appid = 'wxc67539da0be022b4';
                                // const redirect_uri	= encodeURI('http://senioryehe.com/');
                                let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=register#wechat_redirect`;

                                window.location.href = url;
                            }else{
                                Toast.fail("errorDescription");
                            }
                            
                            
                        }
                    })
                }else{
                    // const appid = 'wxc67539da0be022b4';
                    // const redirect_uri	= encodeURI('http://senioryehe.com/');
                    let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base&state=check#wechat_redirect`;

                    window.location.href = url;
                }
            }
        }else{
            setTimeout(function(){
                that.setState({
                    loading:false
                })
            },1000)
            that.connect(userid);
        }
        
        
    }
    onChange(e){
        const {value} = e.target;
        //发送文字
        this.setState({
            value
        })
    }
    handleEnterKey = (e) =>{
        if(e.nativeEvent.keyCode === 13){ //e.nativeEvent获取原生的事件对像
            this.send()
       }
    }

    gotoBottom = () =>{
        document.getElementsByClassName('chat-main-panel')[0].scrollTop = 10000
    }
    clearInput =()=>{ //清空input
        this.setState({
            value:""
        })
    }
    send = () =>{
        //发送
        const {value,data} = this.state;
        data.push(
            {
            "send_loading":true,
            "userid":"",
            "type":"0",
            "username":"../../assets/avatar.png",
            "avatar":"",
            "message":value
        })
        this.setState({
            data
        },function(){
            this.gotoBottom();
        });

        //真的去发送消息给后台
        if(this.connectStatus ==1){
            var payload = {
                "userId": this.userid,
                "content": value
            };
            window.ws.send("/app/consult", {}, JSON.stringify(payload));
        }
        this.clearInput();
        
    }

    toggleModal = () => {
        const { modalShow } = this.state;
        this.setState({
            modalShow:!modalShow
        })
    }


    closeModal = () => {
        this.setState({
            modalShow:false
        })
    }

    renderRecivedMsg = (item) =>{//收到的消息渲染
        const {type,message,send_loading,send_result,messageType,recommendList} = item;

        // {"sessionId":"18853c4fd76649d997b2a48b383e07f9",
        // "message":"您要找的是哪个呢？",
        // "messageType":2,
        // "recommendList":[
        //     {"knowledgeId":"1000832152","answerSource":"RECOMMEND","title":"UI群英汇，用户体验交互视觉设计方法论电子书"}
        // ]
        // }
        let msgDom = '';
        switch(messageType){
            case 0:// 纯文本或者闲聊(直接展示)，
                msgDom = (<span className='user-text'>{message}</span>)
                break;
            case 1://知识库（对应knowledge）,富文本类型html
                msgDom = (<span className='user-text' dangerouslySetInnerHTML={{__html: message}}></span>)
                break;
            case 2://推荐选项（对应recommendList）
                msgDom = (
                    <ul className="item-l-choices">
                    <p className='choice-item-title'>{message}</p>
                        {recommendList.map(function(item){
                            const {title,knowledgeId,answerSource} = item;
                            return <li knowledgeId={knowledgeId} answerSource={answerSource}>{title}</li>
                        })}
                </ul>
               );
                break;
            case 3://资源卡(对应resourceList)，
                msgDom = (<div className='item-l-card'>
                    <img src='https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1820747320,1554574827&fm=26&gp=0.jpg' className='card-img'/>
                    <div className='card-r'>
                        <p>什么什么样的素材</p>
                        <span>一行小描述一行小描述一行小描述一行小哈</span>
                    </div>
                </div>)
                break;
            case 4://打招呼（对应greet）
                msgDom = (<span className='user-text'>{message}</span>)
                break;
            default:
                msgDom = (<span className='user-text'>fdsfds</span>)

        }
        return msgDom;
    }

    renderMsgList(){
        const {data,userInfo,value} = this.state;

        return data.map((item,i) =>{
            const {type,username,message,send_loading,send_result,messageType} = item;
            if(type == 1){
                return <div className='l' key={i}>
                    <div className='item'>
                        <div className='item-l'>
                            {this.renderRecivedMsg(item)}
                            {/* <div className='item-l-card'>
                                <img src='https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1820747320,1554574827&fm=26&gp=0.jpg' className='card-img'/>
                                <div className='card-r'>
                                    <p>什么什么样的素材</p>
                                    <span>一行小描述一行小描述一行小描述一行小哈</span>
                                </div>
                            </div> */}
                            {/* <ul className="item-l-choices disable">
                                <li>你选A</li>
                                <li>你选B</li>
                                <li>你选C</li>
                            </ul> */}
                            {/* <span className='user-text'>{item.message}</span> */}
                            {/* <img className='user-img' src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1820747320,1554574827&fm=26&gp=0.jpg"></img> */}
                        </div>
                    </div>
                </div>
            }else{
                return <div className='r' key={i}>
                <div className='item'>
                    <div className='item-r'>
                        {send_loading && <img src={msgSendingSvg} className='msg_sending'/>}
                        {send_result!= undefined && !send_result && <img src={sendFailSvg} className='msg_sendfail'/>}
                        <span className='user-text'>{item.message}</span>
                    </div>
                  {/* <img className='item-l' src={temp_avatar} background-size="cover"></img> */}
                </div>
              </div> 
            }
            
        })
        
    }
    render() {
        const {loading,value,modalShow} = this.state;
        return <div className='home-wrap homelayout'>
            {
                loading? <img src={mainLoading} className='mainloading'/>:(
                <div className='main-content'>
                    
                    <div className='app-icon-wrap' onClick={this.toggleModal}>
                        <img src={app_icon} className='app-icon'/>
                        <span className='noti-dot'></span>
                    </div>
                    <div className='chat-window'>
                        <p className='top-indicator'>
                            {/* <span className="color1"></span>
                            <span className="color2"></span>
                            <span className="color3"></span> */}
                            <img src={loadingSvg} />
                        </p>
                        <div className='chat-main-panel'>
                            <div className='chat-inner-wrap'>
                                {this.renderMsgList()}
                            </div>
                        </div>
                        <div className="input-wrap">
                            <input value={value} placeholder="说点什么吧..." onKeyPress={this.handleEnterKey} onChange={this.onChange.bind(this)}></input>
                        </div>
                    </div>
                    
                    
                    {/* <div className="detail-window">
                        <img src={closeSvg} className='close-btn'/>
                        <div className="detail-wrap">
                            <div className="multi-banner">
                                <img className='' src='https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1820747320,1554574827&fm=26&gp=0.jpg'/>
                                <img className='' src='https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1820747320,1554574827&fm=26&gp=0.jpg'/>
                            </div>
                            <div className="multi-banner">
                                <img className='' src='https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1820747320,1554574827&fm=26&gp=0.jpg'/>
                            </div>
                            <img className='single-banner' src='https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1820747320,1554574827&fm=26&gp=0.jpg'/>
                            <h3>游戏电子虚拟交易类电商</h3>
                            <p>
                                <span className="tag">sketch</span>
                                <span className="tag">sketch</span>
                                <span className="tag">sketch</span>
                                <span className="tag">sketch</span>
                            </p>
                            <div className="wangpan-address">
                                <p className="link-info">
                                    链接:https://pan.baidu.com/s/19pNAsmsFGTdert 密码:2he4
                                </p>
                                <span className="copy-btn">复制</span>
                            </div>
                            <article> 
                            We are very happy to present to you Le Trip – Travel planner UI KIT, a modern, trendy and minimal application to support self-sufficient travelers with the simplest, most effective preparation. With the outstanding feature of automatic scheduling, discovering surrouding services at destinations, and a community to connect and share your journey. 
                            </article>
                        </div>
                    </div> */}
                    <SimpleModal show={modalShow} closeFun={this.closeModal}/>
                </div>)
            }
        </div>
    }
}