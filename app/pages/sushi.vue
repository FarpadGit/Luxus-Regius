<template>
    <section id="hero">
        <img src="/hero_sushi.png" alt="" class="!object-contain object-[90%_center] pt-8 max-lg:object-center max-lg:brightness-50" v-in-viewport.once="'fade-in-up'" />
        <h1 id="hero-text" v-in-viewport.once="'fade-in-down'">
            <span class="relative">
                Sushik
                <img src="/underline.png" alt="" v-in-viewport:500.once="'fade-in-right'">
            </span>
        </h1>
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
    useSeoMeta({ title: "Luxus Regius | Sushik" });
    const apiEndpoint = "Sushis";
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
        justify-content: left;

        #hero-text {
            width: 100%;
            margin-left: 0;
            font-size: 65pt;
            font-family: Hitto Sushi;
            text-transform: uppercase;
            text-shadow: 5px 5px black;
            letter-spacing: 10px;

             @media (min-width: 640px) {
                font-size: 90pt;
            }
            @media  (min-width: 1024px) {
                width: 40%;
                margin-left: 10%;
                font-size: 70pt;
            }
            @media  (min-width: 1280px) {
                margin-left: 20%;
                font-size: 100pt;
            }
            

            img {
                position: absolute;
                width: 100%;
                left: 0;
                bottom: 10%;
                filter: drop-shadow(2px 2px black);
                z-index: -1;
            }
        }
    }
</style>