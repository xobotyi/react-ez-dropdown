import * as ReactDOM from "react-dom";
import * as React from "react";
import DropdownContent from "../src/DropdownContent";

describe("DropdownContent", () => {
  let node: HTMLDivElement;
  beforeAll(() => {
    node = document.createElement("div");
    document.body.appendChild(node);
  });
  afterAll(() => {
    ReactDOM.unmountComponentAtNode(node);
    document.body.removeChild(node);
  });

  it("should render a div", done => {
    ReactDOM.render(<DropdownContent />, node, function() {
      expect(this.element.tagName).toBe("DIV");
      done();
    });
  });
});
