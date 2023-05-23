import settings from "config/settings"

function tx(hash: string) {
    console.log(settings.txScan + hash)
}

const logger = {
    tx
}

export default logger
