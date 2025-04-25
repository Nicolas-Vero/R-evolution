import React, { useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { useFormik } from 'formik';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../../../../components/Header';
import RegisterStepImageView from '../../../../components/register/registerStepImage/RegisterStepImageView';
import { Button } from '../../../../components/Button';
import styles from './trainingDayStyle';

const TrainingDayScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const passItem = route.params?.item || {}; // Évite l'erreur `params undefined`

  const [multi, setMulti] = useState([6, 17]);
  const [selectedDays, setSelectedDays] = useState([
    { day: 'L', selected: false, key: 'is_monday_preferred' },
    { day: 'M', selected: false, key: 'is_tuesday_preferred' },
    { day: 'ME', selected: false, key: 'is_wednesday_preferred' },
    { day: 'J', selected: false, key: 'is_thursday_preferred' },
    { day: 'V', selected: false, key: 'is_friday_preferred' },
    { day: 'S', selected: false, key: 'is_saturday_preferred' },
    { day: 'D', selected: false, key: 'is_sunday_preferred' },
  ]);

  const toggleDaySelection = (dayKey) => {
    setSelectedDays((prevDays) =>
      prevDays.map((day) =>
        day.key === dayKey ? { ...day, selected: !day.selected } : day
      )
    );
  };

  const formik = useFormik({
    initialValues: {
      days_preference: selectedDays.reduce((acc, day) => {
        acc[day.key] = day.selected;
        return acc;
      }, {}),
      time_preference: {
        start_time: multi[0],
        end_time: multi[1],
      },
    },
    onSubmit: (values) => {
      const updatedDays = selectedDays.reduce((acc, day) => {
        acc[day.key] = day.selected;
        return acc;
      }, {});

      const updatedValues = {
        ...values,
        days_preference: updatedDays,
      };

      navigation.navigate('SelectCoachScreen', { item: { ...passItem, ...updatedValues } });
    },
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#060606', '#2D333C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}>
        <SafeAreaView style={styles.safeArea}>
          <Header title="LET'S GO" />
          <RegisterStepImageView step={6} />
          <Text style={styles.title}>À QUEL MlllllOMENT DE LA JOURNÉE ?</Text>

          <View style={styles.content}>
            <Text style={styles.subTitle}>
              ENTRE <Text style={styles.subTitleColored}>{multi[0]}H</Text> ET
              <Text style={styles.subTitleColored}>{multi[1]}H</Text>
            </Text>
            <View style={styles.sliderContainer}>
              <MultiSlider
                values={[multi[0], multi[1]]}
                sliderLength={widthPercentageToDP(90)}
                onValuesChange={(values) => {
                  setMulti(values);
                  formik.setFieldValue('time_preference.start_time', values[0]);
                  formik.setFieldValue('time_preference.end_time', values[1]);
                }}
                min={0}
                max={24}
                step={1}
                snapped
                trackStyle={styles.sliderTrack}
                markerStyle={styles.sliderMarker}
                selectedStyle={styles.sliderSelected}
              />
            </View>

            <Text style={styles.daysTitle}>QUEL(S) JOUR(S) ?</Text>
            <FlatList
              horizontal
              data={selectedDays}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => {
                const backgroundColor = item.selected ? '#2CDEE4' : '#2d3038';
                const textColor = item.selected ? 'black' : 'white';

                return (
                  <TouchableOpacity
                    onPress={() => {
                      toggleDaySelection(item.key);
                      formik.setFieldValue(`days_preference.${item.key}`, !item.selected);
                    }}>
                    <View style={[styles.day, { backgroundColor }]}>
                      <Text style={{ fontSize: 13, color: textColor }}>{item.day}</Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
            <View style={styles.bottom}>
              <Button
                loading={false}
                disabled={!formik.isValid}
                title="Suivant"
                customTextStyle={styles.nextButtonText}
                onPress={formik.handleSubmit}
              />
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

export default TrainingDayScreen;
