import React from 'react';
import { Platform, View, Text, TouchableOpacity, Keyboard } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Dialog } from 'react-native-simple-dialogs';
import styles from './changeSlotDialogStyle';
import { dispatch, store } from '../../../redux/store';
import { slots2 } from '../../../helpers/dateHelper';

export default class ChangeSlotDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: '',
      end: '',
      date: props.date,
      slot: props.slot,
      error: null,
    };
  }

  componentDidMount = () => {
    const { coachSlots } = store.getState();

    let start = slots2[this.props.slot].substring(0, 5);
    let end = slots2[this.props.slot].substring(8, 13);

    if (coachSlots && coachSlots.savedSlots[this.props.date]) {
      const day = coachSlots.savedSlots[this.props.date];
      if (day) {
        start = day[this.props.slot].substring(0, 5);
        end = day[this.props.slot].substring(8, 13);
      }
    }

    this.setState({
      start,
      end,
    });
  };

  onChangeStart = (value) => {
    this.setState({
      start: value,
      error: null,
    });
  };

  onChangeEnd = (value) => {
    this.setState({
      end: value,
      error: null,
    });
  };

  onTouchOutSide = () => {
    this.props.onClose();
  };

  onValidate = () => {
    const { start, end } = this.state;
    const { date, slot } = this.props;

    if (start.length !== 5) {
      this.setState({
        error: 'Format de début incorect',
      });

      return;
    }
    if (end.length !== 5) {
      this.setState({
        error: 'Format de début incorect',
      });

      return;
    }

    const { coachSlots } = store.getState();

    if (coachSlots && coachSlots.savedSlots[date]) {
      let newSlots = coachSlots.savedSlots[date];
      newSlots[slot] = `${start} - ${end}`;

      dispatch('coachSlots', {
        savedSlots: { [date]: newSlots },
      });
    } else {
      const newSlots = slots2;
      newSlots[slot] = `${start} - ${end}`;
      dispatch('coachSlots', {
        savedSlots: { [date]: newSlots, ...coachSlots.savedSlots },
      });
    }

    this.props.onClose();
  };

  renderStart = () => {
    const { start } = this.state;
    return (
      <TextInputMask
        style={styles.input}
        type={'datetime'}
        options={{
          format: 'HH:mm',
        }}
        placeholderTextColor="#979797"
        placeholder={'Début'}
        value={start}
        onChangeText={this.onChangeStart}
        blurOnSubmit={false}
        onSubmitEditing={() => this.endInput && this.endInput.focus()}
        returnKeyType="next"
      />
    );
  };

  renderEnd = () => {
    const { end } = this.state;
    return (
      <TextInputMask
        ref={(ref) => (this.endInput = ref)}
        style={styles.input}
        type={'datetime'}
        options={{
          format: 'HH:mm',
        }}
        placeholderTextColor="#979797"
        placeholder={'Fin'}
        value={end}
        onChangeText={this.onChangeEnd}
        blurOnSubmit={false}
        onSubmitEditing={() => Keyboard.dismiss()}
        returnKeyType="done"
      />
    );
  };
  render() {
    const { error } = this.state;

    return (
      <Dialog
        animationType="slide"
        visible={this.props.dialogVisible}
        contentStyle={styles.contentDialog}
        dialogStyle={styles.dialog}
        titleStyle={styles.title}
        title="Changer le créneau"
        overlayStyle={{
          marginBottom: Platform.OS === 'ios' ? this.state.keyboardHeight : 0,
        }}
        onTouchOutside={this.props.onClose}>
        <View style={styles.content}>
          {this.renderStart()}
          <Text style={styles.andText}>-</Text>
          {this.renderEnd()}
        </View>
        {error && <Text style={styles.error}>{error}</Text>}
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
