import PropTypes from "prop-types";
import React from "react";

export default class DropdownContent extends React.Component {
    static displayName = "DropdownContent";

    static propTypes = {
        className: PropTypes.string,
        tagName: PropTypes.string,

        onShow: PropTypes.func,
        onHide: PropTypes.func,

        opened: PropTypes.bool,
        removeOnHide: PropTypes.bool,
        triggers: PropTypes.arrayOf(PropTypes.element),
    };

    static defaultProps = {
        tagName: "div",
        opened: false,
        removeOnHide: false,
    };

    constructor(props) {
        super(props);

        this.triggers = [];

        this.state = {
            opened: props.opened || false,
        };
    }

    componentDidMount() {
        this.props.triggers && this.bindTriggers(this.props.triggers);
        this.markTriggers();

        if (this.state.opened) {
            this.open();
        }
    }

    componentWillUnmount() {
        this.triggers.concat([]).forEach(trigger => trigger.unbindDropdowns([this]));

        document.body.removeEventListener("click", this.handleBodyClick, {passive: true});
        document.body.removeEventListener("touch", this.handleBodyClick, {passive: true});
    }

    componentDidUpdate() {
        this.markTriggers();
    }

    markTriggers = () => {
        this.triggers.length &&
            this.triggers.forEach(
                trigger => trigger && trigger.triggerElement.classList.toggle("EzDropdown-opened", this.state.opened)
            );

        return this;
    };

    open = () => {
        this.setState({
            ...this.state,
            opened: true,
        });

        document.body.addEventListener("click", this.handleBodyClick, {passive: true});
        document.body.addEventListener("touch", this.handleBodyClick, {passive: true});
        document.body.addEventListener("keydown", this.handleBodyKeypress, {passive: true});

        return this;
    };

    close = () => {
        this.setState({
            ...this.state,
            opened: false,
        });

        document.body.removeEventListener("click", this.handleBodyClick, {passive: true});
        document.body.removeEventListener("touch", this.handleBodyClick, {passive: true});
        document.body.removeEventListener("keydown", this.handleBodyKeypress, {passive: true});

        return this;
    };

    toggle = (forced = null) => {
        if (forced === null) {
            this.state.opened ? this.close() : this.open();
        } else {
            forced ? this.open() : this.close();
        }

        return this;
    };

    handleBodyClick = event => {
        // check if dropdown itself or its content has been clicked
        if (event.target === this.contentElement || this.contentElement.contains(event.target)) {
            return true;
        }

        // check if dropdown's trigger has been clicked
        if (
            this.triggers.length &&
            this.triggers.some(
                trigger => event.target === trigger.triggerElement || trigger.triggerElement.contains(event.target)
            )
        ) {
            return true;
        }

        this.close();
    };

    handleBodyKeypress = event => {
        event.which && event.which === 27 && this.close();

        return true;
    };

    bindTriggers = triggers => {
        triggers.forEach(trigger => {
            trigger && this.triggers.indexOf(trigger) === -1 && this.triggers.push(trigger);
        });

        return this;
    };

    unbindTriggers = triggers => {
        triggers.forEach(trigger => {
            let i = this.triggers.indexOf(trigger);

            i !== -1 && this.triggers.splice(i, 1);
        });

        return this;
    };

    render() {
        const {
                tagName,
                className,
                opened: openedProp,
                removeOnHide,
                triggers,
                disabled,

                ...props
            } = this.props,
            {opened} = this.state;

        if (!opened && removeOnHide) {
            return null;
        }

        let contentClassNames = "EzDropdown-content" + (className ? " " + className : "");
        opened && (contentClassNames += " EzDropdown-opened");

        return React.createElement(tagName, {
            ...props,
            className: contentClassNames,
            ref: ref => {
                this.contentElement = ref;
            },
            style: {...(!removeOnHide && {display: opened ? null : "none"})},
        });
    }
}
