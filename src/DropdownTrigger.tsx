import * as React from "react";
import * as PropTypes from "prop-types";
import DropdownContent, { isModifiedEvent } from "./DropdownContent";

type DropdownTriggerProps = React.HTMLProps<HTMLDivElement> & {
  onClick?: (evt: React.MouseEvent) => void;

  triggerOnModifiedClick?: boolean;
  disabled?: boolean;
};

export default class DropdownTrigger extends React.Component<
  DropdownTriggerProps,
  {}
> {
  private dropdowns: DropdownContent[] = [];

  static propTypes = {
    triggerOnModifiedClick: PropTypes.bool,

    disabled: PropTypes.bool,

    onClick: PropTypes.func
  };

  public componentWillUnmount(): void {
    this.dropdowns.forEach((dropdown: DropdownContent) => {
      dropdown.unbindTrigger(this);
    });
  }

  public bindDropdown = (dropdown: DropdownContent): this => {
    let idx = this.dropdowns.indexOf(dropdown);

    if (idx === -1) {
      this.dropdowns.push(dropdown);
    }

    return this;
  };

  public unbindDropdown = (dropdown: DropdownContent): this => {
    let idx = this.dropdowns.indexOf(dropdown);

    if (idx >= 0) {
      this.dropdowns.splice(idx, 1);
    }

    return this;
  };

  private handleClick = (evt: React.MouseEvent) => {
    this.props.onClick && this.props.onClick(evt);

    if (!this.props.triggerOnModifiedClick && isModifiedEvent(evt)) {
      return;
    }
  };

  public render(): React.ReactElement<any> {
    const {
      triggerOnModifiedClick,

      onClick,

      disabled,

      ...props
    } = this.props;

    props.className =
      "EzDropdown-Trigger" +
      (this.props.className && " " + this.props.className) +
      (disabled && " disabled");

    return <div {...props} onClick={this.handleClick} />;
  }
}
