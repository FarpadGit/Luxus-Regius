<template>
    <section id="hero">
        <img src="/hero_wine.jpg" alt="" />
        <h1 id="hero-text" v-in-viewport.once="'fade-in-down'">Borlap</h1>
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
    useSeoMeta({ title: "Luxus Regius | Borlap" });
    const apiEndpoint = "Wines";
    const menuKey = ref(0);
    const isLoading = ref(false);
    const isLoggedIn = useState<boolean>("isLoggedIn");
    const { fetchMenu, saveData, reset } = usePage(apiEndpoint, isLoading);

    let menuHeadings: categoryType[], templateData: templateData;
    [menuHeadings, templateData] = await fetchMenu();

    async function handleReset() {
        [menuHeadings, templateData] = await reset();
        menuKey.value++;
    };
</script>

<style scoped>
    #hero {
        &::after {
            content: "";
            position: absolute;
            bottom: 0;
            transform: translateY(100%);
            width: 100%;
            height: 6.25rem;
            background-image: linear-gradient(to bottom, #00000088 50%, transparent);
        }

        #hero-text {
            font-size: 50pt;
            font-family: Batoshi;
            text-transform: uppercase;
            text-shadow: 3px 3px rgba(0, 0, 0, 0.5);

            @media not all and (min-width: 640px) {
                font-size: 40pt;
            }
        }
    }
</style>