import { afterEach, describe, expect, it } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import Landing from "@app/pages/index.vue";
import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime";

describe("Landing Page", async () => {
  let component: VueWrapper;

  mockNuxtImport("useSeoMeta", () => () => null);

  async function mountComponent() {
    component = await mountSuspended(Landing, { shallow: true });
  }

  it("should create", async () => {
    await mountComponent();

    expect(component.exists()).toBe(true);
  });

  it("should display a hero section with a text heading and at least 6 other sections", async () => {
    await mountComponent();

    const hero = component.find("section#hero");
    expect(hero.exists()).toBe(true);
    const heroText = hero.find("h1#hero-text");
    expect(heroText.exists()).toBe(true);
    expect(heroText.text()).toMatch(/luxus.*regius/i);
    expect(component.findAll("section").length).toBeGreaterThanOrEqual(7);
  });

  afterEach(() => {
    component?.unmount();
  });
});
