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
            transparent: "transparent",
            white: "#FFFFFF",
            "base/white": "#FFFFFF",
            "brand/primary/100": "#FEE3D5",
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
            "Default/gray/100": "#F1F1F1",
            "Default/gray/200": "#E5E7EB",
            "gray/50": "#FAFAFA",
            "gray/100": "#F6F6F6",
            "gray/200": "#E4E6EA",
            "gray/250": "#D5DDF0",
            "gray/300": "#D8DFEE",
            "gray/350": "#C8D2E0",
            "gray/400": "#9BA2AE",
            "gray/500": "#6B7280",
            "gray/600": "#64748A",
            "gray/600": "#4B5563",
            "gray/700": "#18212E",
            "gray/800": "#1F2937",
            "gray/900": "#1F2228",
            "cool-gray/900": "#111827",
            "Default/gray/900": "#111827",
            "gray/900": "#131313",

            "deep-gray/100": "#0D0D0D",
            "deep-gray/200": "#202329",
            "deep-gray/300": "#161616",
            "deep-gray/400": "#19222F",
            "deep-gray/500": "#171717",
            "deep-gray/600": "#0F172A",
            "deep-gray/700": "#121212",

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
            "green/100": "#D1FAE5",
            "green/200": "#A0F9E0",
            "green/300": "#38DB74",
            "green/500": "#26DA68",
            "green/600": "#22C45E",
            "green/700": "#1A8B3A",
            "green/800": "#065F46",
            "green/900": "#073B19",

            // Warning
            "warning/50": "#FFF7ED",
            "dark/warning/200": "#FFC166",
            "warning/100": "#ffedd5",
            "warning/200": "#fed7aa",
            "warning/300": "#fdba74",
            "warning/400": "#fb923c",
            "warning/500": "#f97316",
            // Error
            "error/100": "#FEE2E2",
            "error/200": "#FECACA",
            "error/300": "#FCA5A5",
            "error/400": "#F87171",
            "error/500": "#EF4444",
            "error/600": "#DC2626",
            "error/700": "#B91C1C",
            "error/800": "#991B1B"
        },
        data: {
            tokenSelectOpen: 'ui~="tokenSelectOpen"'
        }
    },
    plugins: []
}
