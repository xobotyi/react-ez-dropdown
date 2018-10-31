export DropdownContent from "./DropdownContent";
export DropdownTrigger from "./DropdownTrigger";

import React from "react";
import DropdownContent from "./DropdownContent";
import DropdownTrigger from "./DropdownTrigger";

export class Dropdown extends React.Component {
    static displayName = "Dropdown";

    render() {
        const boundTriggers = [],
            boundDropdowns = [];

        return React.Children.map(this.props.children, child => {
            let clonedChild;

            if (child.type === DropdownTrigger) {
                clonedChild = React.cloneElement(child, {
                    dropdowns: boundDropdowns,
                    ref: ref => {
                        if (!ref) {
                            return;
                        }

                        ref.bindDropdowns(boundDropdowns);
                        boundDropdowns.forEach(dropdown => dropdown && dropdown.bindTriggers([ref]));
                        boundTriggers.push(ref);

                        typeof child.ref === "function" && child.ref(ref);
                    },
                });
            } else if (child.type === DropdownContent) {
                clonedChild = React.cloneElement(child, {
                    triggers: boundTriggers,
                    ref: ref => {
                        if (!ref) {
                            return;
                        }

                        ref.bindTriggers(boundTriggers);
                        boundTriggers.forEach(trigger => trigger && trigger.bindDropdowns([ref]));
                        boundDropdowns.push(ref);

                        typeof child.ref === "function" && child.ref(ref);
                    },
                });
            }

            return clonedChild || child;
        });
    }
}
