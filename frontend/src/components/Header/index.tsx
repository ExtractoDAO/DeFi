import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Menu from "@mui/material/Menu"
import MenuIcon from "@mui/icons-material/Menu"
import Container from "@mui/material/Container"

import MenuItem from "@mui/material/MenuItem"
import Logo from "assets/images/logo-menu.svg"
import Link from "next/link"
import { firebaseLogin } from "services/firebase/contracts"

import { ConnectKitButton } from "connectkit"

const pages = [
    {
        name: "Buy contracts",
        route: "buy"
    },
    {
        name: "Drawer",
        route: "drawer"
    },
    {
        name: "Exchange",
        route: "swap"
    }
]

const Header = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    )

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    React.useEffect(() => {
        firebaseLogin()
    }, [])

    return (
        <AppBar
            enableColorOnDark
            sx={{
                backgroundColor: "#F47722",
                color: "#333333",
                position: "fixed",
                top: 0,
                zIndex: 1,
            }}
        >
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 10,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            textDecoration: "none",
                            alignItems: "center",
                            lineHeight: "unset",
                            color: "#ffffff"
                        }}
                    >
                        <img
                            src={Logo.src}
                            style={{
                                width: "100%",
                                maxWidth: "50px",
                                maxHeight: "50px"
                            }}
                        />
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" }
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left"
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left"
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" }
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.route}>
                                    <Link href={page.route} as={page.route}>
                                        <Typography textAlign="center">
                                            {page.name}
                                        </Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none"
                        }}
                    >
                        <img
                            src={Logo.src}
                            style={{
                                width: "100%",
                                maxWidth: "50px",
                                maxHeight: "50px"
                            }}
                        />
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                            justifyContent: "center"
                        }}
                    >
                        {pages.map((page) => (
                            <Box key={page.route} sx={{ mx: 1 }}>
                                <Link href={page.route} as={page.route}>
                                    <a
                                        style={{
                                            color: "#ffffff",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        {page.name}
                                    </a>
                                </Link>
                            </Box>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0, zIndex: 2 }}>
                        <ConnectKitButton />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default Header
