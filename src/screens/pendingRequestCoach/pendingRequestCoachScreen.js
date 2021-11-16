import React from 'react';
import {
  TouchableOpacity,
  View,
  SafeAreaView,
  Text,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Header from '../../components/Header';
import { get_personnal_request, get_public_request } from '../../api/Request';
import { Avatar } from 'react-native-elements';
import moment from 'moment';
import styles from './pendingRequestCoachStyle';
export default class pendingRequestCoachScreen extends React.Component {
  state = {
    personalRequest: [],
    publicRequest: [],
    loaded: false,
    isRefreshing: false,
  };

  async componentDidMount() {
    await this.loadData();
    this.setState({ loaded: true });
  }

  loadData = () => {
    this.setState({ isRefreshing: true });
    get_personnal_request().then((res) => {
      this.setState({ personalRequest: res.data.requests });
    });
    get_public_request().then((res) => {
      this.setState({ publicRequest: res.data.requests });
    });

    console.log('aze');
    this.setState({ isRefreshing: false });
  };
  componentDidUpdate(prevProps) {
    if (this.props.isFocused && prevProps.isFocused !== this.props.isFocused) {
      get_personnal_request().then((res) => {
        this.setState({ personalRequest: res.data.requests });
      });
      get_public_request()
        .then((res) => {
          this.setState({ publicRequest: res.data.requests });
        })
        .then(() => {
          this.setState({ loaded: true });
        });
    }
  }
  renderItem = (item, isMine) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('treshRequestCoachScreen', {
            item: item,
          });
        }}
        style={[
          styles.item,
          { backgroundColor: isMine ? '#2CDEE4' : '#1E2026' },
        ]}>
        <View style={styles.avatarContainer}>
          <View style={styles.alignCenter}>
            <Avatar
              style={styles.avatarImage}
              rounded
              source={{
                uri: '/Users/nicolas/ReactNative/Revolution/R_evolution/assets/images/avatar.png',
              }}
            />
            <Text
              style={[styles.username, { color: isMine ? '#000' : '#FFF' }]}>
              {item?.athlete?.first_name} {item?.athlete?.last_name}
            </Text>
          </View>
        </View>
        {}
        <View style={styles.itemRight}>
          <Text
            style={[styles.timerText, { color: isMine ? '#000' : '#979797' }]}>
            {moment(item?.athlete?.created_at).format('LT')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    const { isRefreshing } = this.state;

    console.log(isRefreshing);
    if (!this.state.loaded) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <SafeAreaView>
          <Header title="DEMANDES EN ATTENTE" />
          <View style={styles.content}>
            <ScrollView>
              <View>
                <Text style={styles.textInfo}>
                  {!this.state.personalRequest.length
                    ? "Aucune demande ne t'est adréssée"
                    : "Ces demandes s'adressent à toi uniquement"}
                </Text>
                <View style={{ flex: 1 }}>
                  <FlatList
                    data={this.state.personalRequest}
                    onRefresh={() => this.loadData()}
                    refreshing={this.state.isRefreshing}
                    keyExtractor={(item) => item?.id.toString()}
                    renderItem={({ item }) => this.renderItem(item, true)}
                  />
                </View>
              </View>
              <View style={{ marginTop: 15 }}>
                <Text style={styles.textUserInfo}>
                  {!this.state.publicRequest.length
                    ? 'Aucune demande aux coachs'
                    : "Ces demandes s'adressent à toi uniquement"}{' '}
                </Text>
                <FlatList
                  data={this.state.publicRequest}
                  onRefresh={() => this.loadData()}
                  refreshing={this.state.isRefreshing}
                  keyExtractor={(item) => item?.id.toString()}
                  renderItem={({ item }) => this.renderItem(item, false)}
                />
              </View>
              <View style={styles.processedRequestContainer}>
                <Text style={styles.textColored}>0 </Text>
                <Text style={styles.processedRequestText}>
                  demandes ont été traitées ce mois-ci
                </Text>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
