import { get_coach_athlete, delete_athlete, athletePendingPayment } from '../../api/Coach';
import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';
export default class AthletesCoachScreenController extends AbstractScreenController {
  constructor(component) {
    super(component);

    this.initialState = {
      refresh: false,
      user: { name: 'toto', avatar: 'string avatar' },
      screen: 'ACTIFS',
      initialData: null,
      athletes: [],
      atlhetesActifs: [],
      atlhetesInactifs: [],
      atlhetesProspects: [],
      search: '',
      loaded: false,
      refreshing: false,
      isDeleteSheetModalVisible: false,
      selectedAthleteToDelete: null,
      search: null,
    };
  }
  componentDidMount = async () => {
    await this.fetchData();
    this.component.setState({
      loaded: true,
    });
  };

  screenDidFocus = async () => {
    await this.fetchData();
    this.component.setState({
      loaded: true,
    });
  };

  onChangeTab = (screen) => {
    this.component.setState({ screen, search: null, athletes: [] });
  };

  fetchData = async () => {
    this.component.setState({ refreshing: true });

    const athletes = await get_coach_athlete();
    if (athletes.status === 200) {
      this.component.setState({
        initialData: athletes.data.athletes,
        search: null,
      });

      await this.filterData();

      this.component.setState({
        refreshing: false,
      });
    }
  };

  async filterData() {
    const { initialData } = this.component.state;
    let atlhetesActifs = [];
    let atlhetesInactifs = [];
    let atlhetesProspects = [];
    const pendingPayment = await athletePendingPayment()
    initialData.forEach(async (element, val) => {
      switch (element.status) {
        case 'active':
          element.pendingPayment = pendingPayment.data.includes(element.id) ? true : false
          atlhetesActifs.push(element);
          break;
        case 'inactive':
          element.pendingPayment = pendingPayment.data.includes(element.id) ? true : false
          atlhetesInactifs.push(element);
          break;
        case 'prospect':
          atlhetesProspects.push(element);
          break;
        default:
          break;
      }
    }, this.component.setState({ atlhetesActifs, atlhetesInactifs, atlhetesProspects, search: null }));
  }

  filterSearch = async (search) => {
    this.component.setState({ search });

    let { screen, atlhetesActifs, atlhetesInactifs, atlhetesProspects } =
      this.component.state;

    let newList = [];
    if (screen === 'ACTIFS') {
      newList = this.filterAthletes(atlhetesActifs, search);
    } else if (screen === 'INACTIFS') {
      newList = this.filterAthletes(atlhetesInactifs, search);
      this.component.setState({ athletes: newList.length ? newList : [] });
    } else {
      newList = this.filterAthletes(atlhetesProspects, search);
      this.component.setState({ atlhetesProspects });
    }

    this.component.setState({ athletes: newList.length ? newList : [] });
  };

  filterAthletes = (list, search) => {
    return list.filter((athlete) => {
      const full_name =
        `${athlete.first_name} ${athlete.last_name}`.toLowerCase();
      return full_name.includes(search.toLowerCase());
    });
  };

  updateSearch = (search) => {
    this.component.setState({ search });
  };

  onDeleteSheetPress = (athleteId) => {
    this.component.setState({
      isDeleteSheetModalVisible: true,
      selectedAthleteToDelete: athleteId,
    });
  };

  onDismissDeleteSheetDialog = () => {
    this.component.setState({
      isDeleteSheetModalVisible:
        !this.component.state.isDeleteSheetModalVisible,
    });
  };

  onValidateDeleteSheet = async () => {
    const { selectedAthleteToDelete } = this.component.state;
    const deleteAthlete = await delete_athlete(selectedAthleteToDelete);
    this.onDismissDeleteSheetDialog();
    this.component.setState({ selectedAthleteToDelete: null });
    if (deleteAthlete.status === 200) {
      await this.fetchData();
    }
  };

  onNavigate = (item) => {
    return this.component.props.navigation.navigate(
      'AthleteSheetCoachScreen',
      item,
    );
  };
}
