
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 


const firebaseConfig = {
  apiKey: "AIzaSyAvWPMD4KFJ_AU8FGgXaJJ7lR0skxoDLe0",
  authDomain: "barbie-3e1bc.firebaseapp.com",
  projectId: "barbie-3e1bc",
  storageBucket: "barbie-3e1bc.firebasestorage.app",
  messagingSenderId: "797912412838",
  appId: "1:797912412838:web:c9e0f6d49d1f2bc30dfa67",
  measurementId: "G-W0LST8Y9NK"
};



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);



