import { afterEach, describe, expect, it, vi } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime";
import DropZone from "@app/components/Menu/DropZone.vue";
import { mockCategory, mockMenu, mockMenuItem } from "@test/mocks";
import { addParents } from "@app/utils/recursiveSearches";

describe("DropZone", async () => {
  let component: VueWrapper;

  const { mockState, changeMenuState } = await vi.hoisted(async () =>
    (await import("@test/testUtils")).mockMenuState()
  );

  mockNuxtImport("useState", () => mockState);

  async function mountComponent(props?: {
    forMenuElement?: categoryType | itemType | undefined;
    canShow?: boolean;
    listGuard?: boolean | "left" | "right";
    small?: boolean;
    vertical?: boolean;
  }) {
    component = await mountSuspended(DropZone, {
      props,
    });
  }

  it("should create", async () => {
    await mountComponent();

    expect(component.exists()).toBe(true);
  });

  it("should display an element if menu is not read-only", async () => {
    changeMenuState({ newState: { isMenuEditable: true } });
    await mountComponent();

    expect(component.find("div").exists()).toBe(true);
  });

  it("should not display anything if menu is read-only", async () => {
    changeMenuState({ newState: { isMenuEditable: false } });
    await mountComponent();

    expect(component.find("div").exists()).toBe(false);
  });

  it("should change classes if an item is being dragged", async () => {
    changeMenuState({ newState: { draggedItem: mockMenuItem } });
    await mountComponent();

    expect(component.get("div").classes()).toContain("active");
  });

  it("should change classes if an item is being dragged over component", async () => {
    changeMenuState({ newState: { draggedItem: mockMenuItem } });
    await mountComponent();

    component.trigger("dragover");
    await component.vm.$nextTick();

    expect(component.get("div").classes()).toContain("drag-highlight");
  });

  it("should change classes if an item is being dragged away from component", async () => {
    changeMenuState({ newState: { draggedItem: mockMenuItem } });
    await mountComponent();

    component.trigger("dragleave");
    await component.vm.$nextTick();

    expect(component.get("div").classes()).not.toContain("drag-highlight");
  });

  describe("drop", () => {
    function generateMockMenu() {
      return addParents(structuredClone(mockMenu), null) as categoryType[];
    }

    it("should insert dragged item before target item if a menu item is dropped onto component", async () => {
      const localMockMenu = generateMockMenu();
      const expectedMenu = generateMockMenu();
      const localMockDraggedItem = structuredClone(mockMenuItem);
      const dropZoneItemParent = localMockMenu[0].children[0] as categoryType;
      const dropZoneItem = dropZoneItemParent.children[0];
      changeMenuState({
        newState: {
          draggedItem: localMockDraggedItem,
          menuItems: localMockMenu,
        },
      });
      await mountComponent({ forMenuElement: dropZoneItem });

      component.trigger("dragover");
      await component.vm.$nextTick();
      component.trigger("drop");
      await component.vm.$nextTick();

      const insertedItem = dropZoneItemParent.children.shift();
      expect(insertedItem).toBe(localMockDraggedItem);
      expect(localMockMenu).toEqual(expectedMenu);
    });

    it("should insert dragged item into target category if a menu item is dropped onto component", async () => {
      const localMockMenu = generateMockMenu();
      const expectedMenu = generateMockMenu();
      const localMockDraggedItem = structuredClone(mockMenuItem);
      const dropZoneItem = localMockMenu[0].children[0] as categoryType;
      changeMenuState({
        newState: {
          draggedItem: localMockDraggedItem,
          menuItems: localMockMenu,
        },
      });
      await mountComponent({ forMenuElement: dropZoneItem, listGuard: true });

      component.trigger("dragover");
      await component.vm.$nextTick();
      component.trigger("drop");
      await component.vm.$nextTick();

      const insertedItem = dropZoneItem.children.pop();
      expect(insertedItem).toBe(localMockDraggedItem);
      expect(localMockMenu).toEqual(expectedMenu);
    });

    it("should insert dragged item into end of menu if a menu item is dropped onto component", async () => {
      const localMockMenu = generateMockMenu();
      const mockDraggedItem = mockCategory;
      changeMenuState({
        newState: { draggedItem: mockDraggedItem, menuItems: localMockMenu },
      });
      await mountComponent({ listGuard: "left" });

      component.trigger("dragover");
      await component.vm.$nextTick();
      component.trigger("drop");
      await component.vm.$nextTick();

      const insertedItem = localMockMenu.pop();
      expect(insertedItem).toBe(mockDraggedItem);
    });
  });

  afterEach(() => {
    component?.unmount();
  });
});
