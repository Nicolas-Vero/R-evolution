import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import ProgressBarAnimated from 'react-native-progress-bar-animated';

import styles from './AthleteCharacteristicStyles';
import * as Progress from 'react-native-progress';

const agesIndex = ['13-17', '18-24', '25-34', '35-44', '45-54', '+55'];
export default class AthleteCharacteristic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderAgeLine = (value, index, barWidth) => {
    return (
      <View key={index} style={{ marginBottom: index === 5 ? 0 : 20 }}>
        <View style={styles.ageLineContainer}>
          <View style={{ alignItems: 'flex-start', flex: 1, marginRight:20 }}>
            <Text
              style={styles.ageLineLeftText}>{`${agesIndex[index]} ans`}</Text>
          </View>
          <View style={{ alignItems: 'center', flex: 1 }}>
            <Progress.Bar
              color={'#7B61FF'}
              progress={value / 100}
              unfilledColor={'#1E2026'}
              borderWidth={0}
              width={260}
              height={10}
            />
          </View>
          {/* <View style={styles.ageBar}>
            <ProgressBarAnimated
              backgroundColor={'#7B61FF'}
              // underlyingColor={'#fff'}
              borderRadius={10}
              borderColor={'transparent'}
              borderWidth={0}
              width={barWidth - 100}
              height={18}
              value={value}
            />
          </View> */}
          <View style={{ alignItems: 'flex-end', flex: 1 }}>
            <Text style={styles.ageLineRightText}>{`${value}%`}</Text>
          </View>
        </View>
      </View>
    );
  };
  render() {
    const barWidth = Dimensions.get('screen').width - 60;

    const { athletes } = this.props;
    return (
      <View style={styles.linearContainer}>
        <Text style={styles.title}>CARACTÉRISTIQUES</Text>
        <LinearGradient
          colors={['#060606', '#181B1F', '#2D333C']}
          start={{
            x: 1,
            y: 0,
          }}
          end={{
            x: 1,
            y: 1,
          }}
          style={styles.linear}>
          <View style={styles.genderRow}>
            <View style={styles.row}>
              <Text style={styles.genderIndexText}>
                Femmes
                <Text
                  style={
                    styles.genderValueFemaleText
                  }>{` ${athletes.gender.females.number}`}</Text>
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.genderIndexText}>
                Hommes
                <Text
                  style={
                    styles.genderValueMaleText
                  }>{` ${athletes.gender.males.number}`}</Text>
              </Text>
            </View>
          </View>
          <View style={styles.genderBar}>
            <View style={styles.genderBarWife}>
              <Text
                style={
                  styles.gendarBarValueText
                }>{`${athletes.gender.females.percentage}%`}</Text>
            </View>
            <ProgressBarAnimated
              backgroundColor={'#9F294E'}
              // underlyingColor={'#fff'}
              borderRadius={10}
              borderColor={'transparent'}
              borderWidth={0}
              width={barWidth}
              height={18}
              value={athletes.gender.females.percentage}
            />
            <View style={styles.gendarBarMale}>
              <Text
                style={
                  styles.gendarBarValueText
                }>{`${athletes.gender.males.percentage}%`}</Text>
            </View>
          </View>
          {athletes.ages.map((val, index) => {
            return this.renderAgeLine(val, index, barWidth);
          })}
        </LinearGradient>
      </View>
    );
  }
}
