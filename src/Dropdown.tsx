import * as React from "react";
import DropdownTrigger from "./DropdownTrigger";
import DropdownContent from "./DropdownContent";

export default class Dropdown extends React.Component {
  render(): React.ReactNode {
    const triggers: any[] = [];
    const dropdown: any[] = [];

    const childrenArray: React.ReactNode[] = React.Children.toArray(
      this.props.children
    );

    for (let i = 0; i < childrenArray.length; i++) {
      if (!childrenArray[i]) {
        continue;
      }

      let child: any = childrenArray[i];

      if (child.type === DropdownTrigger) {
        triggers.push(child);
      } else if (child.type === DropdownContent) {
        dropdown.push(child);
      }
    }

    triggers.forEach((trigger: DropdownTrigger) => {
      dropdown.forEach((dropdown: DropdownContent) => {
        trigger.bindDropdown(dropdown);
        dropdown.bindTrigger(trigger);
      });
    });

    return this.props.children;
  }
}
