<template>
    <div 
        v-for="(extra, i) in extrasToIterate" 
        :key="extra.id"
        class="relative col-span-2 grid grid-cols-[4fr_1fr] max-md:grid-cols-[3fr_1fr]"
        @mouseover="editButtonsVisible[i] = true" 
        @mouseleave="editButtonsVisible[i] = false"
    >
        <MenuEditable
            v-model="extra.text"
            :edit-mode="menuItem.editMode"
            :placeholder="'Add extra options (optional)'"
            :optional="true"
            :classes="`${menuItem.disabled && !menuItem.editMode ? 'line-through opacity-30': ''}`"
            @on-blur="handleBlur"
            text-align="indented"
        />        
        <MenuEditable
            v-model="extra.price"
            :edit-mode="menuItem.editMode"
            :placeholder="'<Empty Price>'"
            :optional="true"
            :classes="`price ${menuItem.disabled && !menuItem.editMode ? 'line-through opacity-30': ''}`"
            @on-blur="handleBlur"
            text-align="center"
        />
        <MenuEditButtons v-if="!menuItem.editMode && editButtonsVisible[i]" spacing="further" @on-delete="handleDelete(extra)" />
    </div>
</template>

<script setup lang="ts">
    type extraType = Exclude<itemType["extras"], undefined>[number];

    const { menuItem } = defineProps<{ menuItem: itemType }>();
    const emit = defineEmits(["onBlur"]);

    const editButtonsVisible = ref<boolean[]>(menuItem.extras?.map(() => false) || []);

    // newExtras will always have one more item in them to show a new empty pair of inputs to the user; use this only in edit mode
    const extrasToIterate = computed(() => menuItem.editMode ? newExtras.value : menuItem.extras);

    const newExtras = ref<extraType[]>([...menuItem.extras ?? [] , { id: menuItem.extras?.length || 0, text: "", price: "" }]);

    function handleBlur(e: FocusEvent, reset?: boolean) {
        const firstValue = newExtras.value[0];
        const extrasEmpty = newExtras.value.length === 1 && firstValue?.text === "" && firstValue?.price === "";

        if(!extrasEmpty) {
            menuItem.extras = newExtras.value.filter(e => e.text !== "" || e.price !== "");

            const lastValue = newExtras.value[newExtras.value.length - 1];
            if(lastValue?.text !== "" || lastValue?.price !== "")
                newExtras.value.push({ id: newExtras.value.length, text: "", price: "" });

            // convenience check: if there are multiple empty rows with no text or price in edit mode then clear out all but the last pair
            const clutterIndex = newExtras.value.findIndex((e, i) => e.text === "" && e.price === "" && i < newExtras.value.length - 1);
            if(clutterIndex > -1) newExtras.value.splice(clutterIndex, 1);
        }

        emit("onBlur", e, reset);
    }

    function handleDelete(extra: extraType) {
        menuItem.extras = menuItem.extras?.filter(e => e.id !== extra.id);
        if(menuItem.extras?.length === 0) menuItem.extras = undefined;
    }

    watchEffect(() => {
        if(menuItem.editMode) 
            newExtras.value = [...menuItem.extras ?? [] , { id: menuItem.extras?.length || 0, text: "", price: "" }];
    });
</script>