import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useFormik } from "formik";
import { useMemo } from "react";
import { z } from "zod";
import { Button, Input } from "~/components";
import { Dialog } from "~/components/dialog";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "~/lib/api";

const createProjectFormSchema = z.object({
	displayName: z.string().min(1),
});

export const CreateProjectDialog = NiceModal.create(() => {
	const queryClient = useQueryClient();
	const modal = useModal();

	const form = useFormik({
		initialValues: {
			displayName: "",
		},
		onSubmit: async (values) => {
			await api.projects.add(values.displayName);
			await queryClient.refetchQueries({ queryKey: ["projects"] });
			modal.remove();
		},
	});

	const isFormValid = useMemo(() => {
		const result = createProjectFormSchema.safeParse(form.values);
		return result.success;
	}, [form.values]);

	return (
		<Dialog title="Create Project" open={modal.visible} onClose={() => modal.remove()}>
			<form onSubmit={form.handleSubmit} onBlur={form.handleBlur} className="space-y-4">
				<Input label="Display Name" {...form.getFieldProps("displayName")} />
				<div className="flex items-center justify-end">
					<Button type="submit" disabled={!isFormValid}>
						Create
					</Button>
				</div>
			</form>
		</Dialog>
	);
});
