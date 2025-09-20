import { afterEach, describe, expect, it } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import PlasticInput from "@app/components/PlasticInput.vue";

describe("PlasticInput", () => {
  let component: VueWrapper;

  async function mountComponent(props: {
    innerClasses?: string;
    placeholder: string;
    autoFocus?: boolean;
    useTextArea?: boolean;
  }) {
    component = await mountSuspended(PlasticInput, {
      props,
      attachTo: document.body,
    });
  }

  it("should create", async () => {
    await mountComponent({ placeholder: "" });

    expect(component.exists()).toBe(true);
  });

  describe("with input element", () => {
    it("should display an input element and its wrapper", async () => {
      await mountComponent({ placeholder: "" });

      const container = component.find(".edit-container");
      expect(container.exists()).toBe(true);
      expect(container.find("input").exists()).toBe(true);
    });

    it("should pass down classes to inner element", async () => {
      const testClass = "testClass";
      await mountComponent({ placeholder: "", innerClasses: testClass });

      expect(component.get("input").classes()).toContainEqual(testClass);
    });

    it("should set element placeholder with prop", async () => {
      const testPlaceholder = "testPlaceholder";
      await mountComponent({ placeholder: testPlaceholder });

      expect(component.get("input").attributes()["placeholder"]).toBe(
        testPlaceholder
      );
    });

    it("should set element focus with prop", async () => {
      await mountComponent({ placeholder: "", autoFocus: true });

      expect(document.activeElement).toBe(component.get("input").element);
    });

    it("should emit onBlur when Enter key is pressed", async () => {
      await mountComponent({ placeholder: "" });

      component.get("input").trigger("keydown.enter");
      await component.vm.$nextTick();

      expect(component.emitted()["onBlur"]).toEqual([[null]]);
    });

    it("should emit onBlur when Escape key is pressed", async () => {
      await mountComponent({ placeholder: "" });

      component.get("input").trigger("keydown.escape");
      await component.vm.$nextTick();

      expect(component.emitted()["onBlur"]).toEqual([[null, true]]);
    });

    it("should emit onInput when a key is pressed", async () => {
      const testInput = "testInput";
      await mountComponent({ placeholder: "" });

      const inputEl = component.get("input");
      inputEl.element.value = testInput; // this will set e.target.value for handleInput
      inputEl.trigger("input");
      await component.vm.$nextTick();

      expect(component.emitted()["onInput"]).toBeTruthy();
      expect(component.find(".edit-container").attributes()["data-value"]).toBe(
        testInput
      );
    });
  });

  describe("with textarea", () => {
    it("should display a textarea element if the prop is set", async () => {
      await mountComponent({ placeholder: "", useTextArea: true });
      const container = component.find(".edit-container");
      expect(container.exists()).toBe(true);
      expect(container.find("input").exists()).toBe(false);
      expect(container.find("textarea").exists()).toBe(true);
    });

    it("should pass down classes to inner element", async () => {
      const testClass = "testClass";
      await mountComponent({
        placeholder: "",
        innerClasses: testClass,
        useTextArea: true,
      });

      expect(component.get("textarea").classes()).toContainEqual(testClass);
    });

    it("should set element placeholder with prop", async () => {
      const testPlaceholder = "testPlaceholder";
      await mountComponent({ placeholder: testPlaceholder, useTextArea: true });

      expect(component.get("textarea").attributes()["placeholder"]).toBe(
        testPlaceholder
      );
    });

    it("should set element focus with prop", async () => {
      await mountComponent({
        placeholder: "",
        autoFocus: true,
        useTextArea: true,
      });

      expect(document.activeElement).toBe(component.get("textarea").element);
    });

    it("should emit onBlur when Enter key is pressed", async () => {
      await mountComponent({ placeholder: "", useTextArea: true });

      component.get("textarea").trigger("keydown.enter");
      await component.vm.$nextTick();

      expect(component.emitted()["onBlur"]).toEqual([[null]]);
    });

    it("should emit onBlur when Escape key is pressed", async () => {
      await mountComponent({ placeholder: "", useTextArea: true });

      component.get("textarea").trigger("keydown.escape");
      await component.vm.$nextTick();

      expect(component.emitted()["onBlur"]).toEqual([[null, true]]);
    });
  });

  afterEach(() => {
    component?.unmount();
  });
});
