import { afterEach, describe, expect, it, vi } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime";
import EditButtons from "@app/components/Menu/EditButtons.vue";

describe("EditButtons", async () => {
  let component: VueWrapper;

  const { mockState, changeMenuState } = await vi.hoisted(async () =>
    (await import("@test/testUtils")).mockMenuState()
  );

  mockNuxtImport("useState", () => mockState);

  async function mountComponent(props?: {
    options?: {
      addSectionButton?: boolean;
      addItemButton?: boolean;
      addDisableButton?: boolean;
    };
    spacing?: "close" | "far" | "further";
  }) {
    component = await mountSuspended(EditButtons, {
      props,
    });
  }

  it("should create", async () => {
    await mountComponent();

    expect(component.exists()).toBe(true);
  });

  it("should not display anything if menu is read-only", async () => {
    changeMenuState({ newState: { isMenuEditable: false } });
    await mountComponent();

    expect(component.find(".edit-buttons").exists()).toBe(false);
  });

  it("should display a root button the user can hover over", async () => {
    await mountComponent();

    const container = component.find(".edit-buttons");
    expect(container.exists()).toBe(true);
    expect(container.find("button").exists()).toBe(true);
  });

  it("should display at least a delete button if user hovers over root button", async () => {
    await mountComponent();

    component.get("button").trigger("mouseover");
    await component.vm.$nextTick();

    expect(component.get(".button-list").find(".delete-btn").exists()).toBe(
      true
    );
  });

  it("should display at least a delete button if user clicks root button", async () => {
    await mountComponent();

    component.get("button").trigger("click");
    await component.vm.$nextTick();

    expect(component.get(".button-list").find(".delete-btn").exists()).toBe(
      true
    );
  });

  it("should hide button list if user hovers away from button", async () => {
    await mountComponent();

    component.get("button").trigger("mouseleave");
    await component.vm.$nextTick();

    expect(component.find(".button-list").exists()).toBe(false);
  });

  it("should display an add section button if supplied in props", async () => {
    await mountComponent({ options: { addSectionButton: true } });

    component.get("button").trigger("mouseover");
    await component.vm.$nextTick();

    expect(
      component.get(".button-list").find(".add-section-btn").exists()
    ).toBe(true);
  });

  it("should display an add item button if supplied in props", async () => {
    await mountComponent({ options: { addItemButton: true } });

    component.get("button").trigger("mouseover");
    await component.vm.$nextTick();

    expect(component.get(".button-list").find(".add-item-btn").exists()).toBe(
      true
    );
  });

  it("should display a disable item button if supplied in props", async () => {
    await mountComponent({ options: { addDisableButton: true } });

    component.get("button").trigger("mouseover");
    await component.vm.$nextTick();

    expect(component.get(".button-list").find(".disable-btn").exists()).toBe(
      true
    );
  });

  it("should emit onDelete if user clicks on delete button", async () => {
    await mountComponent();

    component.get("button").trigger("mouseover");
    await component.vm.$nextTick();
    component.get(".delete-btn").trigger("click");
    await component.vm.$nextTick();

    expect(component.emitted()["onDelete"]).toBeTruthy();
  });

  it("should emit onAddSection if user clicks on add section button", async () => {
    await mountComponent({ options: { addSectionButton: true } });

    component.get("button").trigger("mouseover");
    await component.vm.$nextTick();
    component.get(".add-section-btn").trigger("click");
    await component.vm.$nextTick();

    expect(component.emitted()["onAddSection"]).toBeTruthy();
  });

  it("should emit onAddItem if user clicks on add item button", async () => {
    await mountComponent({ options: { addItemButton: true } });

    component.get("button").trigger("mouseover");
    await component.vm.$nextTick();
    component.get(".add-item-btn").trigger("click");
    await component.vm.$nextTick();

    expect(component.emitted()["onAddItem"]).toBeTruthy();
  });

  it("should emit onDisable if user clicks on disable button", async () => {
    await mountComponent({ options: { addDisableButton: true } });

    component.get("button").trigger("mouseover");
    await component.vm.$nextTick();
    component.get(".disable-btn").trigger("click");
    await component.vm.$nextTick();

    expect(component.emitted()["onDisable"]).toBeTruthy();
  });

  afterEach(() => {
    component?.unmount();
  });
});
