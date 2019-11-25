
import React, { Component } from 'react';
import { Toast} from 'antd-mobile';
import {connect} from 'react-redux'
import {getVerfiyCode} from '@/services/api';
import './index.less';
var classNames = require('classnames');
const defaultText = '获取验证码';
class VerifyCode extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            loading:false,
            text:defaultText
        })
    }
    
    componentDidMount() {

    }
    componentWillUnmount(){
        //
        clearTimeout(this.timer);
    }
    clock = () =>{
        let that = this;
        const {stopTime} = this;
        let nowTime = new Date()
        
        let limit = stopTime.getTime() - nowTime.getTime();
        
        
        if(limit > 0){
            let limit_second = parseInt(limit / 1000);
            that.setState({
                text:limit_second+'s'
            })
            that.timer = setTimeout(this.clock,1000);
        }else{
            that.setState({
                text:defaultText,
                loading:false
            })
        }
    }
    getCode =  () =>{
        const {mobile} = this.props;
        let that = this;
        if(!mobile){
            Toast.fail('手机号不允许为空');
            return;
        }
        if(!/^1(3|4|5|7|8)\d{9}$/.test(mobile)){
            Toast.fail('请输入正确的手机号');
            return;
        }
        let formData = {
            'mobile':mobile
        }
        this.setState({
            loading:true,
            text:'60s'
        })
        this.stopTime = new Date(new Date().getTime()+ 60 * 1000);//结束时间
        this.clock();

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
    render() {
        const {loading,text} = this.state;
        let classnames = classNames('btn-sendCode',{ 'loading': loading });
        return <div className={classnames} onClick={this.getCode}>
            {text}
        </div>
                    
    }
}

export default connect()(VerifyCode)