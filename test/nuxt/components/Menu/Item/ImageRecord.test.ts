import { afterEach, describe, expect, it, vi } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import MenuItemImageRecord from "@app/components/Menu/Item/ImageRecord.vue";
import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime";
import { mockMenuItem } from "@test/mocks";
import { commonMenuItemTests } from "./CommonTests";

describe("MenuItemImageRecord", async () => {
  let component: VueWrapper;

  const { mockState, changeMenuState } = await vi.hoisted(async () =>
    (await import("@test/testUtils")).mockMenuState()
  );

  mockNuxtImport("useState", () => mockState);

  async function mountComponent(props: { menuItem: itemType }) {
    component = await mountSuspended(MenuItemImageRecord, {
      props,
    });
  }

  it("should create", async () => {
    await mountComponent({ menuItem: mockMenuItem });

    expect(component.exists()).toBe(true);
  });

  it("should display 2 MenuEditable, 1 MenuImage and 1 MenuExtras components", async () => {
    await mountComponent({ menuItem: mockMenuItem });

    const container = component.find(".item-container");
    expect(container.exists()).toBe(true);
    expect(container.findComponent({ name: "MenuImage" }).exists()).toBe(true);
    expect(container.findAllComponents({ name: "MenuEditable" }).length).toBe(
      2
    );
    expect(container.findComponent({ name: "MenuExtras" }).exists()).toBe(true);
  });

  commonMenuItemTests(() => component, mountComponent, changeMenuState);

  afterEach(() => {
    component?.unmount();
  });
});
