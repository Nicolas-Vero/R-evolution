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
    const data = this.props.pager;
    return (
      <View
        style={{
          marginBottom: 10,
          height: heightPercentageToDP(20),
          width: 'auto',
        }}>
        <CarouselPager
          ref={(ref) => (this.carousel = ref)}
          blurredZoom={0.94}
          initialPage={0}
          blurredOpacity={0.2}
          vertical={true}
          pageStyle={{
            paddingVertical: 3,
            paddingHorizontal: 10,
            paddingRight: 45,
            paddingLeft: 10,
            marginBottom: 5,
          }}>
          {data}
        </CarouselPager>
      </View>
    );
  }
}
