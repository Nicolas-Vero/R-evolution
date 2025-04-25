import React from 'react';
import {
  View,
  TextInput,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';
import AbstractScreenView from '../../components/abstracts/AbstractScreen/AbstractScreenView';
import Header from '../../components/Header';
import styles from './UpdateBookCoachScreenStyle';

export default class UpdateBookCoachScreenView extends AbstractScreenView {
  getErrorMessage() {
    if (this.component.state.errorMessage !== '')
      return (
        <ResponsiveText style={{ alignSelf: 'center', fontSize: '3.5%' }}>
          {this.component.state.errorMessage}
        </ResponsiveText>
      );
    return (
      <ResponsiveText
        style={{
          alignSelf: 'center',
          fontSize: '3.5%',
          opacity: 0,
        }}>
        Hidden Text
      </ResponsiveText>
    );
  }

  render() {
    const { title, description } = this.component.state;
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea} />
        <LinearGradient
          colors={['black', '#2D333C']}
          start={{
            x: 0,
            y: 0,
          }}
          end={{
            x: 1,
            y: 1,
          }}
          style={{ flex: 1 }}>
          <Header title="RENDEZ-VOUS" />
          <View style={styles.content}>
            <View style={{ marginBottom: 15 }}>
              <Text
                style={{
                  color: '#2CDEE4',
                  fontFamily: 'Roboto',
                  textAlign: 'center',
                }}>
                {`Le ${moment(this.component.props.date).format(
                  'dddd D MMMM ',
                )} ${this.component.props.time}`}
              </Text>
            </View>
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'space-between',
                flexDirection: 'column',
                marginHorizontal: 16,
              }}>
              <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Titre"
                    placeholderTextColor="#979797"
                    style={styles.input}
                    onChangeText={this.controller.onTitleChange}
                    value={title}
                    blurOnSubmit={false}
                    onSubmitEditing={() =>
                      this.descriptionInput && this.descriptionInput.focus()
                    }
                    returnKeyType="next"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                    multiline
                    placeholder="Description"
                    placeholderTextColor="#979797"
                    style={styles.textArea}
                    onChangeText={this.controller.onDescriptionChange}
                    value={description}
                    blurOnSubmit={false}
                    onSubmitEditing={() => Keyboard && Keyboard.dismiss()}
                    returnKeyType="done"
                  />
                </View>
              </View>
              <View style={styles.bottom}>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={this.controller.onDeletePress}
                    style={styles.deletedButton}>
                    <Text style={styles.buttonText}>Supprimer</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={this.controller.onUpdatePress}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Valider</Text>
                  </TouchableOpacity>
                </View>
              </View>

            </ScrollView>
          </View>
        </LinearGradient>
      </View>
    );
  }
}
