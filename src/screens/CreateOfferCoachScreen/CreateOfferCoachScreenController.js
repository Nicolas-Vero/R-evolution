import { AddOffer } from '../../api/Offers';
import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';

export default class CreateOfferCoachScreenController extends AbstractScreenController {
  constructor(component) {
    super(component);

    this.initialState = {
      type: 'Coaching',
    };
  }
  createOffer = async (values) => {
    try {
      values.price = parseFloat(values.price) * 100;
      const addOffer = await AddOffer(values);
      if (addOffer.status === 200) {
        this.component.props.navigation.popToTop();
        this.component.props.navigation.navigate('OffersCoachScreen');
      }
    } catch (error) {
      this.setState({ loading: false });
      //alert('Please try again. ');
      console.warn(error);
    }
  };
}
