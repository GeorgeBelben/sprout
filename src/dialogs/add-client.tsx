import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useFormik } from "formik";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useRevalidator } from "react-router-dom";
import { Button, Input, Dialog } from "~/components";
import { AvatarInput } from "~/components/avatar-input";
import { api } from "~/lib/api";
import { ClientDto, clientSchema } from "~/types";

export const AddClientDialog = NiceModal.create(() => {
	const { t } = useTranslation();
	const modal = useModal();
	const revalidator = useRevalidator();

	const form = useFormik<ClientDto>({
		initialValues: {
			displayName: "",
			totalProjects: 0,
			avatarUrl: "",
			avatarFilePath: "",
		},
		onSubmit: async (values) => {
			await api.clients.add(values);
			await revalidator.revalidate();
			modal.remove();
		},
	});

	const isFormValid = useMemo(() => {
		const result = clientSchema.safeParse(form.values);
		return result.success;
	}, [form.values]);

	return (
		<Dialog
			title={t("dialogs.addClient.title")}
			description={t("dialogs.addClient.description")}
			open={modal.visible}
			onClose={() => modal.remove()}
		>
			<form onSubmit={form.handleSubmit} onBlur={form.handleBlur} className="space-y-4">
				<AvatarInput
					previewUrl={form.values.avatarUrl}
					onClear={() => {
						form.setFieldValue("avatarUrl", "");
						form.setFieldValue("avatarFilePath", "");
					}}
					onUploadComplete={(documentUrl, filePath) => {
						form.setFieldValue("avatarUrl", documentUrl);
						form.setFieldValue("avatarFilePath", filePath);
					}}
				/>
				<Input
					label={t("dialogs.addClient.displayNameLabel")}
					placeholder={t("dialogs.addClient.displayNamePlaceholder")}
					{...form.getFieldProps("displayName")}
				/>
				<div className="flex items-center justify-end">
					<Button type="submit" disabled={!isFormValid} loading={form.isSubmitting}>
						{t("buttons.add")}
					</Button>
				</div>
			</form>
		</Dialog>
	);
});
