import { BackHandler, Platform } from 'react-native';
import AbstractComponentController from '../AbstractComponent/AbstractComponentController';
import ContextService from '../../../services/ContextService';
import LoggerService from '../../../services/LoggerService';

export default class AbstractScreenController extends AbstractComponentController {
  // ... simplifier le check et l'appel aux fonctions : this.screenDidFocus && this.screenDidFocus()

  abstractOnHardwareBackPressAndroid = () => {
    const current_screen_id = ContextService.get('current_screen_id');
    if (this.component.uniqueId !== current_screen_id) {
      return false;
    }
    return this.onHardwareBackPressAndroid();
  };

  abstractScreenWillFocus = () => {
    LoggerService.info(
      `${this.component.screenName} will focus (${this.component.uniqueId})`,
    );

    ContextService.set('current_screen', this.component.screenName);
    ContextService.set('current_screen_id', this.component.uniqueId);
    ContextService.set('current_navigation', this.component.props.navigation);

    if (Platform.OS === 'android' && this.onHardwareBackPressAndroid) {
      BackHandler.addEventListener(
        'hardwareBackPress',
        this.abstractOnHardwareBackPressAndroid,
      );
    }

    if (this.screenWillFocus) {
      this.screenWillFocus();
    }
  };

  abstractScreenDidFocus = () => {
    this.component.setState({
      isScreenActive: true,
    });

    ContextService.set('is_navigation_pushing', false);

    if (this.screenDidFocus) {
      this.screenDidFocus();
    }
  };

  abstractScreenWillBlur = () => {
    if (this.screenWillBlur) {
      this.screenWillBlur();
    }

    this.component.setState({
      isScreenActive: false,
    });

    if (Platform.OS === 'android' && this.onHardwareBackPressAndroid) {
      try {
        BackHandler.removeEventListener(
          'hardwareBackPress',
          this.onHardwareBackPressAndroid,
        );
      } catch (e) {}
    }
  };

  abstractScreenDidBlur = () => {
    if (this.screenDidBlur) {
      this.screenDidBlur();
    }

    LoggerService.info(
      `${this.component.screenName} did blur (${this.component.uniqueId})`,
    );
  };
}
