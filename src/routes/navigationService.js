import { NavigationActions } from 'react-navigation';
import ContextService from '../services/ContextService';
let navigator;

setTopLevelNavigator = (navigatorRef) => {
  navigator = navigatorRef;
};

navigate = (routeName, params) => {
  const navigation = ContextService.get('current_navigation');

  navigation.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
};

export default {
  navigate,
  setTopLevelNavigator,
};
