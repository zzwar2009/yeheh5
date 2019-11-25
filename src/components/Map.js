/**
 * User: Junhang
 * Date: 2018/12/5 9:41 AM
 */

import React, { Component } from 'react';
import { Map, Marker, Polyline } from 'react-amap';

class MapView extends Component {
    state = {};

    // props.__ele__;
    // props.__map__;

    // 通过 props 的 __map__ 属性访问创建好的高德地图实例；
    // [deprecated] 原有通过 __ele__ 属性访问地图容器方式不推荐，可以直接使用地图的 getContainer 方法获取。

    componentDidMount() {}

    render() {
        const { children } = this.props;
        return (
            <Map amapkey="c76cf0af492738af737fbf1736b85195" {...this.props}>
                {children}
            </Map>
        );
    }
}

export { MapView, Marker, Polyline };
