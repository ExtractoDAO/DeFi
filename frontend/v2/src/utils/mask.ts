export const shortAddress = (s: string, size = 4) => {
    var first = s.slice(0, size + 1)
    var last = s.slice(-size)
    return first + "..." + last
}
