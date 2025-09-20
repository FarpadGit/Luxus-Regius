<template>
    <section id="hero">
        <h1 id="hero-text" v-in-viewport.once>
            <div class="flex">
                <span class="delay-[2.8s]">L</span>
                <span class="delay-[2.6s]">u</span>
                <span class="delay-[2.4s]">x</span>
                <span class="delay-[2.2s]">u</span>
                <span class="delay-[2.0s]">s</span>
            </div>
            <img src="/crest.png" alt="" width="90" v-in-viewport.once />
            <div class=" flex">
                <span class="delay-[2.0s]">R</span>
                <span class="delay-[2.2s]">e</span>
                <span class="delay-[2.4s]">g</span>
                <span class="delay-[2.6s]">i</span>
                <span class="delay-[2.8s]">u</span>
                <span class="delay-[3.0s]">s</span>
            </div>
        </h1>
        <Carousel v-bind="carouselConfig" slide-effect="fade" :mouse-drag="false" tabindex="-1" class="w-full h-full">
            <Slide v-for="slide in 7" :key="slide" style="width: 100%;">
                    <img class="carousel__item w-full h-full select-none" alt="" :src="`/carousel/${slide}.jpg`" draggable="false" />
            </Slide>
        </Carousel>
    </section>
    
    <section>
        <div v-in-viewport.once="'fade-in-right'" class="col-span-margined col-[2_/_4] flex flex-col justify-center pb-4 max-lg:items-center">
            <h2 class="flex flex-col leading-[2.35rem] max-xl:leading-[1.8rem]">
                <span>Királyi</span>
                <span class="text-end ml-[6.4rem] max-xl:ml-[5.2rem]">Fényűzés</span>
            </h2>
            <p>
                A belváros szívében található legfennségesebb fúziós étterem ami sohasem létezett, ugyanis ez egy minta oldal amit gyakorlatként készítettem el. 
                Igazából egy lorem ipsum szöveget is írhattam volna ide, de hát ha már a készítőt se érdekli annyira az alkotás hogy megírja, 
                akkor ugyan miért feltételeznénk a felhasználótól annyi érdeklődést hogy elolvassa?
            </p>
            <NuxtLink to="/menu" class="btn">Mutasd a Menüt</NuxtLink>
        </div>
        <div class="relative col-span-margined col-[7_/_12] sm:max-lg:mb-[25%]" v-in-viewport.once="'fade-in-left'">
            <img src="/landing1.jpg" alt="" width="660" class="sm:absolute w-full sm:max-lg:w-3/4 h-3/4 sm:h-full lg:h-[25vw] right-0 sm:-translate-x-[16%] lg:-translate-x-1/3 top-1/2 sm:-translate-y-1/4 lg:-translate-y-1/2 z-10" />
            <img src="/landing1b.jpg" alt="" width="660" class="max-sm:hidden max-lg:w-full" />
        </div>
    </section>
    <section>
        <div v-in-viewport.once="'fade-in-up'" class="col-span-margined col-[3_/_6] flex flex-col justify-center justify-self-end max-lg:items-center">
            <h2 class="flex flex-col">
                <span class="text-lg">Az</span>
                <span class="text-[4rem] tracking-[0.5rem] max-md:text-[2.5rem]">Étterem</span>
            </h2>
            <p class="max-w-[75%]">
                A Luxus Regius egy igazán párját ritkító és egyedülálló vendéglő, nemcsak azért mert fikcionális, hanem mert a kulináris szivárvány minten színét egyenlően képviseli, 
                a fine dining fogásoktól kezdve a street food-ig, és még saját borászattal is rendelkezik. 
                <br />
                (A beltéri képek nem fikcionálisak, ez a Leña étterem Dubaiban.)
            </p>
            <NuxtLink to="/cocktail" class="btn w-3/4">Megnézem a koktélokat</NuxtLink>
        </div>
        <img src="/landing2.jpg" alt="" class="col-span-margined col-[6_/_-1] justify-self-start w-screen"  v-in-viewport.once="'fade-in-left'"/>
    </section>
    <section id="midpoint" class="relative flex flex-col !min-h-fit !p-0">
        <NuxtLink to="/pizza" class="col-span-full lg:h-screen"><img src="/landing3.jpg" alt="" class="w-full h-full" /></NuxtLink>
        <NuxtLink to="/sushi" class="col-span-full lg:h-screen"><img src="/landing4.jpg" alt="" class="w-full h-full" /></NuxtLink>
        <img src="/seal.png" alt="" width="500" height="500" 
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[25deg] drop-shadow-[3px_3px_black] pointer-events-none max-md:scale-50"
        />
    </section>
    <section v-in-viewport="'bg-light'">
        <div class="col-span-margined col-[1_/_7] grid grid-rows-1 grid-cols-3 gap-1 justify-around sm:h-[500px] justify-items-center max-lg:grid-rows-2 max-lg:grid-cols-2">
            <img src="/landing5a.jpg" alt="" width="225" height="225" class="self-start max-sm:w-full" v-in-viewport.once="'fade-in-down'" />
            <img src="/landing5b.jpg" alt="" width="333" height="500" class="self-start row-span-2 h-full max-sm:w-full" v-in-viewport:200.once="'fade-in-up'" />
            <img src="/landing5c.jpg" alt="" width="225" height="225" class="self-end max-sm:w-full" v-in-viewport:400.once="'fade-in-up'" />
        </div>
        <div class="col-span-margined col-[9_/_12] flex flex-col justify-center max-lg:pt-4 max-lg:items-center" v-in-viewport:600.once="'fade-in-left'">
            <h2>A hab a t<span id="section-5-o">o</span>rtára</h2>
            <p>
                De ami kétség kívül éttermünk legpáratlanabb tulajdonsága, hogy az online menüket a böngészőn keresztül is szerkeszteni tudják a tulajdonosok. 
                Séfünk folyamatosan tökéletesíti mesterségét, így a vendégeink is rendszeresen számíthatnak egy újra és újra megújuló menüre. 
                Erre ad megoldást az oldal beépített interaktív menü szerkesztő eszköze, ami intelligens drag-n-drop funkcióval és egyszerű egérkattintásokkal valós időben alakítja át a megjelenített tartalmat.
            </p>
            <NuxtLink to="/cake" class="btn">Rendelek egy tortát</NuxtLink>
        </div>
    </section>
    <section v-in-viewport="'bg-light'">
        <div class="col-span-margined col-[4_/_7] flex flex-col justify-center lg:pr-4 max-lg:items-center max-lg:pb-4" v-in-viewport.once="'fade-in-right'">
            <h2>interAktív élmény</h2>
            <p>
                Próbáld ki te is milyen érzés egy olyan weboldallal dolgozni, ahol nem kell a legkisebb módosításokért is belemászni az oldal adatbázisába, vagy mindig elmagyarázni a vendégeknek hogy az általuk választott fogás most éppen elfogyott. 
                Csak lépj be a fejléc jobb szélső "Csak Személyzet" gombjára kattintva (a jelszót megtalálod a 
                <NuxtLink to="https://fabokarpad.hu" target="_blank">fabokarpad.hu</NuxtLink> oldalon), és már szerkesztheted is az oldal hét különböző menüjét. 
                Változtatásaidat el is mentheted ha végeztél, de azért legyél tekintettel az utánad következőkre és állítsd vissza nekik az alapértékeket. 
                (Vagy különben lehet, hogy ők teszik ezt meg helyetted egyetlen kattintással.)
            </p>
            <NuxtLink to="/wine" class="btn">Mutasd a Borlapot</NuxtLink>
        </div>
        <img src="/landing6.jpg" alt="" width="530" class="col-span-margined col-[7_/_11] max-lg:w-full" v-in-viewport.once="'fade-in-left'" />
    </section>
    <section v-in-viewport="'bg-light'">
        <img src="/landing7.jpg" alt="" width="790" class="col-span-margined col-[2_/_8] max-lg:w-full" v-in-viewport.once="'fade-in-right'" />
        <div class="col-span-margined col-[9_/_12] flex flex-col justify-center px-3 max-lg:items-center max-lg:pt-4" v-in-viewport.once="'fade-in-up'">
            <h2 class="grid grid-rows-2 grid-cols-[auto_auto] gap-x-4">
                <span class="text-end">Négy</span>
                <span class="text-start">különböző</span>
                <span class="text-end">sablon</span>
                <span class="text-start border-dashed border-r border-b border-current"></span>
            </h2>
            <p>
                A hét oldalon igazából ugyanaz az egy komponens található, csak hét különböző felállásban és hét különböző listát iterálva. Jelenleg 4 különböző sablon közül választhatsz hogyan szeretnéd megjeleníteni a menüdet, 
                mindegyik kategóriákba bontja az elemeket. Egy kategóriában vagy csak alkategóriák lehetnek, vagy önálló elemek, a kettőt keverni nem tudod. Erre tekintettel is van a szerkesztő interface, 
                sem gombokkal sem drag-n-drop művelettel nem enged meg efféle vegyülést. Szerkeszteni dupla kattintással vagy Enter billentyűvel lehet, Escape-pel pedig "mégsézni" a változásokat.
            </p>
            <NuxtLink to="/login" class="btn">Kipróbálom</NuxtLink>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { Carousel, Slide } from "vue3-carousel";
    useSeoMeta({ title: "Luxus Regius" });

    const carouselConfig = {
        itemsToShow: 2.5,
        wrapAround: true,
        autoplay: 5500,
        slideEffect: "fade",
        mouseDrag: "false"
    };
</script>

<style>
    @import url("~/../assets/css/landing.css");
</style>

<style scoped>
    #hero {
        background-color: transparent;
        height: 100vh;
        margin: 0;
        overflow: hidden;
        
        section.carousel {
            background-color: revert;
        }

        .carousel__item {
            filter: brightness(50%);
            animation: none;
            scale: 1.1;

            @keyframes pan {
                from { translate: none; }
                to { translate: -5vw; }
            }
        }
        .carousel__slide--prev .carousel__item,
        .carousel__slide--active .carousel__item {
            animation: pan 10s ease forwards;
        }

        #hero-text {
            position: absolute;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            width: 50%;
            font-size: 35pt;
            font-family: Romantic Aesthetic;
            z-index: 2;

            span {
                -webkit-text-fill-color: transparent;
                background-image: linear-gradient(to bottom, black 0%, var(--color-selection) 20%, var(--color-selection) 50%, white 90%, transparent 100%);
                background-clip: text;
                background-repeat: no-repeat;
                background-size: 0% 0%;
                background-position: left bottom;
                transition-property: background-size, filter;
                transition-duration: 3s, 7s;
                transition-timing-function: ease;
                filter: drop-shadow(1px 1px 0px #000) drop-shadow(-1px -1px 0px #000) brightness(0.0);
            }

            span:nth-child(3) {
                background-position: left top;
            }

            &.in-viewport {
                span {
                    background-size: 100% 100%;
                    filter: drop-shadow(1px 1px 0px #000) drop-shadow(-1px -1px 0px #000) brightness(1);
                }
            }

            img {
                opacity: 0;
                scale: 10;
                rotate: 90deg;
                transition: all 3s ease-out;

                &.in-viewport {
                    opacity: 1;
                    scale: 1;
                    rotate: 0deg;
                }
            }

            @media (min-width: 640px){
                font-size: 50pt;
            }
            @media (min-width: 768px){
                font-size: 70pt;
            }
            @media (min-width: 1280px){
                flex-direction: row;
                font-size: 57.5pt;
            }
            @media (min-width: 1536px){
                font-size: 70pt;
            }
        }
    }

    section:not(.carousel) {
        min-height: 100vh;
        display: grid;
        grid-template-columns: repeat(12, 8%);
        justify-content: space-between;
        align-items: center;
        padding: 1rem 0;

         h2 {
            font-family: Silver Glass;
            font-weight: bold;
        }

        p + a {
            margin-top: 1rem;
            text-transform: uppercase;
        }
    }

    img {
        object-fit: cover;
    }

    .col-span-margined {
        @media not all and (min-width: 1024px){
            grid-column: 2 / -2;

            @media (min-width: 768px){
                grid-column: 3 / -3;
            }
        }
    }

    #midpoint, section:not(:has(~ #midpoint)) {
        background-color: var(--color-primary);
    }    
    
    #section-5-o {
        position: relative;
        font-weight: 400;

        &::after {
            content: "o";
            position: absolute;
            font-size: medium;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
        }
    }
</style>