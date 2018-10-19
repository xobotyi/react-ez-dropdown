import PropTypes        from "prop-types";
import React            from "react";
import DropdownRegister from "./util/DropdownRegister";

export default class DropdownContent extends React.Component
{
    static displayName = "DropdownContent";

    static propTypes = {
        className: PropTypes.string,

        onShow: PropTypes.func,
        onHide: PropTypes.func,

        isOpened: PropTypes.bool,
        isolated: PropTypes.bool,
    };

    static defaultProps = {
        isOpened: false,
        isolated: false,
    };

    componentDidMount(prevProps, prevState, snapshot) {
        DropdownRegister.registerDropdown(this);
    }

    componentWillUnmount() {
        DropdownRegister.unregisterDropdown(this);
    }

    show = () => {};

    hide = () => {};

    render() {
        const {
                  className,
                  isOpened,
                  ...props
              } = this.props;

        return (
                <div className={ "EzDropdown-content" + (className ? " " + className : "") } { ...props } />
        );
    }
}
