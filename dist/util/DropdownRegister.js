"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDropdownRegister = createDropdownRegister;
exports.default = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function DropdownRegister() {
  var _this = this;

  /**
   * @typedef {Object} DropdownContentProperties
   * @property {boolean} isOpened
   * @property {boolean} removeOnHide
   * @property {Array} triggers
   */

  /**
   * @typedef {Object} DropdownContentState
   * @property {boolean} isOpened
   * @property {Array} triggers
   */

  /**
   * @typedef {Object} DropdownContent
   * @property {function} setState
   * @property {DropdownContentProperties} props
   * @property {DropdownContentState} state
   */

  /**
   * @type {DropdownContent[]}
   */
  var registeredDropdowns = [];
  /**
   * @type {null|DropdownContent}
   */

  var openedDropdown = null;
  /**
   * Return list of registered dropdowns.
   *
   * @return {DropdownContent[]}
   */

  this.getRegistered = function () {
    return registeredDropdowns.concat();
  };
  /**
   * Return opened dropdown.
   *
   * @return {DropdownContent}
   */


  this.getOpened = function () {
    return openedDropdown;
  };
  /**
   * Add instance to register if it not presented there.
   *
   * @param {DropdownContent} dropdown Dropdown instance
   * @return {number} count of registered dropdowns
   */


  this.registerDropdown = function (dropdown) {
    if (registeredDropdowns.indexOf(dropdown) === -1) {
      registeredDropdowns.push(dropdown);
    }

    return registeredDropdowns.length;
  };
  /**
   * Remove an instance from register.
   *
   * @param {DropdownContent} dropdown Dropdown instance
   * @return {number} count of registered dropdowns left
   */


  this.unregisterDropdown = function (dropdown) {
    var index = registeredDropdowns.indexOf(dropdown);

    if (index !== -1) {
      dropdown.setState(_objectSpread({}, openedDropdown.state, {
        opened: false
      }));
      registeredDropdowns.splice(index, 1);
      openedDropdown === dropdown && (openedDropdown = null);
    }

    return registeredDropdowns.length;
  };
  /**
   * Open given dropdown if it wasn't
   *
   * @param {DropdownContent|null} dropdown
   * @return {DropdownRegister}
   */


  this.setOpened = function (dropdown) {
    if (openedDropdown !== dropdown) {
      openedDropdown && openedDropdown.setState(_objectSpread({}, openedDropdown.state, {
        opened: false
      }));
      openedDropdown = dropdown;
      dropdown.setState(_objectSpread({}, dropdown.state, {
        opened: true
      }));
    }

    return _this;
  };
  /**
   * Close given dropdown if it was opened
   *
   * @param dropdown
   * @return {DropdownRegister}
   */


  this.unsetOpened = function (dropdown) {
    if (dropdown === openedDropdown) {
      openedDropdown = null;
      dropdown.setState(_objectSpread({}, dropdown.state, {
        opened: false
      }));
    }

    return _this;
  };
}
/**
 * @type {DropdownRegister}
 */


var commonInstance = new DropdownRegister();
var _default = commonInstance;
exports.default = _default;

function createDropdownRegister() {
  return new DropdownRegister();
}