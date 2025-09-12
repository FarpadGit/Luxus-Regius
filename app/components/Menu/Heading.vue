<template>
    <div 
        :class="`heading-container relative flex ${twJustify()}`" 
        :tabindex="reactiveMenu.isMenuEditable ? 0 : undefined"
        @focusin="reactiveMenu.selectedItem = heading"
        @keypress="handleKeyPress"
        @mouseover="editButtonsVisible = true" 
        @mouseleave="editButtonsVisible = false"
        @dblclick.stop="reactiveMenu.isMenuEditable ? heading.editMode = true : null"
    >
        <PlasticInput 
            v-if="heading.editMode"
            v-model="heading.text"
            :inner-classes="headingClasses()"
            :placeholder="'<Empty Title>'"
            auto-focus
            @on-blur="handleBlur" 
        />
        <component 
            v-else 
            :is="heading.level === 0 ? 'h2' : 'h3'" 
            :class="`${headingClasses()} ${heading.text === '' ? 'invalid' : ''}`"
        >
            {{ heading.text === "" ? "<Empty Title>" : heading.text }}
            <MenuEditButtons 
                v-if="reactiveMenu.isMenuEditable && (editButtonsVisible || forceShowEditButtons)"
                :key="heading.children.length"
                class="!p-4"
                :options="getEditButtonOptions()"
                @on-add-section="$emit('onAddSection')"
                @on-add-item="$emit('onAddItem')"
                @on-delete="$emit('onDelete')"
            />
        </component>
    </div>
    <slot />
</template>

<script setup lang="ts">
    type justifyType = "center" | "left" | "right";

    const { 
        heading, 
        classes, 
        justify = "center", 
        forceShowEditButtons = false 
    } = defineProps<{ 
        heading: categoryType, 
        classes?: { level0?: string, level1?: string }, 
        justify?: justifyType, 
        forceShowEditButtons?: boolean 
    }>();
    const emit = defineEmits(["onAddSection", "onAddItem", "onDelete"]);
    const { level0: lvl0Classes = "", level1: lvl1Classes = "" } = classes ?? {};
    
    const editButtonsVisible = ref(false);
    const reactiveMenu = useState<reactiveMenuState>("reactiveMenuState").value;

    const twJustify = () => {
        if (justify === "left") return "justify-left";
        if (justify === "center") return "justify-center";
        if (justify === "right") return "justify-right";
        return "justify-center"
    };

    const twTextAlign = () => {
        if (justify === "left") return "text-left";
        if (justify === "center") return "text-center";
        if (justify === "right") return "text-right";
        return "text-center"
    };

    const headingClasses = () => {
        if (heading.level === 0) return ["level0 text-[20pt] md:text-[22.5pt]", twTextAlign(), lvl0Classes].join(" ");
        if (heading.level === 1) return ["level1 text-[15pt] md:text-[18pt]", twTextAlign(), lvl1Classes].join(" ");
        return twTextAlign();
    };

    function getEditButtonOptions() {
        return {
            addSectionButton: heading.children.length === 0 || hasHeadings(heading.children), 
            addItemButton: heading.children.length === 0 || hasMenuItems(heading.children),
        }
    }

    function handleBlur() {
        heading.editMode = false;
    }

    function handleKeyPress(e: KeyboardEvent) {
        if(!reactiveMenu.isMenuEditable) return;
        if(e.key.toLowerCase() === "enter") heading.editMode = true;
    }
</script>

<style scoped>
    .heading-container {
        padding-bottom: 0.75rem;

        &:has(.level0) {
            border-bottom: 1px solid color-mix(in srgb, var(--color-primary) 50%, black 15%);
        }

        &:focus, &:focus-visible {
            outline: none;

            h2, h3 {
                color: var(--color-selection);
            }
        }
    }

    h2, h3, :deep(input) {
        font-family: var(--font-menu-highlight);
        padding: 1rem;
        text-transform: uppercase;
        outline: none;
        font-weight: 600;
        letter-spacing: 2.4px;
        color: var(--color-menu-highlight);
    }

    h2, h3 {
        position: relative;
        user-select: none;
        min-width: 354px; /* at least as wide as the default input box width */

        &.invalid {
            color: var(--color-menu-faded-text);
        }
    }
</style>