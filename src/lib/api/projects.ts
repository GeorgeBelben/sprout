import { db, getCurrentUser } from "~/lib/firebase";
import { collection, addDoc, getDocs, CollectionReference } from "firebase/firestore";
import { Project } from "../../types";

function getProjectsCollectionRef(userId: string): CollectionReference {
	const path = `/profiles/${userId}/projects`;
	return collection(db, path);
}

export async function addProject(displayName: string): Promise<void> {
	const user = getCurrentUser();

	const collectionRef = getProjectsCollectionRef(user.uid);

	await addDoc(collectionRef, {
		displayName: displayName,
		totalTasks: 0,
		userId: user.uid,
	});
}

export async function getAllProjects(): Promise<Project[]> {
	const user = getCurrentUser();

	const collectionRef = getProjectsCollectionRef(user.uid);

	const docsSnap = await getDocs(collectionRef);

	return docsSnap.docs.map((doc) => {
		return {
			id: doc.id,
			...doc.data(),
		} as Project;
	});
}
