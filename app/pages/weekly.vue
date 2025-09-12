<template>
    <section id="hero">
        <img src="/hero_weekly.jpg" alt="" class="object-[center_30%]" />
        <div id="hero-text" v-in-viewport.once="'fade-in-right'">Heti Ajánlat</div>
    </section>
    <section>
        <div class="flex flex-col gap-8 text-center p-8">
            <p>Ez az oldal még jelenleg fejlesztés alatt áll...</p>
            <p>
                Na jó ez nem igaz, szándékosan hagytam meg egy üres oldalt hogy kényelmesen eljátszhass az oldal Menü Szerkesztő eszközével, ha esetleg a többi kész oldalt megpiszkálni egy kicsit félelmetesnek hatna. 
                <br/>
                (Ne érezd úgy, bármikor vissza tudom őket állítani.)
                <br/>
                Ha a jobb felső sarokra kattintva bejelentkezel (jelszó a portfóliós oldalamon), akkor itt látni fogsz egy szerkesztő panelt (meg az összes többi oldalon is), amivel kedvedre szerkeszthetsz egy vadonat új menüt.
            </p>
        </div>
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
    useSeoMeta({ title: "Luxus Regius | Heti Ajánlat" });
    const apiEndpoint = "Weekly";
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
            --color: #ffe479;
            color: var(--color);
            font-family: The Restaurant;
            font-size: 75pt;
            text-decoration: 5px wavy var(--color) underline;
            text-underline-offset: 1.75rem;
            text-shadow: 3px 3px black;

            @media not all and (min-width: 768px) {
                font-size: 60pt;

                @media not all and (min-width: 640px) {
                    font-size: 50pt;
                }
            }
        }
    }
</style>