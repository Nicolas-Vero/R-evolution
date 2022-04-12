import React from 'react';
import { View, Text } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import { AntDesign } from '@expo/vector-icons';

import AbstractScreenView from '../../components/abstracts/AbstractScreen/AbstractScreenView';
import HeaderSimple from '../../components/HeaderSimple';
import MonthsSlider from '../../components/MonthsSlider';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import TurnOverYearGraph from '../../components/Dashboard/TurnOverYearGraph/TurnOverYearGraph';
import TurnOverMonthGraph from '../../components/Dashboard/TurnOverMonthGraph/TurnOverMonthGraph';
import TurnOverSaleGraph from '../../components/Dashboard/TurnOverSaleGraph/TurnOverSaleGraph';
import TurnOverProspectGraph from '../../components/Dashboard/TurnOverProspectGraph/TurnOverProspectGraph';
import styles from './DashboardStyles';
import AthleteGraph from '../../components/Dashboard/AthleteGraph/AthleteGraph';
import AthleteCharacteristic from '../../components/Dashboard/AthleteCharacteristic/AthleteCharacteristic';
import AthleteGoalsGraph from '../../components/Dashboard/AthleteGoalsGraph/AthleteGoalsGraph';
import SaveGoalDialog from '../../components/dialogs/saveGoalDialog/saveGoalDialog';
import ChoiceYearDialog from '../../components/dialogs/choiceYearDialog/choiceYearDialog';

const options = [
  { label: 'MON CA', value: 'CA' },
  { label: 'MES ATHLÈTES', value: 'athletes' },
];
export default class DashboardScreenView extends AbstractScreenView {
  renderGoalDialog = () => {
    return (
      <SaveGoalDialog
        dialogVisible={this.component.state.isGoalModalVisible}
        onClose={this.controller.onDismissGoalDialog}
        onValidate={this.controller.onGoalSubmit}
      />
    );
  };

  rendeYearDialog = () => {
    const { year } = this.component.state;
    return (
      <ChoiceYearDialog
        dialogVisible={this.component.state.isYearModalVisible}
        onClose={this.controller.onDismissYearDialog}
        onValidate={this.controller.onYearSubmit}
        currentYear={year}
      />
    );
  };

  renderCA = () => {
    const { year } = this.component.state;
    const { turnOver, sales, prospects, yearCA, selectedMonthIndex } =
      this.component.state;
    return (
      <View>
        {this.renderGoalDialog()}
        {this.rendeYearDialog()}
        <MonthsSlider
          onChange={this.controller.onMonthChange}
          withYear={true}
        />
        <ScrollView style={styles.scrollView}>
          <View style={styles.caHeader}>
            <Text style={styles.caHeaderText}>CHIFFRE D'AFFAIRES</Text>
            <View style={styles.caGoalContainer}>
              <Text
                style={styles.caHeaderText}
                onPress={this.controller.setGoalModalVisible}>
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
              <TouchableOpacity onPress={this.controller.goToSaleDetail}>
                {turnOver && <TurnOverMonthGraph turnOver={turnOver} />}
              </TouchableOpacity>
              {sales && <TurnOverSaleGraph sales={sales} />}
              {prospects && <TurnOverProspectGraph prospects={prospects} />}
            </LinearGradient>
          </View>
          <View style={{ marginTop: 0 }}>
            <View style={styles.caHeader}>
              <Text style={styles.caHeaderText}>HISTORIQUE</Text>
              <View style={styles.caGoalContainer}>
                <Text
                  style={styles.caHeaderText}
                  onPress={this.controller.setYearModalVisible}>
                  {year}
                </Text>
                <AntDesign name="arrowright" size={12} color="white" />
              </View>
            </View>
            <TurnOverYearGraph
              data={yearCA}
              selectedMonthIndex={selectedMonthIndex}
            />
          </View>
        </ScrollView>
      </View>
    );
  };

  renderAthletes = () => {
    const { athletes, athletesGoals } = this.component.state;
    return (
      <ScrollView style={styles.scrollView2}>
        <AthleteGraph athletes={athletes.activity} />
        <AthleteCharacteristic
          athletes={{
            ages: athletes.ages,
            gender: athletes.gender,
          }}
        />
        <AthleteGoalsGraph
          keys={Object.keys(athletesGoals)}
          values={Object.values(athletesGoals)}
        />
      </ScrollView>
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
        <HeaderSimple title="DASHBOARD" />
        <View style={styles.content}>
          {this.renderSwitchSelector()}
          <View style={styles.page}>
            {this.component.state.screen === 'CA'
              ? this.renderCA()
              : this.renderAthletes()}
          </View>
        </View>
      </View>
    );
  }
}
