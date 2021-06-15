import React from 'react';
import {Dimensions, Modal, Platform, SafeAreaView, TouchableWithoutFeedback, View} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class AppModal extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    // this.props.other == 'other' ? {

    //           } : ''
    //-----------
    // this.props.other == 'other' ? {
    // } : ''
    return (
      <Modal
        animationType='slide'
        transparent={true}
        visible={this.props.visible}
        onRequestClose={this.props.onRequestClose}>
        <SafeAreaView style={[styles.container, this.props.containerStyle]}>
          <TouchableWithoutFeedback onPress={this.props.onRequestClose}>
            <View style={[styles.bg,this.props.backgroundStyle]}/>
          </TouchableWithoutFeedback>
          <View style={[styles.content, this.props.childrenStyle]}>
            {this.props.children}
          </View>
        </SafeAreaView>
      </Modal>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
  },
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 50,
    backgroundColor: 'rgba(220,220,220,0.3)'
  },
  content: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 125 : 100,
    zIndex: 60,
  }
};
