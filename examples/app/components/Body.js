import React                                          from "react";
import { Dropdown, DropdownContent, DropdownTrigger } from "react-ez-dropdown";

export default class Head extends React.Component
{
    render() {
        return <div id="AppBody">
            <div className="packageDescription">
            </div>

            <h2>Examples</h2>

            <Dropdown>
                <DropdownTrigger>Toggle dropdown</DropdownTrigger>
                <DropdownTrigger>Toggle dropdown 2</DropdownTrigger>
                <DropdownContent>helloWorld</DropdownContent>
            </Dropdown>
        </div>;
    }
}
