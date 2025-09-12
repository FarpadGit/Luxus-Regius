<template>
    <section class="min-h-page flex justify-center items-center">
        <form @submit.prevent="handleLogin" class="login-box">
           <label for="password">Jelszó</label>
            <input id="password" name="password" type="password" v-model="password" :class="{'border border-red-500': invalid}" />
            <span v-if="invalid" class="text-red-500 text-xs">Helytelen jelszó</span>
            <div class="flex justify-between items-end grow">
                <button type="submit" class="" :disabled="isLoading">
                    {{isLoading ? "Egy pillanat..." : "Bejelentkezés"}}
                </button>
                <button type="button" class="" @click="goBack" :disabled="isLoading">
                    Mégse
                </button>
            </div>
        </form>
    </section>
</template>

<script setup lang="ts">
    useSeoMeta({ title: "Belépés" });
    const isLoggedIn = useState<boolean>("isLoggedIn");
    const router = useRouter();
    const prevRoute = router.options.history.state.back?.toString() ?? "/";

    let password: string = "";
    const invalid = ref(false);
    const isLoading = ref(false);


    async function handleLogin() {
        invalid.value = false;
        isLoading.value = true;
        const response = await $fetch("/api/login", {
            method: "POST", 
            body: { password }
        });
        isLoading.value = false;
        if(!response) invalid.value = true;
        else {
            isLoggedIn.value = true;
            router.replace(prevRoute)
        }
    }

    function goBack() {
        router.replace(prevRoute);
    }
</script>

<style scoped>
    .login-box {
        display: flex;
        flex-direction: column;
        padding: 1rem;
        gap: 1rem;
        border: 1px solid black;
        border-radius: 10px;
        box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5);
        width: 20%;
        min-width: 300px;
        color: white;
        background-color: var(--color-header-footer);

        button:focus-visible {
            outline: none;
            color: var(--color-selection);
        }

        input {
            color: revert;

            &:focus-visible {
                outline: 1px solid var(--color-selection);
            }
        }
    }
</style>