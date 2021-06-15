import React from 'react';
import {Image} from 'react-native';
import Svg from "react-native-svg";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import pen from '../../../assets/icons/pen.png'
import PersonAuth from '../../../assets/icons/personAuth.svg'
import Earnings from '../../../assets/icons/graph-2.svg'
import Plannings from '../../../assets/icons/calendar-1.svg'
import Discussions from '../../../assets/icons/chat-1.svg'
import Benefits from '../../../assets/icons/my-benefits.svg'
import Bookings from '../../../assets/icons/bookings.svg'
import Profile from '../../../assets/icons/profile.svg'
import Send from '../../../assets/icons/send.svg'
import Left from '../../../assets/icons/left.svg'
import LeftWhite from '../../../assets/icons/leftWhite.svg'
import StarProfile from '../../../assets/icons/star_fill.svg'
import Cup from '../../../assets/icons/cup.svg'
import Online from '../../../assets/icons/online.svg'
import TickFill from '../../../assets/icons/tickFill.svg'
import AddPhoto from '../../../assets/icons/add.svg'
import Tick1 from '../../../assets/icons/tick2.svg'
import filter from '../../../assets/icons/filter.svg'
import Cross from '../../../assets/icons/cross.svg'
import Search from '../../../assets/icons/search.svg'
import ArrowUp from '../../../assets/icons/arrow-up.svg'
import More from '../../../assets/icons/dotMore.svg'
import Message from '../../../assets/icons/message.svg'
import Time from '../../../assets/icons/time.svg'
import Mobile from '../../../assets/icons/mobile.svg'
import Pin from '../../../assets/icons/pin.svg'
import Reply from '../../../assets/icons/reply.svg'
import Star from '../../../assets/icons/star_fill.svg'
import Tick from '../../../assets/icons/tick.svg'
import Bin from '../../../assets/icons/bin2.svg'
import ButtonAdd from '../../../assets/icons/buttonAdd.svg'
import ServiceAdded from '../../../assets/icons/tick3.svg'
import LeftTint from '../../../assets/icons/leftTint.svg'
import RightTint from '../../../assets/icons/rightTint.svg'
import Lock from '../../../assets/icons/locked.svg'
import Card from '../../../assets/icons/credit-card.svg'
import AddItem from '../../../assets/icons/addItem.svg'
import ShowIcon from '../../../assets/icons/show.svg'
import Mail from '../../../assets/icons/mail.svg'
import LockFill from '../../../assets/icons/lockFill.svg'
import RightArrow from '../../../assets/icons/rightArrow.svg'
import Announcement from '../../../assets/icons/announcement.svg'
import AcceptRequest from '../../../assets/icons/accept.svg'
import RejectRequest from '../../../assets/icons/reject.svg'
import TimeCup from '../../../assets/icons/timeCup.svg'
import logout from '../../../assets/icons/logout.png'
import support from '../../../assets/icons/support.png'



const Icons = {

// -------------Login---------------

  PersonAuth: (style = []) => <PersonAuth style={style}/>,
  ShowIcon: (style = []) => <ShowIcon style={style}/>,
  Mail: (style = []) => <Mail style={style}/>,
  LockFill: (style = []) => <LockFill style={style}/>,
  RightArrow: (style = []) => <RightArrow style={style}/>,


//  --------Home Icons-----------

  Pen: (style = []) => <Image source={pen} style={style}/>,
  Earnings: (style = []) => <Earnings style={[style, styles.homeIconStyle]}/>,
  Plannings: (style = []) => <Plannings style={style}/>,
  Discussions: (style = []) => <Discussions style={style}/>,
  Benefits: (style = []) => <Benefits style={style}/>,
  Bookings: (style = []) => <Bookings style={style} />,
  Profile: (style = []) => <Profile style={style}/>,
  ArrowUp: (style = []) => <ArrowUp style={style}/>,
  More: (style = []) => <More style={style}/>,
  Message: (style = []) => <Message style={style}/>,
  Time: (style = []) => <Time style={[style, styles.iconStyle]}/>,
  Mobile: (style = []) => <Mobile style={[style, styles.iconStyle]}/>,
  Pin: (style = []) => <Pin style={[style, styles.iconStyle]}/>,
  Send: (style = []) => <Send style={style}/>,
  Reply: (style = []) => <Reply style={style}/>,
  Star: (style = []) => <Star style={style}/>,
  Tick: (style = []) => <Tick style={style}/>,
  ButtonAdd: (style = []) => <ButtonAdd style={style}/>,
  ServiceAdded: (style = []) => <ServiceAdded style={style}/>,
  LeftTint: (style = []) => <LeftTint style={style}/>,
  LeftWhite: (style = []) => <LeftWhite style={style}/>,
  RightTint: (style = []) => <RightTint style={style}/>,
  Lock: (style = []) => <Lock style={style}/>,
  Card: (style = []) => <Card style={style}/>,
  AddItem: (style = []) => <AddItem style={style}/>,
  Announcement: (style = []) => <Announcement style={style}/>,
  AcceptRequest: (style = []) => <AcceptRequest style={style}/>,
  RejectRequest: (style = []) => <RejectRequest style={style}/>,
  TimeCup: (style = []) => <TimeCup style={style}/>,
  Logout: (style = []) => <Image source={logout} style={style}/>,
  Support: (style = []) => <Image source={support} style={style}/>,


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
