import { auth, db } from "~/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Constants } from "~/constants";
import { DocumentId, Profile, ProfileDto } from "~/types";
import { brand } from "~/utils";

export async function ensureProfile(): Promise<Profile> {
	const user = auth.currentUser;

	if (!user) {
		throw new Error("No user found");
	}

	const docRef = doc(db, Constants.collections.profiles, user.uid);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		// If the document exists, return its data
		return docSnap.data() as Profile;
	} else {
		// If the document doesn't exist, create it
		const newProfile: ProfileDto = {
			activeTimer: null,
			onboardingComplete: false,
		};
		await setDoc(docRef, newProfile);

		return {
			id: brand<DocumentId>(user.uid),
			...newProfile,
		};
	}
}
