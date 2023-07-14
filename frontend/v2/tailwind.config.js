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
            "base/white": "#FFFFFF",
            "brand/primary/200": "#FDC6AA",
            "brand/primary/400": "#ca5d25",
            "brand/primary/500": "#F9712B",
            "brand/secondary/100": "#DCD5E3",
            "brand/secondary/400": "#75558E",
            "brand/secondary/500": "#522B72",
            "brand/secondary/300": "#9780AA",
            "brand/secondary/600": "#42225B",
            // Gray
            "Default/gray/50": "#F9FAFB",
            "Default/gray/200": "#E5E7EB",
            "gray/100": "#F6F6F6",
            "gray/200": "#E4E6EA",
            "gray/250": "#D5DDF0",
            "gray/300": "#D8DFEE",
            "gray/350": "#C8D2E0",
            "gray/400": "#9BA2AE",
            "gray/500": "#6B7280",
            "gray/600": "#64748A",
            "gray/600": "#4B5563",
            "gray/700":"#18212E",
            "gray/800": "#1F2937",
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
            "red/500": "#EF4444",
            // Green
            "green/100": "#D1FAE5",
            "green/200": "#A0F9E0",
            "green/300": "#38DB74",
            "green/500": "#22C45E",
            "green/600": "#1F9D41",
            "green/700": "#1A8B3A",
            "green/800": "#065F46",
            "green/900": "#073B19",
            
            // Warning
            "disabled/warning/100": "#FFF6E9",
            "dark/warning/200": "#FFC166",
            "warning/100": "#FEECD4",
            "warning/200": "#FCD4B9",
            "warning/300": "#FFA949",
            "warning/500": "#F87316",
            // Error
            "error/100": "#FFE6E6",
            "error/200": "#FFCCCC",
            "error/300": "#FF9999",
            "error/400": "#FF6B6B",
            "error/500": "#EF4444",
            "error/600": "#DC2626",
            "error/700": "#A81D1D",
            "error/800": "#910F0F",
        },
        data: {
            tokenSelectOpen: 'ui~="tokenSelectOpen"'
        }
    },
    plugins: []
}
