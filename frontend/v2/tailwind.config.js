/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
        extend: {
            gridTemplateColumns: {
                sidebar: "256px auto", //for sidebar layout
                "sidebar-collapsed": "72px auto" //for collapsed sidebar layout
            }
        },
        colors: {
            // Base
            white: "#FFFFFF",
            "base/white": "#FFFFFF",
            "brand/primary/400": "#ca5d25",
            "brand/primary/500": "#F9712B",
            "brand/secondary/100": "#DCD5E3",
            "brand/secondary/400": "#75558E",
            "brand/secondary/500": "#522B72",
            "brand/secondary/600": "#42225B",
            // Gray
            "Default/gray/50": "#F9FAFB",
            "Default/gray/200": "#E5E7EB",
            "gray/100": "#F6F6F6",
            "gray/200": "#E4E6EA",
            "gray/300": "#D8DFEE",
            "gray/400": "#9BA2AE",
            "gray/500": "#6B7280",
            "gray/600": "#64748A",
            "Default/gray/500": "#6B7280",
            "gray/600": "#4B5563",
            "cool-gray/900": "#111827",
            "Default/gray/900": "#111827",
            "gray/900": "#131313",

            "deep-gray/100": "#0D0D0D",
            "deep-gray/200": "#202329",
            "deep-gray/300": "#161616",
            "deep-gray/400": "#19222F",
            "deep-gray/500": "#171717",
            // Slate
            "slate/50": "#F7F9FB",
            "slate/100": "#F0F4F8",
            "slate/200": "#E1E7EF",
            "slate/400": "#93A2B7",
            "slate/500": "#64748A",
            "slate/600": "#475569",
            "slate/700": "#334155",
            // Red
            "red/500": "#EE4444",
            // Green
            "Default/green/100": "#D1FAE5",
            "Default/green/800": "#065F46"
        },
        data: {
            tokenSelectOpen: 'ui~="tokenSelectOpen"'
        }
    },
    plugins: []
}
