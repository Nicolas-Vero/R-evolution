import React from 'react';
import { Text, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import styles from './TurnOverMonthGraphStyles';

export default class TurnOverMonthGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { turnOver } = this.props;
    return (
      <View style={styles.caGraphContainer}>
        <AnimatedCircularProgress
          childrenContainerStyle={{ height: 150 }}
          size={300}
          width={25}
          fill={turnOver.percentage}
          style={{ height: 150 }}
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
              <Text
                style={styles.caTotalValueText}>{`SUR ${turnOver.goal}€`}</Text>
            </View>
          )}
        </AnimatedCircularProgress>
      </View>
    );
  }
}
