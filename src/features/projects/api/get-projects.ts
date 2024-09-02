import { db } from "~/lib/firebase";
import { Project } from "../types";
import { collection, getDocs } from "firebase/firestore";
import { Constants } from "~/constants";

export async function getProjects(): Promise<Project[]> {
	const collectionRef = collection(db, Constants.collections.projects);

	const docsSnap = await getDocs(collectionRef);

	return docsSnap.docs.map((doc) => {
		return {
			id: doc.id,
			...doc.data(),
		} as Project;
	});
}
