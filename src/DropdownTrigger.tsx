import * as React from "react";
import * as PropTypes from "prop-types";
import DropdownContent, { isModifiedEvent } from "./DropdownContent";

type DropdownTriggerProps = React.HTMLProps<HTMLDivElement> & {
  onClick?: (evt: React.MouseEvent) => void;

  dropdowns?: DropdownContent[];

  elementRef?: (element: HTMLDivElement | null) => void;

  triggerOnModifiedClick?: boolean;
  disabled?: boolean;
};

type DropdownTriggerState = {
  targetOpened: boolean;
};

export default class DropdownTrigger extends React.Component<
  DropdownTriggerProps,
  DropdownTriggerState
> {
  private dropdowns: DropdownContent[] = [];

  public element: HTMLDivElement | null;

  static propTypes = {
    triggerOnModifiedClick: PropTypes.bool,

    disabled: PropTypes.bool,

    dropdowns: PropTypes.array,

    onClick: PropTypes.func,
    elementRef: PropTypes.func
  };

  constructor(props) {
    super(props);

    if (this.props.dropdowns) {
      this.dropdowns = this.props.dropdowns.slice();
    }

    this.state = {
      targetOpened: false
    };
  }

  public componentWillUnmount(): void {
    this.dropdowns.forEach((dropdown: DropdownContent) => {
      dropdown.unbindTrigger(this);
    });
  }

  public bindDropdown = (dropdown: DropdownContent): this => {
    if (!dropdown) {
      return this;
    }

    let idx = this.dropdowns.indexOf(dropdown);

    if (idx === -1) {
      this.dropdowns.push(dropdown);
      dropdown.bindTrigger(this);
    }

    return this;
  };

  public unbindDropdown = (dropdown: DropdownContent): this => {
    let idx = this.dropdowns.indexOf(dropdown);

    if (idx >= 0) {
      this.dropdowns[idx].unbindTrigger(this);
      this.dropdowns.splice(idx, 1);
    }

    return this;
  };

  private handleClick = (evt: React.MouseEvent) => {
    this.props.onClick && this.props.onClick(evt);

    if (!this.props.triggerOnModifiedClick && isModifiedEvent(evt)) {
      return;
    }

    this.dropdowns.forEach(dropdown => {
      dropdown.toggle();
    });
  };

  public setTargetOpened = (isOpened: boolean = false): this => {
    this.setState({
      targetOpened: isOpened
    });

    return this;
  };

  private ref = (element: HTMLDivElement | null) => {
    this.element = element;
    this.props.elementRef && this.props.elementRef(element);
  };

  public render(): React.ReactElement<any> {
    const {
      onClick,

      dropdowns,

      elementRef,

      triggerOnModifiedClick,

      disabled,

      ...props
    } = this.props;

    props.className =
      "EzDropdown-Trigger" +
      (this.props.className ? " " + this.props.className : "") +
      (this.state.targetOpened ? " targetOpened" : "") +
      (disabled ? " disabled" : "");

    return <div {...props} onClick={this.handleClick} ref={this.ref} />;
  }
}
