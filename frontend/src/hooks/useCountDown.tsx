import { useEffect, useState } from "react"

const useCountdown = (targetDate: string) => {
    const countDownDate = new Date(targetDate).getTime()

    const [countDown, setCountDown] = useState(
        countDownDate - new Date().getTime()
    )

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(countDownDate - new Date().getTime())
        }, 1000)

        return () => clearInterval(interval)
    }, [countDownDate])

    return getReturnValues(countDown)
}

const getReturnValues = (countDown: number) => {
    const [days, setDays] = useState(0)
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)

    // calculate time left
    useEffect(() => {
        setDays(Math.floor(countDown / (1000 * 60 * 60 * 24)))
        setHours(
            Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        )
        setMinutes(Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60)))
        setSeconds(Math.floor((countDown % (1000 * 60)) / 1000))
    })
    return [days, hours, minutes, seconds]
}

export { useCountdown }
