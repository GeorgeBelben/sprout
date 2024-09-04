import { Brand } from "~/types";

export type DocumentId = Brand<string, "DocumentId">;

export type BaseDocument = {
	id: DocumentId;
};

export type WithDocumentId<T> = T & BaseDocument;
