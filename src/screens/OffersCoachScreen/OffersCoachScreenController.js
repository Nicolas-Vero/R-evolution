import { delete_coach_offers } from '../../api/Offers';
import { get_coach_offers } from '../../api/Offers';
import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';

export default class OffersCoachScreenController extends AbstractScreenController {
  constructor(component) {
    super(component);

    this.initialState = {
      offers: [],
      fontsLoaded: false,
      dialogVisible: false,
      itemId: null,
      refreshing: false,
    };
  }
  componentDidMount = async () => {
    await this.fetchData();
  };
  componentDidUpdate = async (prevProps) => {
    if (
      this.component.props.isFocused &&
      prevProps.isFocused !== this.component.props.isFocused
    ) {
      await this.fetchData();
    }
  };

  fetchData = async () => {
    this.component.setState({ refreshing: true });
    const offers = await get_coach_offers();
    if (offers.status === 200) {
      this.component.setState({
        offers: offers.data.offers,
      });
    }
    this.component.setState({
      refreshing: false,
    });
  };

  onOpenDialog = (itemId) => {
    this.component.setState({ dialogVisible: true, itemId });
  };

  onDismissDialog = () => {
    this.component.setState({
      dialogVisible: !this.component.state.dialogVisible,
      itemId: null,
    });
  };

  onDelete = () => {
    if (!this.component.state.itemId) return;
    delete_coach_offers({ offer_id: this.component.state.itemId }).then(() => {
      get_coach_offers().then(() => {
        get_coach_offers()
          .then((res) => res.data.offers)
          .then((res) => {
            this.component.setState({ offers: res });
          });
      });
    });
    this.onDismissDialog();
  };
}
