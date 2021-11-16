export default class AbstractComponentController {
    constructor(component) {
        this.component = component;
    }

    abstractComponentWillMount = () => {
        if (this.componentWillMount) {
            this.componentWillMount();
        }
    };

    abstractComponentDidMount = () => {
        if (this.componentDidMount) {
            this.componentDidMount();
        }
    };

    abstractComponentDidCatch = (error, errorInfo) => {
        if (this.componentDidCatch) {
            this.componentDidCatch(error, errorInfo);
        }
    };

    abstractComponentDidUpdate = (prevProps, prevState, snapshot) => {
        if (this.componentDidUpdate) {
            this.componentDidUpdate(prevProps, prevState, snapshot);
        }
    };

    abstractComponentWillReceiveProps = (nextProps, nextContext) => {
        if (this.componentWillReceiveProps) {
            this.componentWillReceiveProps(nextProps, nextContext);
        }
    };

    abstractComponentWillUnmount = () => {
        if (this.componentWillUnmount) {
            this.componentWillUnmount();
        }
    };
}
