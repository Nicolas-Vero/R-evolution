import React from 'react';
import { View, Text } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import { AntDesign } from '@expo/vector-icons';

import AbstractScreenView from '../../components/abstracts/AbstractScreen/AbstractScreenView';
import Header from '../../components/Header';
import MonthsSlider from '../../components/MonthsSlider';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import TurnOverYearGraph from '../../components/Dashboard/TurnOverYearGraph/TurnOverYearGraph';
import TurnOverMonthGraph from '../../components/Dashboard/TurnOverMonthGraph/TurnOverMonthGraph';
import TurnOverSaleGraph from '../../components/Dashboard/TurnOverSaleGraph/TurnOverSaleGraph';
import TurnOverProspectGraph from '../../components/Dashboard/TurnOverProspectGraph/TurnOverProspectGraph';
import styles from './SalesDetailsScreenStyles';
import AthleteGraph from '../../components/Dashboard/AthleteGraph/AthleteGraph';
import AthleteCharacteristic from '../../components/Dashboard/AthleteCharacteristic/AthleteCharacteristic';

const options = [
  { label: 'MON CA', value: 'CA' },
  { label: 'MES ATHLÈTES', value: 'athletes' },
];
export default class SalesDetailsScreenView extends AbstractScreenView {
  renderCA = () => {
    const { turnOver, sales, prospects, yearCA, selectedMonthIndex } =
      this.component.state;
    return (
      <View>
        <MonthsSlider onChange={this.controller.onMonthChange} />
        <ScrollView style={styles.scrollView}>
          <View style={styles.caHeader}>
            <Text style={styles.caHeaderText}>CHIFFRE D'AFFAIRES</Text>
            <View style={styles.caGoalContainer}>
              <Text
                style={styles.caHeaderText}
                onPress={this.controller.goToSaleDetail}>
                OBJECTIF
              </Text>
              <AntDesign name="arrowright" size={12} color="white" />
            </View>
          </View>
          <View style={styles.linearContainer}>
            <LinearGradient
              colors={['#070708', '#101214', '#1B1F25']}
              start={{
                x: 1,
                y: 0,
              }}
              end={{
                x: 1,
                y: 1,
              }}
              style={styles.linear}>
              <TurnOverMonthGraph turnOver={turnOver} />
              <TurnOverSaleGraph sales={sales} />
              <TurnOverProspectGraph prospects={prospects} />
            </LinearGradient>
          </View>
          <TurnOverYearGraph
            data={yearCA}
            selectedMonthIndex={selectedMonthIndex}
          />
        </ScrollView>
      </View>
    );
  };

  renderAthletes = () => {
    return (
      <View>
        <AthleteGraph
          athletes={{ total: 10, percentage: 50, actifs: 5, inactifs: 5 }}
        />
        <AthleteCharacteristic
          athletes={{
            ages: [2.1, 2.1, 2.1, 69.3, 2.1, 69.1],
            gender: {
              males: { number: 50, percentage: 50 },
              females: { number: 50, percentage: 50 },
            },
          }}
        />
      </View>
    );
  };
  renderSwitchSelector = () => {
    return (
      <SwitchSelector
        options={options}
        initial={0}
        onPress={(value) => this.component.setState({ screen: value })}
        backgroundColor="#1E2026"
        buttonColor="#2CDEE4"
        selectedColor="#1E2026"
        textColor="white"
        borderRadius={10}
        height={45}
        style={{ width: 'auto' }}
        hasPadding
        fontSize={13}
        selectedTextStyle={{
          fontFamily: 'MontserratBoldItalic',
          lineHeight: 15,
        }}
        textStyle={{
          fontFamily: 'MontserratBoldItalic',
          lineHeight: 15,
        }}
        borderColor="#1E2026"
      />
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <Header title="LES DÉTAILS DE VENTE" />
        <View style={styles.content}>
          <MonthsSlider onChange={this.controller.onMonthChange} />
          <View style={styles.infoContainer}>
            <Text style={styles.infoIndexText}>MONTANT(S) ENCAISSÉ(S)</Text>
            <Text style={styles.infoValueText}>2750€</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoIndexText}>MONTANT(S) EN ATTENTE</Text>
            <Text style={styles.infoValueText}>2750€</Text>
          </View>
        </View>
      </View>
    );
  }
}
