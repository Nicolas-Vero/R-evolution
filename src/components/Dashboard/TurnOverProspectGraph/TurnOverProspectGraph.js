import React from 'react';
import { Text, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import styles from './TurnOverProspectGraphStyles';

export default class TurnOverProspectGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { prospects } = this.props;
    const percentage = prospects.percentage
      ? prospects.percentage.toFixed()
      : 0;
    return (
      <View style={styles.caSaleContainer}>
        <View style={styles.caSalesInfoContainer}>
          <View style={styles.caInfosRow}>
            <View style={styles.caConverti1InfoColor} />
            <Text style={styles.caValueText}>{`${prospects.converted}`}</Text>
            <Text style={styles.caSaleText}>CONVERTIS</Text>
          </View>
          <View style={styles.caInfosRow}>
            <View style={styles.caConverti2InfoColor} />
            <Text
              style={styles.caValueText}>{`${prospects.notConverted}`}</Text>
            <Text style={styles.caSaleText}>NON CONVERTIS</Text>
          </View>
        </View>
        <AnimatedCircularProgress
          size={95}
          width={10}
          backgroundWidth={6}
          fill={percentage}
          rotation={180}
          lineCap={'round'}
          tintColor="#FED32C"
          backgroundColor="#383637">
          {(fill) => (
            <View style={styles.caSalesTextContainer}>
              <Text
                style={styles.caConvertGraphValueText}>{`${percentage}%`}</Text>
              <Text style={styles.caConvertGraphInfoText}>
                SUR {`${prospects.total}`} PROSPECTS
              </Text>
            </View>
          )}
        </AnimatedCircularProgress>
      </View>
    );
  }
}
