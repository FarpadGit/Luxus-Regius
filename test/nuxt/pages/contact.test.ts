import { afterEach, describe, expect, it } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import Contact from "@app/pages/contact.vue";
import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime";

describe("Contact Page", async () => {
  let component: VueWrapper;

  mockNuxtImport("useSeoMeta", () => () => null);

  async function mountComponent() {
    component = await mountSuspended(Contact);
  }

  it("should create", async () => {
    await mountComponent();

    expect(component.exists()).toBe(true);
  });

  it("should display a hero section with a text heading and background image", async () => {
    await mountComponent();

    const hero = component.find("section#hero");
    expect(hero.exists()).toBe(true);
    const img = hero.find("img");
    expect(img.exists()).toBe(true);
    expect(img.attributes()["src"]).toMatch(/hero.*contact/i);
    const heroText = hero.find("h1#hero-text");
    expect(heroText.exists()).toBe(true);
    expect(heroText.text()).toMatch(/kapcsolat/i);
  });

  afterEach(() => {
    component?.unmount();
  });
});
