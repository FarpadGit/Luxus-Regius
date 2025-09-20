<template>
    <nav 
        @dragover.prevent="handleDragOver"
        class="fixed w-full flex flex-col md:flex-row items-center justify-center top-0 p-6 h-full md:h-[var(--nav-height)] bg-[var(--color-header-footer)] transition-colors duration-500" 
    >
        <ul class="w-full flex flex-col md:flex-row items-center justify-center gap-10 md:gap-4 tracking-tighter">
            <li><NuxtLink to="/">FŐOLDAL</NuxtLink></li>
            <li><NuxtLink to="/menu">MENÜ</NuxtLink></li>
            <li><NuxtLink to="/pizza">PIZZA</NuxtLink></li>
            <li><NuxtLink to="/cake">TORTA</NuxtLink></li>
            <li><NuxtLink to="/sushi">SUSHI</NuxtLink></li>
            <li><NuxtLink to="/cocktail">KOKTÉL</NuxtLink></li>
            <li><NuxtLink to="/wine">BORLAP</NuxtLink></li>
            <li><NuxtLink to="/weekly">HETI AJÁNLAT</NuxtLink></li>
            <li><NuxtLink to="/contact">KAPCSOLAT</NuxtLink></li>
        </ul>
        <div class="absolute top-0 flex w-32 p-6 pt-0 text-center md:static md:p-0 md:w-auto">
            <NuxtLink v-if="!isLoggedIn" to="/login" class="md:text-nowrap text-xs self-center">CSAK SZEMÉLYZET</NuxtLink>
            <button v-else @click="$emit('onLogout')" class="md:text-nowrap text-xs self-center">KIJELENTKEZÉS</button>
        </div>
    </nav>
</template>

<script setup lang="ts">
    const { isLoggedIn } = defineProps<{isLoggedIn: boolean}>();
    const emit = defineEmits(["onLogout"]);

    function handleDragOver() {
        window.scrollBy({top: -1});
    }

</script>

<style scoped>
    a, button {
        transition: color 0.5s ease;
        color: white;

        &:focus, &:focus-visible, &:hover {
          outline: none;
          text-decoration: none;
          color: var(--color-selection);
        }
      }

      .router-link-active {
        color: var(--color-selection);
      }
</style>