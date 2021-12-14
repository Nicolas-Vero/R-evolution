import React from 'react';
import LoggerService from '../../../services/LoggerService';

const randomString = require('random-string');

export default class AbstractComponent extends React.Component {
  // eslint-disable-next-line constructor-super
  constructor(config) {
    if (!config) {
      LoggerService.error('Component constructor must have a config');
      return;
    }

    if (!config.props) {
      LoggerService.error(
        'Component constructor must have a "props" property in config',
      );
      return;
    }

    super(config.props);

    this.config = config;

    if (!this.config.viewClass) {
      LoggerService.error(
        `${this.constructor.name}: Component constructor must have a "viewClass" property in config`,
      );
      return;
    }

    if (!this.config.controllerClass) {
      LoggerService.error(
        `${this.constructor.name}: Component constructor must have a "controllerClass" property in config`,
      );
      return;
    }

    this.uniqueId = randomString({ length: 16 });

    // eslint-disable-next-line new-cap
    this.controller = new this.config.controllerClass(this);

    this.state = {
      ...this.controller.initialState,
    };

    // eslint-disable-next-line new-cap
    this.view = new this.config.viewClass(this, this.controller);
  }

  componentWillMount() {
    this.controller.abstractComponentWillMount();
  }

  componentDidMount() {
    this.controller.abstractComponentDidMount();
  }

  componentDidCatch(error, errorInfo) {
    this.controller.abstractComponentDidCatch(error, errorInfo);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.controller.abstractComponentDidUpdate(prevProps, prevState, snapshot);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.controller.abstractComponentWillReceiveProps(nextProps, nextContext);
  }

  componentWillUnmount() {
    this.controller.abstractComponentWillUnmount();
  }

  render() {
    return this.view.abstractRender();
  }
}
