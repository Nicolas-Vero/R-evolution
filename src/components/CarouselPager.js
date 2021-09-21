import React, { Component } from 'react';
import {
  View,
  PanResponder,
  Animated,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import { forEach, indexOf } from 'lodash';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { Avatar } from 'react-native-elements';
import { loadFonts } from '../configs/design/font';

export default class CarouselPager extends Component {
  static propTypes = {
    initialPage: PropTypes.number,
    vertical: PropTypes.bool,
    blurredZoom: PropTypes.number,
    blurredOpacity: PropTypes.number,
    animationDuration: PropTypes.number,
    containerPadding: PropTypes.number,
    pageSpacing: PropTypes.number,
    pageStyle: PropTypes.object,
    blurredbackgroundColor: PropTypes.numbers,
    onPageChange: PropTypes.func,
    deltaDelay: PropTypes.number,
    children: PropTypes.array.isRequired
  }
  componentDidMount(){
    loadFonts;
    
  }

  static defaultProps = {
    initialPage: 0,
    blurredZoom: 0.8,
    blurredOpacity: 0.8,
    blurredbackgroundColor:'blue',
    animationDuration: 150,
    containerPadding: 30,
    pageSpacing: 10,
    vertical: false,
    deltaDelay: 0,
    onPageChange: () => {},
  }

  state = {
    width: 0,
    height: 0
  }
  convertSlotToDate(slot) {
    switch (slot) {
      case 0:
        return '00:00 - 01:00';
        break;
      case 1:
        return '01:00 - 02:00';
        break;
      case 2:
        return '02:00 - 03:00';
        break;
      case 3:
        return '03:00 - 04:00';
        break;
      case 4:
        return '04:00 - 05:00';
        break;
      case 5:
        return '05:00 - 06:00';
        break;
      case 6:
        return '06:00 - 07:00';
        break;
      case 7:
        return '07:00 - 08:00';
        break;
      case 8:
        return '08:00 - 09:00';
        break;
      case 9:
        return '09:00 - 10:00';
        break;
      case 10:
        return '10:00 - 11:00';
        break;
      case 11:
        return '11:00 - 12:00';
        break;
      case 12:
        return '12:00 - 13:00';
        break;
      case 13:
        return '13:00 - 14:00';
        break;
      case 14:
        return '14:00 - 15:00';
        break;
      case 15:
        return '15:00 - 16:00';
        break;
      case 16:
        return '16:00 - 17:00';
        break;
      case 17:
        return '17:00 - 18:00';
        break;
      case 18:
        return '18:00 - 19:00';
        break;
      case 19:
        return '19:00 - 20:00';
        break;
      case 20:
        return '20:00 - 21:00';
        break;
      case 21:
        return '21:00 - 22:00';
        break;
      case 22:
        return '22:00 - 23:00';
        break;
      case 23:
        return '23:00 - 00:00';
        break;
      default:
        break;
    }
  }

  _getPosForPage(pageNb) {
    return -pageNb * this._boxSizeInterval;
  }

  _getPageForOffset(offset, diff) {
    let boxPos = Math.abs(offset / this._boxSizeInterval);
    let index;

    if (diff < 0) {
      // Scrolling forwards
      index = Math.ceil(boxPos);
    } else {
      // Scrolling backwards
      index = Math.floor(boxPos);
    }

    // Make sure index is within bounds
    if (index < 0) {
      index = 0;
    } else if (index > this.props.children.length - 1) {
      index = this.props.children.length - 1;
    }

    return index;
  }

  _runAfterMeasurements(width, height) {
    // Set box and box interval size
    let length = this.props.vertical ? height : width;
    this._boxSize = length - (2 * this.props.containerPadding);
    this._boxSizeInterval = this._boxSize + this.props.pageSpacing;
    // Get initial page
    let initialPage = this.props.initialPage || 0;
    if (initialPage < 0) {
      initialPage = 0;
    } else if (initialPage >= this.props.children.length) {
      initialPage = this.props.children.length - 1;
    }

    this._currentPage = initialPage;
    this._lastPos = this._getPosForPage(this._currentPage);
    
    let viewsScale = [];
    let viewsOpacity = [];
    let backgroundColor=[];
    let textColor=[];
    for (let i = 0; i < this.props.children.length; ++i) {
      viewsScale.push(new Animated.Value(i === this._currentPage ? 1 : this.props.blurredZoom));
      viewsOpacity.push(new Animated.Value(i === this._currentPage ? 1 : this.props.blurredOpacity));
    }
    for (let i = 0; i < this.props.children.length; ++i) {
      if (i == 0 ) {
        backgroundColor.push('#2CDEE4')
        textColor.push('black')
      } else {
        backgroundColor.push('transparent')
        textColor.push('white')
      }
    }
    this.setState({
      width,
      height,
      pos: new Animated.Value(this._getPosForPage(this._currentPage)),
      viewsScale,
      viewsOpacity,
      backgroundColor,
      textColor,
    });
  }

  animateToPage(page) {
    let animations = [];
    let arrayofcolor =[];
    let arrayofTextColor = [];
    var i = 0
    if (this._currentPage !== page) {
      // New page needs to be shown (adjust opacity and scale)
      animations.push(
        Animated.timing(this.state.viewsScale[page], {
          toValue: 1,
          duration: this.props.animationDuration
        })
      );

      animations.push(
        Animated.timing(this.state.viewsOpacity[page], {
          toValue: 1,
          duration: this.props.animationDuration
        })
      );
  
      animations.push(
        Animated.timing(this.state.viewsScale[this._currentPage], {
          toValue: this.props.blurredZoom,
          duration: this.props.animationDuration
        })
      );


      animations.push(
        Animated.timing(this.state.viewsOpacity[this._currentPage], {
          toValue: this.props.blurredOpacity,
          duration: this.props.animationDuration
        })
      );
    }
    for (let i = 0; i < this.props.children.length; ++i) {
      if (page == i ) {
        arrayofcolor.push('#2CDEE4')
        arrayofTextColor.push('black')

      } else {
        arrayofcolor.push('transparent')
        arrayofTextColor.push('white')
      }
    }
  this.setState({backgroundColor:arrayofcolor});
  this.setState({textColor:arrayofTextColor});
    // Move to proper position for selected page
    let toValue = this._getPosForPage(page);

    animations.push(
      Animated.timing(this.state.pos, {
        toValue: toValue,
        duration: this.props.animationDuration
      })
    );
   
    Animated.parallel(animations).start();

    this._lastPos = toValue;
    this._currentPage = page;
    this.props.onPageChange(page);
  
  }

  goToPage(index) {
    if (index < 0 || index > this.props.children.length - 1) {
      // Out of bounds, don't go anywhere
      return;
    }

    this.animateToPage(index);
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => {
        const dx = Math.abs(gestureState.dx);
        const dy = Math.abs(gestureState.dy);
        return this.props.vertical ? (dy > this.props.deltaDelay && dy > dx) : (dx > this.props.deltaDelay && dx > dy);
      },
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Set PanResponder only if it is a gesture in the right direction
        const dx = Math.abs(gestureState.dx);
        const dy = Math.abs(gestureState.dy);
        return this.props.vertical ? (dy > this.props.deltaDelay && dy > dx) : (dx > this.props.deltaDelay && dx > dy);
      },
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,

      onPanResponderGrant: (evt, gestureState) => {
      },
      onPanResponderMove: (evt, gestureState) => {
        let suffix = this.props.vertical ? 'y' : 'x';
        this.state.pos.setValue(this._lastPos + gestureState['d' + suffix]);
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        let suffix = this.props.vertical ? 'y' : 'x';
        this._lastPos += gestureState['d' + suffix];
        let page = this._getPageForOffset(this._lastPos, gestureState['d' + suffix]);
        this.animateToPage(page);
      },
      onPanResponderTerminate: (evt, gestureState) => {
      },
      onShouldBlockNatiResponder: (evt, gestureState) => true
    });
  }

  render() {
    if (!this.state.width && !this.state.height) {
      // Use a transparent screen to render so we can calculate width & height
      return (
        <View style={{ flex: 1 }}>
          <View
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'transparent' }}
            onLayout={evt => {
              let width = evt.nativeEvent.layout.width;
              let height = evt.nativeEvent.layout.height;
              this._runAfterMeasurements(width, height);
            }}
          />
        </View>
      );
    }

    let containerStyle = {};
    let boxStyle = {};
    if (this.props.vertical) {
      containerStyle = {
        top: this.state.pos,
        paddingTop: this.props.containerPadding,
        paddingBottom: this.props.containerPadding,
        flexDirection: 'column'
      }
      boxStyle = {
        height: this._boxSize,
        marginBottom: this.props.pageSpacing
      }
    } else {
      containerStyle = {
        left: this.state.pos,
        paddingLeft: this.props.containerPadding,
        paddingRight: this.props.containerPadding,
        flexDirection: 'row'
      }
      boxStyle = {
        width: this._boxSize,
        marginRight: this.props.pageSpacing
      };
    }

    return (
      <View style={{ flex: 1, flexDirection: this.props.vertical ? 'column' : 'row', overflow: 'hidden' }}>
        <Animated.View
          style={[{ flex: 1 }, containerStyle]}
          {...this._panResponder.panHandlers}
        >
          {this.props.children.map((page, index) => {

            return (
              <Animated.View
                key={index}
                style={[{
                  
                  backgroundColor:this.state.backgroundColor[index],
                  opacity: this.state.viewsOpacity[index],
                  transform: [
                    this.props.vertical ? {
                      scaleX: this.state.viewsScale[index]
                    } : {
                        scaleY: this.state.viewsScale[index]
                      }
                  ]
                }, boxStyle, this.props.pageStyle]}>
                  <TouchableOpacity onPress={()=>{console.log(page)}} style={{justifyContent:'center'}}>
          <View style={{flexDirection:'row',justifyContent:'space-around',alignContent:'center',width:widthPercentageToDP(94),alignItems:'center'}}key={page.id}>
            <View style={{marginTop:2}}>
              <Avatar
                size="medium"
                rounded
                source={{
                  uri: page.Avatar,
                }}
              />
              </View>
            <View style={{flexDirection:'column',marginRight:40}}>
              <View style={{flexDirection:'row'}}>
                <Text style={{
                  fontFamily:'RobotoMedium',
                  fontSize: 20,
                  color:this.state.textColor[index],
                }}>{page.firstname} {page.lastname}</Text>
            </View>
            <Text style={{fontFamily:'MontserratMedium', fontSize: 12,  color:this.state.textColor[index]}}>Séance: {page.session_number}/{page.total_sessions}</Text>
            </View>
            <View style={{justifyContent:'center'}}>
              <Text style={{
                   fontFamily:'RobotoMedium',
                  fontSize: 20,marginTop:1.2,   color:this.state.textColor[index]}} >{this.convertSlotToDate(page.slot)}</Text>
            </View>
          </View>
          </TouchableOpacity>
              </Animated.View>
            );
          })}
        </Animated.View>
      </View>
    );
  }
}
