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
import styles from './saveGoalDialogStyle';
export default class SaveGoalDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goal: null,
    };
  }

  onChangeText = (value) => {
    this.setState({
      goal: value,
    });
  };

  onValidate = () => {
    this.props.onValidate(this.state.goal);
  };

  onClose = () => this.props.onClose();

  render() {
    const { goal } = this.state;
    return (
      <Dialog
        animationType="slide"
        visible={this.props.dialogVisible}
        contentStyle={styles.contentDialog}
        dialogStyle={styles.dialog}
        titleStyle={styles.title}
        title="DÉFINIS TON OBJECTIF"
        onTouchOutside={this.props.onClose}>
        <View style={styles.inputContainer2}>
          <View style={styles.inputContainer}>
            <TextInput
              blurOnSubmit={false}
              keyboardType="numeric"
              onSubmitEditing={() => Keyboard.dismiss()}
              style={styles.input}
              returnKeyType="done"
              value={goal}
              onChangeText={this.onChangeText}
            />
          </View>
          <View
            style={{
              position: 'absolute',
              right: 45,
            }}>
            <Image
              source={require('../../../../assets/images/eu.png')}
              style={styles.euImage}
            />
          </View>
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
