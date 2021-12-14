import React from 'react';

export default class AbstractComponentView {
    constructor(component) {
        this.component = component;
        this.controller = component.controller;
    }

    abstractRender = () => {
        if (this.render) {
            return this.render();
        }
    };
}
