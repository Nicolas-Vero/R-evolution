import React from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const {width, height} = Dimensions.get('window');


export default class SearchDisplayItem extends React.Component {

  pushDataBack() {
    // this.props.on
    this.props.onPushDataBack(this.props.item)
  }

  render() {
    // const item = this.props.item;

    return (
      <View
      style={{
        borderBottomWidth: 1,
        borderColor:'#fff'
      }}
      >
        <TouchableOpacity style={styles.container}
                          onPress={() => this.props.onPushDataBack(this.props.item)}
        >
          <View style={styles.imageHeader}>
            <Image style={styles.image}
                   source={{uri: this.props.item.image}}
            />
          </View>
          <View style={styles.nameLogo}>

            <Text style={styles.name}>{this.props.item.name}</Text>
            <Image
              source={require('../../assets/icons/tagRight.png')}
              style={{height: wp('2%'), resizeMode: 'contain'}}
            />
          </View>
        </TouchableOpacity>
      </View>

    );
  }
}
const styles = {
  container: {
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingLeft:'10%',
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  lineBreak: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1
  },
  image: {
    height: wp('20%'),
    width: wp('20%'),
    borderRadius: wp('10%')
  },
  imageHeader: {
    // borderWidth: 2,
    // borderColor: 'grey',
    // borderRadius: 35

  },
  nameLogo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  name: {
    color: '#fff',
    marginLeft: 20,
    fontSize: 17
  }
}
