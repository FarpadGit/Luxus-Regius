<template>
  <div @dragover.prevent="" @drop.prevent.stop="reactiveMenu.draggedItem = false">
    <NavButtons 
      class="flex z-50 max-md:hidden max-lg:text-xs"
      :class="{'top': atScrollTop}"
      :is-logged-in="isLoggedIn"
      @on-logout="handleLogout"
    />
    <div class="block md:hidden">
      <button 
        @click="showMobileNav = !showMobileNav" 
        :class="`fixed right-0 top-0 w-full ${showMobileNav ? 'sm:w-[30%]' : ''} h-nav text-end pr-6 ${showMobileNav ? 'bg-nav' : 'bg-background'} text-white transition-all duration-300 ${showMobileNav ? '' : 'delay-200'} z-50`"
      >
        <v-icon v-if="!showMobileNav" name="gi-fork-knife-spoon" scale="1.75" fill="var(--color-accent)" />
        <v-icon v-else name="gi-knife-fork" scale="1.75" fill="var(--color-accent)" />
      </button>
      <div :class="`fixed right-0 w-full sm:w-[30%] h-full ${showMobileNav ? 'translate-y-0' : '-translate-y-full'} transition-transform duration-500 z-40`">
        <NavButtons
          :is-logged-in="isLoggedIn"
          @on-logout="handleLogout"
        />
      </div>
    </div>
    <main :key="refreshKey" :class="classes">
      <slot />
    </main>
    <footer 
      class="w-full p-6 bg-[var(--color-header-footer)] tracking-tighter text-white text-center text-sm md:text-base"
      v-html="footerTextFor(route?.path)"
    >
    </footer>
  </div>
</template>

<script setup lang="ts">
  import { footerTextFor } from '~/utils/footerText';

  const route = useRoute();
  const router = useRouter();
  router.afterEach(() => showMobileNav.value = false);

  const classes = computed(() => {
    switch (route?.path) {
      case "/": return "page landing"
      case "/menu": return "page menu"
      case "/pizza": return "page pizza"
      case "/cake": return "page cake"
      case "/sushi": return "page sushi"
      case "/cocktail": return "page cocktail"
      case "/wine": return "page wine"
      default: return "page";
    }
  });
  
  const atScrollTop = ref(true);
  function handleScroll() {
    atScrollTop.value = window.scrollY === 0;
  }

  onMounted(() => {
        window.addEventListener("scroll", handleScroll);
  });
  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  const refreshKey = ref(0);
  const showMobileNav = ref(false);
  
  const isLoggedIn = useState<boolean>("isLoggedIn");
  isLoggedIn.value = false;
  const reactiveMenu = useState<reactiveMenuState>("reactiveMenuState").value;

  function handleLogout() {
    isLoggedIn.value = false;
    refreshKey.value++;
  }
</script>