<template>
    <div class="relative flex justify-center" @drop.prevent="reactiveMenu.draggedItem = false">
        <MenuTemplateA
            v-if="reactiveMenu.templateData.name === 'A'"
        />
        <MenuTemplateB
            v-else-if="reactiveMenu.templateData.name === 'B'"
        />
        <MenuTemplateC
            v-else-if="reactiveMenu.templateData.name === 'C'"
        />
        <MenuTemplateD
            v-else-if="reactiveMenu.templateData.name === 'D'"
        />
        <p v-else>An error happened while loading menu information. Please check the integrity of your template data.</p>
        <MenuControlButtons 
            v-if="reactiveMenu.isMenuEditable && templateTypes.map(t => t.id).includes(reactiveMenu.templateData.name)"
            :is-loading="isLoading"
            @on-save="handleSave" 
            @on-rollback="handleRollback" 
            @on-reset="$emit('onReset')" 
        />
    </div>
</template>

<script setup lang="ts">
    import templateTypes from "~/../assets/templateTypes.json";

    const { menu, templateData, readOnly = false, isLoading = false } = defineProps<{menu: categoryType[], templateData: templateData, readOnly?: boolean, isLoading?: boolean}>();
    const emit = defineEmits(["onSave", "onReset"]);

    const reactiveMenu = useState<reactiveMenuState>("reactiveMenuState");
    reactiveMenu.value = {
        menuItems: structuredClone(addParents(menu, null) as categoryType[]),
        templateData: structuredClone(templateData),
        isMenuEditable: !readOnly,
        selectedItem: false,
        draggedItem: false
    };

    function handleSave() {
        const newMenu = removeClientProperties(reactiveMenu.value.menuItems);
        const newTemplateData = reactiveMenu.value.templateData;
        emit("onSave", { newMenu, newTemplateData });
    }

    function handleRollback() {
        reactiveMenu.value.menuItems = structuredClone(addParents(menu, null) as categoryType[]);
        reactiveMenu.value.templateData = structuredClone(templateData);
    }
</script>

<style>
    /* common styles for section containers */
    .menu-section.drag-highlight {
        background-color: var(--color-dropzone-highlight);
    }

    /* common styles for item containers */
    .item-container {

        &:focus,
        &:focus-visible {
            outline: none;

            p {
                color: var(--color-selection);
            }
        }

        p,
        input,
        textarea {
            font-size: 12pt;
            font-weight: 400;
            color: var(--color-menu-text);
            padding: 0.5rem 0;
            outline: none;

            @media not all and (min-width: 768px) {
                font-size: 10pt;
            }
        }

        .highlight,
        .highlight input,
        .highlight textarea {
            font-family: var(--font-menu-highlight);
            text-transform: uppercase;
            font-size: 13.5pt;
            letter-spacing: 1.3px;
            color: var(--color-menu-highlight);

            @media not all and (min-width: 768px) {
                font-size: 12pt;
            }
        }

        .price,
        .price input,
        .price textarea {
            font-weight: 600;

            @media (min-width: 1024px) {
                word-break: keep-all;
            }
        }

        .subtext,
        .subtext input,
        .subtext textarea {
            border-top: 1px dashed var(--color-menu-text);
        }
    }
</style>