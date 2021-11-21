import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';
import { get_personnal_request, get_public_request } from '../../api/Request';

export default class PendingRequestCoachScreenController extends AbstractScreenController {
  constructor(component) {
    super(component);

    this.initialState = {
      personalRequest: [],
      publicRequest: [],
      loaded: false,
      isRefreshing: false,
    };
  }
  async componentDidMount() {
    await this.loadData();
    this.component.setState({ loaded: true });
  }

  loadData = async () => {
    this.component.setState({ isRefreshing: true });
    get_personnal_request().then((res) => {
      this.component.setState({ personalRequest: res.data.requests });
    });
    get_public_request().then((res) => {
      this.component.setState({ publicRequest: res.data.requests });
    });

    this.component.setState({ isRefreshing: false });
  };
  componentDidUpdate(prevProps) {
    if (
      this.component.props.isFocused &&
      prevProps.isFocused !== this.component.props.isFocused
    ) {
      get_personnal_request().then((res) => {
        this.component.setState({ personalRequest: res.data.requests });
      });
      get_public_request()
        .then((res) => {
          this.component.setState({ publicRequest: res.data.requests });
        })
        .then(() => {
          this.component.setState({ loaded: true });
        });
    }
  }

  onItemPress = (item) => {
    this.component.props.navigation.navigate('TreshRequestCoachScreen', {
      item,
    });
  };
}
