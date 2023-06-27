import { ref, set } from "firebase/database"

import { database } from "./index"
const db = database
import { network } from "config/settings"

import { firebaseLogin } from "./contracts"

export interface Event {
    type: "buy" | "updatePrice" | "sale" | "withdraw"
    message: string
    contractAddress?: string
}

export const writePrivateEvent = async (
    investor: string,
    timestamp: number,
    event: Event
) => {
    firebaseLogin()
    return set(ref(db, `${network}-private-events/${investor}/${timestamp}`), {
        ...event
    })
        .then((res) => console.log(res))
        .catch((err) => console.error(err))
}
