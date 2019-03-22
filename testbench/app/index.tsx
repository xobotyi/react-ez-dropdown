import * as React from "react";
import * as ReactDom from "react-dom";
import DropdownContent from "../../src/DropdownContent";

class App extends React.Component {
  public render(): React.ReactNode {
    return <DropdownContent opened closeOnEscKeypress />;
  }
}

ReactDom.render(<App />, document.getElementById("AppRoot"));
