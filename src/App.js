import React, {Component, Fragment} from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import configureStore from './store/configureStore';
import Router from './routes/index';
import AppNavigation from './routes/navigationService';
import './config/logger';

const {persistor, store} = configureStore();

export class App extends Component {
  constructor(props) {
    super(props);

    if (store === null) {
      store = configureStore();
    }

    this.state = {
      store,
    };
  }

  render() {
    const {store} = this.state;

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={{flex: 1}}>
            <Router
              ref={navigatorRef => {
                AppNavigation.setTopLevelNavigator(navigatorRef);
              }}
            />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;

// import { Sentry } from 'react-native-sentry';

// Sentry.config('https://98def6268ecd4527885aa1358d0ec0d0@sentry.io/1434821').install();

// export default class App extends Component {

//   render() {
//     return (
//       <AppContainer/>
//     );
//   }
// }

console.disableYellowBox = true;
