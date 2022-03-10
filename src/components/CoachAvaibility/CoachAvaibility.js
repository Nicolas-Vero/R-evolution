import React from 'react';
import { View, Text } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';
import styles from './CoachAvaibilityStyle';
import { slots } from '../../helpers/dateHelper';
import { isBoolean, isObject } from 'lodash';
import { update_availabilities } from '../../api/Availabilities';

export default class CoachAvaibility extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onCheckboxChange = async () => {
    const { day, index, item } = this.props;
    const data = { slots: {}, date: day };
    data.slots[`slot_${index}`] = !item;
    await update_availabilities(data);
    this.props.handler && this.props.handler();
  };
  render = () => {
    const { index, item, onAthletePress, day, disable } = this.props;

    return (
      <View style={styles.container}>
        <Text style={[styles.text, { color: disable ? '#979797' : '#FFF' }]}>
          {slots[index]}
        </Text>

        {isBoolean(item) ? (
          item === false ? (
            <Text
              style={[styles.text, { color: disable ? '#979797' : '#FFF' }]}>
              indisponible
            </Text>
          ) : (
            <TouchableOpacity
              disabled={disable}
              onLongPress={() => this.props.onLinePress(slots[index])}>
              <Text
                style={[
                  styles.text,
                  { color: disable ? '#979797' : '#2CDEE4' },
                ]}>
                disponible
              </Text>
            </TouchableOpacity>
          )
        ) : (
          <View>
            <TouchableOpacity
              style={styles.userContainer}
              onPress={() => onAthletePress(item.athlete)}>
              <Avatar
                size={22}
                rounded
                source={
                  item.athlete.profile_picture_url
                    ? {
                        uri: item.athlete.profile_picture_url,
                      }
                    : require('../../../assets/images/no_pp.jpg')
                }
              />
              <Text
                style={
                  styles.username
                }>{`${item.athlete.first_name} ${item.athlete.last_name}`}</Text>
            </TouchableOpacity>
          </View>
        )}
        <CheckBox
          disabled={disable || item.first_name}
          size={22}
          containerStyle={styles.checkBox}
          checkedColor="#2CDEE4"
          checkedIcon="dot-circle-o"
          uncheckedIcon="dot-circle-o"
          checked={item === true || isObject(item)}
          uncheckedColor={disable ? '#979797' : '#fff'}
          value={isBoolean(item) || isObject(item)}
          onPress={this.onCheckboxChange}
        />
      </View>
    );
  };
}
