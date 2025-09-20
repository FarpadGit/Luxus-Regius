import { afterEach, describe, expect, it, vi } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import Menu from "@app/pages/menu.vue";
import {
  mockComponent,
  mockNuxtImport,
  mountSuspended,
} from "@nuxt/test-utils/runtime";
import { mockTemplateData } from "@test/mocks";

describe("Menu Page", async () => {
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
    component = await mountSuspended(Menu);
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
    expect(img.attributes()["src"]).toMatch(/hero.*menu/i);
    const heroText = hero.find("h1#hero-text");
    expect(heroText.exists()).toBe(true);
    expect(heroText.text()).toMatch(/menü/i);
    expect(component.find("#mockReactiveMenu").exists()).toBe(true);
  });

  afterEach(() => {
    component?.unmount();
  });
});
