import * as React from "react";
import DropdownTrigger from "./DropdownTrigger";
import DropdownContent from "./DropdownContent";

export default class Dropdown extends React.Component {
  render(): React.ReactNode {
    const triggers: any[] = [];
    const dropdowns: any[] = [];

    React.Children.forEach(this.props.children, (child: any) => {
      if (!child) {
        return;
      }

      if (child.type === DropdownContent) {
        const prevRef = typeof child.ref === "function" ? child.ref : null;
        child.ref = ref => {
          prevRef && prevRef(ref);
          dropdowns.push(ref);
          triggers.forEach(trigger => trigger.bindDropdown(ref));
        };
      } else if (child.type === DropdownTrigger) {
        const prevRef = typeof child.ref === "function" ? child.ref : null;
        child.ref = ref => {
          prevRef && prevRef(ref);
          triggers.push(ref);
          dropdowns.forEach(dropdown => dropdown.bindTrigger(ref));
        };
      }
    });

    return this.props.children;
  }
}
