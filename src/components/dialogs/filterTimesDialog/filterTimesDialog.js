import React from 'react';
import { Keyboard, Platform, View } from 'react-native';
import { Dialog } from 'react-native-simple-dialogs';
import styles from './filterTimesDialogStyle';
import { Button } from '../../Button';
export default class FilterTimesDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyBoardHeight: 0,
    };
  }
  componentWillMount = () => {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  };

  _keyboardDidShow = (e) => {
    this.component.setState({ keyboardHeight: e.endCoordinates.height });
  };

  _keyboardDidHide = () => {
    this.component.setState({ keyboardHeight: null });
  };

  componentWillUnmount = () => {
    if (this.keyboardDidShowListener) {
      this.keyboardDidShowListener.remove();
    }

    if (this.keyboardDidHideListener) {
      this.keyboardDidHideListener.remove();
    }
  };

  onTouchOutSide = () => {
    this.props.onClose();
  };
  render() {
    return (
      <Dialog
        animationType="slide"
        visible={this.props.dialogVisible}
        contentStyle={styles.contentDialog}
        dialogStyle={styles.dialog}
        titleStyle={styles.title}
        title="Es-tu sûr(e) de vouloir traiter cette demande ?"
        overlayStyle={{
          marginBottom: Platform.OS === 'ios' ? this.state.keyboardHeight : 0,
        }}
        onTouchOutside={this.props.onClose}>
        <View style={styles.buttonContainer}>
          <Button
            loading={false}
            title="Non"
            customContainerStyles={styles.button}
            customTextStyle={styles.buttonText}
            onPress={(values) => {
              this.props.onClose();
            }}
          />
          <Button
            loading={false}
            title="Oui"
            customContainerStyles={styles.button}
            customTextStyle={styles.buttonText}
            onPress={(values) => {
              this.props.onValidate();
            }}
          />
        </View>
      </Dialog>
    );
  }
}
