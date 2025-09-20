<template>
    <div class="flex flex-col fixed w-[300px] top-[15%] right-[2.5%] pointer-events-auto max-md:w-[250px] max-md:top-[10%] z-10">
        <ColorPicker :key="resetKey" :color="color" @color-change="e => changeColor(e.cssColor)" />
        <div class="flex gap-2 bg-white justify-around p-2">
            <button @click="resetColor" data-testid="reset-btn">Reset</button>
            <button @click="$emit('onClose')" data-testid="close-btn">Close</button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ColorPicker } from "vue-accessible-color-picker";

    const { target } = defineProps<{target: "highlight" | "card" }>();
    const emit = defineEmits(["onClose"]);

    const { selectedItem } = useState<reactiveMenuState>("reactiveMenuState").value;
    const color = ref(
        !selectedItem ? undefined : 
        target === "highlight" ? selectedItem.highlightColor : 
        selectedItem.cardColor);

    const resetKey = ref(0);

    function changeColor(newColor: string) {
        if(!selectedItem) return;
        if(target === "highlight") selectedItem.highlightColor = newColor;
        else selectedItem.cardColor = newColor;
        if(color) color.value = newColor;
    }

    function resetColor() {
        if(!selectedItem) return;
        if(target === "highlight") selectedItem.highlightColor = undefined;
        else selectedItem.cardColor = undefined;
        color.value = undefined;
        resetKey.value++;
    }
</script>

<style>
    @import url("vue-accessible-color-picker/styles");
</style>