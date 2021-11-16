import React from 'react';
import { View, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import { Button } from '../../components/Button';
import { Avatar } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import HeaderLight from '../../components/HeaderLight';
import { ScrollView } from 'react-native';
import { assign_request } from '../../api/Request';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import styles from './trestRequestCoachStyle';
import TreshRequestDialog from '../../components/dialogs/treshRequestDialog/treshRequestDialog';
export default class treshRequestCoachScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Athlete: props.navigation.state.params.item,
      isLoaded: false,
      dialogVisible: false,
      requestId: props.navigation.state.params.item.id,
      isValidate: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoaded: true });
  }

  onOpenDialog = () => {
    this.setState({ dialogVisible: true });
  };

  onDismissDialog = () => {
    this.setState({ dialogVisible: !this.state.dialogVisible });
  };

  onValidate = () => {
    if (!this.state.requestId) return;
    try {
      assign_request(this.state.requestId).then(() => {
        this.setState({ isValidate: true });
      });
    } catch (error) {
      console.log(error);
    }
  };

  onNavigateToUserSheet = () => {
    if (!this.state.isValidate) return;
    this.onDismissDialog();
    this.props.navigation.popToTop();
    this.props.navigation.navigate('athleteSheetCoachScreen', {
      item: this.state.Athlete.athlete,
    });
  };
  renderDialog() {
    return (
      <TreshRequestDialog
        isValidate={this.state.isValidate}
        dialogVisible={this.state.dialogVisible}
        onClose={() => this.onDismissDialog()}
        onValidate={() => this.onValidate()}
        onNavigateToUserSheet={() => this.onNavigateToUserSheet()}
      />
    );
  }
  render() {
    const dayPreference = [];
    if (this.state.Athlete.athlete?.is_monday_preferred == true) {
      dayPreference.push({ day: 'Lundi' });
    }
    if (this.state.Athlete.athlete?.is_tuesday_preferred == true) {
      dayPreference.push({ day: 'Mardi' });
    }
    if (this.state.Athlete.athlete?.is_wednesday_preferred == true) {
      dayPreference.push({ day: 'mercredi' });
    }
    if (this.state.Athlete.athlete?.is_thursday_preferred == true) {
      dayPreference.push({ day: 'Jeudi' });
    }
    if (this.state.Athlete.athlete?.is_friday_preferred == true) {
      dayPreference.push({ day: 'Vendredi' });
    }
    if (this.state.Athlete.athlete?.is_saturday_preferred == true) {
      dayPreference.push({ day: 'Samedi' });
    }
    if (this.state.Athlete.athlete?.is_sunday_preferred == true) {
      dayPreference.push({ day: 'Dimanche' });
    }

    if (!this.state.isLoaded) {
      return (
        <View style={{ backgroundColor: 'black', flex: 1 }}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView>
            {this.renderDialog()}
            <View style={styles.header}>
              <HeaderLight />
              <View style={styles.headerCenter}>
                <Avatar
                  size={82}
                  rounded
                  source={require('../../../assets/images/avatar.png')}
                />
                <Text style={styles.username}>
                  {this.state.Athlete.athlete?.first_name}{' '}
                  {this.state.Athlete.athlete?.last_name}
                </Text>
              </View>
              <View></View>
            </View>
            <ScrollView style={styles.scrollView}>
              <View>
                <View style={styles.item}>
                  <Text style={styles.infoText}>Demande adressée à :</Text>
                  <Text style={styles.valueText}>
                    {this.state.Athlete.request_coach_type === 'any_coach'
                      ? 'tous les coachs'
                      : 'toi uniquement'}
                  </Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.infoText}>Adresse e-mail :</Text>
                  <Text style={styles.valueText}>
                    {this.state.Athlete.athlete?.email}
                  </Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.infoText}>Ses objectifs :</Text>
                  <FlatList
                    style={styles.flatlist}
                    horizontal={true}
                    data={this.state.Athlete.athlete?.goals}
                    extraData={this.state}
                    // onRefresh={onRefresh}
                    // refreshing={this.state.refresh}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => (
                      <View
                        style={[
                          styles.flatlistItem,
                          {
                            marginLeft: index === 0 ? 0 : 5,
                            marginRight:
                              index ===
                              this.state.Athlete.athlete?.goals.length - 1
                                ? 0
                                : 5,
                          },
                        ]}>
                        <Text style={styles.flatlistItemText}>{item.name}</Text>
                      </View>
                    )}
                  />
                </View>
                <View style={styles.row}>
                  <View style={[styles.item, styles.itemRowLeft]}>
                    <View style={styles.row}>
                      <Text style={styles.infoText}>Taille :</Text>
                      <Text style={styles.valueTextRow}>
                        {`${this.state.Athlete.athlete?.size / 100}`.substring(
                          0,
                          1,
                        )}
                        m
                        {`${this.state.Athlete.athlete?.size / 100}`.substring(
                          2,
                        )}
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.item, styles.itemRowRight]}>
                    <View style={styles.row}>
                      <Text style={styles.infoText}>Poids :</Text>
                      <Text style={styles.valueTextRow}>
                        {' '}
                        {this.state.Athlete.athlete?.weight}Kg
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.item}>
                  <View style={styles.row}>
                    <Text style={styles.infoText}>Age :</Text>
                    <Text style={styles.valueTextRow}>
                      {this.state.Athlete.athlete?.age}ans
                    </Text>
                  </View>
                </View>
                <View style={styles.item}>
                  <Text style={styles.infoText}>
                    Créneaux de sport souhaités :
                  </Text>
                  <Text style={styles.sportSlotText}>
                    Entre{' '}
                    <Text style={styles.textColored}>
                      {this.state.Athlete.athlete?.preferred_time_start}H
                    </Text>{' '}
                    et{' '}
                    <Text style={styles.textColored}>
                      {this.state.Athlete.athlete?.preferred_time_end}H
                    </Text>
                  </Text>
                  <FlatList
                    style={styles.flatlist}
                    horizontal={true}
                    data={dayPreference}
                    extraData={this.state}
                    // onRefresh={onRefresh}
                    // refreshing={this.state.refresh}
                    keyExtractor={(item) => item.day}
                    renderItem={({ item, index }) => (
                      <View
                        style={[
                          styles.flatlistItem,
                          {
                            marginLeft: index === 0 ? 0 : 5,
                            marginRight:
                              index === dayPreference.length - 1 ? 0 : 5,
                          },
                        ]}>
                        <Text style={styles.flatlistItemText}>{item.day}</Text>
                      </View>
                    )}
                  />
                </View>
                <View style={styles.item}>
                  <Text style={styles.infoText}>
                    Experience(s) sportive(s) :
                  </Text>
                  <Text style={styles.valueText}>
                    Plus de {this.state.Athlete.athlete?.experience_years} ans
                  </Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.infoText}>Santé :</Text>
                  <Text style={styles.valueText}>
                    {this.state.Athlete.athlete?.health_issues ||
                      "Pas d'informations"}
                  </Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.infoText}>
                    Informations complémentaires :{' '}
                  </Text>
                  <Text style={styles.valueText}>
                    {this.state.Athlete.athlete?.health_problem_description ||
                      "Pas d'informations"}
                  </Text>
                </View>
              </View>
              <View style={styles.button}>
                <Button
                  loading={false}
                  title="Traiter la demande"
                  customContainerStyles={{ width: widthPercentageToDP(91) }}
                  customTextStyle={styles.butonText}
                  onPress={() => {
                    this.onOpenDialog();
                  }}
                />
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      );
    }
  }
}
