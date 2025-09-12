type observedElement = HTMLElement & {
  __vueInViewportObserver?: IntersectionObserver;
};

export const checkIntersection = {
  mounted(el: observedElement, binding: DirectiveBinding) {
    const inViewportClass = "in-viewport";

    const once = binding.modifiers.once;
    const delay = binding.arg && !isNaN(+binding.arg) ? +binding.arg : null;
    if (binding.value) el.classList.add(binding.value);

    if (once && el.classList.contains(inViewportClass)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          if (delay == null) el.classList.add(inViewportClass);
          else
            setTimeout(() => {
              el.classList.add(inViewportClass);
            }, delay);
          if (once) {
            observer.unobserve(el);
          }
        } else {
          el.classList.remove(inViewportClass);
        }
      },
      { threshold: 0.1, rootMargin: "0px" }
    );

    observer.observe(el);

    el.__vueInViewportObserver = observer;
  },

  updated(el: observedElement) {
    if (el.__vueInViewportObserver) {
      const observer = el.__vueInViewportObserver;
      observer.unobserve(el);
      observer.observe(el);
    }
  },
  unmounted(el: observedElement) {
    if (el.__vueInViewportObserver) {
      el.__vueInViewportObserver.disconnect();
      delete el.__vueInViewportObserver;
    }
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("in-viewport", checkIntersection);
});
