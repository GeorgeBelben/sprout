import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useFormik } from "formik";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useRevalidator } from "react-router-dom";
import { Button, Input, Dialog } from "~/components";
import { AvatarInput } from "~/components/avatar-input";
import { api } from "~/lib/api";
import { Client, ClientDto, clientSchema } from "~/types";

export const ManageClientDialog = NiceModal.create((client: Client) => {
	const { t } = useTranslation();
	const modal = useModal();
	const revalidator = useRevalidator();

	const form = useFormik<Omit<ClientDto, "totalProjects">>({
		initialValues: {
			displayName: client.displayName,
			avatarUrl: undefined,
			avatarFilePath: undefined,
		},
		onSubmit: async (values) => {
			await api.clients.update(client.id, values);
			await revalidator.revalidate();
			modal.remove();
		},
	});

	const isFormValid = useMemo(() => {
		const result = clientSchema.omit({ totalProjects: true }).safeParse(form.values);
		return result.success;
	}, [form.values]);

	return (
		<Dialog
			title={t("dialogs.manageClientTitle")}
			description={t("dialogs.manageClientDescription")}
			open={modal.visible}
			onClose={() => modal.remove()}
		>
			<form onSubmit={form.handleSubmit} onBlur={form.handleBlur} className="space-y-4">
				<AvatarInput
					previewUrl={form.values.avatarUrl}
					onUploadComplete={(documentUrl, filePath) => {
						form.setFieldValue("avatarUrl", documentUrl);
						form.setFieldValue("avatarFilePath", filePath);
					}}
				/>
				<Input
					label={t("forms.labels.displayName")}
					placeholder={t("forms.placeholders.displayName")}
					{...form.getFieldProps("displayName")}
				/>
				<div className="flex items-center justify-end">
					<Button type="submit" disabled={!isFormValid} loading={form.isSubmitting}>
						{t("forms.buttons.update")}
					</Button>
				</div>
			</form>
		</Dialog>
	);
});
