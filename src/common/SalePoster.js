import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import ResponsiveText from './ResponsiveText';

export default class SalePoster extends React.Component {

  onPress() {
    const {item} = this.props;
    this.props.onPress(item)
  }

  render() {
    const {item} = this.props;
    return (
      <TouchableOpacity onPress={this.onPress.bind(this)} style={styles.container}>
        {
          item.attributes.photo && item.attributes.photo.length > 0 &&
          <Image
            source={{uri: item.attributes.photo}}
            style={styles.photo}
          />
        }
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: wp('20%'),
          flexWrap: 'wrap'
        }}>
          <View style={styles.percentageView}>
            <ResponsiveText style={styles.percentageText}>
              {
                item.attributes.reduction
              }
            </ResponsiveText>
          </View>
          <ResponsiveText style={{
            fontSize: '4.3%',
            textAlign: 'center',
            color: '#CC59EF',
          }}>
            {item.attributes.name}
          </ResponsiveText>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  container: {
    position: 'relative',
    width: wp('80%'),
    height: wp('35%'),
    borderRadius: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 25,
    backgroundColor: "#FFBFC2"
  },
  photo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 10,
    width: wp('80%'),
    height: '100%',
    resizeMode: 'cover',
    alignSelf: 'flex-end'
  },
  percentageView: {
    height: wp('15%'),
    width: wp('15%'),
    borderRadius: wp('7.5%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CC59EF',
  },
  percentageText: {
    color: '#fff',
    fontSize: '4%'
  },
}
