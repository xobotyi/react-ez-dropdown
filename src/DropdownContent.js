import PropTypes        from "prop-types";
import React            from "react";
import DropdownRegister from "./util/DropdownRegister";

const onWindowClick = (event) => {
    let dropdown = DropdownRegister.getOpened();

    if (dropdown) {
        // check if dropdown itself has been clicked
        if (event.target === dropdown.contentElement || dropdown.contentElement.contains(event.target)) {
            return true;
        }

        // check if dropdown's trigger has been clicked
        if (dropdown.triggers.length && dropdown.triggers.some(trigger => event.target === trigger.triggerElement || trigger.triggerElement.contains(event.target))) {
            return true;
        }

        DropdownRegister.unsetOpened(dropdown);
    }

    return true;
};

export default class DropdownContent extends React.Component
{
    static displayName = "DropdownContent";

    static propTypes = {
        className: PropTypes.string,
        tagName:   PropTypes.string,

        onShow: PropTypes.func,
        onHide: PropTypes.func,

        opened:       PropTypes.bool,
        removeOnHide: PropTypes.bool,
        triggers:     PropTypes.arrayOf(PropTypes.element),
    };

    static defaultProps = {
        tagName:      "div",
        opened:       false,
        removeOnHide: true,
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

        if (DropdownRegister.registerDropdown(this) === 1) {
            document.body.addEventListener("click", onWindowClick, {passive: true});
            document.body.addEventListener("touch", onWindowClick, {passive: true});
        }

        if (this.state.opened) {
            this.open();
        }
    }

    componentWillUnmount() {
        this.triggers.concat([]).forEach(trigger => {
            trigger.unbindDropdowns([this]);
        });

        if (DropdownRegister.unregisterDropdown(this) === 0) {
            document.body.removeEventListener("click", onWindowClick, {passive: true});
            document.body.removeEventListener("touch", onWindowClick, {passive: true});
        }
    }

    componentDidUpdate() {
        this.markTriggers();
    }

    markTriggers = () => {
        this.triggers.length && this.triggers.forEach(trigger => {
            trigger && trigger.triggerElement.classList.toggle("EzDropdown-opened", this.state.opened);
        });
    };

    open = () => {
        DropdownRegister.setOpened(this);
    };

    close = () => {
        DropdownRegister.unsetOpened(this);
    };

    toggle = (forced = null) => {
        if (forced === null) {
            this.state.opened ? this.close() : this.open();
        }
        else {
            forced ? this.open() : this.close();
        }
    };

    bindTriggers = (triggers) => {
        triggers.forEach(trigger => {
            this.triggers.indexOf(trigger) === -1 && this.triggers.push(trigger);
        });
    };

    unbindTriggers = (triggers) => {
        triggers.forEach(trigger => {
            let i = this.triggers.indexOf(trigger);

            i !== -1 && this.triggers.splice(i, 1);
        });
    };

    render() {
        const {
                  tagName, className,
                  opened: openedProp, removeOnHide, triggers, disabled,

                  ...props
              }        = this.props,
              {opened} = this.state;

        if (!opened && removeOnHide) { return null; }

        let contentClassNames = "EzDropdown-content" + (className ? " " + className : "");
        opened && (contentClassNames += " EzDropdown-opened");

        return React.createElement(
                tagName,
                {
                    ...props,
                    className: contentClassNames,
                    ref:       (ref) => {this.contentElement = ref;},
                },
        );
    }
}
