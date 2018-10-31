import React from "react";
import {Dropdown, DropdownContent, DropdownTrigger} from "react-ez-dropdown";

export default class Head extends React.Component {
    render() {
        return (
            <div id="AppBody">
                <div className="packageDescription" />

                <h2>Examples</h2>

                <Dropdown>
                    <DropdownTrigger ref={ref => console.log(ref)}>Open dropdown</DropdownTrigger>
                    <DropdownContent>
                        <Dropdown>
                            <DropdownTrigger>Open dropdown</DropdownTrigger>
                            <DropdownContent>Heya!</DropdownContent>
                        </Dropdown>
                    </DropdownContent>
                </Dropdown>
            </div>
        );
    }
}
