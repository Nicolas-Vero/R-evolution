import { get_coach_athlete } from '../../api/Coach';
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
    };
  }
  componentDidMount() {
    get_coach_athlete()
      .then((res) => {
        this.filterData(res.data.athletes);
      })
      .then(() => {
        this.component.setState({ loaded: true });
      });
  }

  filterData(data) {
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

  onNavigate = (item) => {
    return this.component.props.navigation.navigate(
      'AthleteSheetCoachScreen',
      item,
    );
  };
}
