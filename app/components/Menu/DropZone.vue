<template>
    <div 
        v-if="reactiveMenu.isMenuEditable"
        :class="getClasses()"
        draggable="false"
        @dragover.prevent.stop="handleDragOver"
        @dragleave.prevent.stop="handleDragLeave"
        @drop.prevent.stop="handleDrop"
    ></div>
</template>

<!-- usage:
    <DropZone :for-menu-element="element"/>:               dragged item will be inserted before "element" (can be category or menu item)
    <DropZone list-guard="left"/>:                         dragged item will be inserted at the end of the whole list, with list-guard setting its new column
    <DropZone :for-menu-element="element" list-guard/>:    dragged item will be inserted into the children of "element" as the last child
-->

<script setup lang="ts">
    const { 
        forMenuElement: element, 
        canShow = true,
        listGuard = false, 
        small = false, 
        vertical = false 
    } = defineProps<{
        forMenuElement?: categoryType | itemType | undefined,
        canShow?: boolean,
        listGuard?: boolean | "left" | "right",
        small?: boolean
        vertical?: boolean
    }>();
    const emit = defineEmits(["onDrop"]);

    const reactiveMenu = useState<reactiveMenuState>("reactiveMenuState").value;
    const draggedOver = ref(false);

    function getClasses() {
        let classes = ["dropzone"];
        if(reactiveMenu.draggedItem && canShow) classes.push("active");
        if(draggedOver.value) classes.push("drag-highlight");
        if(small) classes.push("small");
        if(vertical) classes.push("vertical");
        if(listGuard && !vertical) classes.push("grow");

        return classes.join(" ");
    }

    function handleDragOver(e: DragEvent) {
        if(!reactiveMenu.draggedItem || reactiveMenu.draggedItem.id === element?.id) return;
        if(typeof listGuard === "string" && isMenuItem(reactiveMenu.draggedItem)) return;

        draggedOver.value = true;
    }

    function handleDragLeave(e: DragEvent) {
        draggedOver.value = false;
    }

    function handleDrop(e: DragEvent) {
        if(!draggedOver.value || !reactiveMenu.draggedItem || reactiveMenu.draggedItem.id === element?.id) {
            reactiveMenu.draggedItem = false;
            return;
        }

        draggedOver.value = false;

        const parentOfDropped = reactiveMenu.draggedItem.parent;
        const parentOfTarget = listGuard === true ? element as categoryType : element?.parent || null;

        const siblingsOfDropped = parentOfDropped == null ? reactiveMenu.menuItems : parentOfDropped.children;
        const siblingsOfTarget = parentOfTarget == null ? reactiveMenu.menuItems : parentOfTarget.children;        
        
        const indexOfDropped = siblingsOfDropped.findIndex(item => item.id === (reactiveMenu.draggedItem as itemType | categoryType).id);
        const indexOfTarget = siblingsOfTarget.findIndex(item => item.id === element?.id);

        let correctedIndex = indexOfTarget;

        // some edge cases with sibling level swaps
        if(parentOfDropped?.id === parentOfTarget?.id) {
            // if dropping higher element to lower position then target index needs correction after removal
            if(indexOfDropped < indexOfTarget) correctedIndex = indexOfTarget - 1;
        }

        // delete item from old parent's children (this can affect indices)
        siblingsOfDropped.splice(indexOfDropped, 1);
        // insert item into new parent's children
        if(listGuard == false ) siblingsOfTarget.splice(correctedIndex, 0, reactiveMenu.draggedItem as any);
        else siblingsOfTarget.push(reactiveMenu.draggedItem as any);

        if(isHeading(reactiveMenu.draggedItem) && !isMenuItem(element)) {
            setNewHeadingLevels(reactiveMenu.draggedItem, (element?.level || 0) - 1);

            if(isHeading(element)) {
                reactiveMenu.draggedItem.isRightColumn = element.isRightColumn;
            }
            if(typeof listGuard === "string") {
                reactiveMenu.draggedItem.isRightColumn = listGuard === "right";
            }
        }

        reactiveMenu.draggedItem.parent = parentOfTarget;
        
        reactiveMenu.draggedItem = false;
    }
</script>

<style scoped>
    .dropzone {
         width: 100%;
        height: 0px;
        align-self: center;
        border: 1px dashed transparent;
        border-image: url("/border-black.png") 1 round;
        transition: all 0.25s ease;
        opacity: 0;

        &.small {
            width: 90%;
        }
        
        &.vertical {
            width: 0px;
            height: 100%;

            &.small {
                height: 90%;
            }
        }
    }

    .active {
        height: 20px;
        align-self: center;
        opacity: 1;
        
        &.small {
            width: 90%;
            height: 10px;
        }

        &.vertical {
            width: 20px;
            height: 100%;

            &.small {
                width: 10px;
                height: 90%;
            }
        }

        &.drag-highlight {
            background-color: var(--color-dropzone-highlight);
            height: 20px;
            border: none;

            &.vertical {
                height: 100%;
                width: 20px;
            }
        }
    }
</style>