import React from 'react';
import { Keyboard, Platform, View, Text } from 'react-native';
import { Dialog } from 'react-native-simple-dialogs';
import styles from './treshRequestDialogStyle';
import { Button } from '../../Button';
export default class FilterTimesDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Es-tu sûr(e) de vouloir traiter cette demande ?',
      validateTitle:
        "La demande a été traitée avec succès. Tu n'as plus qu'à contacter ce prospect.",
    };
  }

  onTouchOutSide = () => {
    this.props.onClose();
  };
  render() {
    const { title, validateTitle } = this.state;
    return (
      <Dialog
        animationType="slide"
        visible={this.props.dialogVisible}
        contentStyle={styles.contentDialog}
        dialogStyle={styles.dialog}
        titleStyle={styles.title}
        title={this.props.isValidate ? validateTitle : title}
        overlayStyle={{
          marginBottom: Platform.OS === 'ios' ? this.state.keyboardHeight : 0,
        }}
        onTouchOutside={this.props.onClose}>
        {this.props.isValidate ? (
          <View style={styles.buttonContainer}>
            <Button
              loading={false}
              title="Voir sa fiche"
              customContainerStyles={styles.button}
              customTextStyle={styles.buttonText}
              onPress={this.props.onNavigateToUserSheet}
            />
          </View>
        ) : (
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
              onPress={this.props.onValidate}
            />
          </View>
        )}
      </Dialog>
    );
  }
}
