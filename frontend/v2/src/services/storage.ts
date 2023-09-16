"use client"

export const setItem = (key: string, value: string) =>
    localStorage.setItem(key, value)
export const getItem = (key: string) => localStorage.getItem(key)
export const deleteItem = (key: string) => localStorage.removeItem(key)

export const sessionSetItem = (key: string, value: string) =>
    sessionStorage.setItem(key, value)
export const sessionGetItem = (key: string) => sessionStorage.getItem(key)
