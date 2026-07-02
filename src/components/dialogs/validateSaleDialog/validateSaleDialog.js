import React from 'react';
import { View } from 'react-native';
import { Dialog } from 'react-native-simple-dialogs';
import styles from './validateSaleDialogStyle';
import { Button } from '../../Button';
export default class ValidateSaleDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Dialog
        animationType="slide"
        visible={this.props.dialogVisible}
        contentStyle={styles.contentDialog}
        dialogStyle={styles.dialog}
        titleStyle={styles.title}
        title="En validant ce paiement, tu confirmes qu’il a été encaissé."
        onTouchOutside={this.props.onClose}>
        <View style={styles.buttonContainer}>
          <Button
            loading={false}
            title="Confirmer"
            customContainerStyles={styles.button}
            customTextStyle={styles.buttonText}
            onPress={this.props.onValidate}
          />
          <Button
            loading={false}
            title="Annuler"
            customContainerStyles={styles.button}
            customTextStyle={styles.buttonText}
            onPress={this.props.onClose}
          />
        </View>
      </Dialog>
    );
  }
}
