import { db, getCurrentUser } from "~/lib/firebase";
import { collection, addDoc, getDocs, CollectionReference, doc, getDoc, updateDoc } from "firebase/firestore";
import { Client, ClientDto, DocumentId } from "~/types";

function getClientsCollectionRef(userId: string): CollectionReference {
	const path = `/profiles/${userId}/clients`;
	return collection(db, path);
}

export async function addClient(clientDto: ClientDto): Promise<void> {
	const user = getCurrentUser();

	const collectionRef = getClientsCollectionRef(user.uid);

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

	if (!docSnap.exists()) {
		throw new Error("Client not found");
	}

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
