// recursively add reference to parent element for list of children
export function addParents(
  list: categoryType[] | itemType[],
  parent: categoryType | null
) {
  if (list.length === 0) return [];
  const transformedData = list.map((i) => {
    if (isHeading(i)) i.children = addParents(i.children, i);
    return { ...i, parent };
  }) as categoryType[] | itemType[];

  return transformedData;
}

// recursively removes references to parent elements and editMode property to prepare for server
export function removeClientProperties(list: categoryType[] | itemType[]) {
  if (list.length === 0) return [];
  const transformedData = list.map((i) => {
    const temp: any = { ...i };
    delete temp.parent;
    delete temp.editMode;

    if (temp.children) temp.children = removeClientProperties(temp.children);
    return temp;
  }) as Partial<categoryType>[] | Partial<itemType>[];

  return transformedData;
}

// recursively check if any descendant has editMode == true
export function hasChildInEditMode(section: categoryType | itemType) {
  if (isMenuItem(section) || section.children.length === 0) return false;
  if (section.children.some((child) => child.editMode)) return true;
  return section.children
    .map((child) => {
      if (hasChildInEditMode(child)) return true;
    })
    .some((i) => i == true);
}

// recursively update heading level for section and children
export function setNewHeadingLevels(
  section: categoryType,
  parentLevel: number
) {
  section.level = parentLevel + 1;
  section.children.forEach((child) => {
    if (isHeading(child)) setNewHeadingLevels(child, section.level);
  });
}
