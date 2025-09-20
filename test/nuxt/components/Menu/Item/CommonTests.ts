import { describe, expect, it } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import { mockMenuItem, mockReactiveMenuState } from "@test/mocks";
import { changeMenuStateType, getMockClone } from "@test/testUtils";

export const commonMenuItemTests = (
  menuItem: () => VueWrapper,
  mountComponent: (props: any) => Promise<void>,
  changeMenuState: changeMenuStateType
) =>
  describe("Common Tests", async () => {
    it("should display a DropZone component that's hidden by default", async () => {
      await mountComponent({ menuItem: mockMenuItem });

      const dropZone = menuItem().findComponent({ name: "MenuDropZone" });
      expect(dropZone.exists()).toBe(true);
      expect(dropZone.props()["canShow"]).toBe(false);
    });

    describe("menu is editable", () => {
      it("should be focusable", async () => {
        await mountComponent({ menuItem: mockMenuItem });

        expect(menuItem().get(".item-container").attributes()["tabindex"]).toBe(
          "0"
        );
      });

      it("should display a visible DropZone component if a different item is being dragged", async () => {
        changeMenuState({
          newState: { draggedItem: { ...mockMenuItem, id: "differentID" } },
        });
        await mountComponent({ menuItem: mockMenuItem });

        expect(
          menuItem().getComponent({ name: "MenuDropZone" }).props()["canShow"]
        ).toBe(true);
      });

      it("should not display a visible DropZone component if this item is being dragged", async () => {
        changeMenuState({
          newState: { draggedItem: mockMenuItem },
        });
        await mountComponent({ menuItem: mockMenuItem });

        expect(
          menuItem().getComponent({ name: "MenuDropZone" }).props()["canShow"]
        ).toBe(false);
      });

      it("should display edit buttons if not in edit mode and user hovers over with mouse", async () => {
        await mountComponent({ menuItem: mockMenuItem });
        expect(
          menuItem().findComponent({ name: "MenuEditButtons" }).exists()
        ).toBe(false);

        menuItem().get(".item-container").trigger("mouseover");
        await menuItem().vm.$nextTick();

        expect(
          menuItem().findComponent({ name: "MenuEditButtons" }).exists()
        ).toBe(true);
      });

      it("should display edit buttons if not in edit mode and in focus", async () => {
        await mountComponent({ menuItem: mockMenuItem });
        expect(
          menuItem().findComponent({ name: "MenuEditButtons" }).exists()
        ).toBe(false);

        menuItem().get(".item-container").trigger("focusin");
        await menuItem().vm.$nextTick();

        expect(
          menuItem().findComponent({ name: "MenuEditButtons" }).exists()
        ).toBe(true);
      });

      it("should be draggable if not in edit mode", async () => {
        await mountComponent({
          menuItem: { ...mockMenuItem, editMode: false },
        });

        expect(
          menuItem().get(".item-container").attributes()["draggable"]
        ).toBe("true");
      });

      it("should not be draggable if in edit mode", async () => {
        await mountComponent({ menuItem: { ...mockMenuItem, editMode: true } });

        expect(
          menuItem().get(".item-container").attributes()["draggable"]
        ).toBe("false");
      });

      it("should enter edit mode if component is double clicked", async () => {
        const localMockMenuItem = getMockClone(mockMenuItem);
        await mountComponent({ menuItem: localMockMenuItem });

        menuItem().get(".item-container").trigger("dblclick");
        await menuItem().vm.$nextTick();

        expect(localMockMenuItem.editMode).toBe(true);
      });

      it("should enter edit mode if Enter key is pressed", async () => {
        const localMockMenuItem = getMockClone(mockMenuItem);
        await mountComponent({ menuItem: localMockMenuItem });

        menuItem().get(".item-container").trigger("keypress", { key: "enter" });
        await menuItem().vm.$nextTick();

        expect(localMockMenuItem.editMode).toBe(true);
      });

      it("should leave edit mode if input looses focus", async () => {
        const localMockMenuItem = getMockClone(mockMenuItem, {
          editMode: true,
        });
        await mountComponent({ menuItem: localMockMenuItem });

        menuItem().get("input").trigger("blur");
        await menuItem().vm.$nextTick();

        expect(localMockMenuItem.editMode).toBe(false);
      });

      it("should save item to shared selectedItem variable if component is focused", async () => {
        const localMenuState = changeMenuState(
          { newState: mockReactiveMenuState },
          2
        );
        await mountComponent({ menuItem: mockMenuItem });

        menuItem().get(".item-container").trigger("focusin");
        await menuItem().vm.$nextTick();

        expect(localMenuState.selectedItem).toBe(mockMenuItem);
      });

      it("should save item to shared draggedItem variable if component is being dragged", async () => {
        const localMenuState = changeMenuState(
          { newState: mockReactiveMenuState },
          2
        );
        await mountComponent({ menuItem: mockMenuItem });

        menuItem().get(".item-container").trigger("dragstart");
        await menuItem().vm.$nextTick();

        expect(localMenuState.draggedItem).toBe(mockMenuItem);
      });
    });

    describe("menu is read-only", () => {
      it("should not enter edit mode if element is double clicked but menu is read-only", async () => {
        changeMenuState({ newState: { isMenuEditable: false } }, 2);
        await mountComponent({ menuItem: mockMenuItem });

        menuItem().get(".item-container").trigger("dblclick");
        await menuItem().vm.$nextTick();

        expect(mockMenuItem.editMode).toBe(false);
      });

      it("should not be focusable if menu is read-only", async () => {
        changeMenuState({ newState: { isMenuEditable: false } }, 2);
        await mountComponent({ menuItem: mockMenuItem });

        expect(menuItem().get(".item-container").attributes()["tabindex"]).toBe(
          undefined
        );
      });

      it("should not be draggable if menu is read-only", async () => {
        changeMenuState({ newState: { isMenuEditable: false } }, 2);
        await mountComponent({ menuItem: mockMenuItem });

        expect(
          menuItem().get(".item-container").attributes()["draggable"]
        ).toBe("false");
      });
    });
  });
