import { afterEach, describe, expect, it, vi } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime";
import Editable from "@app/components/Menu/Editable.vue";

describe("Editable", async () => {
  let component: VueWrapper;

  const { mockState, changeMenuState } = await vi.hoisted(async () =>
    (await import("@test/testUtils")).mockMenuState()
  );

  mockNuxtImport("useState", () => mockState);

  async function mountComponent(props: {
    modelValue?: string;
    classes?: string;
    editMode: boolean;
    placeholder: string;
    textAlign?: "center" | "left" | "right" | "indented";
    autoFocus?: boolean;
    optional?: boolean;
    useTextArea?: boolean;
  }) {
    component = await mountSuspended(Editable, {
      props: {
        ...props,
        modelValue: props.modelValue || "",
      },
      attachTo: document.body,
    });
  }

  it("should create", async () => {
    await mountComponent({ editMode: false, placeholder: "" });

    expect(component.exists()).toBe(true);
  });

  describe("edit mode on", () => {
    it("should display an input if edit mode is true", async () => {
      await mountComponent({ editMode: true, placeholder: "" });

      expect(component.findComponent({ name: "PlasticInput" }).exists()).toBe(
        true
      );
    });

    it("should pass classes to input via prop", async () => {
      const testClasses = "testClasses";
      await mountComponent({
        editMode: true,
        placeholder: "",
        classes: testClasses,
      });

      expect(
        component.findComponent({ name: "PlasticInput" }).classes()
      ).toContain(testClasses);
    });

    it("should pass placeholder to input via prop", async () => {
      const testPlaceholder = "testPlaceholder";
      await mountComponent({ editMode: true, placeholder: testPlaceholder });

      expect(component.find("input").attributes()["placeholder"]).toBe(
        testPlaceholder
      );
    });

    it("should pass autofocus to input via prop", async () => {
      await mountComponent({
        editMode: true,
        placeholder: "",
        autoFocus: true,
      });

      expect(document.activeElement).toBe(component.find("input").element);
    });

    it("should pass useTextarea to input via prop", async () => {
      await mountComponent({
        editMode: true,
        placeholder: "",
        useTextArea: true,
      });

      expect(component.find("input").exists()).toBe(false);
      expect(component.find("textarea").exists()).toBe(true);
    });
  });

  describe("edit mode off", () => {
    it("should display a paragraph with inputed text if edit mode is false", async () => {
      const testText = "testText";
      await mountComponent({
        editMode: false,
        placeholder: "",
        modelValue: testText,
      });

      expect(component.find("p").exists()).toBe(true);
      expect(component.find("p").text()).toBe(testText);
    });

    it("should pass classes to paragraph via prop", async () => {
      const testClasses = "testClasses";
      await mountComponent({
        editMode: false,
        placeholder: "",
        classes: testClasses,
      });

      expect(component.find("p").classes()).toContain(testClasses);
    });

    it("should display placeholder in paragraph if text is empty", async () => {
      const testPlaceholder = "testPlaceholder";
      await mountComponent({ editMode: false, placeholder: testPlaceholder });

      expect(component.find("p").text()).toBe(testPlaceholder);
    });

    it("should not display placeholder in paragraph if menu is read-only", async () => {
      changeMenuState({ newState: { isMenuEditable: false } });
      await mountComponent({ editMode: false, placeholder: "fakePlaceholder" });

      expect(component.get("p").text()).toBe("");
    });

    it("should not display paragraph if text is empty and optional", async () => {
      await mountComponent({
        editMode: false,
        placeholder: "",
        optional: true,
      });

      expect(component.find("p").exists()).toBe(false);
    });
  });

  afterEach(() => {
    component?.unmount();
  });
});
