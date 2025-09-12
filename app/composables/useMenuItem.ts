import type { ShallowRef } from "vue";

// Common funtionality used by all menu item templates.
//
// menuItem is a getter function passed by the component to access the object,
// in case its content changes from the ouside like a reset event overwriting the whole list.
// this is because these methods actively mutate menuItem and it needs to be up to date with the objects everyone else use
export function useMenuItem(
  menuItem: () => itemType,
  container: Readonly<ShallowRef<HTMLDivElement | null>>
) {
  const reactiveMenu = useState<reactiveMenuState>("reactiveMenuState").value;

  const oldMenuItem = ref(
    {} as Pick<itemType, "text" | "price" | "subtext" | "extras" | "imageUrl">
  );

  watchEffect(() => {
    // save the previous values in case of an Escape key reset
    if (!menuItem().editMode) {
      const { text, price, subtext, extras, imageUrl } = menuItem();
      oldMenuItem.value = {
        text,
        price,
        subtext,
        extras: extras?.map((e) => ({ ...e })),
        imageUrl,
      };
    }
  });

  function handleBlur(e: FocusEvent | null, reset?: boolean) {
    e?.stopPropagation();
    if (reset) {
      menuItem().text = oldMenuItem.value.text;
      menuItem().price = oldMenuItem.value.price;
      menuItem().subtext = oldMenuItem.value.subtext;
      menuItem().extras = oldMenuItem.value.extras;
      menuItem().imageUrl = oldMenuItem.value.imageUrl;
    }

    if (!container.value) return;
    if (container.value.contains(e?.relatedTarget as HTMLElement)) return;

    menuItem().editMode = false;
  }

  function handleKeyPress(e: KeyboardEvent) {
    if (!reactiveMenu.isMenuEditable) return;
    if (e.key.toLowerCase() === "enter") menuItem().editMode = true;
  }

  function getStyles() {
    let styles = [];
    if (menuItem().highlightColor)
      styles.push(`--color-menu-highlight: ${menuItem().highlightColor}`);
    if (menuItem().cardColor)
      styles.push(`--color-menu-card: ${menuItem().cardColor}`);
    return styles.join(";");
  }

  // common DOM properties and event listeners every template variant will implement
  const menuItemProps = computed(() => ({
    bind: {
      style: getStyles(),
      tabindex: reactiveMenu.isMenuEditable ? 0 : undefined,
      draggable: reactiveMenu.isMenuEditable && !menuItem().editMode,
    },
    on: {
      keypress: handleKeyPress,
      focusin: () => (reactiveMenu.selectedItem = menuItem()),
      blur: handleBlur,
      dblclick: (e: MouseEvent) => {
        e.stopPropagation();
        if (reactiveMenu.isMenuEditable) menuItem().editMode = true;
      },
      dragstart: (e: DragEvent) => {
        e.stopPropagation();
        reactiveMenu.draggedItem = menuItem();
      },
      dragover: (e: DragEvent) => {
        e.stopPropagation();
        e.preventDefault();
      },
      drop: (e: DragEvent) => {
        e.stopPropagation();
        e.preventDefault();
        reactiveMenu.draggedItem = false;
      },
    },
  }));

  return { handleBlur, menuItemProps };
}
