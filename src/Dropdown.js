import React           from "react";
import DropdownContent from "./DropdownContent";
import DropdownTrigger from "./DropdownTrigger";

export default class Dropdown extends React.Component
{
    static displayName = "Dropdown";

    render() {
        const boundTriggers  = [],
              boundDropdowns = [];

        return React.Children.map(this.props.children, (child) => {
            if (child.type === DropdownTrigger) {
                child = React.cloneElement(child,
                                           {
                                               dropdowns: boundDropdowns,
                                               ref:       (ref) => {
                                                   ref.bindDropdowns(boundDropdowns);
                                                   boundDropdowns.forEach(dropdown => dropdown.bindTriggers([ref]));
                                                   boundTriggers.push(ref);
                                               },
                                           });
            }
            else if (child.type === DropdownContent) {
                child = React.cloneElement(child,
                                           {
                                               triggers: boundTriggers,
                                               ref:      (ref) => {
                                                   ref.bindTriggers(boundTriggers);
                                                   boundTriggers.forEach(trigger => trigger.bindDropdowns([ref]));
                                                   boundDropdowns.push(ref);
                                               },
                                           });
            }

            return child;
        });
    }
}
