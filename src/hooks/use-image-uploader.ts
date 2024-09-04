import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL, StorageError } from "firebase/storage";
import { getCurrentUser, storage } from "~/lib/firebase";

type ImageUploadStatus = "idle" | "uploading" | "complete" | "error";

interface UseImageUploadResult {
	status: "idle" | "uploading" | "complete" | "error";
	uploadImage: (file: File) => Promise<void>;
	progress: number;
	downloadURL: string | null;
}

export const useImageUpload = ({
	onUploadComplete,
	onError,
}: {
	onUploadComplete: (downloadUrl: string, filePath: string) => void;
	onError: (error: StorageError) => void;
}): UseImageUploadResult => {
	const [status, setStatus] = useState<ImageUploadStatus>("idle");
	const [progress, setProgress] = useState<number>(0);
	const [downloadURL, setDownloadURL] = useState<string | null>(null);

	const uploadImage = async (file: File) => {
		setStatus("uploading");

		const user = getCurrentUser();
		const storageRef = ref(storage, `${user.uid}/${file.name}`);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progressPercentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setProgress(progressPercentage);
			},
			(uploadError) => {
				onError(uploadError);
				setStatus("idle");
			},
			async () => {
				const url = await getDownloadURL(uploadTask.snapshot.ref);
				setDownloadURL(url);
				setStatus("complete");
				onUploadComplete(url, uploadTask.snapshot.ref.fullPath);
			}
		);
	};

	return {
		status,
		uploadImage,
		progress,
		downloadURL,
	};
};
