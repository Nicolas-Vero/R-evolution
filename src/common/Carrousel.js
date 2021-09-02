import {View,Text} from 'react-native';
import React, {Component} from 'react';
import CarouselPager from 'react-native-carousel-pager';
import Carousel from 'react-native-anchor-carousel';
export default class Pager extends Component {
  constructor(props){
    super(props);
  }
  state={ 
    backgroundColor: '#2CDEE4'
  }
 
  onClickSomething() {
    this.carousel.goToPage(2);

  }
  render() {
    return (
      // console.log('cafrousel',this.props.pager),
      <View style={{ height:175}}>
        <CarouselPager
         ref={ref => this.carousel = ref}
         blurredZoom={0.9} initialPage={0} 
         vertical={true}containerPadding={60}
          pageStyle={{backgroundColor:this.state.backgroundColor, borderRadius:10,justifyContent:'center'}} onPageChange={(page)=>{}} >
         {this.props.pager}
        </CarouselPager>
      </View>
    ); 
  }
}
