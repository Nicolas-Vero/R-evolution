import React from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import { AntDesign } from '@expo/vector-icons';
import HeaderSimple from '../../components/HeaderSimple';
import MonthsSlider from '../../components/MonthsSlider';
import { LinearGradient } from 'expo-linear-gradient';
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

// === HOOK DIRECTEMENT INTÉGRÉ ICI ===
import { useDashboardScreen } from './useDashboardScreen';

const options = [
  { label: 'MON CA', value: 'CA' },
  { label: 'MES ATHLÈTES', value: 'athletes' },
];

const DashboardScreen = ({ navigation }) => {
  const {
    screen,
    setScreen,
    year,
    selectedMonthIndex,
    turnOver,
    sales,
    prospects,
    yearCA,
    athletes,
    athletesGoals,
    isGoalModalVisible,
    isYearModalVisible,
    onMonthChange,
    handleGoalModalVisible,
    handleDismissGoalDialog,
    handleYearModalVisible,
    handleDismissYearDialog,
    onGoalSubmit,
    onYearSubmit,
    goToSaleDetail,
  } = useDashboardScreen({ navigation });

  const renderGoalDialog = () => (
    <SaveGoalDialog
      dialogVisible={isGoalModalVisible}
      onClose={handleDismissGoalDialog}
      onValidate={onGoalSubmit}
    />
  );

  const renderYearDialog = () => (
    <ChoiceYearDialog
      dialogVisible={isYearModalVisible}
      onClose={handleDismissYearDialog}
      onValidate={onYearSubmit}
      currentYear={year}
    />
  );

  const renderCA = () => (
    <View>
      {renderGoalDialog()}
      {renderYearDialog()}
      <MonthsSlider onChange={onMonthChange} withYear={true} />
      <View style={{ height: '100%', maxHeight: 'auto' }}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ flexGrow: 1 }}
          enableOnAndroid={true}
        >
          <View style={styles.caHeader}>
            <Text style={styles.caHeaderText}>CHIFFRE D'AFFAIRES</Text>
            <View style={styles.caGoalContainer}>
              <Text style={styles.caHeaderText} onPress={handleGoalModalVisible}>
                OBJECTIF
              </Text>
              <AntDesign name="arrowright" size={12} color="white" />
            </View>
          </View>
          <View style={styles.linearContainer}>
            <LinearGradient
              colors={['#070708', '#101214', '#1B1F25']}
              start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.linear}
            >
              <TouchableOpacity onPress={goToSaleDetail}>
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
                <Text style={styles.caHeaderText} onPress={handleYearModalVisible}>
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
    </View>
  );

  const renderAthletes = () => (
    <ScrollView style={styles.scrollView2}>
      {athletes && athletes.activity && (
        <AthleteGraph athletes={athletes.activity} />
      )}
      {athletes && (
        <AthleteCharacteristic
          athletes={{
            ages: athletes.ages,
            gender: athletes.gender,
          }}
        />
      )}
      <AthleteGoalsGraph
        keys={Object.keys(athletesGoals)}
        values={Object.values(athletesGoals)}
      />
    </ScrollView>
  );

  const renderSwitchSelector = () => (
    <SwitchSelector
      options={options}
      initial={screen === 'CA' ? 0 : 1}
      onPress={setScreen}
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

  return (
    <View style={styles.container}>
      <HeaderSimple title="DASHBOARD" />
      <View style={styles.content}>
        {renderSwitchSelector()}
        <View style={styles.page}>
          {screen === 'CA' ? renderCA() : renderAthletes()}
        </View>
      </View>
    </View>
  );
};

export default DashboardScreen;
