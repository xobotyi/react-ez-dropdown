import PropTypes from "prop-types";
import React from "react";

export default class DropdownTrigger extends React.Component {
    static displayName = "DropdownTrigger";

    static propTypes = {
        tagName: PropTypes.string,
        className: PropTypes.string,
        style: PropTypes.object,

        disabled: PropTypes.bool,
        onClick: PropTypes.func,

        dropdowns: PropTypes.arrayOf(PropTypes.element),
    };

    static defaultProps = {
        tagName: "div",

        disabled: false,
    };

    constructor(props) {
        super(props);

        this.dropdowns = [];

        if (typeof props.ref === "function") {
            props.ref(this);
        }
    }

    componentDidMount() {
        this.props.dropdowns && this.bindDropdowns(this.props.dropdowns);
    }

    componentWillUnmount() {
        this.dropdowns.concat([]).forEach(dropdown => {
            dropdown.unbindTriggers([this]);
        });
    }

    bindDropdowns = dropdowns => {
        dropdowns.forEach(dropdown => {
            dropdown && this.dropdowns.indexOf(dropdown) === -1 && this.dropdowns.push(dropdown);
        });

        return this;
    };

    unbindDropdowns = dropdowns => {
        dropdowns.forEach(dropdown => {
            let i = this.dropdowns.indexOf(dropdown);
            i !== -1 && this.dropdowns.splice(i, 1);
        });

        return this;
    };

    handleClick = e => {
        this.dropdowns.forEach(dropdown => dropdown.toggle());

        this.props.onClick && this.props.onClick.call(this.triggerElement, e);

        return true;
    };

    render() {
        const {tagName, className, dropdowns, disabled, ref, ...props} = this.props;

        let triggerClassNames = "EzDropdown-trigger" + (className ? " " + className : "");

        return React.createElement(tagName, {
            ...props,
            className: triggerClassNames,
            ref: ref => {
                this.triggerElement = ref;
            },
            onClick: this.handleClick,
        });
    }
}
