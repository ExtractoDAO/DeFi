import { ref, set, update, remove } from "firebase/database"

import { getAuth } from "firebase/auth"

import { FutureContract } from "types/DAO"

import { database } from "./index"

const db = database

import { network } from "config/settings"
import { loginFirebaseUser } from "./auth.firebase"

import { app } from "./index"

interface IDictionary {
    [key: string]: any
}

export interface SaveContract {
    address: string
    amount: number
    investor: string
    dateLimit: string
    blockLimit?: number
    valueInFiat?: number
    paymentToken?: "USDT" | "USDC" | "BUSD" | "DAI" | ""
    price?: number
}

const auth = getAuth(app)

export const firebaseLogin = () => {
    if (
        !process.env.EXTRACTO_FIREBASE_LOGIN ||
        !process.env.EXTRACTO_FIREBASE_PASS
    ) {
        throw new Error("Unable to firebase login ")
    }

    const user = auth.currentUser

    if (!user) {
        loginFirebaseUser(
            process.env.EXTRACTO_FIREBASE_LOGIN,
            process.env.EXTRACTO_FIREBASE_PASS,
            () => {}
        )
    }
}

export const writeContract = async (contract: SaveContract) => {
    firebaseLogin()
    return set(ref(db, `${network}-drawer/${contract.address}`), {
        ...contract
    })
        .then((res) => console.log(res))
        .catch((err) => console.error(err))
}

export const updateContract = (
    contractAddress: string,
    contractUpdated: FutureContract
) => {
    const updates: IDictionary = {}
    updates[`${network}-drawer/${contractAddress}`] = contractUpdated

    return update(ref(db), updates)
}

export const deleteContract = async (contractAddress: string) => {
    firebaseLogin()
    return remove(ref(db, `${network}-drawer/${contractAddress}`))
        .then((res) => res)
        .catch((err) => err)
}

export const placeContractSaleOrder = async (
    contractAddress: string,
    contract: FutureContract
) => {
    return set(ref(db, `${network}-contractsForSale/${contractAddress}`), {
        ...contract
    })
        .then((res) => res)
        .catch((err) => err)
}

export const removeContractSellOrder = async (contractAddress: string) => {
    return remove(ref(db, `${network}-contractsForSale/${contractAddress}`))
        .then((res) => res)
        .catch((err) => err)
}

export const updateContractSale = (
    contractAddress: string,
    contractUpdated: {
        price: number
        amount: number
    }
) => {
    const updates: IDictionary = {}
    updates[`${network}-contractsForSale/${contractAddress}`] = contractUpdated

    return update(ref(db), updates)
}
