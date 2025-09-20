import { afterEach, describe, expect, it, vi } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import Wine from "@app/pages/wine.vue";
import {
  mockComponent,
  mockNuxtImport,
  mountSuspended,
} from "@nuxt/test-utils/runtime";
import { mockTemplateData } from "@test/mocks";

describe("Wine Page", async () => {
  let component: VueWrapper;

  const { fetchStub } = vi.hoisted(() => ({
    fetchStub: vi.fn(() => ({
      data: { value: { menu: [], template: mockTemplateData } },
    })),
  }));

  const { mockReactiveMenu } = await vi.hoisted(async () => ({
    mockReactiveMenu: (await import("@test/mocks")).mockReactiveMenu,
  }));

  mockNuxtImport("useSeoMeta", () => () => null);
  mockNuxtImport("useState", () => () => ({ value: true }));
  mockNuxtImport("useFetch", () => fetchStub);

  mockComponent("ReactiveMenu", mockReactiveMenu);

  async function mountComponent() {
    component = await mountSuspended(Wine);
  }

  it("should create", async () => {
    await mountComponent();

    expect(component.exists()).toBe(true);
  });

  it("should display a hero section with a text heading, background image and a ReactiveMenu component", async () => {
    await mountComponent();

    const hero = component.find("section#hero");
    expect(hero.exists()).toBe(true);
    const img = hero.find("img");
    expect(img.exists()).toBe(true);
    expect(img.attributes()["src"]).toMatch(/hero.*wine/i);
    const heroText = hero.find("h1#hero-text");
    expect(heroText.exists()).toBe(true);
    expect(heroText.text()).toMatch(/bor/i);
    expect(component.find("#mockReactiveMenu").exists()).toBe(true);
  });

  afterEach(() => {
    component?.unmount();
  });
});
