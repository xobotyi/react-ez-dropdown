function DropdownRegister() {
    const registeredDropdowns = [];
    const openedDropdowns = [];

    /**
     * Return list of registered dropdowns.
     *
     * @return {*[]}
     */
    this.getRegistered = () => {return [...registeredDropdowns];};

    /**
     * Return  list of opened dropdowns.
     *
     * @return {*[]}
     */
    this.getOpened = () => {return [...openedDropdowns];};

    /**
     * Add instance to register if it not presented there.
     *
     * @param dropdown Dropdown instance
     * @return {DropdownRegister}
     */
    this.registerDropdown = (dropdown) => {
        if (registeredDropdowns.indexOf(dropdown) === -1) {
            registeredDropdowns.push(dropdown);
        }

        return this;
    };

    /**
     * Remove an instance from register.
     *
     * @param dropdown Dropdown instance
     * @return {DropdownRegister}
     */
    this.unregisterDropdown = (dropdown) => {
        const index = registeredDropdowns.indexOf(dropdown);

        if (index !== -1) {
            registeredDropdowns.splice(index, 1);
        }

        return this;
    };

    this.markOpened = (dropdown) => {
        if (openedDropdowns.indexOf(dropdown) === -1) {
            openedDropdowns.push(dropdown);
        }

        return this;
    };

    this.unmarkOpened = (dropdown) => {
        const index = openedDropdowns.indexOf(dropdown);

        if (index !== -1) {
            openedDropdowns.splice(index, 1);
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
