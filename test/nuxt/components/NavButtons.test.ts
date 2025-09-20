import { afterEach, describe, expect, it } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import NavButtons from "@app/components/NavButtons.vue";

describe("NavButtons", () => {
  let component: VueWrapper;

  async function mountComponent(isLoggedIn: boolean) {
    component = await mountSuspended(NavButtons, {
      props: {
        isLoggedIn,
      },
    });
  }

  it("should create", async () => {
    await mountComponent(false);

    expect(component.exists()).toBe(true);
  });

  it("should display 9 nav buttons for each page", async () => {
    await mountComponent(false);

    const linkList = component.find("nav > ul");
    expect(linkList.findAll("a").length).toBe(9);
    expect(linkList.find("a[href='/']").exists()).toBe(true);
    expect(linkList.find("a[href='/menu']").exists()).toBe(true);
    expect(linkList.find("a[href='/pizza']").exists()).toBe(true);
    expect(linkList.find("a[href='/cake']").exists()).toBe(true);
    expect(linkList.find("a[href='/sushi']").exists()).toBe(true);
    expect(linkList.find("a[href='/cocktail']").exists()).toBe(true);
    expect(linkList.find("a[href='/wine']").exists()).toBe(true);
    expect(linkList.find("a[href='/weekly']").exists()).toBe(true);
    expect(linkList.find("a[href='/contact']").exists()).toBe(true);
  });

  it("should display a link to the login page if logged out", async () => {
    await mountComponent(false);

    expect(component.find("a[href='/login']").exists()).toBe(true);
  });

  it("should display a button to log out if logged in", async () => {
    await mountComponent(true);

    const logoutButton = component.find("button");
    expect(component.find("a[href='/login']").exists()).toBe(false);
    expect(logoutButton.exists()).toBe(true);

    logoutButton.trigger("click");
    await component.vm.$nextTick();

    expect(component.emitted()["onLogout"]).toBeTruthy();
  });

  afterEach(() => {
    component?.unmount();
  });
});
