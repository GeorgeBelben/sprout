import { useImageUpload } from "~/hooks";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { FileUpIcon } from "lucide-react";
import { Spinner } from "./spinner";
import { Button } from "./button";

type AvatarInputProps = {
	previewUrl?: string;
	onUploadComplete: (downloadUrl: string, filePath: string) => void;
	onClear: () => void;
};

export function AvatarInput({ previewUrl, onUploadComplete, onClear }: AvatarInputProps) {
	const { t } = useTranslation();

	const { status, clear, uploadImage } = useImageUpload({
		initialStatus: previewUrl ? "complete" : "idle",
		onUploadComplete,
		onError: (error) =>
			toast.error(t("forms.errors.imageUploadFailed"), {
				description: t(`firebaseErrors.${error.code}`),
			}),
	});

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			uploadImage(e.target.files[0]);
		}
	};

	const handleClear = () => {
		clear();
		onClear();
	};

	return (
		<>
			{status === "uploading" && (
				<div className="flex flex-col items-center rounded-lg py-12 px-3 space-y-3 border-2 border-dashed border-gray-6 cursor-pointer group hover:bg-gray-3 transition-all duration-100">
					<Spinner />
				</div>
			)}
			{status === "idle" && (
				<>
					{" "}
					<label
						htmlFor="image"
						className="flex flex-col items-center rounded-lg py-12 px-3 space-y-3 border-2 border-dashed border-gray-6 cursor-pointer group hover:bg-gray-3 transition-all duration-100"
					>
						<div className="bg-gray-4 group-hover:bg-gray-5 size-12 rounded-full flex items-center justify-center transition-all duration-100">
							<FileUpIcon
								size={20}
								className="text-gray-10 group-hover:text-gray-11 transition-all duration-100"
							/>
						</div>
						<div className="text-center space-y-1 flex flex-col items-center">
							<span className="text-gray-10">{t("forms.avatarUpload.label")}</span>
							<span className="text-sm text-gray-10">{t("forms.avatarUpload.fileInfo")}</span>
						</div>
					</label>
					<input className="hidden" type="file" id="image" onChange={handleFileChange} />
				</>
			)}
			{status === "complete" && (
				<div className="flex flex-col items-center rounded-lg py-12 px-3 space-y-3 bg-gray-3 cursor-pointer group">
					<img src={previewUrl} className="size-16 rounded-full" />
					<Button variant="secondary" size="sm" onClick={() => handleClear()}>
						Remove
					</Button>
				</div>
			)}
		</>
	);
}
