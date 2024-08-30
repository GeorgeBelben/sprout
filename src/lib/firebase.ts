import { initializeApp } from "firebase/app";
import { getEnv } from "./env";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: getEnv().VITE_FIREBASE_API_KEY,
	authDomain: getEnv().VITE_FIREBASE_AUTH_DOMAIN,
	projectId: getEnv().VITE_FIREBASE_PROJECT_ID,
	storageBucket: getEnv().VITE_FIREBASE_STORAGE_BUCKET,
	appId: getEnv().VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
