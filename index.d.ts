import {Component, CSSProperties, SFC} from "react";


export interface DropdownTriggerProps {
    className?: string;
    tagName?: string;
    disabled?: boolean;
    dropdowns?: Array<DropdownContent>;
}

export class DropdownTrigger extends Component<DropdownTriggerProps> {
    bindDropdowns(): DropdownTrigger;

    unbindDropdowns(): DropdownTrigger;

    handleClick(): boolean;
}


export interface DropdownContentProps {
    className?: string;
    tagName?: string;
    onShow?: void;
    onHide?: void;
    opened?: boolean;
    removeOnHide?: boolean;
    triggers?: Array<DropdownTrigger>;
}

export class DropdownContent extends Component<DropdownContentProps> {
    public markTriggers(): DropdownContent;

    public open(): DropdownContent;

    public close(): DropdownContent;

    public toggle(): DropdownContent;

    public bindTriggers(): DropdownContent;

    public unbindTriggers(): DropdownContent;
}


export class Dropdown extends Component {
}
