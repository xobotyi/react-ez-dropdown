import * as React from "react";

export default class Dropdown extends React.Component {
  render(): React.ReactNode {
    return React.Children.map(this.props.children, child => {});
  }
}
