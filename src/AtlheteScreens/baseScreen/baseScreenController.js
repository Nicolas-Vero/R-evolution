import { Animated } from 'react-native';
import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';

export default class BaseScreenController extends AbstractScreenController {
  constructor(component) {
    super(component);

    this.initialState = {};
  }

  async componentDidMount() {}

  componentWillUnmount() {}

  onProfilePress = () => {
    
  }
  onLogoutPress = () => {

  }
}
