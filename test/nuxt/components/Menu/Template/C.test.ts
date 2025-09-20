import { afterEach, describe, expect, it, vi } from "vitest";
import { shallowMount, VueWrapper } from "@vue/test-utils";
import TemplateC from "@app/components/Menu/Template/C.vue";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { mockCategory } from "@test/mocks";

describe("Template C", async () => {
  let component: VueWrapper;

  const { mockState, changeMenuState } = await vi.hoisted(async () =>
    (await import("@test/testUtils")).mockMenuState()
  );

  mockNuxtImport("useState", () => mockState);

  function mountComponent() {
    component = shallowMount(TemplateC);
  }

  it("should create", () => {
    mountComponent();

    expect(component.exists()).toBe(true);
  });

  it("should display root section components, a hidden guard dropzone component and a menu legend component", () => {
    mountComponent();

    const container = component.find(".menu");
    expect(container.exists()).toBe(true);
    expect(
      container.findAllComponents({ name: "MenuSectionCardList" }).length
    ).toBe(mockState().value.menuItems.length);
    const guardDropZone = container.findComponent({ name: "MenuDropZone" });
    expect(guardDropZone.exists()).toBe(true);
    expect(guardDropZone.props()["canShow"]).toBe(false);
    expect(guardDropZone.props()["listGuard"]).toBe("left");
    expect(container.findComponent({ name: "MenuLegend" }).exists()).toBe(true);
  });

  it("should display a visible guard dropzone component if a heading item is being dragged", () => {
    changeMenuState({ newState: { draggedItem: mockCategory } });
    mountComponent();

    const guardDropZone = component.getComponent({ name: "MenuDropZone" });
    expect(guardDropZone.props()["canShow"]).toBe(true);
  });

  afterEach(() => {
    component?.unmount();
  });
});
