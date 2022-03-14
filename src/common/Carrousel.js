import { View } from 'react-native';
import React, { Component } from 'react';
import { heightPercentageToDP } from 'react-native-responsive-screen';

import CarouselPager from '../components/CarouselPager';

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
          alignItems: 'center',
        }}>
        <View
          style={{
            marginBottom: 15,
            height: heightPercentageToDP(18),
          }}>
          <CarouselPager
            ref={(ref) => (this.carousel = ref)}
            blurredZoom={0.9}
            initialPage={0}
            blurredOpacity={0.2}
            vertical={true}
            animationDuration={300}>
            {data}
          </CarouselPager>
        </View>
      </View>
    );
  }
}
