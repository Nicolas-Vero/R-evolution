import React from 'react';
import {
  View,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import { Dialog } from 'react-native-simple-dialogs';
import styles from './choiceYearDialogStyle';
export default class ChoiceYearDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: props.currentYear,
    };
  }

  onChangeText = (value) => {
    console.log(value.length);
    if (value && value.length > 4) {
      return;
    }
    this.setState({
      year: value,
    });
  };

  onValidate = () => {
    if (this.state.year.length !== 4) return;

    this.props.onValidate(this.state.year);
  };

  onClose = () => this.props.onClose();

  render() {
    const { year } = this.state;
    const { currentYear } = this.props;
    return (
      <Dialog
        animationType="slide"
        visible={this.props.dialogVisible}
        contentStyle={styles.contentDialog}
        dialogStyle={styles.dialog}
        titleStyle={styles.title}
        title="Changer d'année"
        onTouchOutside={this.props.onClose}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={currentYear}
            placeholderTextColor="#979797"
            blurOnSubmit={false}
            keyboardType="numeric"
            onSubmitEditing={() => Keyboard.dismiss()}
            style={styles.input}
            returnKeyType="done"
            value={year}
            onChangeText={this.onChangeText}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={this.onValidate}
            style={styles.button}
            hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}>
            <Text style={styles.buttonText}>Valider</Text>
          </TouchableOpacity>
        </View>
      </Dialog>
    );
  }
}
