
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


import {getToken,addClickNum,getCardDetail} from '@/services/api';
const wx = window.wx;
// type 0是发  1是收
const  data = [
    // {"send_loading":true,"userid":"","type":"0","username":"../../assets/avatar.png","avatar":"","message":"可将团队的其他小程序添加展示在小程序的资料页"},
    // {"userid":"","username":"小助手","type":"1","avatar":"../../assets/avatar.png","message":"可将团队的其他小程序添加展示在小程序的资料页"},
    // {"userid":"","type":"0","username":"../../assets/avatar.png","avatar":"","message":"fdsfds"},
    // {"userid":"","username":"小助手","type":"1","avatar":"../../assets/avatar.png","message":"sdfsdf"},
    // {"userid":"","type":"0","username":"../../assets/avatar.png","avatar":"","message":"woshini",send_result:false},
    // {"userid":"","username":"小助手","type":"1","avatar":"../../assets/avatar.png","message":"inihsow"},
    // {"userid":"","type":"0","username":"../../assets/avatar.png","avatar":"","message":"qqqq"},
    // {"userid":"","type":"0","username":"../../assets/avatar.png","avatar":"","message":"张铮"},
    // {"userid":"","username":"小助手","type":"1","avatar":"../../assets/avatar.png","message":"铮张"},
    // {"userid":"","type":"0","username":"../../assets/avatar.png","avatar":"","message":"非多福多寿"},
    // {"userid":"","username":"小助手","type":"1","avatar":"../../assets/avatar.png","message":"寿多福多非"},
    // {"userid":"","type":"0","username":"../../assets/avatar.png","avatar":"","message":"房贷首付"},
    // {"userid":"","username":"小助手","type":"1","avatar":"../../assets/avatar.png","message":"付首贷房"},
    // {"userid":"","type":"0","username":"../../assets/avatar.png","avatar":"","message":"fds"},
    // {"userid":"","username":"小助手","type":"1","avatar":"../../assets/avatar.png","message":"sdf"},
    // {"userid":"","type":"0","username":"../../assets/avatar.png","avatar":"","message":"test"},
    // {"userid":"","username":"小助手","type":"1","avatar":"../../assets/avatar.png","message":"tset"},
    // {"userid":"","type":"0","username":"../../assets/avatar.png","avatar":"","message":"yrdy"},
    // {"userid":"","username":"小助手","type":"1","avatar":"../../assets/avatar.png","message":"ydry"},
    // {"userid":"","type":"0","username":"../../assets/avatar.png","avatar":"","message":"ff"},
    // {"userid":"","username":"小助手","type":"1","avatar":"../../assets/avatar.png","message":"ff"},
    // {"userid":"","type":"0","username":"../../assets/avatar.png","avatar":"","message":"fdsf"},
    // {"userid":"","username":"小助手","type":"1","avatar":"../../assets/avatar.png","message":"fsdf"}

]
const CHATKEY = 'CHATKEY';

const appid = 'wxc67539da0be022b4';
const redirect_uri	= encodeURI('http://senioryehe.com/');

let messageData = localStorage.getItem(CHATKEY) || [];
const TEXT = "TEXT";
const IMG = "IMG";
const RECOMMEND = "RECOMMEND";
const CARD = "CARD";

const GREET = "GREET";
const CHAT = "CHAT";
const ACK = "ACK";
const $ = window.$;
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
            value:'',
            waitingBack:false,
            showDetail:false,
            detailEntity:{

            }
        })

        // wx && wx.config({
        //     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        //     appId: appid, // 必填，公众号的唯一标识
        //     timestamp: '', // 必填，生成签名的时间戳
        //     nonceStr: '', // 必填，生成签名的随机串
        //     signature: '',// 必填，签名
        //     jsApiList: ['previewImage'] // 必填，需要使用的JS接口列表
        // });
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
            "content": "1",
            "action":"GREET"
		};
		ws.connect({}, function() {
            // alert("connect");
            that.connectStatus = 1;//链接成功;
            ws.send("/app/consult", {}, JSON.stringify(payload));
			ws.subscribe("/topic/"+userid, function(resp) {
                console.log("============")
                console.log(resp.body);
                console.log("============")
                const messageobj = resp.body ? JSON.parse(resp.body) : {}
                const {sessionId,message,messageType,action} = messageobj;
                let { data }= that.state;

                that.sessionId = sessionId;
                if(action == GREET){
                    // console.log(greet);
                    // const {greetExtendsList} = greet;
                    // greetExtendsList.forEach(function(item){
                    //     const {content} = item;
                    //     data.push({
                    //         "userid":sessionId,
                    //         "username":"小助手",
                    //         "type":"1",
                    //         "avatar":"../../assets/avatar.png",
                    //         // sessionId,
                    //         message:content,
                    //         messageType:0
        
                    //     })
                    // })
                }else{
                    if(action != ACK){
                        data.push({
                            // "userid":sessionId,
                            // "username":"小助手",
                            "type":"1",
                            // "avatar":"../../assets/avatar.png",
                            sessionId,
                            message,
                            messageType,
                            ...messageobj
                        });
                        console.log('!ACK');
                        that.setState({
                             waitingBack:false
                        });
                    }else if(action == ACK){
                        console.log('ACK');
                        that.setState({
                             waitingBack:true
                        });
                    } 
                }
                that.setState({
                    data
                },function(){
                    setTimeout(function(){
                        that.gotoBottom();
                    },400)
                })
			});
		}, function(err) {
			alert(err);
        });
    }
    componentDidMount() {
        
        // this.connect();

        let that = this;
        if(!isInWeiXin){
            //

        }
        
        let token = localStorage.getItem('tokenh5');
        let userid = localStorage.getItem('userid');
        // alert("token:   "+token)
//         if(!token || !userid){
//             // 在微信打开情况 去获取token
//             if(isInWeiXin()){
//                 const code = getUrlParam('code');
//                 const state = getUrlParam('state');
//                 if(code){
//                     // 获取到code 情况下，去后端请求openID
//                     console.log('微信授权code===')
//                     console.log(code)
//                     getToken(code,state).then(function(res){
//                         console.log(res)
//                         console.log('+++++++++')
//                         const { status ,errorCode,errorDescription,entity} = res;
//                         // {"status":"FAIL","errorCode":4002005,"errorDescription":"获取微信 access_token 时失败: 40029-invalid code, hints: [ req_id: JkoffDYIRa-4pzZoa ]"}
//                         if(status == "OK"){
// //                             refreshToken: "eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1NzUxMjQ0NTUsImp0aSI6IlVfU0htSkNfUXM2dUlOekpqSHUybXciLCJzdWIiOiJ7XCJ1c2VySWRcIjpcIjBmMDExZTYzLWRkYWItNDZiNS1hNzQ3LWIwZDYwYjI1YTRkMVwiLFwidG9rZW5cIjpcImV5SmhiR2NpT2lKSVV6VXhNaUo5LmV5SmxlSEFpT2pFMU56VXdNems0TlRVc0ltcDBhU0k2SWpGc1VEUm5lV2szWHpJMVNFZExNalJEV2pOUWNVRWlMQ0p6ZFdJaU9pSjdYQ0oxYzJWeVNXUmNJanBjSWpCbU1ERXhaVFl6TFdSa1lXSXRORFppTlMxaE56UTNMV0l3WkRZd1lqSTFZVFJrTVZ3aWZTSjkucE5sd2p0TGc5emQzSTBkbFBjODYycFNuVlduM1VWaEJ3YTU2eWdDU2FfTFJQVXhISld2YTFkVFNfUlJQUF81cGhaSkZUWURFU0hvTkRNZFFiYTJTb2dcIn0ifQ.VOQdk6UdoEAiBGojxlmcCpq-taZf11A9vjhlkERENOYAoxr9l0yOl3IFF2unsA_GA4iRp-Z1zTuXWIRnnY2CvA"
// // token: "eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1NzUwMzk4NTUsImp0aSI6IjFsUDRneWk3XzI1SEdLMjRDWjNQcUEiLCJzdWIiOiJ7XCJ1c2VySWRcIjpcIjBmMDExZTYzLWRkYWItNDZiNS1hNzQ3LWIwZDYwYjI1YTRkMVwifSJ9.pNlwjtLg9zd3I0dlPc862pSnVWn3UVhBwa56ygCSa_LRPUxHJWva1dTS_RRPP_5phZJFTYDESHoNDMdQba2Sog"
// // userId: "0f011e63-ddab-46b5-a747-b0d60b25a4d1"
//                             const {refreshToken,token,userId} = entity;
//                             localStorage.setItem('tokenh5',token)
//                             localStorage.setItem('refreshToken',refreshToken)
//                             localStorage.setItem('userid',userId)

//                             // 获取token成功后 关闭loading
//                             setTimeout(function(){
//                                 that.setState({
//                                     loading:false
//                                 })
//                             },600)
//                             that.connect(userId);
//                         }else if(status == "FAIL"){
//                             if(errorCode == '4002006'){                      
//                                 // openid不存在
//                                 // const appid = 'wxc67539da0be022b4';
//                                 // const redirect_uri	= encodeURI('http://senioryehe.com/');
//                                 let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=register#wechat_redirect`;
//                                 // let url = 'http://localhost:3000/?'
//                                 window.location.href = url;
//                             }else{
//                                 Toast.fail("errorDescription");
//                             }
//                         }
//                     })
//                 }else{
//                     // const appid = 'wxc67539da0be022b4';
//                     // const redirect_uri	= encodeURI('http://senioryehe.com/');
//                     let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base&state=check#wechat_redirect`;
//                     // let url = 'http://localhost:3000/?'
//                     window.location.href = url;
//                 }
//             }
//         }else{
            setTimeout(function(){
                that.setState({
                    loading:false
                })
            },600)
            that.connect(userid);
        // }
        
        
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
        const panel = document.getElementsByClassName('chat-main-panel');
        
        if(panel && panel[0]){
            panel[0].scrollTop = 10000
        }
        
    }
    clearInput =()=>{ //清空input
        this.setState({
            value:""
        })
    }
    send = () =>{
        //发送
        const {value,data} = this.state;
        let that = this;
        if(value == ''){
            return;
        }
        data.push(
            {
            // "send_loading":true,
            // "userid": this.userid,
            "type":"0",
            // "username":"../../assets/avatar.png",
            // "avatar":"",
            "message":value,
            "sessionId":that.sessionId
        })
        this.setState({
            data
        },function(){
            this.gotoBottom();
        });

        //真的去发送消息给后台
        if(this.connectStatus ==1){
            // alert(this.userid)
            var payload = {
                "userId": this.userid,
                "content": value,
                "action":CHAT,
                "sessionId":that.sessionId
            };
            window.ws.send("/app/consult", {}, JSON.stringify(payload));
        }
        this.clearInput();
        
    }
    previewByWx = (url) =>{
        // console.log(url)
        // wx && wx.previewImage({
        //     current: url, // 当前显示图片的http链接
        //     urls: [url] // 需要预览的图片http链接列表
        //   });
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
    openCard = (id) =>{
        let that = this;
       
        //打开卡片
        getCardDetail(id).then(function(res){
            console.log(res)
            const { status ,entity} = res;
            if(status == "OK"){
                 //打点
                // addClickNum(id);

                console.log(entity)
                that.setState({
                    showDetail:true,
                    detailEntity:entity
                })

            }else{

            }
        })
    }

    replyReommend = (recomm,message) =>{
        //选择
        const {title,knowledgeId,answerSource} = recomm;
        const {value,data} = this.state;
        data.push(
            {
            // "send_loading":true,
            "userid": this.userid,
            "type":"0",
            // "username":"../../assets/avatar.png",
            // "avatar":"",
            "message":title
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
                "content": title,
                "action":CHAT,
                knowledgeId,
                sessionId:message.sessionId
            };
            window.ws.send("/app/consult", {}, JSON.stringify(payload));
        }
    }
    onFocus = () =>{
        let that = this;
        // setTimeout(function(){
            // document.documentElement.scrollTop = 10000;
            console.log('focus====')
            document.body.scrollTop = document.documentElement.scrollTop =86;
        // },50)
    }
    renderRecivedMsg = (item) =>{//收到的消息渲染
        let that = this;
        const {type,message,send_loading,send_result,messageType,recommendList,resourceDto} = item;

        // {"sessionId":"18853c4fd76649d997b2a48b383e07f9",
        // "message":"您要找的是哪个呢？",
        // "messageType":2,
        // "recommendList":[
        //     {"knowledgeId":"1000832152","answerSource":"RECOMMEND","title":"UI群英汇，用户体验交互视觉设计方法论电子书"}
        // ]
        // }
        let msgDom = '';
        switch(messageType){
            case TEXT:// 纯文本或者闲聊(直接展示)，
                msgDom = (<span className='user-text' dangerouslySetInnerHTML={{__html: message}}></span>)
                break;
            case IMG:
                msgDom = (<img className='user-img' src={message} onClick = {() => {that.previewByWx(message)}}></img>)
                break;
            // case 1://知识库（对应knowledge）,富文本类型html
            //     msgDom = (<span className='user-text' dangerouslySetInnerHTML={{__html: message}}></span>)
            //     break;
            case RECOMMEND://推荐选项（对应recommendList） 知识库（对应knowledge）
                msgDom = (
                    <ul className="item-l-choices">
                    <p className='choice-item-title'>👇不确定你需要的是哪个</p>
                        {recommendList.map(function(obj,i){
                            const {title,knowledgeId,answerSource} = obj;
                            return <li key = {i} onClick={()=>{that.replyReommend(obj,item)}}>&gt; {title}</li>
                        })}
                </ul>
               );
                break;
            case CARD://资源卡(对应resourceList)，
                const {name,describes,img,id} = resourceDto;
                msgDom = (<div className='item-l-card' onClick={()=>{that.openCard(id)}}>
                    <img src={img} className='card-img'/>
                    <div className='card-r'>
                        <p>{name}</p>
                        <span>{describes}</span>
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
            console.log(item)
            console.log('renderMsgList')
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
    closeDetail = () =>{
        //关闭的detail
        this.setState({
            showDetail:false
        })
    }
    copy =() =>{
        //复制
        let me = $('#target_url')[0];
        $('#target_url').on('touchstart',function(e) {
            e.preventDefault();
        });
        me.focus();
        me.select();
        try{
            if(document.execCommand('copy', false, null)){
                //success info
                Toast.success("已复制",2);
            } else{
                //fail info
            }

        } catch(err){
            //fail info
        }
    }
    showDetailModal = () =>{
        
        const {detailEntity} = this.state;
        const {img,name,tag,type,years,extraInformation,fileFormat,describes,createTime} = detailEntity;
        const tags = tag.split(' ').map(function(tagitem){
            return <span className="tag">{tagitem}</span>
        })
        let imgDom = "";
        if(Array.isArray(img)){
            if( img.length == 1){
                imgDom = (<img className='single-banner' src={img[0]}/>)
            } else{
                const a = Math.floor(img / 2);
                const b = img % 2;
                var arr = [];
                for (var i =0;i<a ;i+2){
                    const f = i+1;
                    const s = i+2;
                    arr.push(
                        <div className="multi-banner">
                            <img className='' src={img[f]}/>
                            {img.length>s ? <img className='' src={img[s]}/> :""}
                        </div>
                    )
                    imgDom ={arr}
                }
            }
        }
        
        //详情模块
        return (
            <div className="detail-window">
                <img src={closeSvg} className='close-btn' onClick={this.closeDetail}/>
                <div className="detail-wrap">
                    {imgDom}
                    <h3>{name}</h3>
                    <p>
                        {tags}
                    </p>
                    <div className="wangpan-address">
                        <p className="link-info">
                            {/* 链接:https://pan.baidu.com/s/19pNAsmsFGTdert 密码:2he4 */}
                            链接:{extraInformation}
                        </p>
                        <span className="copy-btn" onClick={()=>{this.copy()}}>复制</span>
                    </div>
                    <article> 
                        {describes}
                    </article>
                    <input id ='target_url' style={{opacity:0,height:0}} type="text" value={extraInformation}/>
                </div>
            </div>
        )
    }
    render() {
        const {loading,value,modalShow,showDetail,detailEntity,waitingBack} = this.state;
        const detailEntityModal = showDetail ? this.showDetailModal(): "";
        return <div className='home-wrap homelayout'>
            {
                loading? <img src={mainLoading} className='mainloading'/>:(
                <div className='main-content'>
                    <div className='flex2H-wrap'>
                        <div className='app-icon-wrap' onClick={this.toggleModal}>
                            <img src={app_icon} className='app-icon'/>
                            <span className='noti-dot'></span>
                        </div>
                        <div>
                            <p className='app-name'>也贺</p>
                        </div>
                    </div>

                    <div className='chat-window'>
                        <p className='top-indicator'>
                            {/* <span className="color1"></span>
                            <span className="color2"></span>
                            <span className="color3"></span> */}
                            <img className={waitingBack?'':'hide'} src={loadingSvg} />
                        </p>
                        <div className='top-mask'></div>
                        
                        <div className='chat-main-panel'>
                            <div className='chat-inner-wrap'>
                                {this.renderMsgList()}
                            </div>
                        </div>
                        <div className="input-wrap">
                            <form action="javascript:return true">
                                <input value={value}  confirm-type="send" confirm-hold="true" placeholder="需要帮助吗..." onKeyPress={this.handleEnterKey} onChange={this.onChange.bind(this)} onFocus={this.onFocus}></input>
                                <span className='send-btn' onClick={this.send}>发送</span>
                            </form>
                        </div>
                    </div>
                    {detailEntityModal}
                    <SimpleModal show={modalShow} closeFun={this.closeModal}/>
                </div>)
            }
        </div>
    }
}