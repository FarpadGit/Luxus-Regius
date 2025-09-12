<template>
    <div class="edit-container" :data-value="text">
        <input
            v-if="!useTextArea"
            v-model="text" 
            v-focus="autoFocus"
            :class="`w-full ${innerClasses}`"
            :placeholder="placeholder"
            @keydown="handleKeyDown"
            @input="handleInput"
            @blur="e => $emit('onBlur', e)"
        />
        <textarea 
            v-else 
            v-model="text"
            v-focus="autoFocus"
            :class="`w-full ${innerClasses}`"
            :placeholder="placeholder"
            spellcheck="false"
            @keydown="handleKeyDown"
            @blur="e => $emit('onBlur', e)"
        ></textarea>
    </div>
</template>

<script setup lang="ts">
    const { innerClasses = "", placeholder, autoFocus = false, useTextArea = false } = defineProps<{ innerClasses?: string, placeholder: string, autoFocus?: boolean, useTextArea?: boolean }>();
    const text = defineModel<string>();
    const emit = defineEmits(["onBlur", "onInput"]);

    function handleKeyDown(e:KeyboardEvent) {
        if(e.key.toLowerCase() === "enter") {
            emit("onBlur", null);
        }
        if(e.key.toLowerCase() === "escape") {
            emit("onBlur", null, true);
        }
    }

    // this function saves the input element's value into the data-value attribute of the edit-container element, 
    // which in turn will set a pseudo (an ::after) that will force the container into the right size
    function handleInput(e:Event) {
        (e.target as HTMLInputElement).parentElement!.dataset.value = (e.target as HTMLInputElement).value;
        emit("onInput");
    }
</script>

<style scoped>
    input, textarea {
        grid-area: 1/1;
        background-color: transparent;
        outline: none;

        &::placeholder {
            color: var(--color-menu-faded-text);
        }
    }

    textarea {
        resize: none;
        min-height: 5rem;
        overflow: hidden;
    }
    
    /* to ensure that the input element will grow with its content */
    /* an inline-grid parent container is needed with a hidden pseudo that has the same content as the input and takes up the same cell in the grid */
    .edit-container {
        display: inline-grid;
        flex-grow: 1;

        &::after {
            content: attr(data-value) ' ';
            font: inherit;
            padding: inherit;
            text-transform: inherit;
            letter-spacing: inherit;
            visibility: hidden;
            white-space: pre-wrap;
            grid-area: 1/1;
        }
    }
</style>