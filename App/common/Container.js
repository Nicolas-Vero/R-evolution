import React from 'react';
import {
  StatusBar,
  Image,
  Dimensions,
  Platform,
  View
} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import { LinearGradient } from 'expo';

export default class Container extends React.Component {

  getContent() {


    const {upperRounded, statusBarColor, backgroundImage, backgroundImageStyle} = this.props;
    let color = statusBarColor ? statusBarColor : '#F07F84';

    let contentStyle = upperRounded ? styles.upperRounded : styles.content;

    // Bar Style [ light-content, dark-content ]
    let barStyle = this.props.barStyle ? this.props.barStyle : null;
    barStyle = barStyle ? barStyle : Platform.OS === 'android' ? 'light-content' : 'dark-content';

    return (
      <SafeAreaView style={[styles.container, this.props.style]}
                    forceInset={this.props.forceInset}>

        <StatusBar backgroundColor={Platform.OS === 'android' ? color : '#fff'}
                   translucent={this.props.translucent || false}
                   barStyle={barStyle}
        />
        {
          backgroundImage &&
          <Image source={backgroundImage}
                 style={[styles.backgroundImage, backgroundImageStyle]}/>
        }
        <View style={[contentStyle, this.props.contentStyle]}>
          {this.props.children}
        </View>
      </SafeAreaView>
    );
  }

  render() {
    const {backgroundImage} = this.props;
    if (backgroundImage) {
      return this.getContent();
    }

    return (
      <LinearGradient
        start={{x: 1, y: 0}} end={{x: 0, y: 0}}
        colors={['#F7A1A5', '#F2878C', '#EE7379']}
        style={styles.container}
      >
        {this.getContent()}
      </LinearGradient>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    position: 'relative',
  },
  upperRounded: {
    flex: 1,
    backgroundColor: "transparent",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  content: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  backgroundImage: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000
  }
};
