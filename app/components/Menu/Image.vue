<template>
    <div class="grid grid-rows-[1fr_auto] grid-cols-1 justify-items-center items-center w-full">
        <img
            v-show="!loadingState.started"
            :src="getSrc"
            :width="size"
            :height="size"
            draggable="false"
            class="select-none"
            :class="{'opacity-30': menuItem.disabled && !menuItem.editMode}"
            @error="handleError"
            @load="handleLoad"
        />
        <img
            v-if="loadingState.started"
            class="spinner"
            src="/spinner.svg"
            width="85"
            height="85"
            draggable="false"
            :style="`--width: ${size}px`"
        />
        <PlasticInput 
            v-if="menuItem.editMode"
            v-model="menuItem.imageUrl" 
            class="w-full overflow-hidden"
            inner-classes="text-center"
            placeholder="<No Image URL>"
            @on-input="handleInput"
            @on-blur="e => $emit('onBlur', e)"
        />
    </div>
</template>

<script setup lang="ts">
    const { menuItem, size = 200 } = defineProps<{ menuItem: itemType, size?: number }>();
    const emit = defineEmits(["onBlur"]);

    const loadingState = reactive({started: false, error: false});

    watchEffect(() => {
        if(!menuItem.editMode) loadingState.error = false;
        if(menuItem.imageUrl === "") loadingState.started = false;
    })

    const getSrc = computed(() => {
        if(menuItem.imageUrl === "" || loadingState.error) return "/no_image.jpg";
        return menuItem.imageUrl;
    });

    function handleInput() {
        loadingState.error = false;
        loadingState.started = true;
    }

    function handleError() {
        loadingState.error = true;
        loadingState.started = false;
    }

    function handleLoad() {
        if(loadingState.error) return;
        loadingState.error = false;
        loadingState.started = false;
    }
</script>

<style scoped>
    .spinner {
        width: var(--width, unset);
        aspect-ratio: 4;
    }
</style>