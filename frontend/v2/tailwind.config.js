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
            "brand/primary/500": "#F9712B",
            "brand/secondary/100": "#DCD5E3",
            "brand/secondary/500": "#522B72",
            // Gray
            "Default/gray/50": "#F9FAFB",
            "Default/gray/200": "#E5E7EB",
            "gray/100": "#F6F6F6",
            "gray/200": "#E4E6EA",
            "gray/400": "#9BA2AE",
            "gray/500": "#6B7280",
            "Default/gray/500": "#6B7280",
            "gray/600": "#4B5563",
            "cool-gray/900": "#111827",
            "Default/gray/900": "#111827",
            "gray/900": "#131313",

            "deep-gray/100": "#0D0D0D",
            "deep-gray/200": "#202329",
            "deep-gray/300": "#161616",
            // Slate
            "slate/100": "#F0F4F8",
            "slate/50": "#F7F9FB",
            "slate/700": "#334155",
            // Red
            "red/500": "#EE4444",
            // Green
            "Default/green/100": "#D1FAE5",
            "Default/green/800": "#065F46"
        }
    },
    plugins: []
}
