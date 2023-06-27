import { MetaMaskInpageProvider } from "@metamask/providers"

declare global {
    interface Window {
        ethereum: MetaMaskInpageProvider
    }

    interface Dictionary {
        [key: string | number]: string | any
    }
}

declare module "*.png"
declare module "*.svg"
