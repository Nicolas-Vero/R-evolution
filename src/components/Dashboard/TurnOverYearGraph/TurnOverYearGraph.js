import React from 'react';
import { ScrollView, View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Svg, Text as TextSVG } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

import styles from './TurnOverYearGraphStyles';

export default class TurnOverYearGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data, selectedMonthIndex } = this.props;
    return (
      <ScrollView horizontal={true}>
        <View style={styles.linearContainer}>
          <LinearGradient
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
              backgroundGradientFromOpacity={0}
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
                backgroundGradientFromOpacity: 0,
                backgroundGradientToOpacity: 0,
                paddingHorizontal: 50,
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
              style={{}}
            />
          </LinearGradient>
        </View>
      </ScrollView>
    );
  }
}
