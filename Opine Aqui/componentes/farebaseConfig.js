import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Configuração do Firebase (substitua pelos seus dados)
const firebaseConfig = {

    apiKey: 'AIzaSyAPsx5vPvvZacJMOaFPGhAnadS1duKJL6E',
    authDomain: 'opineaqui-29bb4.firebaseapp.com',
    projectId: 'opineaqui-29bb4',
    storageBucket: 'opineaqui-29bb4.firebasestorage.app',
    messagingSenderId: '496943644610',
    appId: '1:496943644610:web:33a637a55b2c539afba05b',
    
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Obtenha uma instância do Firestore e do Auth
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };






