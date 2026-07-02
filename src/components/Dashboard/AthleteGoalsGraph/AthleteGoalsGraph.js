import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BarChart, XAxis, Grid } from 'react-native-svg-charts';
import styles from './AthleteGoalsGraphStyles';
import { G, Line, Text as SvgText } from 'react-native-svg';

export default class AthleteGoalsGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // const barWidth = Dimensions.get('screen').width - 80;

    const colors = [
      '#F2CC60',
      '#7EE787',
      '#FFA657',
      '#388BFD',
      '#F85149',
      '#8B939E',
    ];
    const data = this.props.values.map((item, index) => {
      return {
        value: item,
        svg: {
          fill: colors[index],
        },
        label: index === 3 ? 'PREPA PHYSIQUE' : this.props.keys[index],
      };
    });

    const CUT_OFF = 10;
    const Labels = ({ x, y, bandwidth, data }) =>
      data.map((item, index) => (
        <SvgText
          key={index}
          x={x(index) + bandwidth / 2}
          y={y(item.value) - 10}
          fontSize={14}
          fill={item.value >= CUT_OFF ? '#979797' : '#979797'}
          alignmentBaseline={'middle'}
          textAnchor={'middle'}>
          {item.value}
        </SvgText>
      ));

    const CustomGrid = ({ x, y, data, ticks }) => (
      <G>
        {
          // Horizontal grid
          ticks.map((tick) => {
            return (
              <Line
                key={tick}
                x1={'0%'}
                x2={'100%'}
                y1={y(tick)}
                y2={y(tick)}
                stroke={tick === 0 ? '#717171' : '#fff'}
                opacity={tick === 0 ? '1' : '0.2'}
              />
            );
          })
        }
        {
          // Vertical grid
          data.map((_, index) => (
            <Line
              strockeWidth={10}
              key={index}
              y1={'10%'}
              y2={'100%'}
              x1={x(index)}
              x2={x(index)}
              stroke={_ === 0 ? '#717171' : '#fff'}
              opacity={_ === 0 ? '1' : '0.2'}
            />
          ))
        }
      </G>
    );

    return (
      <View style={styles.linearContainer}>
        <Text style={styles.title}>OBJECTIFS</Text>
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
          <View style={{ height: 350 }}>
            <BarChart
              spacingInner={0.8}
              yAccessor={({ item }) => item.value}
              xAccessor={({ item }) => item.value}
              gridMin={0}
              style={{ flex: 1 }}
              spacing={0.2}
              data={data}
              numberOfTicks={6}
              contentInset={{ top: 30, bottom: 10, left: 30, right: 30 }}>
              <CustomGrid belowChart={true} />
              <Labels />
            </BarChart>
            <XAxis
              // xAccessor={({ item }) => {
              //   console.log(item.label);
              // }}
              // formatLabel={(value) => {
              //   console.log(value);
              // }}
              formatLabel={(value, index) => {
                return data[index].label;
              }}
              style={{ height: 100 }}
              data={data}
              contentInset={{ left: 50, right: 30 }}
              svg={{
                rotation: -30,
                marginTop: 50,
                fontSize: 8,
                padding: 10,
                translateY: 30,
                translateX: -10,
              }}
            />
          </View>
        </LinearGradient>
      </View>
    );
  }
}
