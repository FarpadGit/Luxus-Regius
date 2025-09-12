<template>
    <section id="hero">
        <img src="/hero_cake.jpg" alt="" />
        <div id="hero-text" v-in-viewport.once="'fade-in-up'">Torták</div>
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
    useSeoMeta({ title: "Luxus Regius | Torták" });
    const apiEndpoint = "Cakes";
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
        #hero-text {
            color: #f88;
            font-size: 100pt;
            font-family: Gummy Candy;
            --shadow-color: white;
            text-shadow: 3px 3px var(--shadow-color), -3px 3px var(--shadow-color), -3px -3px var(--shadow-color), 3px -3px var(--shadow-color);

            @media not all and (min-width: 640px) {
                font-size: 60pt;
            }
        }
    }
</style>