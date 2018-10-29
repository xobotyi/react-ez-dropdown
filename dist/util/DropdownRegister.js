"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDropdownRegister = createDropdownRegister;
exports.default = void 0;

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
   * @property {function} open
   * @property {function} close
   * @property {DropdownContentProperties} props
   * @property {DropdownContentState} state
   */

  /**
   * @type {DropdownContent[]}
   */
  var registeredDropdowns = [];
  /**
   * @type {DropdownContent[]}
   */

  var openedDropdowns = [];
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
   * @return {DropdownContent[]}
   */


  this.getOpened = function () {
    return openedDropdowns.concat();
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
      registeredDropdowns.splice(index, 1);

      _this.unsetOpened(dropdown);
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
    if (openedDropdowns[openedDropdowns.length - 1] !== dropdown) {
      for (var i = openedDropdowns.length - 1; i >= 0; i--) {
        if (openedDropdowns[i].contentElement.contains(dropdown.contentElement)) {
          break;
        }

        openedDropdowns[i].close(true);
      }

      openedDropdowns.push(dropdown);
      dropdown && dropdown.open(true);
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
    var dropdownPos = openedDropdowns.indexOf(dropdown);

    if (dropdownPos > -1) {
      for (var i = openedDropdowns.length - 1; i >= dropdownPos; i--) {
        openedDropdowns[i].close(true);
        openedDropdowns.splice(i, 1);
      }
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