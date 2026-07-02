import React from 'react';
import { Platform, View } from 'react-native';
import { Dialog } from 'react-native-simple-dialogs';
import styles from './cancelBookDialogStyle';
import { Button } from '../../Button';
export default class CancelBookDialog extends React.Component {
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
        title="Es-tu sûr(e) de vouloir annuler cette séance ?"
        onTouchOutside={this.props.onClose}>
        <View style={styles.buttonContainer}>
          <Button
            loading={false}
            title="Non"
            customContainerStyles={styles.button}
            customTextStyle={styles.buttonText}
            onPress={this.props.onClose}
          />
          <Button
            loading={false}
            title="Oui"
            customContainerStyles={styles.button}
            customTextStyle={styles.buttonText}
            onPress={this.props.onDelete}
          />
        </View>
      </Dialog>
    );
  }
}
