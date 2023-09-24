"use client"

export const setItem = (key: string, value: string) => {
    try {
        return localStorage.setItem(key, value)
    } catch (error) {}
}
export const getItem = (key: string) => {
    try {
        return localStorage.getItem(key)
    } catch (error) {}
}

export const deleteItem = (key: string) => {
    try {
        return localStorage.removeItem(key)
    } catch (error) {}
}

export const sessionSetItem = (key: string, value: string) => {
    try {
        return sessionStorage.setItem(key, value)
    } catch (error) {}
}

export const sessionGetItem = (key: string) => {
    try {
        return sessionStorage.getItem(key)
    } catch (error) {}
}
