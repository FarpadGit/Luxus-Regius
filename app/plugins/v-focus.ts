export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("focus", {
    mounted(el, binding) {
      if (el && binding.value === true) el.focus();
    },
  });
});
