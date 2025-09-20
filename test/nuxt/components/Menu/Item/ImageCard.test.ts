import { afterEach, describe, expect, it, vi } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import MenuItemImageCard from "@app/components/Menu/Item/ImageCard.vue";
import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime";
import { mockMenuItem } from "@test/mocks";
import { commonMenuItemTests } from "./CommonTests";

describe("MenuItemImageCard", async () => {
  let component: VueWrapper;

  const { mockState, changeMenuState } = await vi.hoisted(async () =>
    (await import("@test/testUtils")).mockMenuState()
  );

  mockNuxtImport("useState", () => mockState);

  async function mountComponent(props: { menuItem: itemType }) {
    component = await mountSuspended(MenuItemImageCard, {
      props,
    });
  }

  it("should create", async () => {
    await mountComponent({ menuItem: mockMenuItem });

    expect(component.exists()).toBe(true);
  });

  it("should display 3 MenuEditable and a MenuImage components", async () => {
    await mountComponent({ menuItem: mockMenuItem });

    const container = component.find(".item-container");
    expect(container.exists()).toBe(true);
    expect(container.findComponent({ name: "MenuImage" }).exists()).toBe(true);
    expect(container.findAllComponents({ name: "MenuEditable" }).length).toBe(
      3
    );
  });

  commonMenuItemTests(() => component, mountComponent, changeMenuState);

  afterEach(() => {
    component?.unmount();
  });
});
