import React from 'react';
import { View } from 'react-native';
import { Dialog } from 'react-native-simple-dialogs';
import styles from './renewDemandDialogStyle';
import { Button } from '../../Button';
export default class RenewDemandDialog extends React.Component {
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
          'As-tu bien vérifié tes informations avant de renouveler ta demande ?'
        }
        onTouchOutside={this.props.onClose}>
        <View style={styles.buttonContainer}>
          <Button
            loading={false}
            title="Vérifier"
            customContainerStyles={styles.button}
            customTextStyle={styles.buttonText}
            onPress={this.props.onCheckInfoPress}
          />
          <Button
            loading={false}
            title="Renouveler"
            customContainerStyles={styles.button}
            customTextStyle={styles.buttonText}
            onPress={this.props.onRenewPress}
          />
        </View>
      </Dialog>
    );
  }
}
