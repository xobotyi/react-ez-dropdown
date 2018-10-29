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
     * @property {function} open
     * @property {function} close
     * @property {DropdownContentProperties} props
     * @property {DropdownContentState} state
     */

    /**
     * @type {DropdownContent[]}
     */
    const registeredDropdowns = [];

    /**
     * @type {DropdownContent[]}
     */
    let openedDropdowns = [];

    /**
     * Return list of registered dropdowns.
     *
     * @return {DropdownContent[]}
     */
    this.getRegistered = () => {
        return [...registeredDropdowns];
    };

    /**
     * Return opened dropdown.
     *
     * @return {DropdownContent[]}
     */
    this.getOpened = () => {
        return [...openedDropdowns];
    };

    /**
     * Add instance to register if it not presented there.
     *
     * @param {DropdownContent} dropdown Dropdown instance
     * @return {number} count of registered dropdowns
     */
    this.registerDropdown = dropdown => {
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
    this.unregisterDropdown = dropdown => {
        const index = registeredDropdowns.indexOf(dropdown);

        if (index !== -1) {
            registeredDropdowns.splice(index, 1);
            this.unsetOpened(dropdown);
        }

        return registeredDropdowns.length;
    };

    /**
     * Open given dropdown if it wasn't
     *
     * @param {DropdownContent|null} dropdown
     * @return {DropdownRegister}
     */
    this.setOpened = dropdown => {
        if (openedDropdowns[openedDropdowns.length - 1] !== dropdown) {
            for (let i = openedDropdowns.length - 1; i >= 0; i--) {
                if (openedDropdowns[i].contentElement.contains(dropdown.contentElement)) {
                    break;
                }

                openedDropdowns[i].close(true);
            }

            openedDropdowns.push(dropdown);
            dropdown && dropdown.open(true);
        }

        return this;
    };

    /**
     * Close given dropdown if it was opened
     *
     * @param dropdown
     * @return {DropdownRegister}
     */
    this.unsetOpened = dropdown => {
        let dropdownPos = openedDropdowns.indexOf(dropdown);

        if (dropdownPos > -1) {
            for (let i = openedDropdowns.length - 1; i >= dropdownPos; i--) {
                openedDropdowns[i].close(true);
                openedDropdowns.splice(i, 1);
            }
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
