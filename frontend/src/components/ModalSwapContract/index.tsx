import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { FutureContract } from "types/DAO"
import {
    Box,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material"
import useContract from "hooks/useContract"
import { ethers } from "ethers"
import {
    placeContractSaleOrder,
    removeContractSellOrder,
    updateContract,
    updateContractSale
} from "services/firebase/contracts"

import { addrFormatter, formatCurrency } from "utils/format"
import { ERC20Token } from "types/tokens"
import settings from "config/settings"

import { ContractSale } from "components/TableComponent"

import { useAccount } from "wagmi"

interface ModalSwapContract {
    isOpen: boolean
    handleClose: () => void
    contract: ContractSale
}

interface IObj {
    [key: string]: string
}

export default function ModalSwapContract({
    isOpen,
    handleClose,
    contract
}: ModalSwapContract) {
    const { address: account } = useAccount()
    const { execFunction, approveTransaction } = useContract()
    const [amount, setAmount] = React.useState(0)
    const [price, setPrice] = React.useState(0)

    const [selectedPaymentMethod, setSelectedPaymentMethod] =
        React.useState<ERC20Token>("USDT")

    const tokens: IObj = settings.getTokens

    if (!account) return <></>

    const getData = async () => {
        const responseAmount = await execFunction({
            instanceType: "future",
            functionName: "getKg()",
            contractAddress: contract.address
        })

        // const responsePrice = await execFunction({
        //     instanceType: "future",
        //     functionName: "getPrice()",
        //     contractAddress: contract.address
        // })

        // setAmount(Number(responseAmount) / 1e20)
        // setPrice(Number(responsePrice) / 100)

        // updateContractSale(contract.address, {
        //     ...contract,
        //     price: Number(responsePrice) / 100,
        //     amount: Number(responseAmount) / 1e20
        // })
    }

    const handleSwapContract = async () => {
        if (price === 0) return

        // await approveTransaction(selectedPaymentMethod)

        // await execFunction(
        //     {
        //         instanceType: "future",
        //         functionName: "swap(address)",
        //         contractAddress: contract.address,
        //         onFinish: () => {
        //             updateContract(contract.address, {
        //                 ...contract,
        //                 investor: account
        //             })

        //             removeContractSellOrder(contract.address)
        //             handleClose()
        //         }
        //     },
        //     tokens[selectedPaymentMethod],
        //     {
        //         gasLimit: 10000000
        //     }
        // )
    }

    React.useEffect(() => {
        // getData()
    }, [])

    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Buy contract</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="body1">Address: </Typography>
                            <Typography variant="body1">
                                <a
                                    target="_blank"
                                    href={`https://polygonscan.com/address/${contract.address}`}
                                >
                                    <b>{addrFormatter(contract.address)}</b>
                                </a>
                            </Typography>
                        </Box>

                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="body1">Owner:</Typography>
                            <Typography variant="body1">
                                <a
                                    target="_blank"
                                    href={`https://polygonscan.com/address/${contract.investor}`}
                                >
                                    <b>{addrFormatter(contract.investor)}</b>
                                </a>
                            </Typography>
                        </Box>

                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="body1">Amount:</Typography>
                            <Typography variant="body1">
                                <b>{contract.amount} Kg</b>
                            </Typography>
                        </Box>

                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="body1">Price:</Typography>
                            <Typography variant="body1">
                                <b>{formatCurrency(contract.price)}</b>
                            </Typography>
                        </Box>

                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="body1">Deadline:</Typography>
                            <Typography variant="body1">
                                <b>{contract.dateLimit}</b>
                            </Typography>
                        </Box>

                        <Box sx={{ width: 300, mt: 2 }}>
                            <FormControl fullWidth>
                                <InputLabel id="payment-method">
                                    Token
                                </InputLabel>
                                <Select
                                    labelId="payment-method"
                                    id="payment-select"
                                    value={selectedPaymentMethod}
                                    label="Token"
                                    size="small"
                                    onChange={(event) =>
                                        setSelectedPaymentMethod(
                                            event.target.value as ERC20Token
                                        )
                                    }
                                >
                                    {Object.keys(tokens).map((token, index) => {
                                        return (
                                            <MenuItem value={token} key={index}>
                                                {token}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Box>
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleSwapContract}
                        disabled
                        // disabled={BigInt(account) === BigInt(contract.investor)}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
