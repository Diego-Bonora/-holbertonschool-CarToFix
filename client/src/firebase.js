import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAC03yJtaC4SyNe17ko2Sf2qNAm4w6O8DU",
    authDomain: "cartofix-8f8dc.firebaseapp.com",
    projectId: "cartofix-8f8dc",
    storageBucket: "cartofix-8f8dc.appspot.com",
    messagingSenderId: "943717548466",
    appId: "1:943717548466:web:79d5620dd8a3afa2d7a4ab",
    measurementId: "G-4YQG332R6M"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);