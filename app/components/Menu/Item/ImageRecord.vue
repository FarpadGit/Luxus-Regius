<template>
  <MenuDropZone 
    :can-show="isMenuItem(reactiveMenu.draggedItem) && reactiveMenu.draggedItem.id !== menuItem.id" 
    :for-menu-element="menuItem"
  />
  <div
    ref="item-container" 
    :class="`item-container relative grid grid-rows-[auto_1fr] lg:grid-rows-1 grid-cols-1 ${orientation === 'left' ? 'lg:grid-cols-[auto_1fr]' : 'lg:grid-cols-[1fr_auto]'} gap-4 justify-items-center p-5 w-full`"
    @mouseover="editButtonsVisible = true" 
    @mouseleave="editButtonsVisible = false"
    @focusin="editButtonsVisible = true"
    v-bind="menuItemProps.bind"
    v-on="menuItemProps.on"
  >
    <MenuImage 
      :class="{'lg:order-last' : orientation === 'right'}"
      :menu-item="menuItem" 
      :size="500" 
      @on-blur="handleBlur" 
    />
    <div class="grid grid-cols-1 grid-rows-[auto_1fr_1fr] w-full">
      <MenuEditable
        v-model="menuItem.text"
        :edit-mode="menuItem.editMode"
        :placeholder="'<Empty Title>'"
        :classes="`highlight ${menuItem.disabled && !menuItem.editMode ? 'line-through opacity-30': ''} `"
        auto-focus
        @on-blur="handleBlur"
        text-align="center"
      />
      <MenuEditable
        v-model="menuItem.subtext"
        :edit-mode="menuItem.editMode"
        :placeholder="'Add description for item (optional but recommended)'"
        :classes="`subtext ${menuItem.disabled && !menuItem.editMode ? 'line-through opacity-30': ''} `"
        @on-blur="handleBlur"
        use-text-area
      />
      <div class="flex flex-col justify-end py-2">
        <MenuExtras :menu-item="menuItem" @on-blur="handleBlur" />
      </div>
    </div>
    <MenuEditButtons 
      v-if="!menuItem.editMode && editButtonsVisible" 
      spacing="far"
      :options="{addDisableButton: true}"
      @on-disable="menuItem.disabled = !menuItem.disabled"
      @on-delete="$emit('onDelete')"
    />
  </div>
  <div class="w-full h-1 bg-[var(--color-separator)]"></div>
</template>

<script setup lang="ts">
  const { menuItem, orientation = "left" } = defineProps<{ menuItem: itemType, orientation?: "left" | "right" }>();
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

<style scoped>
  :deep(p), :deep(input), :deep(textarea) {
    font-size: 14pt;
  }
  
  .highlight,
  :deep(.highlight input),
  :deep(.highlight textarea) {
        font-size: 24pt;
  }

  @media not all and (min-width: 1280px) {
    @media (min-width: 1024px) {
      :deep(img) {
        width: 375px;
      }
    }
  }
</style>