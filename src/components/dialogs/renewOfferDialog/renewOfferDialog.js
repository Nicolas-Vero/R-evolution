import React from 'react';
import { View } from 'react-native';
import { Dialog } from 'react-native-simple-dialogs';
import styles from './renewOfferDialogStyle';
import { Button } from '../../Button';

const RenewOfferDialog = ({
  dialogVisible,
  isNewOffer,
  onClose,
  onValidate,
}) => (
  <Dialog
    animationType="slide"
    visible={dialogVisible}
    contentStyle={styles.contentDialog}
    dialogStyle={styles.dialog}
    titleStyle={styles.title}
    title={
      isNewOffer
        ? 'Pour souscrire cette offre, contacte directement ton coach'
        : "Pour renouveler l'offre, contacte directement ton coach"
    }
    onTouchOutside={onClose}
  >
    <View style={styles.buttonContainer}>
      <Button
        loading={false}
        title="Fiche coach"
        customContainerStyles={styles.button}
        customTextStyle={styles.buttonText}
        onPress={onValidate}
      />
    </View>
  </Dialog>
);

export default RenewOfferDialog;
