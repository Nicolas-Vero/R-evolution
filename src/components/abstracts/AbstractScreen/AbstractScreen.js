import AbstractComponent from '../AbstractComponent/AbstractComponent';
import LoggerService from '../../../services/LoggerService';

export default class AbstractScreen extends AbstractComponent {
    // ... déplacer tt ça ds le controlleur, idem pour asbstractTabItem

    constructor(config) {
        super(config);

        if (!this.config.screenName) {
            LoggerService.error(
                `${this.constructor.name}: Screen constructor must have a "screenName" property in config`,
            );
            return;
        }

        this.screenName = this.config.screenName;

        if (__DEV__ && this.screenName !== this.constructor.name) {
            LoggerService.error(
                `${this.constructor.name}: "screenName" property in config must be the name of the screen class`,
            );
            return;
        }

        this.listenNavigationEvents();
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.removeNavigationEvents();
    }

    listenNavigationEvents = () => {
        this.willFocusNavigationEventListener = this.props.navigation.addListener('willFocus', payload => {
            this.controller.abstractScreenWillFocus(payload);
        });
        this.didFocusNavigationEventListener = this.props.navigation.addListener('didFocus', payload => {
            this.controller.abstractScreenDidFocus(payload);
        });
        this.willBlurNavigationEventListener = this.props.navigation.addListener('willBlur', payload => {
            this.controller.abstractScreenWillBlur(payload);
        });
        this.didBlurNavigationEventListener = this.props.navigation.addListener('didBlur', payload => {
            this.controller.abstractScreenDidBlur(payload);
        });
    };

    removeNavigationEvents = () => {
        this.willFocusNavigationEventListener.remove();
        this.didFocusNavigationEventListener.remove();
        this.willBlurNavigationEventListener.remove();
        this.didBlurNavigationEventListener.remove();
    };
}
