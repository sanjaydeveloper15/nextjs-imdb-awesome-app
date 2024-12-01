import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()]
};
export default config;

// // tailwind.config.js
// import {nextui} from "@nextui-org/react";

// /** @type {import('tailwindcss').Config} */
// const config = {
//   content: [
//     // ...
//     // make sure it's pointing to the ROOT node_module
//     "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
//   ],
//   theme: {
//     extend: {},
//   },
//   darkMode: "class",
//   plugins: [nextui()]
// }

// export default config;
