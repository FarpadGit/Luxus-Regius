import { afterEach, describe, expect, it, vi } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import MenuSectionCardList from "@app/components/Menu/Section/CardList.vue";
import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime";
import {
  mockCategory,
  mockCategoryWithItems,
  mockCategoryWithSubs,
  mockMenuItem,
} from "@test/mocks";
import { commonMenuItemTests } from "./CommonTests";

describe("MenuSectionCardList", async () => {
  let component: VueWrapper;

  const { mockState, changeMenuState } = await vi.hoisted(async () =>
    (await import("@test/testUtils")).mockMenuState()
  );

  mockNuxtImport("useState", () => mockState);

  async function mountComponent(props: {
    sectionHeading: categoryType;
    dropZoneDisabled?: boolean;
  }) {
    component = await mountSuspended(MenuSectionCardList, {
      props,
    });
  }

  it("should create", async () => {
    await mountComponent({ sectionHeading: mockCategory });

    expect(component.exists()).toBe(true);
  });

  it("should display a MenuHeading component with nested MenuSectionCardList components", async () => {
    await mountComponent({ sectionHeading: mockCategoryWithSubs });

    const container = component.find(".menu-section");
    expect(container.exists()).toBe(true);
    const heading = container.findComponent({ name: "MenuHeading" });
    expect(heading.exists()).toBe(true);
    const subsections = heading.findAllComponents({
      name: "MenuSectionCardList",
    });
    const menuItems = heading.findAllComponents({ name: "MenuItemImageCard" });
    const childHeadings = heading.findAllComponents({ name: "MenuHeading" });
    let menuItemsOfChildren = [];
    childHeadings.forEach((h) =>
      menuItemsOfChildren.push(
        ...h.findAllComponents({ name: "MenuItemImageCard" })
      )
    );
    expect(subsections.length).toBeGreaterThan(0);
    expect(menuItems.length - menuItemsOfChildren.length).toBe(0);
  });

  it("should display a MenuHeading component with nested MenuItemImageCard components", async () => {
    await mountComponent({ sectionHeading: mockCategoryWithItems });

    const container = component.find(".menu-section");
    expect(container.exists()).toBe(true);
    const heading = container.findComponent({ name: "MenuHeading" });
    expect(heading.exists()).toBe(true);
    const subsections = heading.findAllComponents({
      name: "MenuSectionCardList",
    });
    const menuItems = heading.findAllComponents({ name: "MenuItemImageCard" });
    expect(subsections.length).toBe(0);
    expect(menuItems.length).toBeGreaterThan(0);
  });

  it("should display a list guarding dropzone component that's hidden by default", async () => {
    await mountComponent({ sectionHeading: mockCategoryWithItems });

    const heading = component.getComponent({ name: "MenuHeading" });
    const lastDropZone = heading
      .findAllComponents({
        name: "MenuDropZone",
      })
      .pop();
    expect(lastDropZone.exists()).toBe(true);
    expect(lastDropZone.props()["canShow"]).toBe(false);
    expect(lastDropZone.props()["listGuard"]).toBe(true);
  });

  it("should display a visible list guarding dropzone component if a menu item is being dragged", async () => {
    changeMenuState({ newState: { draggedItem: mockMenuItem } });
    await mountComponent({ sectionHeading: mockCategoryWithItems });

    const heading = component.getComponent({ name: "MenuHeading" });
    const lastDropZone = heading
      .findAllComponents({
        name: "MenuDropZone",
      })
      .pop();
    expect(lastDropZone.exists()).toBe(true);
    expect(lastDropZone.props()["canShow"]).toBe(true);
    expect(lastDropZone.props()["listGuard"]).toBe(true);
  });

  commonMenuItemTests(() => component, mountComponent, changeMenuState);

  afterEach(() => {
    component?.unmount();
  });
});
