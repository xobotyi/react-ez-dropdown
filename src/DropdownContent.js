import PropTypes from "prop-types";
import React from "react";

export default class DropdownContent extends React.Component {
    static displayName = "DropdownContent";

    static propTypes = {
        tagName: PropTypes.string,
        className: PropTypes.string,
        style: PropTypes.object,

        onShow: PropTypes.func,
        onHide: PropTypes.func,

        opened: PropTypes.bool,
        removeOnHide: PropTypes.bool,
        closeOnOutsideClick: PropTypes.bool,
        closeOnEsc: PropTypes.bool,
        triggers: PropTypes.arrayOf(PropTypes.element),
    };

    static defaultProps = {
        tagName: "div",

        opened: false,
        removeOnHide: false,
        closeOnOutsideClick: true,
        closeOnEsc: true,
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
        document.body.removeEventListener("keydown", this.handleBodyKeypress, {passive: true});
    }

    componentDidUpdate() {
        this.markTriggers();

        this.state.opened
            ? this.props.onShow && this.props.onShow.call(this)
            : this.props.onHide && this.props.onHide.call(this);
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

        if (this.props.closeOnOutsideClick) {
            document.body.addEventListener("click", this.handleBodyClick, {passive: true});
            document.body.addEventListener("touch", this.handleBodyClick, {passive: true});
        }
        this.props.closeOnEsc && document.body.addEventListener("keydown", this.handleBodyKeypress, {passive: true});

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
                style,

                opened: openedProp,
                removeOnHide,
                closeOnEsc,
                closeOnOutsideClick,

                triggers,

                onShow,
                onHide,

                ...props
            } = this.props,
            {opened} = this.state;

        if (!opened && removeOnHide) {
            return null;
        }

        return React.createElement(tagName, {
            ...props,
            className: "EzDropdown-content" + (className ? " " + className : "") + (opened ? " EzDropdown-opened" : ""),
            style: {...style, ...(!removeOnHide && !opened && {display: "none"})},
            ref: ref => {
                this.contentElement = ref;
            },
        });
    }
}
