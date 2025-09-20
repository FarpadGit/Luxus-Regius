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
      :force-show-edit-buttons="editButtonsVisible"
      justify="left"
      @on-add-section="addHeading('new subcategory ' + (sectionHeading.children.length + 1))"
      @on-add-item="addItem('new item '+ (sectionHeading.children.length + 1))"
      @on-delete="handleDelete(() => $emit('onDelete', sectionHeading))"
    >
    <div :class="`pt-2 ${hasMenuItems(sectionHeading.children) ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center' : ''} ${!reactiveMenu.draggedItem ? 'gap-2' : ''}`">
      <template 
        v-for="childMenuItem in sectionHeading.children" 
        :key="childMenuItem.id"
      >
        <MenuSectionCardList
          v-if="isHeading(childMenuItem)"
          :section-heading="childMenuItem as categoryType" 
          :drop-zone-disabled="disableChildrenDropZone"
          @on-delete="handleDeleteChild(childMenuItem)"
        />
        <div v-else :class="`w-full grid ${reactiveMenu.isMenuEditable ? 'grid-cols-[auto_1fr]' : 'grid-cols-1'}`">
          <MenuItemImageCard
            v-if="reactiveMenu.isMenuEditable || !childMenuItem.disabled"
            :menu-item="childMenuItem as itemType"
            @on-delete="handleDeleteChild(childMenuItem)"
          />
        </div>
      </template>
    </div>
      <MenuDropZone 
        :can-show="isMenuItem(reactiveMenu.draggedItem) && hasMenuItems(sectionHeading.children)"
        :for-menu-element="sectionHeading"
        list-guard
        small
      />
    </MenuHeading>
  </div>
</template>

<script setup lang="ts">
  const { 
    sectionHeading, 
    dropZoneDisabled = false, 
  } = defineProps<{ 
    sectionHeading: categoryType, 
    dropZoneDisabled?: boolean,
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
    width: 100%;
    transition: all 0.25s ease;
  }
</style>