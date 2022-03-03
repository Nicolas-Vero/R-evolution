import React from 'react';
import { Platform, View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown';
import { Dialog } from 'react-native-simple-dialogs';
import styles from './filterTimesDialogStyle';
import { slots } from '../../../helpers/dateHelper';
import { dispatch } from '../../../redux/store';

export default class FilterTimesDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startFormatedSlots: [],
      endFormatedSlots: [],
      startIndex: null,
      endIndex: null,
      error: null,
    };
  }
  componentWillMount = () => {
    this.setState({
      startFormatedSlots: slots.map((slot) => slot.substring(0, 5)),
    });
  };

  onSelectStart = (selectedIndex) => {
    const endFormatedSlots = [];
    slots.map((slot, index) => {
      if (selectedIndex < index) {
        endFormatedSlots.push({
          baseIndex: index,
          value: slot.substring(8, 13),
        });
      }
    });
    this.setState({
      startIndex: selectedIndex,
      endFormatedSlots,
      error: null,
    });
  };

  onSelectEnd = (index) => {
    this.setState({
      endIndex: index,
      error: null,
    });
  };

  onTouchOutSide = () => {
    this.props.onClose();
  };

  onValidate = () => {
    const { startIndex, endIndex } = this.state;
    if (startIndex === null) {
      this.setState({
        error: 'Veuillez selectionner une heure de début',
      });

      return;
    }
    if (!endIndex) {
      this.setState({
        error: 'Veuillez selectionner une heure de fin',
      });

      return;
    }

    const store = {
      start: null,
      end: parseInt(endIndex),
    };
    if (startIndex !== 0) {
      store.start = parseInt(startIndex);
    }
    dispatch('coachFilteredTime', store);
    this.props.onClose();
  };

  renderStartSlots = () => {
    const { startFormatedSlots, startIndex } = this.state;
    return (
      <SelectDropdown
        buttonStyle={styles.dropdownButton}
        buttonTextStyle={styles.dropdownButtonText}
        rowTextStyle={styles.dropdownRowText}
        dropdownStyle={styles.dropdownBg}
        rowStyle={styles.dropdownRow}
        data={startFormatedSlots}
        defaultButtonText={'Début'}
        onSelect={(selectedItem, index) => {
          this.onSelectStart(index);
        }}
        renderDropdownIcon={() => {
          return <AntDesign name="down" size={18} color="black" />;
        }}
        dropdownIconPosition={'right'}
        buttonTextAfterSelection={(selectedItem) => {
          return selectedItem;
        }}
        rowTextForSelection={(item) => {
          return item;
        }}
      />
    );
  };

  renderEndSlots = () => {
    const { endFormatedSlots } = this.state;
    const disable = endFormatedSlots.length === 0;
    return (
      <SelectDropdown
        disabled={disable}
        buttonStyle={[
          styles.dropdownButton,
          { backgroundColor: disable ? '#979797' : '#fff' },
        ]}
        buttonTextStyle={styles.dropdownButtonText}
        rowTextStyle={styles.dropdownRowText}
        dropdownStyle={styles.dropdownBg}
        rowStyle={styles.dropdownRow}
        data={endFormatedSlots}
        defaultButtonText={'Fin'}
        onSelect={(selectedItem) => {
          this.onSelectEnd(selectedItem.baseIndex);
        }}
        renderDropdownIcon={() => {
          return <AntDesign name="down" size={18} color="black" />;
        }}
        dropdownIconPosition={'right'}
        buttonTextAfterSelection={(selectedItem) => {
          return selectedItem.value;
        }}
        rowTextForSelection={(item) => {
          return item.value;
        }}
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
        title="Filtrer par heures"
        overlayStyle={{
          marginBottom: Platform.OS === 'ios' ? this.state.keyboardHeight : 0,
        }}
        onTouchOutside={this.props.onClose}>
        <View style={styles.content}>
          {this.renderStartSlots()}
          <Text style={styles.andText}>et</Text>
          {this.renderEndSlots()}
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
