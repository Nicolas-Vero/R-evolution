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
    // console.log(data.length);
    // console.log(data);
    // data.push({
    //   id: 123,
    //   Avatar: '',
    //   firstname: 'test',
    //   lastname: 'test',
    //   session_number: 10,
    //   total_sessions: 20,
    // });
    // data.push({
    //   id: 223,
    //   Avatar: '',
    //   firstname: 'test',
    //   lastname: 'test',
    //   session_number: 10,
    //   total_sessions: 20,
    // });
    return (
      <View
        style={{
          marginBottom: 15,
          maxHeight: 135,
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
    );
  }
}
