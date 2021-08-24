import {View,Text} from 'react-native';
import React, {Component} from 'react';
import CarouselPager from 'react-native-carousel-pager';

export default class Pager extends Component {
  constructor(props){
    super(props);
  }
  state={ 
  }
 
  onClickSomething() {
    this.carousel.goToPage(2);

  }
  render() {
    return (
      // console.log('cafrousel',this.props.pager),
      <View style={{ height:175}}>
        <CarouselPager ref={ref => this.carousel = ref} blurredZoom={0.9} initialPage={2} vertical={true}containerPadding={50} pageStyle={{backgroundColor: '#2CDEE4', borderRadius:10,justifyContent:'center'}} onPageChange={(page)=>{console.log(page)}} >
         {this.props.pager}
        </CarouselPager>
      </View>
    ); 
  }
}
