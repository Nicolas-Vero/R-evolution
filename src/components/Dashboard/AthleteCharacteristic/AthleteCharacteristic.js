import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBarAnimated from 'react-native-progress-bar-animated';

import styles from './AthleteCharacteristicStyles';
import * as Progress from 'react-native-progress';
import { ProgressBar } from 'react-native-multicolor-progress-bar';

const agesIndex = ['13-17', '18-24', '25-34', '35-44', '45-54', '+55'];
export default class AthleteCharacteristic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderAgeLine = (value, index, barWidth) => {
    console.log(value);
    return (
      <View key={index} style={{ marginBottom: index === 5 ? 0 : 20 }}>
        <View style={styles.ageLineContainer}>
          <View>
            <Text
              style={styles.ageLineLeftText}>{`${agesIndex[index]} ans`}</Text>
          </View>
          <View style={{ marginHorizontal: 20 }}>
            <Progress.Bar
              color={'#7B61FF'}
              progress={value > 0 ? value / 100 : 0}
              unfilledColor={'#1E2026'}
              borderWidth={0}
              width={260}
              height={10}
            />
          </View>
          <View>
            <Text style={styles.ageLineRightText}>{`${value}%`}</Text>
          </View>
        </View>
      </View>
    );
  };
  render() {
    const barWidth = Dimensions.get('screen').width - 60;
    const { athletes } = this.props;

    const total = athletes.gender.males.count + athletes.gender.females.count;
    const femalesPercentage = athletes.gender.females.percentage
      ? athletes.gender.females.count / total
      : 0;
    const malesPercentage = athletes.gender.males.percentage
      ? athletes.gender.males.count / total
      : 0;

    return (
      <View style={styles.linearContainer}>
        <Text style={styles.title}>CARACTÉRISTIQUES</Text>
        <LinearGradient
          colors={['#070707', '#121417', '#1B1F25']}
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
                  }>{` ${athletes.gender.females.count}`}</Text>
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.genderIndexText}>
                Hommes
                <Text
                  style={
                    styles.genderValueMaleText
                  }>{` ${athletes.gender.males.count}`}</Text>
              </Text>
            </View>
          </View>
          <ProgressBar
            textStyle={{ marginTop: 3 }}
            parentViewStyle={{ alignItems: 'stretch' }}
            backgroundBarStyle={styles.genderBar}
            arrayOfProgressObjects={[
              {
                color: '#9F294E',
                value: femalesPercentage,
                nameToDisplay: `${(femalesPercentage * 100).toFixed()}%`,
              },
              {
                color: '#2CA2E4',
                value: malesPercentage,
                nameToDisplay: `${(malesPercentage * 100).toFixed()}%`,
              },
            ]}
          />
          {/* <View style={styles.genderBar}>
            <View style={styles.genderBarWife}>
              <Text
                style={
                  styles.gendarBarValueText
                }>{`${femalesPercentage}%`}</Text>
            </View>
            <ProgressBarAnimated
              useNativeDriver={false}
              backgroundColor={'#9F294E'}
              // underlyingColor={'#fff'}
              borderRadius={10}
              borderColor={'transparent'}
              borderWidth={0}
              width={barWidth}
              height={18}
              value={femalesPercentage}
            />
            <View style={styles.gendarBarMale}>
              <Text
                style={styles.gendarBarValueText}>{`${malesPercentage}%`}</Text>
            </View>
          </View> */}
          {athletes.ages.map((val, index) => {
            const percentage = val ? val.toFixed() : 0;
            return this.renderAgeLine(percentage, index, barWidth);
          })}
        </LinearGradient>
      </View>
    );
  }
}
