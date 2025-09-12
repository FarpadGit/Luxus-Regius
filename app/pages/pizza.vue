<template>
    <section id="hero">
        <img src="/hero_pizza.jpg" alt=""/>
        <div id="hero-text" v-in-viewport.once="'fade-in-left'">Pizzák</div>
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
    useSeoMeta({ title: "Luxus Regius | Pizzák" });
    const apiEndpoint = "Pizzas";
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
            --color: #ffd549;
            color: var(--color);
            font-family: Etiquette;
            font-size: 110pt;
            text-transform: uppercase;
            text-decoration: 5px solid var(--color) underline;
            text-underline-offset: 1.25rem;
            --shadow-color: #860000;
            --shadow-color2: #86650099;
            text-shadow: 5px 5px var(--shadow-color), -5px 5px var(--shadow-color2), 5px -5px var(--shadow-color2), -5px -5px var(--shadow-color);

            @media not all and (min-width: 768px) {
                font-size: 90pt; 
                
                @media not all and (min-width: 640px) {
                    font-size: 75pt;
                }
            }
        }
    }
</style>