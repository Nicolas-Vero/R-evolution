import React from 'react';
import { View, Text } from 'react-native';
import { Dialog } from 'react-native-simple-dialogs';
import styles from './unBookOfferDialogStyle';
import { Button } from '../../Button';

const UnBookOfferDialog = ({
  dialogVisible,
  onClose,
  onValidate,
  coachName,
  slot
}) => (
  <Dialog
    animationType="slide"
    visible={dialogVisible}
    contentStyle={styles.contentDialog}
    dialogStyle={styles.dialog}
    titleStyle={styles.title}
    onTouchOutside={onClose}
  >
    <Text style={styles.title}>
      Es-tu sûr(e) de vouloir annuler la séance avec
      <Text style={styles.textColored}>{` ${coachName} `}</Text>
      de
      <Text style={styles.textColored}>
        {` ${slot?.slice(0, 5) || ''} `}
      </Text>
      à
      <Text style={styles.textColored}>
        {` ${slot?.slice(8, 14) || ''} `}
      </Text>
    </Text>
    <View style={styles.buttonContainer}>
      <Button
        loading={false}
        title="Oui"
        customContainerStyles={styles.button}
        customTextStyle={styles.buttonText}
        onPress={onValidate}
      />
      <Button
        loading={false}
        title="Non"
        customContainerStyles={styles.button}
        customTextStyle={styles.buttonText}
        onPress={onClose}
      />
    </View>
  </Dialog>
);

export default UnBookOfferDialog;
