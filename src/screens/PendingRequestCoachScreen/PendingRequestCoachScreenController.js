import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';
import { get_assigned_request_by_month, get_personnal_request, get_public_request } from '../../api/Request';

export default class PendingRequestCoachScreenController extends AbstractScreenController {
  constructor(component) {
    super(component);

    this.initialState = {
      personalRequest: [],
      publicRequest: [],
      assignedRequest:0,
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
    get_assigned_request_by_month().then((res) => {
      this.component.setState({ assignedRequest: res.data.number });
    });

    this.component.setState({ isRefreshing: false });
  };
  componentDidUpdate(prevProps) {
    if (
      this.component.props.isFocused &&
      prevProps.isFocused !== this.component.props.isFocused
    ) {
      get_assigned_request_by_month().then((res) => {
        this.component.setState({ assignedRequest: res.data.number });
      });
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
