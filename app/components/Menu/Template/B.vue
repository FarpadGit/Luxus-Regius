<template>
    <div class="menu">
        <div class="w-full flex flex-col">
            <MenuSectionColumn
                v-for="heading in menuLeft"
                :key="heading.id"
                :section-heading="heading" 
            />
            <MenuDropZone :can-show="isHeading(reactiveMenu.draggedItem)" list-guard="left" />
        </div>
        <div class="w-full flex flex-col">
            <MenuSectionColumn
                v-for="heading in menuRight"
                :key="heading.id"
                :section-heading="heading" 
            />
            <MenuDropZone :can-show="isHeading(reactiveMenu.draggedItem)" list-guard="right" />
        </div>
        <MenuLegend :legend="reactiveMenu.templateData.legend" class="col-span-2" />
    </div>
</template>

<script setup lang="ts">
    const reactiveMenu = useState<reactiveMenuState>("reactiveMenuState").value;
    const menuLeft = computed(() => reactiveMenu.menuItems.filter(i => i.isRightColumn == false));
    const menuRight = computed(() => reactiveMenu.menuItems.filter(i => i.isRightColumn == true));
</script>

<style scoped>
  .menu {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    gap: 4rem;
    width: 80%;
    min-height: 17rem;
    padding-bottom: 5rem;
    font-family: var(--font-menu-text);

    @media not all and (min-width: 768px) {
        display: flex;
        flex-direction: column;
    }

    @media not all and (min-width: 1024px) {
        @media (min-width: 768px) {
            width: 95%;
            gap: 2rem;
        }
    }
  }
</style>