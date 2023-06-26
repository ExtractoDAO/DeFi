import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    setPersistence,
    browserSessionPersistence
} from "firebase/auth"

import { app } from "./index"

export function loginFirebaseUser(
    email: string,
    password: string,
    callback: any
) {
    const auth = getAuth(app)

    setPersistence(auth, browserSessionPersistence).then(() => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                return user
            })
            .catch(function (login_error) {
                let loginErrorCode = login_error.code
                let loginErrorMessage = login_error.message

                if (loginErrorCode === "auth/user-not-found") {
                    createFirebaseUser(email, password, callback)
                }
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code
                const errorMessage = error.message
            })
    })
}

function createFirebaseUser(email: string, password: string, callback: any) {
    const auth = getAuth(app)

    createUserWithEmailAndPassword(auth, email, password)
        .then(function () {
            if (callback) {
                callback()
            }
        })
        .catch(function (create_error) {
            let createErrorCode = create_error.code
            let createErrorMessage = create_error.message
        })
}
