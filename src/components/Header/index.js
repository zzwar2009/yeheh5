
import React, { Component } from 'react';
import { NavBar ,Icon} from 'antd-mobile';

class Header extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {

    }
    
    render() {
        const {noLeftIcon} = this.props;
        return <NavBar
            mode="light"
            icon={!noLeftIcon && <Icon type="left" color="#000"/>}
            onLeftClick={() => window.history.back()}
            leftContent={!noLeftIcon && <div style={{color:'#000'}}>返回</div>}
            rightContent= {this.props.rightContent}
        >{this.props.title}</NavBar>
    }
}

export default Header;