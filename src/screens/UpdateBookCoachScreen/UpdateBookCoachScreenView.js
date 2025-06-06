import React, { useState, useRef } from 'react';
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
import Header from '../../components/Header';
import styles from './UpdateBookCoachScreenStyle';

const UpdateBookCoachScreenView = ({ route, onTitleChange, onDescriptionChange, onDeletePress, onUpdatePress, errorMessage = '', initialTitle = '', initialDescription = '' }) => {
  const { date, time } = route.params;

  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const descriptionInputRef = useRef();

  const renderErrorMessage = () => (
    <Text style={{ alignSelf: 'center', fontSize: '3.5%', opacity: errorMessage ? 1 : 0 }}>
      {errorMessage || 'Hidden Text'}
    </Text>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} />
      <LinearGradient colors={['black', '#2D333C']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1 }}>
        <Header title="RENDEZ-VOUS" />
        <View style={styles.content}>
          <View style={{ marginBottom: 15 }}>
            <Text style={{ color: '#2CDEE4', fontFamily: 'Roboto', textAlign: 'center' }}>
              {`Le ${moment(date).format('dddd D MMMM ')} ${time}`}
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
                  onChangeText={(text) => {
                    setTitle(text);
                    onTitleChange && onTitleChange(text);
                  }}
                  value={title}
                  blurOnSubmit={false}
                  onSubmitEditing={() => descriptionInputRef.current?.focus()}
                  returnKeyType="next"
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  multiline
                  placeholder="Description"
                  placeholderTextColor="#979797"
                  style={styles.textArea}
                  onChangeText={(text) => {
                    setDescription(text);
                    onDescriptionChange && onDescriptionChange(text);
                  }}
                  value={description}
                  blurOnSubmit={false}
                  onSubmitEditing={() => Keyboard.dismiss()}
                  returnKeyType="done"
                  ref={descriptionInputRef}
                />
              </View>

              {renderErrorMessage()}
            </View>

            <View style={styles.bottom}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={onDeletePress} style={styles.deletedButton}>
                  <Text style={styles.buttonText}>Supprimer</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onUpdatePress} style={styles.button}>
                  <Text style={styles.buttonText}>Valider</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    </View>
  );
};

export default UpdateBookCoachScreenView;