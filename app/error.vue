<template>
    <NuxtLayout>
        <div class="min-h-page flex flex-col justify-center items-center bg-[#EEEADF]" v-if="error?.statusCode === 404">
            <img src="/404.jpg" />
        </div>
     </NuxtLayout>
    
</template>

<script setup lang="ts">
    const error = useError();
</script>

<style scoped>
    h1 {
        color: var(--color-accent);
        font-family: The Restaurant;
        font-size: 75pt;
        user-select: none;
        text-transform: uppercase;
    }

    h2 {
        color: var(--color-text);
        font-family: Cagliostro;
        font-size: 25pt;
        user-select: none;
    }
</style>