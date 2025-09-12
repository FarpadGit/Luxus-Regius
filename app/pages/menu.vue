<template>
    <section id="hero">
        <div id="hero-text" v-in-viewport.once="'fade-in-down'">A Menü</div>
    </section>
    <section>
        <ReactiveMenu
            :key="menuKey"
            :menu="menuHeadings"
            :template-data="templateData"
            :read-only="!isLoggedIn"
            :is-loading="isLoading"
            @on-save="saveData"
            @on-reset="handleReset"
        />
    </section>
</template>

<script setup lang="ts">
    useSeoMeta({ title: "Luxus Regius | Menü" });
    const apiEndpoint = "Menu";
    const menuKey = ref(0);
    const isLoading = ref(false);
    const isLoggedIn = useState<boolean>("isLoggedIn");
    const { fetchMenu, saveData, reset } = usePage(apiEndpoint, isLoading);

    let menuHeadings: categoryType[], templateData: templateData;
    [menuHeadings, templateData] = await fetchMenu();

    async function handleReset() {
        [menuHeadings, templateData] = await reset();
        menuKey.value++;
    }
</script>

<style scoped>
    #hero {
        background-image: url("/hero_menu.jpg");
        background-attachment: fixed;

        #hero-text {
            color: var(--color-menu-highlight);
            font-size: 45pt;
            font-family: 'Homemade Apple', cursive;
            text-shadow: 3px 3px black;
        }
    }
</style>