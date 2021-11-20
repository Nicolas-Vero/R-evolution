import React from 'react';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList } from 'react-native-gesture-handler';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { delete_coach_offers } from '../../api/Offers';
import { get_coach_offers } from '../../api/Offers';
import Header from '../../components/Header';
import { AddButton, DeleteButton, ModifyButton } from '../../components/Button';
import styles from './offersCoachStyle';
import DeleteOfferDialog from '../../components/dialogs/deleteOfferDialog/deleteOfferDialog';
import { truncate } from 'lodash';
export default class offersCoachScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offers: [],
      fontsLoaded: false,
      dialogVisible: false,
      itemId: null,
    };
  }

  componentDidMount() {
    get_coach_offers()
      .then((res) => res.data.offers)
      .then((res) => {
        this.setState({ offers: res });
      });
  }
  componentDidUpdate(prevProps) {
    if (this.props.isFocused && prevProps.isFocused !== this.props.isFocused) {
      get_coach_offers()
        .then((res) => res.data.offers)
        .then((res) => {
          this.setState({ offers: res });
        });
    }
  }

  onOpenDialog = (itemId) => {
    this.setState({ dialogVisible: true, itemId });
  };

  onDismissDialog = () => {
    this.setState({ dialogVisible: !this.state.dialogVisible, itemId: null });
  };

  onDelete = () => {
    if (!this.state.itemId) return;
    delete_coach_offers({ offer_id: this.state.itemId }).then(() => {
      get_coach_offers().then(() => {
        get_coach_offers()
          .then((res) => res.data.offers)
          .then((res) => {
            this.setState({ offers: res });
          });
      });
    });
    this.onDismissDialog();
  };
  renderDialog() {
    return (
      <DeleteOfferDialog
        dialogVisible={this.state.dialogVisible}
        onClose={this.onDismissDialog}
        onDelete={(itemId) => this.onDelete(itemId)}
      />
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <Header title="MES OFFRES" />
        {this.renderDialog()}
        <View style={styles.content}>
          <AddButton
            customContainerStyles={styles.addButton}
            customTextStyle={styles.addButtonText}
            title="CRÉER UNE NOUVELLE OFFRE"
            onPress={() => {
              navigate('createOfferCoachScreen');
            }}
          />
          <View style={styles.alignCenter}>
            <FlatList
              style={styles.flatList}
              data={this.state.offers}
              extraData={this.state}
              // onRefresh={onRefresh}
              //  refreshing={this.state.refresh}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <LinearGradient
                  colors={['#101010', '#2D333C']}
                  start={{
                    x: 1,
                    y: 1,
                  }}
                  end={{
                    x: 0,
                    y: 0,
                  }}
                  style={styles.item}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemContent}>{item.content}</Text>
                  <Text style={styles.itemNbCredits}>
                    {`${item.nb_credits} coaching${
                      item.nb_credits > 1 ? 's' : ''
                    }`}
                  </Text>
                  <View style={styles.itemBottomContainer}>
                    <View style={styles.itemBottomLeft}>
                      <ModifyButton
                        title="Modifier"
                        customContainerStyles={{
                          backgroundColor: '#fff',
                        }}
                        onPress={() => {
                          navigate('updateOfferCoachScreen', { item });
                        }}></ModifyButton>
                      <ModifyButton
                        title="Supprimer"
                        customContainerStyles={{
                          backgroundColor: 'transparent',
                          borderWidth: 2,
                          borderColor: '#FFF',
                          borderRadius: 3,
                        }}
                        customTextStyle={{
                          fontFamily: 'Roboto',
                          color: '#fff',
                        }}
                        onPress={() => {
                          this.onOpenDialog(item.id);
                        }}></ModifyButton>
                    </View>
                    <Text style={styles.itemBottomPrice}>
                      {item.price / 100}€
                    </Text>
                  </View>
                </LinearGradient>
              )}
            />
          </View>
        </View>
      </View>
    );
  }
}
