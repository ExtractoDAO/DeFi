import {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useState
} from "react"

const DexContext = createContext({})

interface ProviderProps {
    selectedToken: string
    handleChangeToken: (value: string) => void
}

export const DexProvider = ({ children }: { children: ReactNode }) => {
    // const [selectedContract, setSelectedContract] = useState("extract@")
    const [selectedToken, setSelectedToken] = useState("extracto-usdt")

    const handleChangeToken = useCallback(
        (token: "extracto-usdt" | "extracto-usdc") => {
            setSelectedToken(token)
        },
        []
    )

    return (
        <DexContext.Provider value={{ selectedToken, handleChangeToken }}>
            {children}
        </DexContext.Provider>
    )
}

export const useDexContext = (): any => useContext(DexContext)
