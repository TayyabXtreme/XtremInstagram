// This is exaple of firebase configuaration the file name you make firbase.js and import this file in your project where you want to use firebase services.
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const firestore=getFirestore(app);
const storage=getStorage(app);

export {app,auth,firestore,storage};
