import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { heightPercentageToDP } from 'react-native-responsive-screen';

import RegisterStepImageView from '../../../../components/register/registerStepImage/RegisterStepImageView';
import { Button } from '../../../../components/Button';
import Header from '../../../../components/Header';
import styles from './diplomasStyle';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { FlatList } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';

export default class diplomasScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 'initial',
      diplomas: [],
      diplomasInput: '',
      error: '',
    };
  }

  onAddDiplomas = () => {
    const { diplomas, diplomasInput } = this.state;
    if (diplomasInput === '') {
      return;
    }
    diplomas.push(diplomasInput);
    this.setState({ diplomas, diplomasInput: '', error: '' });
  };

  onRemoveDiplomas = (index) => {
    const { diplomas } = this.state;
    if (index > -1) {
      diplomas.splice(index, 1);
    }
    if (diplomas.length === 0) {
      this.setState({ error: 'Veuillez ajouter un diplôme' });
    }
    this.setState({ diplomas });
  };

  onChangeText = (val) => {
    this.setState({ diplomasInput: val });
  };

  onNavigate = () => {
    if (this.state.diplomas.length === 0) {
      this.setState({ error: 'Veuillez ajouter un diplome' });
      return;
    }
    const passItem = this.props.navigation.state.params;
    this.props.navigation.navigate('experienceCoachScreen', {
      item: { ...passItem, diplomas: this.state.diplomas },
    });
  };

  renderDiplomasInput = () => {
    const { diplomasInput } = this.state;

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          placeholderTextColor="#979797"
          placeholder="Entre le nom de ton diplôme"
          value={diplomasInput}
          onChangeText={(text) => this.onChangeText(text)}
          style={styles.input}
        />
        <TouchableOpacity onPress={this.onAddDiplomas}>
          <View style={styles.addDiplomasContainer}>
            <FontAwesome name="plus-square" size={24} color="#2CDEE4" />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  renderDiplomas = () => {
    const { diplomas } = this.state;
    return (
      <FlatList
        style={{ marginBottom: 50, paddingTop: 10 }}
        data={diplomas}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item, index }) => {
          return (
            <View>
              <View style={styles.itemDiplomas}>
                <Text style={styles.diplomasText}>{item}</Text>
              </View>
              <View style={styles.removeDiplomas}>
                <TouchableOpacity onPress={() => this.onRemoveDiplomas(index)}>
                  <Entypo name="cross" size={18} />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    );
  };
  render() {
    const { error } = this.state;
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#060606', '#2D333C']}
          start={{
            x: 0,
            y: 0,
          }}
          end={{
            x: 1,
            y: 1,
          }}
          style={styles.background}>
          <Header title="LET'S GO" />
          <SafeAreaView onPress={Keyboard.dismiss} style={styles.safeArea}>
            <RegisterStepImageView step={9} />
            <View style={styles.content}>
              <View style={styles.alignCenter}>
                <View
                  style={{
                    height: heightPercentageToDP(72),
                  }}>
                  <Text style={styles.title}>DIPLÔME(S)</Text>
                  <View style={styles.container}>
                    <View style={styles.diplomasContainerr}>
                      {this.renderDiplomasInput()}
                      {error !== '' ? (
                        <Text style={styles.errorText}>{error}</Text>
                      ) : null}
                      {this.renderDiplomas()}
                    </View>
                  </View>
                  <Button
                    loading={false}
                    title="Suivant"
                    customTextStyle={styles.nextButtonText}
                    onPress={this.onNavigate}
                  />
                </View>
              </View>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </View>
    );
  }
}
