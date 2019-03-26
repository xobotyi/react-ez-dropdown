import * as React from "react";
import DropdownTrigger from "./DropdownTrigger";
import DropdownContent from "./DropdownContent";

export default class Dropdown extends React.Component {
  render(): React.ReactNode {
    const triggers: any[] = [];
    const dropdowns: any[] = [];

    return React.Children.map(this.props.children, (child: any) => {
      if (child) {
        if (child.type === DropdownContent) {
          const clonedChild = React.cloneElement(child, {
            ref: ref => {
              typeof child.ref === "function" && child.ref(ref);

              dropdowns.push(ref);
              triggers.forEach(trigger => trigger && trigger.bindDropdown(ref));
            }
          });

          return clonedChild || child;
        } else if (child.type === DropdownTrigger) {
          const clonedChild = React.cloneElement(child, {
            ref: ref => {
              typeof child.ref === "function" && child.ref(ref);
              triggers.push(ref);
              dropdowns.forEach(
                dropdown => dropdown && dropdown.bindTrigger(ref)
              );
            }
          });

          return clonedChild || child;
        }
      }

      return child;
    });
  }
}
