import React from 'react';
import {Text, View, FlatList, Image, Dimensions, TouchableOpacity} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import source from '../../assets/images/logo.png'

export default class Logo extends React.Component {

  render() {
    return (
      <Image
        source={source}
        style={styles.logoStyle}
      />
    );
  }
}
const styles = {
  logoStyle: {
    height: wp('15%'),
    resizeMode: 'contain',
    alignSelf: 'center',
  }

}
