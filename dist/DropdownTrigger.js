"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DropdownTrigger =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DropdownTrigger, _React$Component);

  function DropdownTrigger(props) {
    var _this;

    _classCallCheck(this, DropdownTrigger);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DropdownTrigger).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "bindDropdowns", function (dropdowns) {
      dropdowns.forEach(function (dropdown) {
        _this.dropdowns.indexOf(dropdown) === -1 && _this.dropdowns.push(dropdown);
      });
      return _assertThisInitialized(_assertThisInitialized(_this));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "unbindDropdowns", function (dropdowns) {
      dropdowns.forEach(function (dropdown) {
        var i = _this.dropdowns.indexOf(dropdown);

        i !== -1 && _this.dropdowns.splice(i, 1);
      });
      return _assertThisInitialized(_assertThisInitialized(_this));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClick", function () {
      _this.dropdowns.forEach(function (dropdown) {
        return dropdown.toggle();
      });

      return true;
    });

    _this.dropdowns = [];
    return _this;
  }

  _createClass(DropdownTrigger, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.dropdowns && this.bindDropdowns(this.props.dropdowns);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this2 = this;

      this.dropdowns.concat([]).forEach(function (dropdown) {
        dropdown.unbindTriggers([_this2]);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          tagName = _this$props.tagName,
          className = _this$props.className,
          dropdowns = _this$props.dropdowns,
          disabled = _this$props.disabled,
          props = _objectWithoutProperties(_this$props, ["tagName", "className", "dropdowns", "disabled"]);

      var triggerClassNames = "EzDropdown-trigger" + (className ? " " + className : "");
      return _react.default.createElement(tagName, _objectSpread({}, props, {
        className: triggerClassNames,
        ref: function ref(_ref) {
          _this3.triggerElement = _ref;
        },
        onClick: this.handleClick
      }));
    }
  }]);

  return DropdownTrigger;
}(_react.default.Component);

exports.default = DropdownTrigger;

_defineProperty(DropdownTrigger, "displayName", "DropdownTrigger");

_defineProperty(DropdownTrigger, "propTypes", {
  className: _propTypes.default.string,
  tagName: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  dropdowns: _propTypes.default.arrayOf(_propTypes.default.element)
});

_defineProperty(DropdownTrigger, "defaultProps", {
  tagName: "div",
  disabled: false
});