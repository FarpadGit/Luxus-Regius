import { describe, expect, it } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import { mockCategory, mockMenuItem, mockReactiveMenuState } from "@test/mocks";
import { changeMenuStateType, getMockClone } from "@test/testUtils";

export const commonMenuItemTests = (
  menuSection: () => VueWrapper,
  mountComponent: (props: any) => Promise<void>,
  changeMenuState: changeMenuStateType
) =>
  describe("Common Tests", async () => {
    it("should display a DropZone component that's hidden by default", async () => {
      await mountComponent({ sectionHeading: mockCategory });

      const dropZone = menuSection().findComponent({ name: "MenuDropZone" });
      expect(dropZone.exists()).toBe(true);
      expect(dropZone.props()["canShow"]).toBe(false);
    });

    describe("menu is editable", () => {
      it("should display a visible DropZone component if a different item is being dragged", async () => {
        changeMenuState({
          newState: { draggedItem: { ...mockCategory, id: "differentID" } },
        });
        await mountComponent({ sectionHeading: mockCategory });

        expect(
          menuSection().getComponent({ name: "MenuDropZone" }).props()[
            "canShow"
          ]
        ).toBe(true);
      });

      it("should not display a visible DropZone component if this item is being dragged", async () => {
        changeMenuState({
          newState: { draggedItem: mockCategory },
        });
        await mountComponent({ sectionHeading: mockCategory });

        expect(
          menuSection().getComponent({ name: "MenuDropZone" }).props()[
            "canShow"
          ]
        ).toBe(false);
      });

      it("should not display a visible DropZone component if forced by prop", async () => {
        changeMenuState({
          newState: { draggedItem: mockCategory },
        });
        await mountComponent({
          sectionHeading: mockCategory,
          dropZoneDisabled: true,
        });

        expect(
          menuSection().getComponent({ name: "MenuDropZone" }).props()[
            "canShow"
          ]
        ).toBe(false);
      });

      it("should display edit buttons if not in edit mode and user hovers over with mouse", async () => {
        await mountComponent({ sectionHeading: mockCategory });
        expect(
          menuSection().findComponent({ name: "MenuEditButtons" }).exists()
        ).toBe(false);

        menuSection().get(".menu-section").trigger("mouseover");
        await menuSection().vm.$nextTick();

        expect(
          menuSection().findComponent({ name: "MenuEditButtons" }).exists()
        ).toBe(true);
      });

      it("should display edit buttons if not in edit mode and in focus", async () => {
        await mountComponent({ sectionHeading: mockCategory });
        expect(
          menuSection().findComponent({ name: "MenuEditButtons" }).exists()
        ).toBe(false);

        menuSection().get(".menu-section").trigger("focusin");
        await menuSection().vm.$nextTick();

        expect(
          menuSection().findComponent({ name: "MenuEditButtons" }).exists()
        ).toBe(true);
      });

      it("should be draggable if not in edit mode", async () => {
        await mountComponent({
          sectionHeading: { ...mockCategory, editMode: false },
        });

        expect(
          menuSection().get(".menu-section").attributes()["draggable"]
        ).toBe("true");
      });

      it("should not be draggable if in edit mode", async () => {
        await mountComponent({
          sectionHeading: { ...mockCategory, editMode: true },
        });

        expect(
          menuSection().get(".menu-section").attributes()["draggable"]
        ).toBe("false");
      });

      it("should save item to shared draggedItem variable if component is being dragged", async () => {
        const localMenuState = changeMenuState(
          { newState: mockReactiveMenuState },
          2
        );
        await mountComponent({ sectionHeading: mockCategory });

        menuSection().get(".menu-section").trigger("dragstart");
        await menuSection().vm.$nextTick();

        expect(localMenuState.draggedItem).toBe(mockCategory);
      });
    });

    describe("menu is read-only", () => {
      it("should not be draggable if menu is read-only", async () => {
        changeMenuState({ newState: { isMenuEditable: false } }, 2);
        await mountComponent({ sectionHeading: mockCategory });

        expect(
          menuSection().get(".menu-section").attributes()["draggable"]
        ).toBe("false");
      });
    });

    describe("drop", () => {
      let localMockCategory: categoryType;
      let localMockDraggedItem: itemType | categoryType;

      function setDraggedItemType(type: "item" | "section") {
        if (type === "item") {
          localMockDraggedItem = getMockClone(mockMenuItem, {
            id: "draggedID",
            parent: { ...mockCategory, id: "draggedParentID" },
          });
        } else {
          localMockDraggedItem = getMockClone(mockCategory, {
            id: "draggedID",
          });
        }
      }

      function setCategoryChildrenType(type: "item" | "section") {
        if (type === "item") {
          localMockCategory = getMockClone(mockCategory, {
            children: [mockMenuItem],
          });
        } else {
          localMockCategory = getMockClone(mockCategory, {
            children: [{ ...mockCategory, id: "differentChildID" }],
          });
        }
      }

      it("should insert dragged item at the start of child list if a menu item is dropped onto component", async () => {
        setDraggedItemType("item");
        setCategoryChildrenType("item");
        const expectedMockCategory = structuredClone(localMockCategory);
        changeMenuState(
          {
            newState: {
              draggedItem: localMockDraggedItem,
            },
          },
          2
        );
        await mountComponent({ sectionHeading: localMockCategory });

        menuSection().get(".menu-section").trigger("dragover");
        await menuSection().vm.$nextTick();
        menuSection().get(".menu-section").trigger("drop");
        await menuSection().vm.$nextTick();

        const insertedItem = localMockCategory.children.shift();
        expect(insertedItem).toBe(localMockDraggedItem);
        expect(localMockCategory).toEqual(expectedMockCategory);
      });

      it("should insert dragged category at the start of child list if a section is dropped onto component", async () => {
        setDraggedItemType("section");
        setCategoryChildrenType("section");
        const expectedMockCategory = structuredClone(localMockCategory);
        changeMenuState(
          {
            newState: {
              draggedItem: localMockDraggedItem,
            },
          },
          2
        );
        await mountComponent({ sectionHeading: localMockCategory });

        menuSection().get(".menu-section").trigger("dragover");
        await menuSection().vm.$nextTick();
        menuSection().get(".menu-section").trigger("drop");
        await menuSection().vm.$nextTick();

        const insertedItem = localMockCategory.children.shift();
        expect(insertedItem).toBe(localMockDraggedItem);
        expect(localMockCategory).toEqual(expectedMockCategory);
      });

      it("should not insert dragged item into child list if a menu item is dropped onto a component with subsections", async () => {
        setDraggedItemType("item");
        setCategoryChildrenType("section");
        const expectedMockCategory = structuredClone(localMockCategory);
        changeMenuState(
          {
            newState: {
              draggedItem: localMockDraggedItem,
            },
          },
          2
        );
        await mountComponent({ sectionHeading: localMockCategory });

        menuSection().get(".menu-section").trigger("dragover");
        await menuSection().vm.$nextTick();
        menuSection().get(".menu-section").trigger("drop");
        await menuSection().vm.$nextTick();

        expect(localMockCategory).toEqual(expectedMockCategory);
      });

      it("should not insert dragged category into child list if a section is dropped onto a component with menu items", async () => {
        setDraggedItemType("section");
        setCategoryChildrenType("item");
        const expectedMockCategory = structuredClone(localMockCategory);
        changeMenuState(
          {
            newState: {
              draggedItem: localMockDraggedItem,
            },
          },
          2
        );
        await mountComponent({ sectionHeading: localMockCategory });

        menuSection().get(".menu-section").trigger("dragover");
        await menuSection().vm.$nextTick();
        menuSection().get(".menu-section").trigger("drop");
        await menuSection().vm.$nextTick();

        expect(localMockCategory).toEqual(expectedMockCategory);
      });
    });
  });
