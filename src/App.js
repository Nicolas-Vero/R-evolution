import React, {Component, Fragment} from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import configureStore from './store/configureStore';
import Router from './routes/index';
import AppNavigation from './routes/navigationService';
import './config/logger';
// import AppContainer from './routers/index';

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

  async componentDidMount() {
  }

  render() {
    const {store} = this.state;

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View >
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
