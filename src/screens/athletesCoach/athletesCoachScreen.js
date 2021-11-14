import React from 'react';
import {
  TouchableOpacity,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import { FlatList } from 'react-native-gesture-handler';
import { get_coach_athlete } from '../../api/Coach';
import { Avatar } from 'react-native-elements';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import moment from 'moment';
import HeaderSimple from '../../components/HeaderSimple';

import styles from './athletesCoachStyle';
const options = [
  { label: 'ACTIFS', value: 'ACTIFS' },
  { label: 'INACTIFS', value: 'INACTIFS' },
  { label: 'PROSPECTS', value: 'PROSPECTS' },
];
export default class athletesCoachScreen extends React.Component {
  state = {
    refresh: false,
    user: { name: 'toto', avatar: 'string avatar' },
    screen: 'ACTIFS',
    atlhetesActifs: [],
    atlhetesInactifs: [],
    atlhetesProspects: [],
    search: '',
    loaded: false,
  };

  componentDidMount() {
    get_coach_athlete()
      .then((res) => {
        this.filterData(res.data.athletes);
      })
      .then(() => {
        this.setState({ loaded: true });
      });
  }

  filterData(data) {
    const actifs = [];
    const inactifs = [];
    const prospects = [];
    data.forEach((element) => {
      console.log(element.status);
      switch (element.status) {
        case 'active':
          actifs.push(element);
          break;
        case 'inactive':
          inactifs.push(element);
          break;
        case 'prospect':
          prospects.push(element);
          break;

        default:
          break;
      }
    }, this.setState({ atlhetesActifs: actifs, atlhetesInactifs: inactifs, atlhetesProspects: prospects }));
  }

  updateSearch = (search) => {
    this.setState({ search });
  };

  onNavigate = (item) => {
    // console.log(this.state.screen);
    if (this.state.screen === 'ACTIFS')
      this.props.navigation.navigate('athleteSheetCoachScreen', item);

    if (this.state.screen === 'INACTIFS')
      return this.props.navigation.navigate('athleteSheetCoachScreen', item);

    if (this.state.screen === 'PROSPECTS')
      return this.props.navigation.navigate('athleteSheetCoachScreen', item);
  };

  renderActifList = () => {
    return (
      <View>
        {/* <SearchBar
         //        size={50}
         //         clearIcon={false}
         //         placeholder="Type Here..."
         // onChangeText={this.updateSearch}
         // value={this.state.search}
                 /> */}
        <FlatList
          data={this.state.atlhetesActifs}
          extraData={this.state}
          // onRefresh={onRefresh}
          // refreshing={this.state.refresh}
          keyExtractor={(item) => toString(item.id)}
          renderItem={({ item }) => this.renderItem(item)}
        />
      </View>
    );
  };

  renderInactifList = () => {
    return (
      <View>
        {/* <SearchBar
                   size={50}
                   clearIcon={false}
                   placeholder="Type Here..."
                   onChangeText={this.updateSearch}
                   value={this.state.search}
                 /> */}
        <FlatList
          data={this.state.atlhetesInactifs}
          extraData={this.state}
          // onRefresh={onRefresh}
          // refreshing={this.state.refresh}
          keyExtractor={(item) => toString(item.id)}
          renderItem={({ item }) => this.renderItem(item)}
        />
      </View>
    );
  };

  renderProspectList = () => {
    return (
      <View>
        {/* <SearchBar
         //        size={50}
         //         clearIcon={false}
         //         placeholder="Type Here..."
         // onChangeText={this.updateSearch}
         // value={this.state.search}
                 /> */}
        <FlatList
          data={this.state.atlhetesProspects}
          extraData={this.state}
          keyExtractor={(item) => toString(item.id)}
          renderItem={({ item }) => this.renderItem(item)}
        />
      </View>
    );
  };
  renderItem = (item) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.onNavigate({ item });
        }}
        style={styles.item}>
        <View style={styles.avatarContainer}>
          <View style={styles.alignCenter}>
            <Avatar
              style={styles.avatarImage}
              rounded
              source={{
                uri: '/Users/nicolas/ReactNative/Revolution/R_evolution/assets/images/avatar.png',
              }}
            />
            <Text style={styles.username}>
              {item.first_name} {item.last_name}{' '}
            </Text>
          </View>
        </View>
        {}
        <View style={styles.itemRight}>
          <Text style={styles.timerText}>
            Depuis le {moment(item.created_at).format('DD/MM/YYYY')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    if (!this.state.loaded) {
      return (
        <View style={styles.container}>
          <HeaderSimple title="MES ATHLÈTES" />
          <SwitchSelector
            options={options}
            initial={0}
            onPress={(value) => this.setState({ screen: value })}
            backgroundColor="#1E2026"
            buttonColor="#2CDEE4"
            selectedColor="#1E2026"
            textColor="white"
            borderRadius={10}
            height={50}
            style={{ width: widthPercentageToDP(92) }}
            hasPadding
            fontSize={15}
            selectedTextStyle={styles.switchSelectedText}
            textStyle={styles.switchSelectedText}
            valuePadding={0}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView>
            <HeaderSimple title="MES ATHLÈTES" />
            <View style={styles.content}>
              <SwitchSelector
                options={options}
                initial={0}
                onPress={(value) => this.setState({ screen: value })}
                backgroundColor="#1E2026"
                buttonColor="#2CDEE4"
                selectedColor="#1E2026"
                textColor="white"
                borderRadius={10}
                height={38}
                hasPadding
                fontSize={13}
                selectedTextStyle={styles.switchSelectedText}
                textStyle={styles.switchSelectedText}
                valuePadding={0}
                borderColor="#000"
              />
              <View style={styles.listContainer}>
                {this.state.screen == 'ACTIFS' ? this.renderActifList() : null}
                {this.state.screen == 'INACTIFS'
                  ? this.renderInactifList()
                  : null}
                {this.state.screen == 'PROSPECTS'
                  ? this.renderProspectList()
                  : null}
              </View>
            </View>
          </SafeAreaView>
        </View>
      );
    }
  }
}

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     marginVertical:5 ,
//   },
// });
