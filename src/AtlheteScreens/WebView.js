import React from 'react';
import { WebView } from 'react-native-webview';

export default class MyWeb extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  webview = null;

  render() {
      console.log(this.props.navigation.state.params.item.payment_url);
    return (
      <WebView
        ref={(ref) => (this.webview = ref)}
        source={{ uri: this.props.navigation.state.params.item.payment_url }}
        onNavigationStateChange={this.handleWebViewNavigationStateChange}
        onMessage={this.handleEvent}
      />
    );
  }

  handleEvent = event => {
    let {message, data} = JSON.parse(event.nativeEvent.data);
    console.log('[onMessage-callback]', message, data);
  };

  handleWebViewNavigationStateChange = (newNavState) => {
    // newNavState looks something like this:
    // {
    //   url?: string;
    //   title?: string;
    //   loading?: boolean;
    //   canGoBack?: boolean;
    //   canGoForward?: boolean;
    // }
    const { url } = newNavState;
    console.log('[nav-state]', newNavState);
    if (!url) return;
    if (url.includes('/api/v1/payment/return-url')) { 
        this.props.navigation.navigate('offersScreen');
    }
    // handle certain doctypes
    if (url.includes('.pdf')) {
      this.webview.stopLoading();
      // open a modal with the PDF viewer
    }

    // one way to handle a successful form submit is via query strings
    if (url.includes('?message=success')) {
      this.webview.stopLoading();
      // maybe close this view?
    }

    // one way to handle errors is via query string
    if (url.includes('?errors=true')) {
      this.webview.stopLoading();
    }

    // redirect somewhere else
    if (url.includes('google.com')) {
      const newURL = 'https://reactnative.dev/';
      const redirectTo = 'window.location = "' + newURL + '"';
      this.webview.injectJavaScript(redirectTo);
    }
  };
}