import { createTheme } from "@mui/material"

const theme = createTheme({
    typography: {
        fontFamily: [
            "Roboto",
            "-apple-system",
            "BlinkMacSystemFont",
            "Arial",
            "sans-serif"
        ].join(","),

        h1: {
            fontFamily: "Roboto",
            fontSize: "1.7rem",
            color: "#1d2327"
        },

        h2: {
            fontFamily: "Roboto",
            fontSize: "1.5rem",
            color: "#1d2327",
            letterSpacing: "0.045rem"
        },
        h3: {
            fontFamily: "Roboto",
            fontSize: "1rem",
            color: "#1d2327"
        },
        body1: {
            fontFamily: "Roboto",
            fontSize: "1rem",
            letterSpacing: 0,
            color: "#666666"
        },
        body2: {
            fontFamily: "Roboto",
            fontSize: "0.875rem",
            letterSpacing: 0,
            color: "#666666"
        }
    },
    components: {
        MuiLink: {
            styleOverrides: {
                root: {
                    textDecoration: "none"
                }
            }
        }
    }
})

export default theme
