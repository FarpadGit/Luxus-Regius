<template>
    <div 
        v-if="legend.show"
        id="legend-container" 
        class="w-full"
        :tabindex="reactiveMenu.isMenuEditable ? 0 : undefined" 
        @keypress="handleKeyPress"
        @dblclick.stop="reactiveMenu.isMenuEditable ? editMode = true : null"
    >
        <MenuEditable
            v-model="legend.text"
            classes="w-full"
            :edit-mode="editMode"
            placeholder="Add Some Kind of Legend For Allergens or Tipping"
            text-align="center"
            auto-focus
            @on-blur="editMode = false"
        />
    </div>
</template>

<script setup lang="ts">
    const { legend } = defineProps<{ legend: templateData["legend"]}>();
    const editMode = ref(legend.text === "");

    const reactiveMenu = useState<reactiveMenuState>("reactiveMenuState").value;

    function handleKeyPress(e: KeyboardEvent) {
        if(e.key.toLowerCase() === "enter") editMode.value = true;
    }
</script>

<style scoped>
    :deep(p), :deep(input) {
        color: black;
        font-size: 1rem;
        font-weight: 400;
        padding: 1rem;
        outline: none;
    }

    #legend-container:focus, #legend-container:focus-visible {
        outline: none;

        &:deep(p) {
        color: var(--color-selection);
        }
    }
</style>