import { afterEach, describe, expect, it, vi } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime";
import Heading from "@app/components/Menu/Heading.vue";
import { mockCategory, mockReactiveMenuState } from "@test/mocks";
import { getMockClone } from "@test/testUtils";

describe("Heading", async () => {
  let component: VueWrapper;

  const { mockState, changeMenuState } = await vi.hoisted(async () =>
    (await import("@test/testUtils")).mockMenuState()
  );

  mockNuxtImport("useState", () => mockState);

  async function mountComponent(props: {
    heading: categoryType;
    classes?: { level0?: string; level1?: string };
    justify?: "center" | "left" | "right";
    forceShowEditButtons?: boolean;
  }) {
    component = await mountSuspended(Heading, {
      props,
      attachTo: document.body,
    });
  }

  it("should create", async () => {
    await mountComponent({ heading: mockCategory });

    expect(component.exists()).toBe(true);
  });

  it("should be focusable", async () => {
    await mountComponent({ heading: mockCategory });

    expect(component.get(".heading-container").attributes()["tabindex"]).toBe(
      "0"
    );
  });

  it("should display an h2 element and its wrapper if category level is 0", async () => {
    await mountComponent({ heading: { ...mockCategory, level: 0 } });

    const container = component.find(".heading-container");
    expect(container.exists()).toBe(true);
    expect(container.find("h2").exists()).toBe(true);
    expect(container.get("h2").text()).toBe(mockCategory.text);
  });

  it("should display an h3 element and its wrapper if category level is 1 or greater", async () => {
    await mountComponent({ heading: { ...mockCategory, level: 1 } });

    const container = component.find(".heading-container");
    expect(container.exists()).toBe(true);
    expect(container.find("h3").exists()).toBe(true);
    expect(container.get("h3").text()).toBe(mockCategory.text);
  });

  it("should display an input if item is in edit mode", async () => {
    await mountComponent({ heading: { ...mockCategory, editMode: true } });

    expect(component.find("h2").exists()).toBe(false);
    expect(component.find("h3").exists()).toBe(false);
    expect(component.findComponent({ name: "PlasticInput" }).exists()).toBe(
      true
    );
  });

  it("should display edit buttons if not in edit mode and user hovers over with mouse", async () => {
    await mountComponent({ heading: { ...mockCategory, editMode: false } });
    expect(component.findComponent({ name: "MenuEditButtons" }).exists()).toBe(
      false
    );

    component.get(".heading-container").trigger("mouseover");
    await component.vm.$nextTick();

    expect(component.findComponent({ name: "MenuEditButtons" }).exists()).toBe(
      true
    );
  });

  it("should display edit buttons if forced by prop", async () => {
    await mountComponent({ heading: mockCategory, forceShowEditButtons: true });

    expect(component.findComponent({ name: "MenuEditButtons" }).exists()).toBe(
      true
    );
  });

  it("should enter edit mode if component is double clicked", async () => {
    const localMockCategory = getMockClone(mockCategory);
    await mountComponent({ heading: localMockCategory });

    component.get(".heading-container").trigger("dblclick");
    await component.vm.$nextTick();

    expect(localMockCategory.editMode).toBe(true);
  });

  it("should enter edit mode if Enter key is pressed", async () => {
    const localMockCategory = getMockClone(mockCategory);
    await mountComponent({ heading: localMockCategory });

    component.get(".heading-container").trigger("keypress", { key: "enter" });
    await component.vm.$nextTick();

    expect(localMockCategory.editMode).toBe(true);
  });

  it("should leave edit mode if input looses focus", async () => {
    const localMockCategory = getMockClone(mockCategory, { editMode: true });
    await mountComponent({ heading: localMockCategory });

    component.get("input").trigger("blur");
    await component.vm.$nextTick();

    expect(localMockCategory.editMode).toBe(false);
  });

  it("should not enter edit mode if element is double clicked but menu is read-only", async () => {
    changeMenuState({ newState: { isMenuEditable: false } });
    await mountComponent({ heading: mockCategory });

    component.get(".heading-container").trigger("dblclick");
    await component.vm.$nextTick();

    expect(mockCategory.editMode).toBe(false);
  });

  it("should not be focusable if menu is read-only", async () => {
    changeMenuState({ newState: { isMenuEditable: false } });
    await mountComponent({ heading: mockCategory });

    expect(component.get(".heading-container").attributes()["tabindex"]).toBe(
      undefined
    );
  });

  it("should save item to shared selectedItem variable if component is focused", async () => {
    const localMenuState = changeMenuState({
      newState: mockReactiveMenuState,
    });
    await mountComponent({ heading: mockCategory });

    component.get(".heading-container").trigger("focusin");
    await component.vm.$nextTick();

    expect(localMenuState.selectedItem).toBe(mockCategory);
  });

  afterEach(() => {
    component?.unmount();
  });
});
