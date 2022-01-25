import { get_coach_athlete, delete_athlete } from '../../api/Coach';
import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';
export default class AthletesCoachScreenController extends AbstractScreenController {
  constructor(component) {
    super(component);

    this.initialState = {
      refresh: false,
      user: { name: 'toto', avatar: 'string avatar' },
      screen: 'ACTIFS',
      atlhetesActifs: [],
      atlhetesInactifs: [],
      atlhetesProspects: [],
      search: '',
      loaded: false,
      refreshing: false,
      isDeleteSheetModalVisible: false,
      selectedAthleteToDelete: null,
    };
  }
  componentDidMount = async () => {
    await this.fetchData().then(() => {
      this.component.setState({ loaded: true });
    });
  };

  fetchData = async () => {
    this.component.setState({ refreshing: true });
    const athletes = await get_coach_athlete();
    if (athletes.status === 200) {
      await this.filterData(athletes.data.athletes);
      this.component.setState({
        refreshing: false,
      });
    }
  };

  async filterData(data) {
    const actifs = [];
    const inactifs = [];
    const prospects = [];
    data.forEach((element) => {
      switch (element.status) {
        case 'active':
          actifs.push(element);
          break;
        case 'inactive':
          inactifs.push(element);
          break;
        case 'prospect':
          prospects.push(element);
          break;

        default:
          break;
      }
    }, this.component.setState({ atlhetesActifs: actifs, atlhetesInactifs: inactifs, atlhetesProspects: prospects }));
  }

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
