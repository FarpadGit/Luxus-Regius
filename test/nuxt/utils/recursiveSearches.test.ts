import { describe, expect, it } from "vitest";
import {
  addParents,
  hasChildInEditMode,
  removeClientProperties,
  setNewHeadingLevels,
} from "@app/utils/recursiveSearches";
import { mockMenu, mockMenuParentless } from "@test/mocks";

type L = Partial<categoryType>[] | Partial<itemType>[];
type I = Partial<categoryType> | Partial<itemType>;
function hasProperty(list: L, property: string, all?: boolean) {
  const fn = all ? list.every : list.some;
  if (fn.call(list, (item: I) => Object.keys(item).includes(property)))
    return true;

  list.forEach((item: I) => {
    if (
      Object.keys(item).includes("children") &&
      hasProperty((item as categoryType).children, property, all)
    )
      return true;
  });
  return false;
}

describe("recursiveSearches", () => {
  it("recursively adds reference to parent element for list of children", () => {
    const newList = addParents(mockMenuParentless as categoryType[], null);

    expect(hasProperty(newList, "parent", true)).toBe(true);
  });

  it("recursively removes references to parent elements and editMode property", () => {
    const newList = removeClientProperties(mockMenu as categoryType[]);

    expect(hasProperty(newList, "parent")).toBe(false);
    expect(hasProperty(newList, "editMode")).toBe(false);
  });

  it("recursively check if any descendant is in editMode", () => {
    const result1 = hasChildInEditMode(mockMenu[0]);
    expect(result1).toBe(false);

    const newMenu = structuredClone(mockMenu);
    (newMenu[0].children[0] as categoryType).children[1].editMode = true;
    const result2 = hasChildInEditMode(newMenu[0]);
    expect(result2).toBe(true);
  });

  it("recursively updates heading levels for section and children", () => {
    const localMockMenu = structuredClone(mockMenu);

    setNewHeadingLevels(localMockMenu[0], 0);

    expect(localMockMenu[0].level).toBe(1);
    expect((localMockMenu[0].children[0] as categoryType).level).toBe(2);
  });
});
