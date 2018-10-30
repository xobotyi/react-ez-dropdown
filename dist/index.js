"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "DropdownContent", {
  enumerable: true,
  get: function get() {
    return _DropdownContent2.default;
  }
});
Object.defineProperty(exports, "DropdownTrigger", {
  enumerable: true,
  get: function get() {
    return _DropdownTrigger2.default;
  }
});
exports.Dropdown = void 0;

var _DropdownContent2 = _interopRequireDefault(require("./DropdownContent"));

var _DropdownTrigger2 = _interopRequireDefault(require("./DropdownTrigger"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Dropdown =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Dropdown, _React$Component);

  function Dropdown() {
    _classCallCheck(this, Dropdown);

    return _possibleConstructorReturn(this, _getPrototypeOf(Dropdown).apply(this, arguments));
  }

  _createClass(Dropdown, [{
    key: "render",
    value: function render() {
      var boundTriggers = [],
          boundDropdowns = [];
      return _react.default.Children.map(this.props.children, function (child) {
        if (child.type === _DropdownTrigger2.default) {
          child = _react.default.cloneElement(child, {
            dropdowns: boundDropdowns,
            ref: function ref(_ref) {
              if (!_ref) {
                return;
              }

              _ref.bindDropdowns(boundDropdowns);

              boundDropdowns.forEach(function (dropdown) {
                return dropdown && dropdown.bindTriggers([_ref]);
              });
              boundTriggers.push(_ref);
            }
          });
        } else if (child.type === _DropdownContent2.default) {
          child = _react.default.cloneElement(child, {
            triggers: boundTriggers,
            ref: function ref(_ref2) {
              if (!_ref2) {
                return;
              }

              _ref2.bindTriggers(boundTriggers);

              boundTriggers.forEach(function (trigger) {
                return trigger && trigger.bindDropdowns([_ref2]);
              });
              boundDropdowns.push(_ref2);
            }
          });
        }

        return child;
      });
    }
  }]);

  return Dropdown;
}(_react.default.Component);

exports.Dropdown = Dropdown;

_defineProperty(Dropdown, "displayName", "Dropdown");