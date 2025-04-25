import { StatusBar, View } from 'react-native';
import React from 'react';
import AbstractComponentView from '../AbstractComponent/AbstractComponentView';
import styles from './AbstractScreenStyle';
import PlatformHelper from '../../../helpers/PlatformHelper';

export default class AbstractScreenView extends AbstractComponentView {
  abstractRender = () => {
    return (
      <View style={[styles.container]}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <View
          style={{
            ...styles.statusBarBackgroundStyle,
            height: PlatformHelper.getTopSafeHeight(),
            backgroundColor:
              this.component.props.statusBarBackgroundColor || '#000',
          }}
        />

        {!this.renderScreenAbsolute ? null : (
          <View style={styles.screenAbsoluteContainer}>
            {this.renderScreenAbsolute()}
          </View>
        )}

        {this.render()}
      </View>
    );
  };
}
