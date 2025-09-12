<template>
  <MenuDropZone
    :can-show="isHeading(reactiveMenu.draggedItem) && !dropZoneDisabled && reactiveMenu.draggedItem.id !== sectionHeading.id" 
    :for-menu-element="sectionHeading" 
  />
  <div
    :class="`menu-section ${draggedOver ? 'drag-highlight' : ''}`" 
    @mouseover="editButtonsVisible = true" 
    @mouseleave="editButtonsVisible = false"
    @focusin="editButtonsVisible = true"
    v-bind="sectionProps.bind"
    v-on="sectionProps.on"
  >
    <MenuHeading 
      :heading="sectionHeading"
      :classes="{level0: 'md:text-[25pt]', level1: 'md:text-[21pt]'}"
      :force-show-edit-buttons="editButtonsVisible"
      @on-add-section="addHeading('new subcategory ' + (sectionHeading.children.length + 1))"
      @on-add-item="addItem('new item '+ (sectionHeading.children.length + 1))"
      @on-delete="handleDelete(() => $emit('onDelete', sectionHeading))"
    >
      <template 
        v-for="(childMenuItem, index) in sectionHeading.children" 
        :key="childMenuItem.id"
      >
        <MenuSectionImageColumn
          v-if="isHeading(childMenuItem)"
          :section-heading="childMenuItem as categoryType" 
          :drop-zone-disabled="disableChildrenDropZone"
          :force-show-edit-buttons="editButtonsVisible || forceShowEditButtons"
          @on-delete="handleDeleteChild(childMenuItem)"
        />
          <MenuItemImageRecord
            v-else-if="reactiveMenu.isMenuEditable || !childMenuItem.disabled"
            :menu-item="childMenuItem as itemType"
            :orientation="index % 2 == 0 ? 'left' : 'right'"
            @on-delete="handleDeleteChild(childMenuItem)"
          />
      </template>
      <MenuDropZone 
        :can-show="isMenuItem(reactiveMenu.draggedItem) && hasMenuItems(sectionHeading.children)"
        :for-menu-element="sectionHeading"
        list-guard
      />
    </MenuHeading>
  </div>
</template>

<script setup lang="ts">
  const { 
    sectionHeading, 
    forceShowEditButtons = false, 
    dropZoneDisabled = false, 
  } = defineProps<{ 
    sectionHeading: categoryType, 
    forceShowEditButtons?: boolean, 
    disableChildrenDropZone?: boolean,
    dropZoneDisabled?: boolean,
    draggedOver?: boolean
  }>();
  const emit = defineEmits(["onDelete"]);

  const reactiveMenu = useState<reactiveMenuState>("reactiveMenuState").value;

  const editButtonsVisible = ref(false);

  const { 
    draggedOver, 
    disableChildrenDropZone, 
    addHeading,
    addItem,
    handleDelete, 
    handleDeleteChild, 
    sectionProps
  } = useSection(() => sectionHeading, dropZoneDisabled);

  watchEffect(() => {
    if(reactiveMenu.selectedItem && reactiveMenu.selectedItem.id !== sectionHeading.id)
      editButtonsVisible.value = false;
  });
</script>

<style scoped>
  .menu-section {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    transition: all 0.25s ease;
    --color-separator: color-mix(in srgb, var(--color-selection), black 5%);

    :deep(.heading-container:has(.level0)) {
      border-bottom: 0.25rem solid var(--color-separator);
    }
  }
</style>