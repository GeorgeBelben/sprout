import { db, getCurrentUser } from "~/lib/firebase";
import { collection, addDoc, getDocs, CollectionReference, doc, getDoc, updateDoc } from "firebase/firestore";
import { Client, ClientDto, DocumentId } from "~/types";

function getClientsCollectionRef(userId: string): CollectionReference {
	const path = `/profiles/${userId}/clients`;
	return collection(db, path);
}

export async function addClient(displayName: string): Promise<void> {
	const user = getCurrentUser();

	const collectionRef = getClientsCollectionRef(user.uid);

	const clientDto: ClientDto = {
		displayName: displayName,
		totalProjects: 0,
	};

	await addDoc(collectionRef, clientDto);
}

export async function listClients(): Promise<Client[]> {
	const user = getCurrentUser();

	const collectionRef = getClientsCollectionRef(user.uid);

	const docsSnap = await getDocs(collectionRef);

	return docsSnap.docs.map((doc) => {
		return {
			id: doc.id,
			...doc.data(),
		} as Client;
	});
}

export async function getClient(id: DocumentId): Promise<Client> {
	const user = getCurrentUser();

	const collectionRef = getClientsCollectionRef(user.uid);

	const docRef = doc(collectionRef, id);

	const docSnap = await getDoc(docRef);

	return {
		id: docSnap.id,
		...docSnap.data(),
	} as Client;
}

export async function updateClient(id: DocumentId, client: Partial<ClientDto>): Promise<void> {
	const user = getCurrentUser();

	const collectionRef = getClientsCollectionRef(user.uid);

	const docRef = doc(collectionRef, id);

	updateDoc(docRef, client);
}
