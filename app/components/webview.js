/**
 * Custom WebView with autoHeight feature
 *
 * @prop source: Same as WebView
 * @prop autoHeight: true|false
 * @prop defaultHeight: 100
 * @prop width: device Width
 * @prop ...props
 *
 * @author Elton Jain
 * @version v1.0.2
 */

import React, { Component } from 'react';
import {
  View,
  Dimensions,
  WebView,
} from 'react-native';
import { UIConstants } from '../../app/config/appConstants';

const injectedScript = function() {
  function waitForBridge() {
    if (window.postMessage.length !== 1){
      setTimeout(waitForBridge, 200);
    }
    else {
      let height = 0;
      if(document.documentElement.clientHeight>document.body.clientHeight)
      {
        height = document.documentElement.clientHeight
      }
      else
      {
        height = document.body.clientHeight
      }
      postMessage('.' + height)
    }
  }
  waitForBridge();
  window.onclick = function(e) {
    var node = e.target;
    while (node != undefined && node.localName != 'a') {
      node = node.parentNode;
    }
    if (node != undefined) {
      postMessage(node.href);
      /* Your link handler here */
      return false;  // stop handling the click
    } else {
      return true;  // handle other clicks
    }
  }
};

export default class PersoWebView extends Component {
  state = {
    webViewHeight: Number
  };

  static defaultProps = {
      autoHeight: true,
  }

  constructor (props) {
    super(props);
    this.state = {
      webViewHeight: this.props.defaultHeight
    }

    this._onMessage = this._onMessage.bind(this);
  }

  _onMessage(e) {
    if (e.nativeEvent.data.startsWith('.')) {
      this.setState({
        webViewHeight: parseInt(e.nativeEvent.data.slice(1))
      });
    } else {
      UIConstants.decode_AS_URL(e.nativeEvent.data, this.props.navigation);
    }

  }

  render () {
    const _w = this.props.width || Dimensions.get('window').width;
    const _h = this.props.autoHeight ? this.state.webViewHeight : this.props.defaultHeight;
    return (
      <WebView
        injectedJavaScript={'(' + String(injectedScript) + ')();'}
        scrollEnabled={this.props.scrollEnabled || false}
        onMessage={this._onMessage}
        javaScriptEnabled={true}
        automaticallyAdjustContentInsets={true}
        {...this.props}
        style={[{width: _w}, this.props.style, {height: _h}]}
      />
    )
  }
}
