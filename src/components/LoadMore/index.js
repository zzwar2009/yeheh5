/*
 * @Author: luandapeng
 * @Date: 2018-04-04 12:31:56
 * @Last Modified by: luandapeng
 * @Last Modified time: 2018-05-02 13:46:08
 */
import React from 'react';
import PropTypes from 'prop-types';
import { getScrollParent, getCurrentDistance, throttle } from './utils';
import gif from '@/res/oilcard/loading.gif';

export default class LoadMore extends React.Component {
  static propTypes = {
    distance: PropTypes.number,
    onLoadMore: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    completed: PropTypes.bool,
    indicator: PropTypes.object,
    style: PropTypes.object,
  }

  static defaultProps = {
    distance: 100,
    loading: false,
    completed: false,
    style: {},
    indicator: {
      loading: null,
      completed: null,
    },
  }

  componentDidMount() {
    this.scrollParent = getScrollParent(this.el);
    this.scrollHandler = throttle(this.scrollHandlerOriginal, 100);
    this.scrollParent.addEventListener('scroll', this.scrollHandler);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.completed && this.props.completed) {
      this.scrollParent.removeEventListener('scroll', this.scrollHandler);
    }else{// 当complete 由true 变为false的时候需要给加上事件
      this.scrollParent.addEventListener('scroll', this.scrollHandler);
    }
  }

  componentWillUnmount() {
    this.scrollParent.removeEventListener('scroll', this.scrollHandler);
  }

  checkIsInstantiation = (target) => {
    if (!React.isValidElement(target)) {
      return target;
    }
    return () => target;
  };

  scrollHandlerOriginal = () => {
    const { onLoadMore, distance, loading } = this.props;
    const currentDistance = getCurrentDistance(this.scrollParent);
    if (!loading && currentDistance <= distance) {
      if (onLoadMore && typeof onLoadMore === 'function') {
        onLoadMore();
      }
    }
  }

  render() {
    const { loading, completed, indicator, style } = this.props;
    const loadingStyle = {
      textAlign: 'center',
      // paddingTop: 20,
      paddingBottom: 55,
      fontSize: 14,
      background:'#fff',
      color: '#999',
    };
    const gifStyle = {
      width: 36,
      height: 36,
      display: 'block',
      margin: '0 auto',
    };
    const [
      Loading,
      Completed,
    ] = [
      this.checkIsInstantiation(indicator.loading),
      this.checkIsInstantiation(indicator.completed),
    ];
    return (
      <React.Fragment>
        { React.Children.only(this.props.children) }
        <div style={{ ...loadingStyle, ...style }} ref={(el) => { this.el = el; }}>
          { loading && (indicator.loading ? <Loading /> : <img style={gifStyle} src={gif} alt="loading" />) }
          { !loading && completed && (indicator.completed ? <Completed /> : <span>没有了，到底了！</span>) }
        </div>
      </React.Fragment>
    );
  }
}
