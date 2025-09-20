import { afterEach, describe, expect, it, vi } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime";
import Legend from "@app/components/Menu/Legend.vue";

describe("Legend", async () => {
  let component: VueWrapper;

  const { mockState, changeMenuState } = await vi.hoisted(async () =>
    (await import("@test/testUtils")).mockMenuState()
  );

  mockNuxtImport("useState", () => mockState);

  async function mountComponent(legend: templateData["legend"]) {
    component = await mountSuspended(Legend, {
      props: {
        legend,
      },
      attachTo: document.body,
    });
  }

  it("should create", async () => {
    await mountComponent({ show: true, text: "" });

    expect(component.exists()).toBe(true);
  });

  it("should not display anything if legend.show is false", async () => {
    await mountComponent({ show: false, text: "" });

    expect(component.find("#legend-container").exists()).toBe(false);
    expect(component.findComponent({ name: "MenuEditable" }).exists()).toBe(
      false
    );
  });

  it("should display the wrapper element and a MenuEditable component if legend.show is true", async () => {
    await mountComponent({ show: true, text: "" });

    expect(component.find("#legend-container").exists()).toBe(true);
    expect(component.findComponent({ name: "MenuEditable" }).exists()).toBe(
      true
    );
  });

  it("should have autofocus if text is empty", async () => {
    await mountComponent({ show: true, text: "" });

    const input = component.find("input").element;
    expect(document.activeElement).toBe(input);
  });

  it("should enter edit mode if element is double clicked", async () => {
    await mountComponent({ show: true, text: "dummy text" });
    expect(component.find("input").exists()).toBe(false);

    component.trigger("dblclick");
    await component.vm.$nextTick();

    expect(document.activeElement).toBe(component.get("input").element);
  });

  it("should enter edit mode if Enter key is pressed", async () => {
    await mountComponent({ show: true, text: "dummy text" });
    expect(component.find("input").exists()).toBe(false);

    component.trigger("keypress", { key: "enter" });
    await component.vm.$nextTick();

    expect(document.activeElement).toBe(component.get("input").element);
  });

  it("should not enter edit mode if element is double clicked but menu is read-only", async () => {
    changeMenuState({ newState: { isMenuEditable: false } });
    await mountComponent({ show: true, text: "dummy text" });

    component.trigger("dblclick");
    await component.vm.$nextTick();

    expect(component.find("input").exists()).toBe(false);
  });

  afterEach(() => {
    component?.unmount();
  });
});
