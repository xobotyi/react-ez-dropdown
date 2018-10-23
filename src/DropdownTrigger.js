import PropTypes from "prop-types";
import React     from "react";

export default class DropdownTrigger extends React.Component
{
    static displayName = "DropdownTrigger";

    static propTypes = {
        className: PropTypes.string,
        tagName:   PropTypes.string,

        disabled: PropTypes.bool,

        dropdowns: PropTypes.arrayOf(PropTypes.element),
    };

    static defaultProps = {
        tagName: "div",

        disabled: false,
    };

    constructor(props) {
        super(props);

        this.dropdowns = [];
    }

    componentDidMount() {
        this.props.dropdowns && this.bindDropdowns(this.props.dropdowns);
    }

    componentWillUnmount() {
        this.dropdowns.concat([]).forEach(dropdown => {
            dropdown.unbindTriggers([this]);
        });
    }

    bindDropdowns = (dropdowns) => {
        dropdowns.forEach(dropdown => {
            this.dropdowns.indexOf(dropdown) === -1 && this.dropdowns.push(dropdown);
        });

        return this;
    };

    unbindDropdowns = (dropdowns) => {
        dropdowns.forEach(dropdown => {
            let i = this.dropdowns.indexOf(dropdown);
            i !== -1 && this.dropdowns.splice(i, 1);
        });

        return this;
    };

    handleClick = () => {
        this.dropdowns.forEach(dropdown => dropdown.toggle());

        return true;
    };

    render() {
        const {
                  tagName, className,
                  dropdowns, disabled,
                  ...props
              } = this.props;

        let triggerClassNames = "EzDropdown-trigger" + (className ? " " + className : "");

        return React.createElement(
                tagName,
                {
                    ...props,
                    className: triggerClassNames,
                    ref:       (ref) => {this.triggerElement = ref;},
                    onClick:   this.handleClick,
                });
    }
}
