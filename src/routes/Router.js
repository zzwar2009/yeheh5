/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 * User: Junhang
 * Date: 2018/8/7 8:12 PM
 */

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from '@/pages/Main'
// import Protected from '@/components/Protected';

export default class Router extends Component {
    constructor(props) {
        super(props)
        this.state = ({

        })
    }
    componentDidMount() {

    }
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    {/* 油卡首页 */}
                    <Route path='/' exact component={Main} />
                    {/* <Protected path='/oilcard/cardlist' exact component={OilCardList} /> */}
                    
                </Switch>
            </BrowserRouter>
        )
    }
}
