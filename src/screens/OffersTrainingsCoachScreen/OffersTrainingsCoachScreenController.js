import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';

export default class OffersTrainingsCoachScreenController extends AbstractScreenController {
  constructor(component) {
    super(component);

    this.initialState = {};
  }

  navigateToOffers = () => {
    this.component.props.navigation.navigate('OffersCoachScreen');
  };
}
