import { useModal } from "@ebay/nice-modal-react";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router-dom";
import { Avatar, Button, Page, PageHeader } from "~/components";
import { ManageClientDialog } from "~/dialogs/manage-client";
import { Client } from "~/types";

type LoaderData = {
	client: Client;
};

export function ClientsSingleRoute(): ReactElement {
	const { t } = useTranslation();
	const { client } = useLoaderData() as LoaderData;

	const manageClientDialog = useModal(ManageClientDialog);

	return (
		<Page>
			<PageHeader
				title={client.displayName}
				onRenderTitleIcon={() => (
					<Avatar size={"lg"} displayName={client.displayName} avatarUrl={client.avatarUrl} />
				)}
				onRenderActions={() => (
					<Button variant="secondary" onClick={() => manageClientDialog.show(client)}>
						{t("clients.manageClient")}
					</Button>
				)}
			/>
		</Page>
	);
}
