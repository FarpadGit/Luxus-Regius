<template>
    <section id="hero">
        <img src="/hero_cocktail.jpg" alt="" class="object-[center_90%]" />
        <h1 id="hero-text" v-in-viewport.once="'fade-in-up'">Koktél Bár</h1>
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
    useSeoMeta({ title: "Luxus Regius | Koktél Bár" });
    const apiEndpoint = "Cocktails";
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
            color: #840000;
            font-size: 100pt;
            font-family: Cocktails;
            text-shadow: 3px 3px white, -3px 3px white;

            @media not all and (min-width: 768px) {
                font-size: 75pt;

                @media not all and (min-width: 640px) {
                    font-size: 55pt;
                }
            }
        }
    }
</style>