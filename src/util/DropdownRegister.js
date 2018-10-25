function DropdownRegister() {
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
    const registeredDropdowns = [];

    /**
     * @type {null|DropdownContent}
     */
    let openedDropdown = null;

    /**
     * Return list of registered dropdowns.
     *
     * @return {DropdownContent[]}
     */
    this.getRegistered = () => {return [...registeredDropdowns];};

    /**
     * Return opened dropdown.
     *
     * @return {DropdownContent}
     */
    this.getOpened = () => {return openedDropdown;};

    /**
     * Add instance to register if it not presented there.
     *
     * @param {DropdownContent} dropdown Dropdown instance
     * @return {number} count of registered dropdowns
     */
    this.registerDropdown = (dropdown) => {
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
    this.unregisterDropdown = (dropdown) => {
        const index = registeredDropdowns.indexOf(dropdown);

        if (index !== -1) {
            registeredDropdowns.splice(index, 1);
            openedDropdown === dropdown && this.setOpened(null);
        }

        return registeredDropdowns.length;
    };

    /**
     * Open given dropdown if it wasn't
     *
     * @param {DropdownContent|null} dropdown
     * @return {DropdownRegister}
     */
    this.setOpened = (dropdown) => {
        if (openedDropdown !== dropdown) {
            openedDropdown && openedDropdown.setState({
                                                          ...openedDropdown.state,
                                                          opened: false,
                                                      });

            openedDropdown = dropdown;
            dropdown && dropdown.setState({
                                              ...dropdown.state,
                                              opened: true,
                                          });
        }

        return this;
    };

    /**
     * Close given dropdown if it was opened
     *
     * @param dropdown
     * @return {DropdownRegister}
     */
    this.unsetOpened = (dropdown) => {
        if (dropdown === openedDropdown) {
            openedDropdown = null;

            dropdown.setState({
                                  ...dropdown.state,
                                  opened: false,
                              });
        }

        return this;
    };
}

/**
 * @type {DropdownRegister}
 */
const commonInstance = new DropdownRegister();

export default commonInstance;

export function createDropdownRegister() {
    return new DropdownRegister();
}
