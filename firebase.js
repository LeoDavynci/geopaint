import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
   apiKey: "AIzaSyCaAUyuSVHBvqG6bbak8QciQxSBH_Y8Uqw",
   authDomain: "geoconquer-4103e.firebaseapp.com",
   projectId: "geoconquer-4103e",
   storageBucket: "geoconquer-4103e.appspot.com",
   messagingSenderId: "676550719769",
   appId: "1:676550719769:web:2368917cfc4720aa222d88",
   measurementId: "G-BYSLXBBCMP",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export { storage };
