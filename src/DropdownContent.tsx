import * as React from "react";
import * as PropTypes from "prop-types";
import DropdownTrigger from "./DropdownTrigger";

type DropdownContentProps = React.HTMLProps<HTMLDivElement> & {
  elementRef?: (element: HTMLDivElement | null) => void;

  triggers?: DropdownTrigger[];

  onShow?: () => void;
  onHide?: () => void;

  opened?: boolean;
  openOnInit?: boolean;
  removeWhenHidden?: boolean;
  closeOnOutsideClick?: boolean;
  closeOnEscKeypress?: boolean;
};

type DropdownContentState = {
  opened: boolean;
};

export const isModifiedEvent = (
  event:
    | KeyboardEvent
    | MouseEvent
    | TouchEvent
    | React.MouseEvent
    | React.TouchEvent
): boolean => {
  return Boolean(
    event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
  );
};

export default class DropdownContent extends React.Component<
  DropdownContentProps,
  DropdownContentState
> {
  public element: HTMLDivElement | null;

  private triggers: DropdownTrigger[] = [];

  static propTypes = {
    elementRef: PropTypes.func,

    triggers: PropTypes.array,

    onShow: PropTypes.func,
    onHide: PropTypes.func,

    opened: PropTypes.bool,
    openOnInit: PropTypes.bool,
    removeWhenHidden: PropTypes.bool,
    closeOnOutsideClick: PropTypes.bool,
    closeOnEscKeypress: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.state = {
      opened: this.props.openOnInit || this.props.opened || false
    };

    if (this.state.opened) {
      this.bindBodyEvents();
    }

    if (this.props.triggers) {
      this.triggers = this.props.triggers.slice();
      this.notifyTriggersOpenesState();
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

    if (prevState.opened !== this.state.opened) {
      this.notifyTriggersOpenesState();
    }
  }

  private notifyTriggersOpenesState = () => {
    this.triggers.forEach(trigger =>
      trigger.setTargetOpened(this.state.opened)
    );
  };

  public bindTrigger = (trigger: DropdownTrigger): this => {
    let idx = this.triggers.indexOf(trigger);

    if (idx === -1) {
      this.triggers.push(trigger);
    }

    return this;
  };

  public unbindTrigger = (trigger: DropdownTrigger): this => {
    let idx = this.triggers.indexOf(trigger);

    if (idx >= 0) {
      this.triggers.splice(idx, 1);
    }

    return this;
  };

  public componentWillUnmount(): void {
    this.unbindBodyEvents();

    this.triggers.forEach((trigger: DropdownTrigger) => {
      trigger.unbindDropdown(this);
    });
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
      triggers,

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
      (this.props.className ? " " + this.props.className : "") +
      (this.state.opened ? " opened" : " closed");

    return <div {...props} ref={this.ref} />;
  }
}
