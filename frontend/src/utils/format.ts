export const addrFormatter = (s: string, size = 4) => {
    var first = s.slice(0, size + 1)
    var last = s.slice(-size)
    return first + "..." + last
}

export const formatCurrency = (
    value: number | string,
    withPrefix = true
): string => {
    return Intl.NumberFormat("en-US", {
        style: withPrefix ? "currency" : undefined,
        currency: "USD",
        minimumFractionDigits: 2
    }).format(Number(value) || 0)
}
