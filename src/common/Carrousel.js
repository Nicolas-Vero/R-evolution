import { View, Text } from 'react-native';
import React, { Component } from 'react';
import CarouselPager from '../components/CarouselPager';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
export default class Pager extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    backgroundColor: '#2CDEE4',
  };

  onClickSomething() {
    this.carousel.goToPage(2);
  }
  render() {
    return (
      // console.log('cafrousel',this.props.pager),
      <View
        style={{
          height: heightPercentageToDP(20),
          width: widthPercentageToDP(94),
          alignItems: 'center',
        }}>
        <CarouselPager
          ref={(ref) => (this.carousel = ref)}
          blurredZoom={0.94}
          initialPage={0}
          blurredOpacity={0.2}
          vertical={true}
          containerPadding={63}
          pageStyle={{
            borderRadius: 5,
            alignItems: 'center',
            width: widthPercentageToDP(94),
          }}>
          {this.props.pager}
        </CarouselPager>
      </View>
    );
  }
}
