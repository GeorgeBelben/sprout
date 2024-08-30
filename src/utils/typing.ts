import { Brand } from "../types";

export function brand<K>(k: K): Brand<K> {
	return k as Brand<K>;
}
