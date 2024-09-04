import { ReactElement } from "react";
import { useModal } from "@ebay/nice-modal-react";
import { Avatar, Button, EmptyView, Page, PageHeader } from "~/components";
import { Client } from "~/types";
import { CreateClientDialog } from "~/dialogs";
import { Link, useLoaderData } from "react-router-dom";
import { UsersRound } from "lucide-react";
import { useTranslation } from "react-i18next";

type LoaderData = {
	clients: Client[];
};

export function ClientsListRoute(): ReactElement {
	const { t } = useTranslation();
	const { clients } = useLoaderData() as LoaderData;

	const createClientDialog = useModal(CreateClientDialog);

	return (
		<Page>
			<PageHeader
				title={t("clients.clients")}
				onRenderActions={() => (
					<Button variant="default" onClick={() => createClientDialog.show()}>
						{t("clients.addClient")}
					</Button>
				)}
			/>
			<div className="flex-1 relative">
				{clients.length === 0 ? (
					<EmptyView
						icon={UsersRound}
						title={t("clients.noClients")}
						button={{
							label: t("clients.addFirstClient"),
							onClick: () => createClientDialog.show(),
						}}
					/>
				) : (
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
						{clients.map((client) => (
							<ClientCard key={client.id} {...client} />
						))}
					</div>
				)}
			</div>
		</Page>
	);
}

export function ClientCard({ id, displayName, totalProjects, avatarUrl }: Client): ReactElement {
	const { t } = useTranslation();

	return (
		<div className="relative flex items-center space-x-3 rounded-lg border border-gray-4 bg-gray-2 hover:bg-gray-3 hover:border-gray-5 px-6 py-5 shadow-sm transition-all duration-100">
			<div className="flex-shrink-0">
				<Avatar displayName={displayName} avatarUrl={avatarUrl} />
			</div>
			<div className="min-w-0 flex-1">
				<Link to={`/clients/${id}`} className="focus:outline-none">
					<span aria-hidden="true" className="absolute inset-0" />
					<p className="text-sm font-medium text-gray-900">{displayName}</p>
					<p className="truncate text-sm text-gray-500">
						{totalProjects} {t("projects.projects").toLocaleLowerCase()}
					</p>
				</Link>
			</div>
		</div>
	);
}
