<template>
    <div 
        :class="`absolute flex flex-col items-end h-full pointer-events-none ${currentTemplate?.columns === 2 ? 'right-[2%]' : 'right-[5%]'}`"
        @mousemove="handleDrag"
        @mouseleave="isDragging = false"
    >
        <button 
            class="md:hidden sticky top-[10%] right-0 flex justify-center items-center w-12 h-12 bg-accent rounded-full p-4 pointer-events-auto z-10" 
            @click="showControlButtons = !showControlButtons"
        >
            <v-icon v-if="!showControlButtons" name="md-modeedit-outlined" class="text-background" />
            <v-icon v-else name="hi-solid-x" class="text-background"  />
        </button>
        <div v-if="showControlButtons" class="floating-buttons" :style="{transform: dragOffset}">
            <label
                for="template-select"
                class="text-xs select-none hover:cursor-move"
                @mousedown="handleDragStart"
                @mouseup="isDragging = false"
            >
                Change Template
            </label>
            <select id="template-select" :value="reactiveMenu.templateData.name" @change="handleTemplateChange">
                <option 
                    v-for="option in templateTypes" 
                    :value="option.id" 
                    :selected="reactiveMenu.templateData.name === option.id"
                >
                    {{ option.text }}
                </option>
            </select>
            <button 
                v-if="reactiveMenu.selectedItem" 
                @click="toggleColorPicker('highlight')"
                data-testid="change-highlight"
            >
                Change Highlight Color
            </button>
            <button 
                v-if="reactiveMenu.selectedItem && currentTemplate?.cards" 
                @click="toggleColorPicker('card')"
                data-testid="change-card"
            >
                Change Card Color
            </button>
            <span class="border border-dashed border-black"></span>
            <button class="add-item-btn" @click="addTopHeading('new category ' + (reactiveMenu.menuItems.length + 1), 'left')">
                {{ currentTemplate?.columns === 2 ? "Add New Category (Left)" : "Add New Category" }}
            </button>
            <button 
                v-if="currentTemplate?.columns === 2" 
                class="add-item-btn" 
                @click="addTopHeading('new category ' + (reactiveMenu.menuItems.length + 1), 'right')"
            >
                Add New Category (Right)
            </button>
            <button class="legend-btn" @click="toggleLegend()">
                <label 
                    for="legend-input"
                    class="flex justify-center pointer-events-none"
                >
                    <input name="legend-input" type="checkbox" class="hidden" />
                    <span>{{ reactiveMenu.templateData.legend.show ? "Remove" : "Add" }} Legend</span>
                </label>
            </button>
            <span class="border border-dashed border-black"></span>
            <button class="save-btn" @click="$emit('onSave')" :disabled="isLoading">
                <span v-if="isLoading">
                    <v-icon name="la-spinner-solid" class="text-accent" animation="spin-pulse" />
                    One moment...
                </span>
                <span v-else>Save Changes</span>
            </button>
            <button class="rollback-btn" @click="$emit('onRollback')" :disabled="isLoading">
                Discard Changes
            </button>
            <button class="reset-btn" @click="$emit('onReset')" :disabled="isLoading">
                Reset This Menu
            </button>
        </div>
        <ColorPicker 
            v-if="colorPicker.show"
            :target="colorPicker.target"
            @on-close="colorPicker.show = false"
        />
    </div>
</template>

<script setup lang="ts">
    import templateTypes from "~/../assets/templateTypes.json";

    const showControlButtons = ref(true);
    const drag = {
        prevX: 0,
        prevY: 0,
        offsetX: 0,
        offsetY: 0,
    }

    const { isLoading } = defineProps<{ isLoading: boolean }>();
    const emit = defineEmits(["onSave", "onRollback", "onReset"]);

    const reactiveMenu = useState<reactiveMenuState>("reactiveMenuState").value;

    const currentTemplate = computed(() => templateTypes.find((template) => template.id === reactiveMenu.templateData.name));
    const colorPicker = reactive<{show: boolean, target: "highlight" | "card"}>({show: false, target: "highlight"});

    const dragOffset = ref("unset");
    const isDragging = ref(false);

    // local panel dragging
    function handleDragStart(e: MouseEvent | PointerEvent) {
        drag.prevX = e.screenX;
        drag.prevY = e.screenY;
        isDragging.value = true;
    }

    function handleDrag(e: MouseEvent | PointerEvent) {
        if(isDragging.value) {
            drag.offsetX += e.screenX - drag.prevX;
            drag.offsetY += e.screenY - drag.prevY;
            drag.prevX = e.screenX;
            drag.prevY = e.screenY;
            dragOffset.value = `translate(${drag.offsetX}px,${drag.offsetY}px)`;
        }
    }

    // color picker
    function toggleColorPicker(target: typeof colorPicker.target) {
        colorPicker.show = !colorPicker.show;
        colorPicker.target = target;
    }

    // action buttons
    function addTopHeading(text: string, column: "left" | "right") {
        const newCategory: categoryType = { 
            id: generateUniqueKey(reactiveMenu.menuItems), 
            text,
            level: 0, 
            isRightColumn: column === "right", 
            children: [], 
            editMode: true, 
            parent: null,
         };
        reactiveMenu.menuItems.push(newCategory);
    }

    function toggleLegend() {
        reactiveMenu.templateData.legend.show = !reactiveMenu.templateData.legend.show;
    }

    function handleTemplateChange(e: Event) {
        const newTemplate = templateTypes.find(template => template.id === (e.target as HTMLInputElement).value);
        if(!newTemplate) return;
        reactiveMenu.templateData.name = newTemplate.id as templateType;
    }
</script>

<style scoped>
    .floating-buttons {
        position: sticky;
        display: flex;
        flex-direction: column;
        padding: 1rem;
        gap: 0.25rem;
        top: 17%;
        border: 1px solid black;
        border-radius: 10px;
        box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5);
        z-index: 10;
        height: fit-content;
        background-color: var(--color-primary);
        pointer-events: all;

        button:focus-visible {
            outline: none;
            color: var(--color-selection);
        }

        select {
            text-align: center;
            text-align-last: center;
        }
    }
</style>