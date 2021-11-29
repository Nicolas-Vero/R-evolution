import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';
import { Linking } from 'react-native';
export default class OffersTrainingsCoachScreenController extends AbstractScreenController {
  constructor(component) {
    super(component);

    this.initialState = {};
  }

  navigateToOffers = () => {
    this.component.props.navigation.navigate('OffersCoachScreen');
  };

  openYoutube = () => {
    Linking.openURL(
      'https://youtube.com/playlist?list=PL3L9pkm9gco9vV1qusgw8R8WlYeqMpqBP',
    );
  };
}
