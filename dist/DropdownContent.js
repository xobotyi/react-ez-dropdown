"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DropdownContent =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DropdownContent, _React$Component);

  function DropdownContent(props) {
    var _this;

    _classCallCheck(this, DropdownContent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DropdownContent).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "markTriggers", function () {
      _this.triggers.length && _this.triggers.forEach(function (trigger) {
        return trigger && trigger.triggerElement.classList.toggle("EzDropdown-opened", _this.state.opened);
      });
      return _assertThisInitialized(_assertThisInitialized(_this));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "open", function () {
      _this.setState(_objectSpread({}, _this.state, {
        opened: true
      }));

      if (_this.props.closeOnOutsideClick) {
        document.body.addEventListener("click", _this.handleBodyClick, {
          passive: true
        });
        document.body.addEventListener("touch", _this.handleBodyClick, {
          passive: true
        });
      }

      _this.props.closeOnEsc && document.body.addEventListener("keydown", _this.handleBodyKeypress, {
        passive: true
      });
      return _assertThisInitialized(_assertThisInitialized(_this));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "close", function () {
      _this.setState(_objectSpread({}, _this.state, {
        opened: false
      }));

      document.body.removeEventListener("click", _this.handleBodyClick, {
        passive: true
      });
      document.body.removeEventListener("touch", _this.handleBodyClick, {
        passive: true
      });
      document.body.removeEventListener("keydown", _this.handleBodyKeypress, {
        passive: true
      });
      return _assertThisInitialized(_assertThisInitialized(_this));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "toggle", function () {
      var forced = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (forced === null) {
        _this.state.opened ? _this.close() : _this.open();
      } else {
        forced ? _this.open() : _this.close();
      }

      return _assertThisInitialized(_assertThisInitialized(_this));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleBodyClick", function (event) {
      // check if dropdown itself or its content has been clicked
      if (event.target === _this.contentElement || _this.contentElement.contains(event.target)) {
        return true;
      } // check if dropdown's trigger has been clicked


      if (_this.triggers.length && _this.triggers.some(function (trigger) {
        return event.target === trigger.triggerElement || trigger.triggerElement.contains(event.target);
      })) {
        return true;
      }

      _this.close();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleBodyKeypress", function (event) {
      event.which && event.which === 27 && _this.close();
      return true;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "bindTriggers", function (triggers) {
      triggers.forEach(function (trigger) {
        trigger && _this.triggers.indexOf(trigger) === -1 && _this.triggers.push(trigger);
      });
      return _assertThisInitialized(_assertThisInitialized(_this));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "unbindTriggers", function (triggers) {
      triggers.forEach(function (trigger) {
        var i = _this.triggers.indexOf(trigger);

        i !== -1 && _this.triggers.splice(i, 1);
      });
      return _assertThisInitialized(_assertThisInitialized(_this));
    });

    _this.triggers = [];
    _this.state = {
      opened: props.opened || false
    };
    return _this;
  }

  _createClass(DropdownContent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.triggers && this.bindTriggers(this.props.triggers);
      this.markTriggers();

      if (this.state.opened) {
        this.open();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this2 = this;

      this.triggers.concat([]).forEach(function (trigger) {
        return trigger.unbindDropdowns([_this2]);
      });
      document.body.removeEventListener("click", this.handleBodyClick, {
        passive: true
      });
      document.body.removeEventListener("touch", this.handleBodyClick, {
        passive: true
      });
      document.body.removeEventListener("keydown", this.handleBodyKeypress, {
        passive: true
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.markTriggers();
      this.state.opened ? this.props.onShow && this.props.onShow.call(this) : this.props.onHide && this.props.onHide.call(this);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          tagName = _this$props.tagName,
          className = _this$props.className,
          style = _this$props.style,
          openedProp = _this$props.opened,
          removeOnHide = _this$props.removeOnHide,
          closeOnEsc = _this$props.closeOnEsc,
          closeOnOutsideClick = _this$props.closeOnOutsideClick,
          triggers = _this$props.triggers,
          onShow = _this$props.onShow,
          onHide = _this$props.onHide,
          props = _objectWithoutProperties(_this$props, ["tagName", "className", "style", "opened", "removeOnHide", "closeOnEsc", "closeOnOutsideClick", "triggers", "onShow", "onHide"]),
          opened = this.state.opened;

      if (!opened && removeOnHide) {
        return null;
      }

      return _react.default.createElement(tagName, _objectSpread({}, props, {
        className: "EzDropdown-content" + (className ? " " + className : "") + (opened ? " EzDropdown-opened" : ""),
        style: _objectSpread({}, style, !removeOnHide && !opened && {
          display: "none"
        }),
        ref: function ref(_ref) {
          _this3.contentElement = _ref;
        }
      }));
    }
  }]);

  return DropdownContent;
}(_react.default.Component);

exports.default = DropdownContent;

_defineProperty(DropdownContent, "displayName", "DropdownContent");

_defineProperty(DropdownContent, "propTypes", {
  tagName: _propTypes.default.string,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  onShow: _propTypes.default.func,
  onHide: _propTypes.default.func,
  opened: _propTypes.default.bool,
  removeOnHide: _propTypes.default.bool,
  closeOnOutsideClick: _propTypes.default.bool,
  closeOnEsc: _propTypes.default.bool,
  triggers: _propTypes.default.arrayOf(_propTypes.default.element)
});

_defineProperty(DropdownContent, "defaultProps", {
  tagName: "div",
  opened: false,
  removeOnHide: false,
  closeOnOutsideClick: true,
  closeOnEsc: true
});