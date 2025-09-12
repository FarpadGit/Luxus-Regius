/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        accent: "var(--color-accent)",
        select: "var(--color-selection)",
        paragraph: "var(--color-text)",
        nav: "var(--color-header-footer)",
      },
      height: {
        nav: "var(--nav-height)",
      },
      minHeight: {
        page: "calc(100vh - var(--nav-height))",
      },
    },
  },
};
