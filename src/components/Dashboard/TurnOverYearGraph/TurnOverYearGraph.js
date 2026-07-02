import React from 'react';
import { ScrollView, View, Dimensions, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Svg, Text as TextSVG } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';

import styles from './TurnOverYearGraphStyles';

export default class TurnOverYearGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onYearSubmit = async (goal) => {
    this.onDismissGoalDialog();
    if (!goal) {
      return;
    }
    const res = await postMonthlyCoachGoal(
      goal,
      this.component.state.selectedMonth,
    );
    console.log(res);
    if (res.status === 200) {
      await this.fetchMonthlyTurnover();
    }
  };

  render() {
    const { data, selectedMonthIndex } = this.props;
    return (
      <View style={styles.linearContainer}>
        <ScrollView horizontal={true}>
          <LinearGradient
            style={{ paddingHorizontal: 5 }}
            colors={['#060606', '#181B1F', '#2D333C']}
            start={{
              x: 1,
              y: 0,
            }}
            end={{
              x: 1,
              y: 1,
            }}>
            <LineChart
              data={{
                labels: [
                  'JAN',
                  'FEV',
                  'MARS',
                  'AVR',
                  'MAI',
                  'JUIN',
                  'JUIL',
                  'AOUT',
                  'SEP',
                  'OCT',
                  'NOV',
                  'DEC',
                ],
                datasets: [
                  {
                    data,
                  },
                ],
              }}
              width={Dimensions.get('window').width + 200}
              height={250}
              withHorizontalLabels={false}
              withInnerLines={true}
              withOuterLines={true}
              withShadow={false}
              renderDotContent={({ x, y, index }) => {
                const isCurrentMonth = index === selectedMonthIndex;
                return (
                  <TextSVG
                    key={index}
                    x={x}
                    y={y - 10}
                    fill={isCurrentMonth ? '#2CDEE4' : '#fff'}
                    fontSize={isCurrentMonth ? '16' : '10'}
                    fontWeight="normal"
                    textAnchor="middle">
                    {`${data[index]}€`}
                  </TextSVG>
                );
              }}
              getDotColor={(dataPoint, dataPointIndex) => {
                const isCurrentMonth = dataPointIndex === selectedMonthIndex;

                return isCurrentMonth ? '#2CDEE4' : '#fff';
              }}
              chartConfig={{
                propsForBackgroundLines: {
                  strokeDasharray: '', // solid background lines with no dashes
                },
                backgroundGradientFromOpacity: 0,
                backgroundGradientToOpacity: 0,
                barPercentage: 1,
                barRadius: 1,
                decimalPlaces: 2, // optional, defaults to 2dp
                strokeWidth: 1,
                propsForLabels: {
                  fontSize: 8,
                  // fontFamily: 'Montserrat',
                },
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `#fff`,
                style: {
                  backgroundColor: 'transparent',
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '4',
                  strokeWidth: '1',
                  // stroke: '#fff',
                },
              }}
              segments={6}
              style={{ paddingRight: 30, paddingTop: 25 }}
            />
          </LinearGradient>
        </ScrollView>
      </View>
    );
  }
}
