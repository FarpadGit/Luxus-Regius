import { afterEach, describe, expect, it, vi } from "vitest";
import { shallowMount, VueWrapper } from "@vue/test-utils";
import TemplateB from "@app/components/Menu/Template/B.vue";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { mockCategory } from "@test/mocks";

describe("Template B", async () => {
  let component: VueWrapper;

  const { mockState, changeMenuState } = await vi.hoisted(async () =>
    (await import("@test/testUtils")).mockMenuState()
  );

  mockNuxtImport("useState", () => mockState);

  function mountComponent() {
    component = shallowMount(TemplateB);
  }

  it("should create", () => {
    mountComponent();

    expect(component.exists()).toBe(true);
  });

  it("should display root section components, two hidden guard dropzone components and a menu legend component", () => {
    mountComponent();

    const container = component.find(".menu");
    expect(container.exists()).toBe(true);
    expect(
      container.findAllComponents({ name: "MenuSectionColumn" }).length
    ).toBe(mockState().value.menuItems.length);
    const guardDropZones = container.findAllComponents({
      name: "MenuDropZone",
    });
    expect(guardDropZones.length).toBe(2);
    expect(guardDropZones[0].props()["canShow"]).toBe(false);
    expect(guardDropZones[1].props()["canShow"]).toBe(false);
    expect(guardDropZones[0].props()["listGuard"]).toBe("left");
    expect(guardDropZones[1].props()["listGuard"]).toBe("right");
    expect(container.findComponent({ name: "MenuLegend" }).exists()).toBe(true);
  });

  it("should display visible guard dropzone components if a heading item is being dragged", () => {
    changeMenuState({ newState: { draggedItem: mockCategory } });
    mountComponent();

    const guardDropZones = component.findAllComponents({
      name: "MenuDropZone",
    });
    expect(guardDropZones[0].props()["canShow"]).toBe(true);
    expect(guardDropZones[1].props()["canShow"]).toBe(true);
  });

  afterEach(() => {
    component?.unmount();
  });
});
