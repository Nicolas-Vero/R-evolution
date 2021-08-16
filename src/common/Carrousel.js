import {View,Text} from 'react-native';
import React, {Component} from 'react';
import CarouselPager from 'react-native-carousel-pager';

export default class Pager extends Component {
    state={
        page:[
        <View key={'page0'}><Text>toto</Text></View>,
        <View key={'page1'}><Text>tot</Text></View>,
        <View key={'page2'}><Text>hoo</Text></View>,  
        <View key={'page3'}><Text>gg</Text></View>,  
        <View key={'page4'}><Text>hh</Text></View>,  
        <View key={'page5'}><Text>zz</Text></View>,
    ]
    }
  onClickSomething() {
    this.carousel.goToPage(2);

  }
  render() {
    return (
      <View style={{ borderWidth:4,height:200,borderColor:'blue'}}>
        <CarouselPager ref={ref => this.carousel = ref} initialPage={2} vertical={true} pageStyle={{backgroundColor: 'blue'}}>
         {this.state.page}
        </CarouselPager>
      </View>
    );
  }
}
