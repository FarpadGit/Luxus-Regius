import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime";
import ControlButtons from "@app/components/Menu/ControlButtons.vue";
import templateTypes from "@app/../assets/templateTypes.json";
import { mockMenuItem, mockReactiveMenuState } from "@test/mocks";

describe("ControlButtons", async () => {
  let component: VueWrapper;

  const { mockState, changeMenuState } = await vi.hoisted(async () =>
    (await import("@test/testUtils")).mockMenuState()
  );

  mockNuxtImport("useState", () => mockState);

  async function mountComponent(isLoading: boolean = false) {
    component = await mountSuspended(ControlButtons, {
      props: {
        isLoading,
      },
    });
  }

  const selectedOption = "#template-select > option[selected]";
  const highlightBtn = "button[data-testid='change-highlight']";
  const cardBtn = "button[data-testid='change-card']";

  it("should create", async () => {
    await mountComponent();

    expect(component.exists()).toBe(true);
  });

  it("should display a loading indicator and disable buttons if menu is loading", async () => {
    await mountComponent(true);

    expect(component.find("button.save-btn").text()).not.toMatch(/.*save.*/i);
    expect(component.find("button.save-btn[disabled]").exists()).toBe(true);
    expect(component.find("button.rollback-btn[disabled]").exists()).toBe(true);
    expect(component.find("button.reset-btn[disabled]").exists()).toBe(true);
  });

  it("should display the appropriate controls and show current template as active select option", async () => {
    const expectedTemplateName = templateTypes.find(
      (t) => t.id === mockReactiveMenuState.templateData.name
    )?.text;

    await mountComponent();

    expect(component.find(".floating-buttons").exists()).toBe(true);
    expect(component.find(selectedOption).text()).toBe(expectedTemplateName);
    expect(component.find(highlightBtn).exists()).toBe(false);
    expect(component.find(cardBtn).exists()).toBe(false);
    expect(component.findAll("button.add-item-btn").length).toBe(1);
    expect(component.find("button.legend-btn").exists()).toBe(true);
    expect(component.find("button.save-btn").exists()).toBe(true);
    expect(component.find("button.rollback-btn").exists()).toBe(true);
    expect(component.find("button.reset-btn").exists()).toBe(true);
  });

  it("should display the appropriate controls for template B", async () => {
    const templateName: templateType = "B";
    changeMenuState({
      newTemplateData: { name: templateName },
    });
    const expectedTemplateName = templateTypes.find(
      (t) => t.id === templateName
    )?.text;

    await mountComponent();

    expect(component.find(selectedOption).text()).toBe(expectedTemplateName);
    expect(component.findAll("button.add-item-btn").length).toBe(2);
  });

  it("should display different text for hiding or showing the menu legend", async () => {
    await mountComponent();
    const textBefore = component.find("button.legend-btn").text();

    changeMenuState({
      newTemplateData: { legend: { show: true, text: "" } },
    });
    component.unmount();
    await mountComponent();

    const textAfter = component.find("button.legend-btn").text();
    expect(textBefore).not.toBe(textAfter);
  });

  it("should emit event if save button is clicked", async () => {
    await mountComponent();

    await component.find("button.save-btn").trigger("click");
    await component.vm.$nextTick();

    expect(component.emitted()["onSave"]).toBeTruthy();
  });

  it("should emit event if discard button is clicked", async () => {
    await mountComponent();

    await component.find("button.rollback-btn").trigger("click");
    await component.vm.$nextTick();

    expect(component.emitted()["onRollback"]).toBeTruthy();
  });

  it("should emit event if reset button is clicked", async () => {
    await mountComponent();

    await component.find("button.reset-btn").trigger("click");
    await component.vm.$nextTick();

    expect(component.emitted()["onReset"]).toBeTruthy();
  });

  describe("With item selected", () => {
    beforeEach(() => {
      changeMenuState({
        newState: { selectedItem: mockMenuItem },
        newTemplateData: { name: "C" },
      });
    });

    it("should display the appropriate controls if an item is selected", async () => {
      await mountComponent();

      expect(component.find(highlightBtn).exists()).toBe(true);
    });

    it("should display the appropriate controls if an item is selected and template has cards", async () => {
      await mountComponent();

      expect(component.find(highlightBtn).exists()).toBe(true);
      expect(component.find(cardBtn).exists()).toBe(true);
    });

    it("should display a color picker if change highlight button is clicked", async () => {
      await mountComponent();

      await component.find(highlightBtn).trigger("click");

      expect(component.find(".vacp-color-picker").exists()).toBe(true);
    });

    it("should display a color picker if change card button is clicked", async () => {
      await mountComponent();

      await component.find(cardBtn).trigger("click");

      expect(component.find(".vacp-color-picker").exists()).toBe(true);
    });
  });

  afterEach(() => {
    component?.unmount();
  });
});
