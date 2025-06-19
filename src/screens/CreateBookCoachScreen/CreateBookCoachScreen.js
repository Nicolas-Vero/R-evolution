import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import CreateBookCoachScreenView from './CreateBookCoachScreenView';
import CreateBookCoachScreenController from './useCreateBookCoachScreen';

const CreateBookCoachScreen = ({ route }) => {
  const { date, time } = route.params;

  const [isLoaded, setIsLoaded] = useState(true); // TODO: update logic as per actual loading
  const [type, setType] = useState('');
  const [isProspect, setIsProspect] = useState(false);
  const [isOther, setIsOther] = useState(false);
  const [athletesActifs, setAthletesActifs] = useState([]);
  const [athletesProspects, setAthletesProspects] = useState([]);
  const [athleteCourse, setAthleteCourse] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const firstNameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const descriptionRef = useRef();
  const otherDescriptionRef = useRef();
  const titleRef = useRef();

  if (!isLoaded) return <View></View>;

  return (
    <View style={styles.container}>
      <LinearGradient colors={['black', '#2D333C']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1 }}>
        <SafeAreaView style={styles.safeArea} />
        <Header title="AJOUTER UN RDV" />
        <View style={{ marginVertical: 5 }}>
          <Text style={{ color: '#2CDEE4', fontFamily: 'Roboto', textAlign: 'center' }}>
            {`Le ${moment(date).format('dddd D MMMM ')} ${time}`}
          </Text>
        </View>
        <Formik
          initialValues={{
            type: 'Coaching',
            athlete_id: '',
            offer_id: '',
            slot: time,
            coach_notes: 'rendez-vous créer par le coach',
            coach_course_id: '',
            gender: 'male',
            date,
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            description: '',
          }}
          onSubmit={(values) => {
            if (type === 'Autre') {
              // TODO: controller.onCreateOtherPress
            } else if (type === 'Prospect') {
              // TODO: controller.onInviteProspectPress(values)
            } else {
              // TODO: controller.onCreateBookPress(values)
            }
          }}>
          {({ handleChange, handleBlur, setFieldValue, values }) => (
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', flexDirection: 'column', marginHorizontal: 16 }}>
              <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                {["Actifs", "Prospect", "Autre"].map(option => (
                  <CheckBox
                    key={option}
                    containerStyle={styles.checkBoxContainer}
                    title={option === "Actifs" ? "Mes athlètes actifs" : option === "Prospect" ? "Prospects" : "Autre"}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="dot-circle-o"
                    checkedColor="#2CDEE4"
                    textStyle={styles.checkBoxText}
                    checked={type === option}
                    onPress={() => {
                      setType(option);
                      setIsProspect(option === 'Prospect');
                      setIsOther(option === 'Autre');
                      setFieldValue('type', option);
                    }}
                  />
                ))}

                {type === 'Actifs' && (
                  <View>
                    <SelectDropdown
                      buttonStyle={styles.dropdownButton}
                      buttonTextStyle={styles.dropdownButtonText}
                      rowTextStyle={styles.dropdownRowText}
                      dropdownStyle={styles.dropdownBg}
                      rowStyle={styles.dropdownRow}
                      data={athletesActifs}
                      defaultButtonText={'Athlète'}
                      onSelect={async (selectedItem) => {
                        const course = await get_athlete_active_courses(selectedItem.id);
                        setFieldValue('athlete_id', selectedItem.id);
                        setAthleteCourse(course.data);
                      }}
                      renderDropdownIcon={() => <AntDesign name="down" size={18} color="black" />}
                      dropdownIconPosition={'right'}
                      buttonTextAfterSelection={(item) => item.full_name}
                      rowTextForSelection={(item) => item.full_name}
                    />
                    {athleteCourse && (
                      <SelectDropdown
                        buttonStyle={styles.dropdownButton}
                        buttonTextStyle={styles.dropdownButtonText}
                        rowTextStyle={styles.dropdownRowText}
                        dropdownStyle={styles.dropdownBg}
                        rowStyle={styles.dropdownRow}
                        data={athleteCourse}
                        defaultButtonText={'offre'}
                        onSelect={(item) => setFieldValue('offer_id', item.id)}
                        renderDropdownIcon={() => <AntDesign name="down" size={18} color="black" />}
                        dropdownIconPosition={'right'}
                        buttonTextAfterSelection={(item) => item.offer.title}
                        rowTextForSelection={(item) => `${item.offer.title} session(s): ${item.booked_session}/${item.total_sessions}`}
                      />
                    )}
                  </View>
                )}

                {type === 'Prospect' && (
                  <View>
                    <SelectDropdown
                      buttonStyle={styles.dropdownButton}
                      buttonTextStyle={styles.dropdownButtonText}
                      rowTextStyle={styles.dropdownRowText}
                      dropdownStyle={styles.dropdownBg}
                      rowStyle={styles.dropdownRow}
                      data={athletesProspects}
                      defaultButtonText={'Choisir un prospect existant'}
                      onSelect={(item) => {
                        setFieldValue('athlete_id', item.id);
                        setFieldValue('email', item.email);
                      }}
                      renderDropdownIcon={() => <AntDesign name="down" size={18} color="black" />}
                      dropdownIconPosition={'right'}
                      buttonTextAfterSelection={(item) => item.full_name}
                      rowTextForSelection={(item) => item.full_name}
                    />

                    <Text style={styles.addProspectText}>Ou ajouter un Prospect</Text>
                    {[{ name: 'M', value: 'male' }, { name: 'Mme', value: 'female' }].map(g => (
                      <CheckBox
                        key={g.value}
                        containerStyle={styles.checkBoxContainer}
                        title={g.name}
                        checkedColor="#2CDEE4"
                        checkedIcon="dot-circle-o"
                        textStyle={styles.checkBoxText}
                        uncheckedIcon="dot-circle-o"
                        checked={values.gender === g.value}
                        onPress={() => setFieldValue('gender', g.value)}
                      />
                    ))}

                    {[{ name: 'last_name', placeholder: 'Prénom', ref: firstNameRef }, { name: 'first_name', placeholder: 'Nom', ref: emailRef }].map(({ name, placeholder, ref }) => (
                      <View key={name} style={styles.inputContainer}>
                        <TextInput
                          placeholder={placeholder}
                          placeholderTextColor="#979797"
                          style={styles.input}
                          onChangeText={handleChange(name)}
                          onBlur={handleBlur(name)}
                          value={values[name]}
                          ref={ref}
                        />
                      </View>
                    ))}

                    {[{ name: 'email', ref: phoneRef }, { name: 'phone', ref: descriptionRef }].map(({ name, ref }) => (
                      <View key={name} style={styles.inputContainer}>
                        <TextInput
                          placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
                          placeholderTextColor="#979797"
                          style={styles.input}
                          onChangeText={handleChange(name)}
                          onBlur={handleBlur(name)}
                          value={values[name]}
                          ref={ref}
                        />
                      </View>
                    ))}

                    <View style={styles.inputContainer}>
                      <TextInput
                        placeholder="Description"
                        placeholderTextColor="#979797"
                        multiline
                        style={styles.textArea}
                        onChangeText={handleChange('description')}
                        onBlur={handleBlur('description')}
                        value={values.description}
                        ref={descriptionRef}
                      />
                    </View>
                  </View>
                )}

                {type === 'Autre' && (
                  <View>
                    <View style={styles.inputContainer}>
                      <TextInput
                        placeholder="Titre"
                        placeholderTextColor="#979797"
                        style={styles.input}
                        onChangeText={setTitle}
                        value={title}
                        ref={titleRef}
                      />
                    </View>
                    <View style={styles.inputContainer}>
                      <TextInput
                        placeholder="Description"
                        placeholderTextColor="#979797"
                        multiline
                        style={styles.textArea}
                        onChangeText={setDescription}
                        value={description}
                        ref={otherDescriptionRef}
                      />
                    </View>
                  </View>
                )}
              </View>
              <View style={{ justifyContent: 'flex-end', marginBottom: 50, alignItems: 'center' }}>
                <Button
                  style={styles.buttonContainer}
                  customTextStyle={styles.buttonText}
                  loading={false}
                  title="Valider"
                  onPress={() => {
                    // Trigger form submission manually if needed
                  }}
                />
              </View>
            </ScrollView>
          )}
        </Formik>
      </LinearGradient>
    </View>
  );
};


export default CreateBookCoachScreen;
