import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BarChart } from 'react-native-chart-kit';

import styles from './AthleteGoalsGraphStyles';

const agesIndex = ['13-17', '18-24', '25-34', '35-44', '45-54', '+55'];
export default class AthleteGoalsGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const barWidth = Dimensions.get('screen').width - 80;

    const data = {
      labels: [
        'PERTE DE POIDS',
        'PRISE DE MASSE',
        'RAFFERMISSEMENT',
        'SANTE',
        'PREPAP PHYSIQUE',
        'AUTRE',
      ],
      datasets: [
        {
          data: [12, 34, 12, 34, 12, 23],
          colors: [
            () => '#F2CC60',
            () => '#7EE787',
            () => '#FFA657',
            () => '#388BFD',
            () => '#F85149',
            () => '#8B939E',
          ],
        },
      ],
    };
    return (
      <View style={styles.linearContainer}>
        <Text style={styles.title}>OBJECTIFS</Text>
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
          <BarChart
            bezier
            // style={graphStyle}
            data={data}
            width={barWidth}
            height={330}
            fromZero={true}
            withHorizontalLabels={false}
            verticalLabelRotation={30}
            showValuesOnTopOfBars={true}
            showBarTops={false}
            chartConfig={{
              barPercentage: 0.5,
              propsForBackgroundLines: {
                strokeDasharray: '',
              },
              backgroundGradientFromOpacity: 0,
              backgroundGradientToOpacity: 0,
              propsForVerticalLabels: {
                // textAnchor: 'end',
                fontSize: 8,
              },
              verticalLabelsHeightPercentage: 55,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            style={{ paddingRight: 5 }}
            withCustomBarColorFromData={true}
            flatColor={true}
          />
        </LinearGradient>
      </View>
    );
  }
}
