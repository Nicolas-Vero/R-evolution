import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';
import { UpdateOffer } from '../../api/Offers';

export default class UpdateOfferCoachScreenController extends AbstractScreenController {
  constructor(component) {
    super(component);

    this.initialState = {
      type: 'Coaching',
    };
  }
  onUpdatePress = async (values) => {
    console.log(values);
    try {
      const update = await UpdateOffer(values);
      if (update.status === 200) {
        this.component.props.navigation.popToTop();
        this.component.props.navigation.navigate('OffersCoachScreen');
      }
    } catch (error) {
      this.component.setState({ loading: false });
      console.warn(error);
    }
  };
}
