import React from 'react';
import { Platform, View } from 'react-native';
import { Dialog } from 'react-native-simple-dialogs';
import styles from './renewOfferDialogStyle';
import { Button } from '../../Button';
export default class RenewOfferDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // keyBoardHeight: 0,
    };
  }

  onClose = () => this.props.onClose();
  render() {
    return (
      <Dialog
        animationType="slide"
        visible={this.props.dialogVisible}
        contentStyle={styles.contentDialog}
        dialogStyle={styles.dialog}
        titleStyle={styles.title}
        title="Contacte ton coach pour renouveler l'offre"
        onTouchOutside={this.props.onClose}>
        <View style={styles.buttonContainer}>
          <Button
            loading={false}
            title="Voir mon coach"
            customContainerStyles={styles.button}
            customTextStyle={styles.buttonText}
            onPress={this.props.onValidate}
          />
        </View>
      </Dialog>
    );
  }
}
