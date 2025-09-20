import { afterEach, describe, expect, it } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import ReactiveMenu from "@app/components/ReactiveMenu.vue";
import { mockMenuParentless, mockTemplateData } from "@test/mocks";

describe("ReactiveMenu", () => {
  let component: VueWrapper;

  async function mountComponent(props?: {
    templateData?: templateData;
    readOnly?: boolean;
    isLoading?: boolean;
  }) {
    const {
      templateData = mockTemplateData,
      readOnly,
      isLoading,
    } = props || {};
    component = await mountSuspended(ReactiveMenu, {
      props: {
        menu: mockMenuParentless as categoryType[],
        templateData,
        readOnly,
        isLoading,
      },
    });
  }

  it("should create", async () => {
    await mountComponent();

    expect(component.exists()).toBe(true);
  });

  it("should create Template and ControlButtons", async () => {
    await mountComponent();

    const templateA = component.findComponent({ name: "MenuTemplateA" });
    const controlButtons = component.findComponent({
      name: "MenuControlButtons",
    });
    expect(templateA.exists()).toBe(true);
    expect(controlButtons.exists()).toBe(true);
  });

  it("should not create ControlButtons if menu is read-only", async () => {
    await mountComponent({ readOnly: true });

    const controlButtons = component.findComponent({
      name: "ControlButtons.mock",
    });
    expect(controlButtons.exists()).toBe(false);
  });

  it("should display error message if template data is incorrect", async () => {
    await mountComponent({
      templateData: { ...mockTemplateData, name: "BadTemplateName" } as any,
    });

    expect(component.find(".menu").exists()).toBe(false);
    expect(component.find("[data-testid='error-msg']").text()).toMatch(
      /.*error.*/i
    );
  });

  afterEach(() => {
    component?.unmount();
  });
});
