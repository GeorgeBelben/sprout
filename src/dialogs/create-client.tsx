import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useFormik } from "formik";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useRevalidator } from "react-router-dom";
import { Button, Input, Dialog } from "~/components";
import { api } from "~/lib/api";
import { ClientDto, clientSchema } from "~/types";

export const CreateClientDialog = NiceModal.create(() => {
	const { t } = useTranslation();
	const modal = useModal();
	const revalidator = useRevalidator();

	const form = useFormik<ClientDto>({
		initialValues: {
			displayName: "",
			totalProjects: 0,
		},
		onSubmit: async (values) => {
			await api.clients.add(values.displayName);
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
			title={t("dialogs.addClientTitle")}
			description={t("dialogs.addClientDescription")}
			open={modal.visible}
			onClose={() => modal.remove()}
		>
			<form onSubmit={form.handleSubmit} onBlur={form.handleBlur} className="space-y-4">
				<Input
					label={t("forms.labels.displayName")}
					placeholder={t("forms.placeholders.displayName")}
					{...form.getFieldProps("displayName")}
				/>
				<div className="flex items-center justify-end">
					<Button type="submit" disabled={!isFormValid} loading={form.isSubmitting}>
						{t("forms.buttons.add")}
					</Button>
				</div>
			</form>
		</Dialog>
	);
});
