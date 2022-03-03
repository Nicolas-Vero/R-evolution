import React, { Component } from 'react';
import { View, PanResponder, Animated } from 'react-native';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { Avatar } from 'react-native-elements';
import {
  get_appointment_by_athlete_id,
  get_coachAthlete_status,
} from '../api/Coach';
import { get_commercial_by_id } from '../api/Commercial';
import { slots } from '../helpers/dateHelper';
import ContextService from '../services/ContextService';
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
    onPageChange: PropTypes.func,
    deltaDelay: PropTypes.number,
    children: PropTypes.array.isRequired,
  };

  static defaultProps = {
    initialPage: 0,
    blurredZoom: 0.8,
    blurredOpacity: 0.8,
    containerPadding: 38,
    animationDuration: 150,
    pageSpacing: 0,
    vertical: false,
    deltaDelay: 0,
    onPageChange: () => {},
  };

  state = {
    width: 0,
    height: 0,
  };

  _getPosForPage(pageNb) {
    return -pageNb * this._boxSizeInterval;
  }
  onAthletePress = async (athlete) => {
    const book = await get_appointment_by_athlete_id(athlete.id);
    if (book.status === 200) {
      athlete.book = book.data;
    }
    const data = await get_coachAthlete_status(athlete.id);
    if (data.status === 200) {
      athlete.status = data.data.status;
    }
    if (athlete.commercial_id) {
      const commercial = await get_commercial_by_id(athlete.commercial_id);
      if (commercial.status === 200) {
        athlete.commercial = {
          first_name: commercial.data.commercial.first_name,
          last_name: commercial.data.commercial.last_name,
        };
      }
    }
    const navigation = ContextService.get('current_navigation');
    navigation.navigate('AthleteSheetCoachScreen', {
      item: athlete,
    });
  };

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
    this._boxSize = 50;
    this._boxSizeInterval = height / 3;

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

    for (let i = 0; i < this.props.children.length; ++i) {
      viewsScale.push(
        new Animated.Value(
          i === this._currentPage ? 1 : this.props.blurredZoom,
        ),
      );
      viewsOpacity.push(
        new Animated.Value(
          i === this._currentPage ? 1 : this.props.blurredOpacity,
        ),
      );
    }

    this.setState({
      width,
      height,
      pos: new Animated.Value(this._getPosForPage(this._currentPage)),
      viewsScale,
      viewsOpacity,
    });
  }

  animateToPage(page) {
    let animations = [];
    let backgroundColor = [];
    let textColor = [];
    let textSize = [];
    let imageSize = [];
    var i = 0;
    if (this._currentPage !== page) {
      // New page needs to be shown (adjust opacity and scale)
      animations.push(
        Animated.timing(this.state.viewsScale[page], {
          toValue: 1,
          duration: this.props.animationDuration,
          useNativeDriver: false,
        }),
      );

      animations.push(
        Animated.timing(this.state.viewsOpacity[page], {
          toValue: 1,
          duration: this.props.animationDuration,
          useNativeDriver: false,
        }),
      );

      animations.push(
        Animated.timing(this.state.viewsScale[this._currentPage], {
          toValue: this.props.blurredZoom,
          duration: this.props.animationDuration,
          useNativeDriver: false,
        }),
      );

      animations.push(
        Animated.timing(this.state.viewsOpacity[this._currentPage], {
          toValue: this.props.blurredOpacity,
          duration: this.props.animationDuration,
          useNativeDriver: false,
        }),
      );
    }
    for (let i = 0; i < this.props.children.length; ++i) {
      if (page == i) {
        backgroundColor.push('#2CDEE4');
        textColor.push('black');
        textSize.push(16);
        imageSize.push(40);
      } else {
        backgroundColor.push('transparent');
        textColor.push('white');
        textSize.push(12);
        imageSize.push(30);
      }
    }
    this.setState({ backgroundColor, textColor, textSize, imageSize });
    // Move to proper position for selected page
    let toValue = this._getPosForPage(page);

    animations.push(
      Animated.timing(this.state.pos, {
        toValue: toValue,
        duration: this.props.animationDuration,
        useNativeDriver: false,
      }),
    );

    Animated.parallel(animations).start();

    this._lastPos = toValue;
    this._currentPage = page;

    this.props.onPageChange(page);
  }

  componentDidMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => {
        const dx = Math.abs(gestureState.dx);
        const dy = Math.abs(gestureState.dy);
        return this.props.vertical
          ? dy > this.props.deltaDelay && dy > dx
          : dx > this.props.deltaDelay && dx > dy;
      },
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Set PanResponder only if it is a gesture in the right direction
        const dx = Math.abs(gestureState.dx);
        const dy = Math.abs(gestureState.dy);
        return this.props.vertical
          ? dy > this.props.deltaDelay && dy > dx
          : dx > this.props.deltaDelay && dx > dy;
      },
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,

      onPanResponderGrant: (evt, gestureState) => {},
      onPanResponderMove: (evt, gestureState) => {
        let suffix = this.props.vertical ? 'y' : 'x';
        this.state.pos.setValue(this._lastPos + gestureState['d' + suffix]);
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        let suffix = this.props.vertical ? 'y' : 'x';
        this._lastPos += gestureState['d' + suffix];
        let page = this._getPageForOffset(
          this._lastPos,
          gestureState['d' + suffix],
        );

        this.animateToPage(page);
      },
      onPanResponderTerminate: (evt, gestureState) => {},
      onShouldBlockNatiResponder: (evt, gestureState) => true,
    });
  }

  render() {
    if (!this.state.width && !this.state.height) {
      // Use a transparent screen to render so we can calculate width & height
      return (
        <View style={{ flex: 1 }}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'transparent',
            }}
            onLayout={(evt) => {
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
    containerStyle = {
      flex: 1,
      top: this.state.pos,
      // paddingTop: this._currentPage === 0 ? 0 : this.props.containerPadding,
      paddingTop: this.props.containerPadding,
      paddingBottom: this.props.containerPadding,
      flexDirection: 'column',
    };
    boxStyle = {
      marginBottom: this.props.pageSpacing,
      borderRadius: 5,
      height: this._boxSize,
      alignItems: 'center',
      justifyContent: 'center',
    };

    return (
      <View
        style={{
          flex: 1,
          overflow: 'hidden',
        }}>
        <Animated.View
          style={[{ flex: 1 }, containerStyle]}
          {...this._panResponder.panHandlers}>
          {this.props.children.map((page, index) => {
            const isCurrentPage = index === this._currentPage;
            const fontSize = isCurrentPage ? 16 : 12;
            const color = isCurrentPage ? '#000' : '#fff';
            return (
              <Animated.View
                key={index}
                style={[
                  {
                    backgroundColor: isCurrentPage ? '#2CDEE4' : 'transparent',
                    opacity: this.state.viewsOpacity[index],
                    transform: [
                      {
                        scaleY: this.state.viewsScale[index],
                      },
                    ],
                  },
                  boxStyle,
                ]}>
                <TouchableOpacity
                  onLongPress={() => {
                    this.onAthletePress(page.rdv.athlete);
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: widthPercentageToDP(92),
                      alignItems: 'center',
                    }}
                    key={page.id}>
                    <View style={{ marginLeft: 5, marginRight: 20 }}>
                      <Avatar
                        size={isCurrentPage ? 40 : 30}
                        rounded
                        source={{
                          uri:
                            page.rdv.athlete?.profile_picture_url ||
                            '/Users/nicolas/ReactNative/Revolution/R_evolution/assets/images/avatar.png',
                        }}
                      />
                    </View>
                    <View style={{ alignItems: 'flex-start', flex: 1 }}>
                      <Text
                        style={{
                          fontFamily: 'RobotoMedium',
                          fontSize,
                          color,
                        }}>
                        {page.rdv.athlete?.first_name}{' '}
                        {page.rdv.athlete?.last_name}
                      </Text>
                      {isCurrentPage ? (
                        <Text
                          style={{
                            fontFamily: 'MontserratMedium',
                            fontSize: 10,
                            color: '#000',
                          }}>
                          Séance: {page.rdv.session_number}/
                          {page.rdv.athleteCourse?.total_sessions}
                        </Text>
                      ) : null}
                    </View>
                    <View stlye={{ alignItems: 'flex-end' }}>
                      <Text
                        style={{
                          paddingRight: !isCurrentPage ? 15 : 0,
                          textAlign: 'center',
                          marginRight: 29,
                          fontFamily: 'RobotoMedium',
                          fontSize,
                          color,
                        }}>
                        {slots[page.rdv.slot]}
                      </Text>
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
