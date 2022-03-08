import React from 'react';
import { Text, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import styles from './TurnOverSaleGraphStyles';

export default class TurnOverSaleGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { sales } = this.props;
    return (
      <View style={styles.caSaleContainer}>
      <AnimatedCircularProgress
        size={110}
        width={20}
        backgroundWidth={15}
        fill={sales.percentage}
        rotation={180}
        // lineCap={'round'}
        tintColor="#4FE470"
        backgroundColor="#165423">
        {(fill) => (
          <View style={styles.caSalesTextContainer}>
            <Text
              style={styles.caSaleValueText}>{`${sales.total}`}</Text>
            <Text style={styles.caSaleIndexText}>VENTES</Text>
          </View>
        )}
      </AnimatedCircularProgress>
      <View style={styles.caSalesInfoContainer}>
        <View style={styles.caInfosRow}>
          <View style={styles.caSale1InfoColor} />
          <Text style={styles.caValueText}>{`${sales.new}`}</Text>
          <Text style={styles.caSaleText}>NOUVELLES VENTES</Text>
        </View>
        <View style={styles.caInfosRow}>
          <View style={styles.caSale2InfoColor} />
          <Text style={styles.caValueText}>{`${sales.renew}`}</Text>
          <Text style={styles.caSaleText}>RENOUVELLEMENTS</Text>
        </View>
      </View>
    </View>
    );
  }
}
