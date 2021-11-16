import React from 'react';
import { Platform, View } from 'react-native';
import { Dialog } from 'react-native-simple-dialogs';
import styles from './deleteOfferDialogStyle';
import { Button } from '../../Button';
export default class DeleteOfferDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // keyBoardHeight: 0,
    };
  }
  onTouchOutSide = () => {
    this.props.onClose();
  };

  onClose = () => this.props.onClose();
  render() {
    return (
      <Dialog
        animationType="slide"
        visible={this.props.dialogVisible}
        contentStyle={styles.contentDialog}
        dialogStyle={styles.dialog}
        titleStyle={styles.title}
        title="Es-tu sûr(e) de vouloir supprimer cette offre ?"
        overlayStyle={
          {
            // marginBottom: Platform.OS === 'ios' ? this.state.keyboardHeight : 0,
          }
        }
        onTouchOutside={this.onTouchOutSide()}>
        <View style={styles.buttonContainer}>
          <Button
            loading={false}
            title="Non"
            customContainerStyles={styles.button}
            customTextStyle={styles.buttonText}
            onPress={() => this.onClose()}
          />
          <Button
            loading={false}
            title="Oui"
            customContainerStyles={styles.button}
            customTextStyle={styles.buttonText}
            onPress={(values) => {
              this.props.onDelete();
            }}
          />
        </View>
      </Dialog>
    );
  }
}
