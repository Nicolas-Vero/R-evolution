import { StatusBar } from 'expo-status-bar';
import React,{Component} from 'react';
import AppContainer from './App/routers/index';

export default class App extends Component {

  render() {
    return (
      <AppContainer/>
    );
  }
}

