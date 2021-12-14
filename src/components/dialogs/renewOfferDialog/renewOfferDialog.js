import React from 'react';
import { View } from 'react-native';
import { Dialog } from 'react-native-simple-dialogs';
import styles from './renewOfferDialogStyle';
import { Button } from '../../Button';
export default class RenewOfferDialog extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Dialog
        animationType="slide"
        visible={this.props.dialogVisible}
        contentStyle={styles.contentDialog}
        dialogStyle={styles.dialog}
        titleStyle={styles.title}
        title={
          this.props.isNewOffer
            ? 'Pour souscrire cette offre, contacte directement ton coach'
            : "Pour renouveler l'offre, contacte directement ton coach"
        }
        onTouchOutside={this.props.onClose}>
        <View style={styles.buttonContainer}>
          <Button
            loading={false}
            title="Fiche coach"
            customContainerStyles={styles.button}
            customTextStyle={styles.buttonText}
            onPress={this.props.onValidate}
          />
        </View>
      </Dialog>
    );
  }
}
