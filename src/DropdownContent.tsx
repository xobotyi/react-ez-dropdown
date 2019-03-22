import * as React from "react";
import * as PropTypes from "prop-types";

type DropdownContentProps = React.HTMLProps<HTMLElement> & {
  elementRef?: (element: HTMLElement | null) => void;

  onShow?: () => void;
  onHide?: () => void;

  opened?: boolean;
  removeWhenHidden?: boolean;
  closeOnOutsideClick?: boolean;
  closeOnEscKeypress?: boolean;
};

type DropdownContentState = {
  opened: boolean;
};

export const isModifiedEvent = (
  event: KeyboardEvent | MouseEvent | TouchEvent
): boolean =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

export default class DropdownContent extends React.Component<
  DropdownContentProps,
  DropdownContentState
> {
  public element: HTMLElement | null;

  static propTypes = {
    elementRef: PropTypes.func,

    onShow: PropTypes.func,
    onHide: PropTypes.func,

    opened: PropTypes.bool,
    removeWhenHidden: PropTypes.bool,
    closeOnOutsideClick: PropTypes.bool,
    closeOnEscKeypress: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.state = {
      opened: this.props.opened || false
    };

    if (this.props.opened) {
      this.bindBodyEvents();
    }
  }

  public componentDidUpdate(
    prevProps: Readonly<DropdownContentProps>,
    prevState: Readonly<DropdownContentState>,
    snapshot?: any
  ): void {
    if (
      this.props.opened !== prevProps.opened &&
      this.props.opened !== this.state.opened
    ) {
      this.setState({ opened: !!this.props.opened });
    }

    if (
      this.props.closeOnOutsideClick !== prevProps.closeOnOutsideClick ||
      this.props.closeOnEscKeypress
    ) {
      this.unbindBodyEvents().bindBodyEvents();
    }
  }

  public componentWillUnmount(): void {
    this.unbindBodyEvents();
  }

  public open = () => {
    if (this.state.opened) {
      return;
    }

    this.setState({ opened: true });

    this.bindBodyEvents();
  };

  public bindBodyEvents = () => {
    if (this.props.closeOnOutsideClick) {
      document.body.addEventListener("click", this.handleBodyClick, {
        passive: true
      });
      document.body.addEventListener("touch", this.handleBodyClick, {
        passive: true
      });
    }

    if (this.props.closeOnEscKeypress) {
      document.body.addEventListener("keydown", this.handleBodyKeydown, {
        passive: true
      });
    }

    return this;
  };

  public close = () => {
    if (!this.state.opened) {
      return;
    }

    this.setState({ opened: false });

    this.unbindBodyEvents();
  };

  public unbindBodyEvents = () => {
    document.body.removeEventListener("click", this.handleBodyClick);
    document.body.removeEventListener("touch", this.handleBodyClick);
    document.body.removeEventListener("keydown", this.handleBodyKeydown);

    return this;
  };

  public toggle = (forced = null) => {
    forced === null
      ? this.state.opened
        ? this.close()
        : this.open()
      : forced
      ? this.open()
      : this.close();

    return this;
  };

  private handleBodyClick = (ev: MouseEvent | TouchEvent) => {
    if (
      isModifiedEvent(ev) ||
      !this.element ||
      ev.target === this.element ||
      this.element.contains(ev.target as Node)
    ) {
      return;
    }

    this.close();
  };

  private handleBodyKeydown = (ev: KeyboardEvent) => {
    if (isModifiedEvent(ev)) {
      return;
    }

    ev.key === "Escape" && this.close();
  };

  private ref = element => {
    this.element = element;
    this.props.elementRef && this.props.elementRef(element);
  };

  public render(): React.ReactElement<any> | false {
    const {
      onShow,
      onHide,

      opened,
      removeWhenHidden,
      closeOnOutsideClick,
      closeOnEscKeypress,

      ...props
    } = this.props;

    if (!this.state.opened && removeWhenHidden) {
      return false;
    }

    props.style = {
      ...this.props.style,
      ...(!this.state.opened && { display: "none" })
    };
    props.className =
      "EzDropdown-Content" +
      (this.props.className && " " + this.props.className) +
      (this.state.opened ? " opened" : " closed");

    return <div {...props} ref={this.ref} />;
  }
}
