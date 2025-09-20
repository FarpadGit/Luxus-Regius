import { afterEach, describe, expect, it, vi } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import MenuItemSimple from "@app/components/Menu/Item/Simple.vue";
import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime";
import { mockMenuItem } from "@test/mocks";
import { commonMenuItemTests } from "./CommonTests";

describe("MenuItemSimple", async () => {
  let component: VueWrapper;

  const { mockState, changeMenuState } = await vi.hoisted(async () =>
    (await import("@test/testUtils")).mockMenuState()
  );

  mockNuxtImport("useState", () => mockState);

  async function mountComponent(props: { menuItem: itemType }) {
    component = await mountSuspended(MenuItemSimple, {
      props,
    });
  }

  it("should create", async () => {
    await mountComponent({ menuItem: mockMenuItem });

    expect(component.exists()).toBe(true);
  });

  it("should display 3 MenuEditable components and a MenuExtras component", async () => {
    await mountComponent({ menuItem: mockMenuItem });

    const container = component.find(".item-container");
    expect(container.exists()).toBe(true);
    expect(container.findAllComponents({ name: "MenuEditable" }).length).toBe(
      3
    );
    expect(container.findComponent({ name: "MenuExtras" }).exists()).toBe(true);
  });

  commonMenuItemTests(() => component, mountComponent, changeMenuState);

  afterEach(() => {
    component?.unmount();
  });
});
