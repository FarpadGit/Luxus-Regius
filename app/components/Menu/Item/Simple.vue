<template>
  <MenuDropZone
    :can-show="isMenuItem(reactiveMenu.draggedItem) && reactiveMenu.draggedItem.id !== menuItem.id" 
    :for-menu-element="menuItem" 
    small
  />
  <div
    ref="item-container" 
    :class="`item-container relative grid grid-cols-[4fr_1fr] p-5 ${!menuItem.editMode && menuItem.subtext === '' ? 'grid-rows-1': 'auto-rows-auto'}`"
    @mouseover="editButtonsVisible = true" 
    @mouseleave="editButtonsVisible = false"
    @focusin="editButtonsVisible = true"
    v-bind="menuItemProps.bind"
    v-on="menuItemProps.on"
  >
    <MenuEditable
      v-model="menuItem.text"
      :edit-mode="menuItem.editMode"
      :placeholder="'<Empty Title>'"
      :classes="`highlight ${menuItem.disabled && !menuItem.editMode ? 'line-through opacity-30': ''} `"
      auto-focus
      @on-blur="handleBlur"
      text-align="left"
    />
    <MenuEditable
      v-model="menuItem.price"
      :edit-mode="menuItem.editMode"
      :placeholder="'<Empty Price>'"
      :classes="`price ${menuItem.disabled && !menuItem.editMode ? 'line-through opacity-30': ''} `"
      @on-blur="handleBlur"
      text-align="center"
    />
    <MenuEditable
      v-model="menuItem.subtext"
      :edit-mode="menuItem.editMode"
      :placeholder="'Add subtext / description for item (optional)'"
      :optional="true"
      :classes="`subtext ${menuItem.disabled && !menuItem.editMode ? 'line-through opacity-30': ''} `"
      @on-blur="handleBlur"
      text-align="left"
    />
    <span></span>
    <MenuExtras :menu-item="menuItem" @on-blur="handleBlur" />
    <MenuEditButtons 
      v-if="!menuItem.editMode && editButtonsVisible" 
      spacing="far"
      :options="{addDisableButton: true}"
      @on-disable="menuItem.disabled = !menuItem.disabled"
      @on-delete="$emit('onDelete')"
    />
  </div>
</template>

<script setup lang="ts">
  const { menuItem } = defineProps<{ menuItem: itemType }>();
  const emit = defineEmits(["onDelete"]);

  const reactiveMenu = useState<reactiveMenuState>("reactiveMenuState").value;
  
  const editButtonsVisible = ref(false);
  const itemContainer = useTemplateRef("item-container");

  const { handleBlur, menuItemProps } = useMenuItem(() => menuItem, itemContainer);

  watchEffect(() => {
    if(reactiveMenu.selectedItem && reactiveMenu.selectedItem.id !== menuItem.id)
      editButtonsVisible.value = false;
  });
</script>