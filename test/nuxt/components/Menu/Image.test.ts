import { afterEach, describe, expect, it } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import Image from "@app/components/Menu/Image.vue";
import { mockMenuItem } from "@test/mocks";

describe("Image", async () => {
  let component: VueWrapper;

  async function mountComponent(props: { menuItem: itemType; size?: number }) {
    component = await mountSuspended(Image, {
      props,
    });
  }

  it("should create", async () => {
    await mountComponent({ menuItem: mockMenuItem });

    expect(component.exists()).toBe(true);
  });

  it("should display an img element", async () => {
    await mountComponent({ menuItem: mockMenuItem });

    expect(component.findAll("img").length).toBe(1);
    expect(component.find("img").exists()).toBe(true);
  });

  it("should display the image corresponding to the menu item's URL", async () => {
    const testUrl = "/404.jpg";
    await mountComponent({ menuItem: { ...mockMenuItem, imageUrl: testUrl } });

    expect(component.find("img").attributes()["src"]).toBe(testUrl);
  });

  it("should display a fallback image if menu item's URL is empty", async () => {
    await mountComponent({ menuItem: { ...mockMenuItem, imageUrl: "" } });

    expect(component.find("img").attributes()["src"]).toBe("/no_image.jpg");
  });

  it("should display a fallback image if menu item's URL is unloadable", async () => {
    await mountComponent({ menuItem: mockMenuItem });

    component.find("img").trigger("error");
    await component.vm.$nextTick();

    expect(component.find("img").attributes()["src"]).toBe("/no_image.jpg");
  });

  it("should display an input if menu item is in edit mode", async () => {
    await mountComponent({ menuItem: { ...mockMenuItem, editMode: true } });

    expect(component.find("input").exists()).toBe(true);
  });

  it("should display a loading spinner if input value changed", async () => {
    await mountComponent({ menuItem: { ...mockMenuItem, editMode: true } });

    component.get("input").trigger("input");
    await component.vm.$nextTick();

    const images = component.findAll("img");
    expect(images.length).toBe(2);
    expect(images[0].isVisible()).toBe(false);
    expect(images[1].attributes()["src"]).toBe("/spinner.svg");
  });

  afterEach(() => {
    component?.unmount();
  });
});
