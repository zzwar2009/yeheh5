
import React, { Component } from 'react';
import { Link} from "react-router-dom";
import  './main.less';
import { createForm } from 'rc-form';
import { Radio,Button,List, InputItem, WhiteSpace,TextareaItem,ImagePicker,NavBar,Icon,Toast, Modal} from 'antd-mobile';

import logo from '../../res/oilcard/lion_logo_s.png';
import { get, post } from "../../utils/request";
import {connect} from 'react-redux'
import {Login,getVerfiyCode} from '@/services/api';
import md5 from "md5";
import {getOilcardInfo} from '@/services/api';

import VerifyCode from '@/components/VerifyCode';


function onBridgeReady(){
    alert(1111)
    // WeixinJSBridge.invoke(
    //    'getBrandWCPayRequest', {
    //       "appId":"wx2421b1c4370ec43b",     //公众号名称，由商户传入     
    //       "timeStamp":"1395712654",         //时间戳，自1970年以来的秒数     
    //       "nonceStr":"e61463f8efa94090b1f366cccfbbb444", //随机串     
    //       "package":"prepay_id=u802345jgfjsdfgsdg888",     
    //       "signType":"MD5",         //微信签名方式：     
    //       "paySign":"70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名 
    //    },
    //    function(res){
    //    if(res.err_msg == "get_brand_wcpay_request:ok" ){
    //    // 使用以上方式判断前端返回,微信团队郑重提示：
    //          //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
    //    } 
    // }); 
 }
 if (typeof WeixinJSBridge == "undefined"){
    if( document.addEventListener ){
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    }else if (document.attachEvent){
        document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    }
 }else{
    onBridgeReady();
 }

class LoginPage extends Component {
    constructor(props) {
        super(props)
        this.state = ({
          
        })
    }
    
    componentDidMount() {
    }
    getCode = () =>{
        const {getFieldValue} = this.props.form;

        let mobile = getFieldValue('phone');
        if(!mobile){
            Toast.fail('手机号不允许为空');
            return;
        }
        let formData = {
            'mobile':mobile
        }

        const response =  getVerfiyCode(formData);
        response.then(res => {
            console.log(res);
            Toast.hide();
            const { code, description } = res;
            if (code !== 200) {
                Toast.fail(description || "请求失败");
                return;
            }
        })
        .catch(err => {
            Toast.fail("请求失败");
        });
    }
    getUserInfo = ()=>{
        const {history,location} = this.props;
        const response = getOilcardInfo('Account/userinfo',{method:'POST'});
        let that = this;
        response.then((res)=>{
          if(res.code===200){
            console.log('res.data : \n');
            console.log(res.data);
            window.localStorage.setItem('userinfo',res.data.userobjno);
            window.localStorage.setItem('mobile',res.data.mobile);
            window.localStorage.setItem('userdata',JSON.stringify(res.data));

            if(location.state){
                history.replace(location.state.from);
            }else{
                history.replace('/');
            }
            
          }
        }).catch(err=>console.log(err));
    }
    getLoginFormValue = () => { //h5 登录页面手机表单值
        const {getFieldValue} = this.props.form;
        const {history} = this.props;
        let mVerCode = getFieldValue('code');
        let mobile = getFieldValue('phone');
        if(!mobile){
            Toast.fail('手机号不允许为空');
        }
        let formData = {
            "loginname": mobile,
            "end_user": "lb_h5_online",
            "mvercode": mVerCode,
            "credentials": 'phone',
            "curversion": 18012,
        }
        this.login(formData,mobile);
    }
    login = (formData,mobile) =>{ //统一登录逻辑(h5,app)
        const {history} = this.props;
        const response =  Login(formData);
        let that = this;
        response.then(res => {
            console.log(res);
            Toast.hide();
            const { code, description } = res;
            
            if(code == 200){
                Toast.success("登录成功");
                let token = res.token
                if(token){
                    window.token = token;
                    localStorage.setItem("token",token);
                    localStorage.setItem("mobile",mobile);
                    that.getUserInfo();
                }
            }
            else if(code == -20000){
                //新用户 跳到注册页面
                history.push('/oilcard/regist/'+mobile);
            }else{
                Toast.fail(description || "请求失败");
                return;
            }
           

        })
        .catch(err => {
            Toast.fail("请求失败");
        });
    };
    render() {
        console.log(this.props)
        const { files,appName } = this.state;
        const { getFieldProps,getFieldValue } = this.props.form;
        let mobile = getFieldValue('phone');
        
        return (<div className='login-wrap'>
                <div className="logo-area">
                    <img src={logo} alt="" className='logo'/>
                </div>
                <div className='login-form-wrap'>
                    <List>
                        <InputItem
                            {...getFieldProps('phone')}
                            clear
                            type='number'
                            placeholder="请输入手机号"
                            ref={el => this.inputRef = el}
                        >
                            <div className='login-phone'/>
                        </InputItem>

                        {/* <WhiteSpace sz="xs"/> */}

                        <div className="verifyCode">
                            <div className="verify-left">
                                <InputItem
                                    {...getFieldProps('code')}
                                    clear
                                    placeholder="请输入验证码"
                                    ref={el => this.inputRef = el}
                                ><div className='login-pwd'/></InputItem>
                            </div>
                            <div className="verify-right">
                                <VerifyCode  mobile={mobile}/>
                            </div>
                        </div>
                    </List>

                </div>
                <Button type="warning" style={{
                    backgroundColor:'#ff650b',
                    marginLeft:'22px',
                    marginRight:'22px',
                    marginTop:'86px'
                }} onClick = {this.getLoginFormValue}>登录</Button>
                <div className="login-bt-wrap">
                    {/* <p className='regist-txt'>还没有账号？<Link to='/oilcard/regist' style={{
                        color:'#ff650b'
                    }}>立即注册</Link></p> */}
                    <p className='version-desc'>版本号：V1.0.0</p>
                </div>
        </div>)
        
        
    }
}

const LoginWrapper = createForm()(LoginPage);

export default connect()(LoginWrapper)