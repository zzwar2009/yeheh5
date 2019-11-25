import React from "react";
import { Icon } from 'antd-mobile'

export default class CloseIcon extends React.Component {
  render() {
    return (
      <Icon onClick={(e) => {
        e.stopPropagation()

        this.props.analysis && this.props.analysis()

        if (window.DSApp) {
            window.DSApp.closeWindow()
        } else if (window.webkit) {
            window.webkit.messageHandlers.closeWindow.postMessage(null)
        } else if (window.postMessage) {
          const params = {
            actionType: 'closeWindow',
            actionData: {
            }
          }
          try {
            window.postMessage(JSON.stringify(params))
          } catch (error) {
            window.postMessage(JSON.stringify(params), '*')
          }
        }
      }}
      color={this.props.homePage ? '#ffffff' : '#000000'}
      style={this.props.homePage ? 
        {
        position: 'fixed',
        top: '0.5rem',
        left: '10px'
      } : this.props.nomargin ? 
      {
        marginLeft:'4px'
      } : 
      {
        marginLeft: '10px'
      }} 
      type="cross"
      size="lg" />
    )
  }
}