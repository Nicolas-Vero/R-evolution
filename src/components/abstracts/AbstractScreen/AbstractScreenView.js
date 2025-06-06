import { StatusBar, View } from 'react-native';
import React from 'react';
import styles from './AbstractScreenStyle';
import PlatformHelper from '../../../helpers/PlatformHelper';



export const ScreenContainer = ({ children, renderScreenAbsolute, statusBarBackgroundColor = '#000' }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={statusBarBackgroundColor} />
      <View
        style={{
          ...styles.statusBarBackgroundStyle,
          height: PlatformHelper.getTopSafeHeight(),
          backgroundColor: statusBarBackgroundColor,
        }}
      />
      {renderScreenAbsolute ? (
        <View style={styles.screenAbsoluteContainer}>
          {renderScreenAbsolute()}
        </View>
      ) : null}
      {children}
    </View>
  );
};

