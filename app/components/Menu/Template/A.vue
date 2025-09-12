<template>
    <div class="menu">
        <MenuSectionColumn
            v-for="heading in reactiveMenu.menuItems"
            :key="heading.id"
            :section-heading="heading" 
        />
        <MenuDropZone :can-show="isHeading(reactiveMenu.draggedItem)" list-guard="left" />
        <MenuLegend :legend="reactiveMenu.templateData.legend" />
    </div>
</template>

<script setup lang="ts">
    const reactiveMenu = useState<reactiveMenuState>("reactiveMenuState").value;
</script>

<style scoped>
    .menu {
        position: relative;
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 65%;
        min-height: 17rem;
        padding-bottom: 5rem;
        font-family: var(--font-menu-text);

        @media not all and (min-width: 768px) {
            width: 80%;
        }
    }
</style>