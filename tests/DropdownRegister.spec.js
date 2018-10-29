import expect from "expect";
import DropdownRegister from "../src/util/DropdownRegister";

describe("DropdownRegister", () => {
    const dropdownInstance1 = {a: 1, setState: () => {}, open: () => {}, close: () => {}};

    it("should return array of register dropdowns on `.getRegistered()`", () => {
        expect(DropdownRegister.getRegistered()).toBeInstanceOf(Array);
    });
    it("should return opened dropdown on `.getOpened()`", () => {
        expect(DropdownRegister.getOpened().length).toBe(0);
    });

    it("should register dropdown on `.registerDropdown()`", () => {
        DropdownRegister.registerDropdown(dropdownInstance1);

        expect(DropdownRegister.getRegistered().length).toBe(1);
    });
    it("should register dropdown as opened on `.setOpened()`", () => {
        DropdownRegister.setOpened(dropdownInstance1);

        expect(DropdownRegister.getOpened()[0]).toBe(dropdownInstance1);
    });

    it("should NOT register dropdown twice on `.registerDropdown()`", () => {
        DropdownRegister.registerDropdown(dropdownInstance1);

        expect(DropdownRegister.getRegistered().length).toBe(1);
    });

    it("should unregister registered dropdown on `.unregisterDropdown()`", () => {
        DropdownRegister.unregisterDropdown(dropdownInstance1);

        expect(DropdownRegister.getRegistered().length).toBe(0);
    });
    it("should unregister marked opened dropdown on `.unsetOpened()`", () => {
        DropdownRegister.unsetOpened(dropdownInstance1);

        expect(DropdownRegister.getOpened().length).toBe(0);
    });
});
