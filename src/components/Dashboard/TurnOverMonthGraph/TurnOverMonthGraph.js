import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import styles from './TurnOverMonthGraphStyles';

export default class TurnOverMonthGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { turnOver } = this.props;
    const width = Dimensions.get('window').width - 100;
    return (
      <View style={styles.caGraphContainer}>
        <AnimatedCircularProgress
          childrenContainerStyle={{ height: 150 }}
          size={width}
          width={25}
          fill={turnOver.percentage.toFixed() || 0}
          style={{ height: 165 }}
          rotation={270}
          arcSweepAngle={180}
          // lineCap={'round'}
          tintColor="#2CDEE4"
          backgroundColor="#383637">
          {(fill) => (
            <View style={styles.caTextContainer}>
              <Text
                style={
                  styles.caCurrentValueText
                }>{`${turnOver.current}€`}</Text>
              {turnOver.goal && (
                <Text style={styles.caTotalValueText}>
                  {`SUR ${turnOver.goal}€`}
                </Text>
              )}
            </View>
          )}
        </AnimatedCircularProgress>
        {turnOver.goal && (
          <View style={{ position: 'absolute', bottom: -15, right: -8 }}>
            <Text style={styles.goalText}>{`${turnOver.goal}€`}</Text>
          </View>
        )}
      </View>
    );
  }
}
