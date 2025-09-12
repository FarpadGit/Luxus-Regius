// Common funtionality used by all section templates.
//
// sectionHeading is a getter function passed by the component to access the object,
// in case its content changes from the ouside like a reset event overwriting the whole list.
// this is because these methods actively mutate sectionHeading and it needs to be up to date with the objects everyone else use
export function useSection(
  sectionHeading: () => categoryType,
  dropZoneDisabled: boolean
) {
  const reactiveMenu = useState<reactiveMenuState>("reactiveMenuState").value;

  const draggedOver = ref(false);
  const disableChildrenDropZone = ref(false);

  function addHeading(text: string) {
    const children = sectionHeading().children;
    if (hasMenuItems(children)) return;

    const newHeading: categoryType = {
      id: generateUniqueKey(reactiveMenu.menuItems),
      text,
      isRightColumn: sectionHeading().isRightColumn,
      level: sectionHeading().level + 1,
      children: [],
      editMode: true,
      parent: sectionHeading(),
    };
    children.push(newHeading);
  }

  function addItem(text: string) {
    const children = sectionHeading().children;
    if (hasHeadings(children)) return;

    const newItem: itemType = {
      id: generateUniqueKey(reactiveMenu.menuItems),
      text,
      price: "1 Ft",
      subtext: "",
      imageUrl: "",
      editMode: true,
      disabled: false,
      parent: sectionHeading(),
    };
    children.push(newItem);
  }

  function handleDelete(emit: () => void) {
    if (sectionHeading().parent === null)
      reactiveMenu.menuItems = reactiveMenu.menuItems.filter(
        (section) => section.id !== sectionHeading().id
      );
    else emit();

    if (
      reactiveMenu.selectedItem &&
      reactiveMenu.selectedItem.id === sectionHeading().id
    )
      reactiveMenu.selectedItem = false;
  }

  function handleDeleteChild(item: categoryType | itemType) {
    // children.filter will not update the parent link in child elements
    const index = sectionHeading().children.findIndex((i) => i.id === item.id);
    sectionHeading().children.splice(index, 1);

    if (reactiveMenu.selectedItem && reactiveMenu.selectedItem.id === item.id)
      reactiveMenu.selectedItem = false;
  }

  // Drag & Drop functions
  function handleDragStart(e: DragEvent) {
    reactiveMenu.draggedItem = sectionHeading();
    disableChildrenDropZone.value = true;
  }

  function handleDragOver(dropZoneDisabled: boolean) {
    if (dropZoneDisabled) return;
    if (!reactiveMenu.draggedItem) return;
    if (reactiveMenu.draggedItem.id === sectionHeading().id) return;
    if (
      isHeading(reactiveMenu.draggedItem) &&
      hasMenuItems(sectionHeading().children)
    )
      return;
    if (
      isMenuItem(reactiveMenu.draggedItem) &&
      hasHeadings(sectionHeading().children)
    )
      return;
    if (
      isMenuItem(reactiveMenu.draggedItem) &&
      reactiveMenu.draggedItem.parent.id === sectionHeading().id
    )
      return;

    draggedOver.value = true;
  }

  function handleDragLeave(e: DragEvent) {
    draggedOver.value = false;
  }

  function handleDrop(dropZoneDisabled: boolean) {
    if (!draggedOver.value) {
      reactiveMenu.draggedItem = false;
      return;
    }

    draggedOver.value = false;
    disableChildrenDropZone.value = false;
    if (
      !reactiveMenu.draggedItem ||
      reactiveMenu.draggedItem.id === sectionHeading().id ||
      dropZoneDisabled
    )
      return;

    const parentOfDropped = reactiveMenu.draggedItem.parent;
    const siblingsOfDropped =
      parentOfDropped == null
        ? reactiveMenu.menuItems
        : parentOfDropped.children;

    const indexOfDropped = siblingsOfDropped.findIndex(
      (item) => item.id === (reactiveMenu.draggedItem as categoryType).id
    );

    // delete item from old parent's children
    siblingsOfDropped.splice(indexOfDropped, 1);
    // insert item into new parent's children
    sectionHeading().children.splice(0, 0, reactiveMenu.draggedItem as any);

    if (isHeading(reactiveMenu.draggedItem)) {
      setNewHeadingLevels(reactiveMenu.draggedItem, sectionHeading().level);
      reactiveMenu.draggedItem.isRightColumn = sectionHeading().isRightColumn;
    }

    reactiveMenu.draggedItem.parent = sectionHeading();

    reactiveMenu.draggedItem = false;
  }

  function getStyles() {
    let styles = [];
    if (sectionHeading().highlightColor)
      styles.push(`--color-menu-highlight: ${sectionHeading().highlightColor}`);
    if (sectionHeading().cardColor)
      styles.push(`--color-menu-card: ${sectionHeading().cardColor}`);
    return styles.join(";");
  }

  // common DOM properties and event listeners every template variant will implement
  const sectionProps = computed(() => ({
    bind: {
      style: getStyles(),
      draggable:
        reactiveMenu.isMenuEditable &&
        !sectionHeading().editMode &&
        !hasChildInEditMode(sectionHeading()),
    },
    on: {
      dragstart: (e: DragEvent) => {
        e.stopPropagation();
        handleDragStart(e);
      },
      dragover: (e: DragEvent) => {
        e.stopPropagation();
        e.preventDefault();
        handleDragOver(dropZoneDisabled);
      },
      dragleave: (e: DragEvent) => {
        e.stopPropagation();
        e.preventDefault();
        handleDragLeave(e);
      },
      drop: (e: DragEvent) => {
        e.stopPropagation();
        e.preventDefault();
        handleDrop(dropZoneDisabled);
      },
    },
  }));

  return {
    draggedOver,
    disableChildrenDropZone,
    addHeading,
    addItem,
    handleDelete,
    handleDeleteChild,
    sectionProps,
  };
}
