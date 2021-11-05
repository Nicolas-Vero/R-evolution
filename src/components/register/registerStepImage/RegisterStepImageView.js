import React from 'react';
import { View, Image } from 'react-native';
import styles from './RegisterStepImageStyle';
export default class RegisterStepImageView extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let image = '';
    switch (this.props.step) {
      case 1:
        image = require('../../../../assets/images/GroupA_1.png');
        break;
      case 2:
        image = require('../../../../assets/images/GroupA_2.png');
        break;
      case 3:
        image = require('../../../../assets/images/GroupA_3.png');
        break;
      case 4:
        image = require('../../../../assets/images/GroupA_4.png');
        break;
      case 5:
        image = require('../../../../assets/images/GroupA_5.png');
        break;
      case 6:
        image = require('../../../../assets/images/GroupA_6.png');
        break;
      case 7:
        image = require('../../../../assets/images/GroupA_7.png');
        break;
    }
    return (
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>
    );
  }
}
