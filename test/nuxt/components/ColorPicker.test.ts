import { afterEach, describe, expect, it, vi } from "vitest";
import { shallowMount, VueWrapper } from "@vue/test-utils";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import ColorPicker from "@app/components/ColorPicker.vue";
import { mockMenuItem } from "@test/mocks";
import { getMockClone } from "@test/testUtils";

describe("ColorPicker", async () => {
  let component: VueWrapper;

  const { mockState, changeMenuState } = await vi.hoisted(async () =>
    (await import("@test/testUtils")).mockMenuState()
  );

  mockNuxtImport("useState", () => mockState);

  function mountComponent(target: "highlight" | "card") {
    component = shallowMount(ColorPicker, {
      props: {
        target,
      },
    });
  }

  it("should create", () => {
    mountComponent("highlight");

    expect(component.exists()).toBe(true);
  });

  it("should display the vue-accessible-color-picker and 2 buttons for Reset and Close", () => {
    mountComponent("highlight");

    expect(component.findComponent({ name: "ColorPicker" }).exists()).toBe(
      true
    );
    const buttons = component.findAll("button");
    const buttonIds = buttons.map((b) => b.attributes()["data-testid"]);
    expect(buttons.length).toBe(2);
    expect(buttonIds.includes("close-btn")).toBe(true);
    expect(buttonIds.includes("reset-btn")).toBe(true);
  });

  it("should emit onClose if close button is pressed", async () => {
    mountComponent("highlight");

    const closeButton = component.get("button[data-testid='close-btn']");
    closeButton.trigger("click");
    await component.vm.$nextTick();

    expect(component.emitted()["onClose"]).toBeTruthy();
  });

  it("should reset the highlight color of selected item if reset button is pressed", async () => {
    const testSelectedItem = getMockClone(mockMenuItem, {
      highlightColor: "red",
    });
    changeMenuState({ newState: { selectedItem: testSelectedItem } });

    mountComponent("highlight");

    const resetButton = component.get("button[data-testid='reset-btn']");
    resetButton.trigger("click");
    await component.vm.$nextTick();

    expect(testSelectedItem.highlightColor).toBeUndefined();
  });

  it("should reset the card color of selected item if reset button is pressed", async () => {
    const testSelectedItem = getMockClone(mockMenuItem, {
      highlightColor: "red",
    });
    changeMenuState({ newState: { selectedItem: testSelectedItem } });

    mountComponent("card");

    const resetButton = component.get("button[data-testid='reset-btn']");
    resetButton.trigger("click");
    await component.vm.$nextTick();

    expect(testSelectedItem.cardColor).toBeUndefined();
  });

  afterEach(() => {
    component?.unmount();
  });
});
