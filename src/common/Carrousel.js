import {View,Text} from 'react-native';
import React, {Component} from 'react';
import CarouselPager from 'react-native-carousel-pager';

export default class Pager extends Component {
  constructor(props){
    super(props);
  }
  
  onClickSomething() {
    this.carousel.goToPage(2);

  }
  render() {
    return (
      console.log('cafrousel',this.props.pager),
      <View style={{ borderWidth:4,height:150,borderColor:'#2CDEE4'}}>
        <CarouselPager ref={ref => this.carousel = ref} initialPage={2} vertical={true} pageStyle={{backgroundColor: '#2CDEE4'}}>
         {this.props.pager}
        </CarouselPager>
      </View>
    );
  }
}
