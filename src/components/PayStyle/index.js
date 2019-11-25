
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Radio,List} from 'antd-mobile';
import './index.less';
var classNames = require('classnames');
const RadioItem = Radio.RadioItem;
class PayStyle extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            value:0
        })
    }
    
    componentDidMount() {

    }
    RadioItemOnChange = (e)=>{
        this.setState({value:e});
        const {onChange} = this.props;
        if(onChange){
            onChange(e);
        }
    }
    
    render() {
        const data = [
            { value: 0, label: <div className='wechat-pay'>微信支付</div> },
            // { value: 1, label: <div className='ali-pay'>支付宝支付</div> },
            // { value: 2, label: <div className='bankcard-pay'>银行卡支付</div> },
        ];

        return (<div className="reissue-cont">
            <div className="reissue-costinfo">
                <List>
                {
                    data.map(i => (
                    <RadioItem className='radio-check' key={i.value} checked={this.state.value === i.value} onChange={() => this.RadioItemOnChange(i.value)}>
                        {i.label}
                    </RadioItem>
                    ))
                }
                </List>
            </div>
        </div>)
                    
    }
}

export default connect()(PayStyle)