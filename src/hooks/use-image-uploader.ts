import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL, StorageError } from "firebase/storage";
import { getCurrentUser, storage } from "~/lib/firebase";
import { nanoid } from "nanoid";

type ImageUploadStatus = "idle" | "uploading" | "complete" | "error";

interface UseImageUploadResult {
	status: "idle" | "uploading" | "complete" | "error";
	clear: () => void;
	uploadImage: (file: File) => Promise<void>;
}

export const useImageUpload = ({
	initialStatus,
	onUploadComplete,
	onError,
}: {
	initialStatus: ImageUploadStatus;
	onUploadComplete: (downloadUrl: string, filePath: string) => void;
	onError: (error: StorageError) => void;
}): UseImageUploadResult => {
	const [status, setStatus] = useState<ImageUploadStatus>(initialStatus);

	const clear = () => {
		setStatus("idle");
	};

	const uploadImage = async (file: File) => {
		setStatus("uploading");

		const extension = file.name.split(".").pop();

		const filename = `${nanoid()}.${extension}`;

		const user = getCurrentUser();
		const storageRef = ref(storage, `${user.uid}/${filename}`);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progressPercentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log("Upload is " + progressPercentage + "% done");
			},
			(uploadError) => {
				onError(uploadError);
				setStatus("idle");
			},
			async () => {
				const url = await getDownloadURL(uploadTask.snapshot.ref);
				setStatus("complete");
				onUploadComplete(url, uploadTask.snapshot.ref.fullPath);
			}
		);
	};

	return {
		status,
		clear,
		uploadImage,
	};
};
