import settings from "config/settings"
import { providers } from "ethers"

export const convertToBiggest = (value: number | string) =>
    Math.fround(Number(value) / 10e19)

const provider = new providers.JsonRpcProvider(settings.provider)

export const getBlockLimitDayCount = async (blockTerminate: number) => {
    const block: number = await provider.getBlockNumber()
    return ((blockTerminate - block) * 2) / 86400
}

export const getCurrentBlock = () => provider.getBlockNumber()
