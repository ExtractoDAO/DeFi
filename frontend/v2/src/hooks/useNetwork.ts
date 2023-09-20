import { getBlockNumber } from "@thirdweb-dev/sdk"

const useNetwork = () => {
    async function getCurrentBlock() {
        return getBlockNumber({
            network: "localhost"
        }).then((res) => res)
    }

    return {
        getCurrentBlock
    }
}

export default useNetwork
