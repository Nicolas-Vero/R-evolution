import React from 'react';
import { View, Text } from 'react-native';
import { Dialog } from 'react-native-simple-dialogs';
import styles from './bookOfferDialogStyle';
import { Button } from '../../Button';

const BookOfferDialog = ({
  dialogVisible,
  onClose,
  onValidate,
  onCatalogPress,
  coachName,
  slot,
  haveCourse
}) => (
  <Dialog
    animationType="slide"
    visible={dialogVisible}
    contentStyle={styles.contentDialog}
    dialogStyle={styles.dialog}
    titleStyle={styles.title}
    onTouchOutside={onClose}
  >
    {!haveCourse ? (
      <Text style={styles.title}>
        Pour réserver cette séance tu dois avoir une offre
      </Text>
    ) : (
      <Text style={styles.title}>
        Veux-tu confirmer la séance avec
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.textColored}>{` ${coachName} `}</Text>
        de
        <Text style={styles.textColored}>
          {` ${slot?.slice(0, 5) || ''} `}
        </Text>
        à{' '}
        <Text style={styles.textColored}>
          {` ${slot?.slice(8, 14) || ''} `}
        </Text>
        ?
      </Text>
    )}

    <View style={styles.buttonContainer}>
      {haveCourse ? (
        <>
          <Button
            loading={false}
            title="Oui"
            customContainerStyles={styles.button}
            customTextStyle={styles.buttonText}
            onPress={onValidate}
          />
          <Button
            loading={false}
            title="Non"
            customContainerStyles={styles.button}
            customTextStyle={styles.buttonText}
            onPress={onClose}
          />
        </>
      ) : (
        <Button
          loading={false}
          title="Voir le catalogue"
          customContainerStyles={styles.button}
          customTextStyle={styles.buttonText}
          onPress={onCatalogPress}
        />
      )}
    </View>
  </Dialog>
);

export default BookOfferDialog;
