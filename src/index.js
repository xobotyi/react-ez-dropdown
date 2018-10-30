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
            if (child.type === DropdownTrigger) {
                child = React.cloneElement(child, {
                    dropdowns: boundDropdowns,
                    ref: ref => {
                        if (!ref) {
                            return;
                        }

                        ref.bindDropdowns(boundDropdowns);
                        boundDropdowns.forEach(dropdown => dropdown && dropdown.bindTriggers([ref]));
                        boundTriggers.push(ref);
                    },
                });
            } else if (child.type === DropdownContent) {
                child = React.cloneElement(child, {
                    triggers: boundTriggers,
                    ref: ref => {
                        if (!ref) {
                            return;
                        }

                        ref.bindTriggers(boundTriggers);
                        boundTriggers.forEach(trigger => trigger && trigger.bindDropdowns([ref]));
                        boundDropdowns.push(ref);
                    },
                });
            }

            return child;
        });
    }
}
