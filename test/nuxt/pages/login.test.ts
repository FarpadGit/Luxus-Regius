import { afterEach, describe, expect, it } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import Login from "@app/pages/login.vue";
import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime";

describe("Login Page", async () => {
  let component: VueWrapper;

  mockNuxtImport("useSeoMeta", () => () => null);

  async function mountComponent() {
    component = await mountSuspended(Login);
  }

  it("should create", async () => {
    await mountComponent();

    expect(component.exists()).toBe(true);
  });

  it("should display a form with a password input and matching label, a submit and cancel buttons", async () => {
    await mountComponent();

    const form = component.find("form");
    expect(form.exists()).toBe(true);
    const label = form.find("label");
    const input = form.find("input");
    expect(label.exists()).toBe(true);
    expect(label.attributes()["for"]).toBe(input.attributes()["id"]);
    expect(input.exists()).toBe(true);
    expect(input.attributes()["type"]).toBe("password");
    const buttonTypes = form
      .findAll("button")
      .map((b) => b.attributes()["type"]);
    expect(buttonTypes.length).toBe(2);
    expect(buttonTypes.includes("submit")).toBe(true);
    expect(buttonTypes.includes("button")).toBe(true);
  });

  afterEach(() => {
    component?.unmount();
  });
});
