import { addClient, listClients, getClient, updateClient } from "./clients";
import { ensureProfile } from "./profiles";
import { addProject, getAllProjects } from "./projects";
import { addActiveTimerEvent, addActiveTimer, getActiveTimer } from "./timer";

export const api = {
	profiles: {
		ensure: ensureProfile,
	},
	projects: {
		add: addProject,
		list: getAllProjects,
	},
	timer: {
		add: addActiveTimer,
		addEvent: addActiveTimerEvent,
		get: getActiveTimer,
	},
	clients: {
		add: addClient,
		list: listClients,
		get: getClient,
		update: updateClient,
	},
};
