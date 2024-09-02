import { doc, getDoc } from "firebase/firestore";
import { db } from "~/lib/firebase";
import { ActiveTimer } from "../types";

export async function getActiveTimer(userId: string): Promise<ActiveTimer | null> {
	const docRef = doc(db, "activeTimers", userId);

	const docSnap = await getDoc(docRef);

	if (!docSnap.exists()) {
		console.log("No such document!");
		return null;
	}

	console.log("Document data:", docSnap.data());
	return docSnap.data() as ActiveTimer;
}
