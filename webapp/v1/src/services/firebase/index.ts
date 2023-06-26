// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export const firebaseConfig = {
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    apiKey: process.env.FIREBASE_API_KEY,
    appId: process.env.FIREBASE_APP_ID
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

export const database = getDatabase(app)
