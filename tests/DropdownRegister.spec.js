import expect           from "expect";
import DropdownRegister from "../src/util/DropdownRegister";

describe("DropdownRegister", () => {
    const dropdownInstance1 = {a: 1};
    const dropdownInstance2 = {a: 2};
    const dropdownInstance3 = {a: 3};

    it("should return array of register dropdowns on `.getRegistered()`", () => {
        expect(DropdownRegister.getRegistered()).toBeInstanceOf(Array);
    });
    it("should return array of opened dropdowns on `.getOpened()`", () => {
        expect(DropdownRegister.getOpened()).toBeInstanceOf(Array);
    });

    it("should register dropdown on `.registerDropdown()`", () => {
        DropdownRegister.registerDropdown(dropdownInstance1);

        expect(DropdownRegister.getRegistered().length).toBe(1);
    });
    it("should register dropdown as opened on `.markOpened()`", () => {
        DropdownRegister.markOpened(dropdownInstance1);

        expect(DropdownRegister.getRegistered().length).toBe(1);
    });

    it("should NOT register dropdown twice on `.registerDropdown()`", () => {
        DropdownRegister.registerDropdown(dropdownInstance1);

        expect(DropdownRegister.getRegistered().length).toBe(1);
    });
    it("should NOT register dropdown as opened on `.markOpened()`", () => {
        DropdownRegister.markOpened(dropdownInstance1);

        expect(DropdownRegister.getRegistered().length).toBe(1);
    });

    it("should unregister registered dropdown on `.unregisterDropdown()`", () => {
        DropdownRegister.unregisterDropdown(dropdownInstance1);

        expect(DropdownRegister.getRegistered().length).toBe(0);
    });
    it("should unregister marked opened dropdown on `.unmarkOpened()`", () => {
        DropdownRegister.unmarkOpened(dropdownInstance1);

        expect(DropdownRegister.getRegistered().length).toBe(0);
    });
});
