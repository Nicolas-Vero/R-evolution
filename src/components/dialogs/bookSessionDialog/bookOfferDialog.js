import React from 'react';
import { Platform, View, Text } from 'react-native';
import { Dialog } from 'react-native-simple-dialogs';
import styles from './bookOfferDialogStyle';
import { Button } from '../../Button';
export default class BookOfferDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
        onTouchOutside={this.props.onClose}>
        <Text style={styles.title}>
          Veux-tu confirmer la séance avec
          <Text style={styles.textColored}>{` ${this.props.coachName} `}</Text>
          de
          <Text style={styles.textColored}>
            {` ${this.props.slot.slice(0, 5)} `}
          </Text>
          à{' '}
          <Text style={styles.textColored}>
            {` ${this.props.slot.slice(8, 14)} `}
          </Text>
          ?
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            loading={false}
            title="Oui"
            customContainerStyles={styles.button}
            customTextStyle={styles.buttonText}
            onPress={this.props.onValidate}
          />
          <Button
            loading={false}
            title="Non"
            customContainerStyles={styles.button}
            customTextStyle={styles.buttonText}
            onPress={this.props.onClose}
          />
        </View>
      </Dialog>
    );
  }
}
