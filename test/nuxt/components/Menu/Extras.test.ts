import { afterEach, describe, expect, it } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import { mockComponent, mountSuspended } from "@nuxt/test-utils/runtime";
import Extras from "@app/components/Menu/Extras.vue";
import { mockMenuItem } from "@test/mocks";
import { getMockClone } from "@test/testUtils";

describe("Extras", async () => {
  let component: VueWrapper;

  const mockExtras: itemType["extras"] = [
    { id: 1, text: "mockExtra1", price: "mockExtraPrice1" },
    { id: 2, text: "mockExtra2", price: "mockExtraPrice2" },
    { id: 3, text: "mockExtra3", price: "mockExtraPrice3" },
  ];

  const localMockMenuItem = getMockClone(mockMenuItem, {
    editMode: true,
    extras: mockExtras,
  });

  mockComponent("MenuEditButtons", {
    props: {
      options: Object,
      spacing: String,
    },
    emits: ["onAddItem", "onAddSection", "onDelete", "onDisable"],
    template: "<div id='mockEditButtons'></div>",
  });

  async function mountComponent(menuItem: itemType) {
    component = await mountSuspended(Extras, {
      props: {
        menuItem,
      },
    });
  }

  it("should create", async () => {
    await mountComponent(mockMenuItem);

    expect(component.exists()).toBe(true);
  });

  it("should display item extras if item is not in edit mode", async () => {
    await mountComponent({ ...localMockMenuItem, editMode: false });

    expect(component.findAllComponents({ name: "MenuEditable" }).length).toBe(
      mockExtras.length * 2
    );
  });

  it("should display 2 MenuEditable components in edit mode if item has no extras", async () => {
    await mountComponent({
      ...mockMenuItem,
      extras: undefined,
      editMode: true,
    });

    expect(component.findAllComponents({ name: "MenuEditable" }).length).toBe(
      2
    );
  });

  it("should display item extras + 2 MenuEditable components in edit mode", async () => {
    await mountComponent(localMockMenuItem);

    expect(component.findAllComponents({ name: "MenuEditable" }).length).toBe(
      mockExtras.length * 2 + 2
    );
  });

  it("should display edit buttons if user hovers over an extra with mouse", async () => {
    await mountComponent({ ...localMockMenuItem, editMode: false });

    component.get("div").trigger("mouseover");
    await component.vm.$nextTick();

    expect(component.findAll("#mockEditButtons").length).toBe(1);
  });

  it("should emit onBlur if child components loose focus", async () => {
    await mountComponent(localMockMenuItem);

    component.get("input").trigger("blur");
    await component.vm.$nextTick();

    expect(component.emitted()["onBlur"]).toBeTruthy();
  });

  it("should emit onBlur with reset flag if child components recieve Escape keypress", async () => {
    await mountComponent(localMockMenuItem);

    component.get("input").trigger("keydown.escape");
    await component.vm.$nextTick();

    expect(component.emitted()["onBlur"]).toEqual([[null, true]]);
  });

  it("should clear out any empty extras if child components loose foces", async () => {
    await mountComponent({
      ...localMockMenuItem,
      extras: [
        { id: 98, text: "", price: "" },
        ...mockExtras,
        { id: 99, text: "", price: "" },
      ],
    });

    component.get("input").trigger("blur");
    await component.vm.$nextTick();

    expect(localMockMenuItem.extras).toEqual(mockExtras);
  });

  afterEach(() => {
    component?.unmount();
  });
});
