import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import styles from './AthleteGraphStyles';

export default class AthleteGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { athletes } = this.props;
    return (
      <View style={styles.linearContainer}>
        <Text style={styles.title}>TOTAL</Text>

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
          <View style={styles.athleteContainer}>
            <View style={styles.athletesInfosRow}>
              <View style={styles.athleteInfoColor1} />
              <Text
                style={styles.athletesValueText}>{`${athletes.actifs}`}</Text>
              <Text style={styles.athletesSaleText}>ACTIFS</Text>
            </View>
            <AnimatedCircularProgress
              size={150}
              width={15}
              fill={athletes.percentage}
              rotation={180}
              lineCap={'round'}
              tintColor="#2CDEE4"
              backgroundColor="#393637">
              {(fill) => (
                <View style={styles.caSalesTextContainer}>
                  <Text
                    style={
                      styles.totalAthletesText
                    }>{`${athletes.total}`}</Text>
                  <Text style={styles.totalAthleteIndexText}>ATHLETES</Text>
                </View>
              )}
            </AnimatedCircularProgress>
            <View style={styles.athletesInfosRow}>
              <View style={styles.athleteInfoColor2} />
              <Text
                style={styles.athletesValueText}>{`${athletes.inactifs}`}</Text>
              <Text style={styles.athletesSaleText}>INACTIFS</Text>
            </View>
            {/* <View style={styles.caSalesInfoContainer}>
              <View style={styles.caInfosRow}>
                <View style={styles.caSale1InfoColor} />
                <Text style={styles.caValueText}>{`${athletes.actifs}`}</Text>
                <Text style={styles.caSaleText}>ACTIFS</Text>
              </View>
              <View style={styles.caInfosRow}>
                <View style={styles.caSale2InfoColor} />
                <Text style={styles.caValueText}>{`${athletes.inactifs}`}</Text>
                <Text style={styles.caSaleText}>INACTIFS</Text>
              </View>
            </View> */}
          </View>
        </LinearGradient>
      </View>
    );
  }
}
