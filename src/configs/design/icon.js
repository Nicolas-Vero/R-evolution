import React from 'react';
import {Image} from 'react-native';
//import Svg from "react-native-svg";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import pen from '../../../assets/images/pen.png'



const Icons = {

// -------------Login---------------

  PersonAuth: (style = []) => <PersonAuth style={style}/>,
  ShowIcon: (style = []) => <ShowIcon style={style}/>,
  Mail: (style = []) => <Mail style={style}/>,
  LockFill: (style = []) => <LockFill style={style}/>,
  RightArrow: (style = []) => <RightArrow style={style}/>,


//  --------Home Icons-----------

  Pen: (style = []) => <Image source={pen} style={style}/>,


//  Profile Icons

  Left: (style = []) => <Left style={style}/>,
  StarProfile: (style = []) => <StarProfile style={style}/>,
  Cup: (style = []) => <Cup style={style}/>,
  Online: (style = []) => <Online style={style}/>,
  TickFill: (style = []) => <TickFill style={style}/>,
  AddPhoto: (style = []) => <AddPhoto style={style}/>,
  Down: (style = []) => <Down style={style}/>,
  Tick1x: (style = []) => <Tick1 style={style}/>,
  Filter: (style = []) => <Filter style={style}/>,
  Cross: (style = []) => <Cross style={style}/>,
  Search: (style = []) => <Search style={style}/>,
  Bin: (style = []) => <Bin style={style}/>,


};

const styles = {
  homeIconStyle: {
    height: wp('5%'),
    resizeMode: 'contain',
  },
  time: {
    height: wp('4%'),
    resizeMode: 'contain',
  },
  iconStyle: {
    height: wp('4%'),
    width: wp('4%'),
    resizeMode: "contain"
  }
}


export default Icons;
