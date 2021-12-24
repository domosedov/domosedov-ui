const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
    require("tailwindcss-radix")(),
    plugin(({ addVariant }) => {
      addVariant("is-valid", '&[data-is-invalid="false"]');
      addVariant("is-invalid", '&[data-is-invalid="true"]');
      addVariant("is-loading", '&[data-is-loading="true"]');
    }),
  ],
};
