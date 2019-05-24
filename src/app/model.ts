export interface GameModel {
	name: string;
	description: string;
	minPlayers: number;
	maxPlayers: number;
	durationInMinutes: number;
}

export const GAMES: GameModel[] = [
	{
		name: "fogócska",
		description: "egyik elkapja a másikat.",
		minPlayers: 3,
		maxPlayers: 10,
		durationInMinutes: 30
	},
	{
		name: "pasziánsz",
		description: "kártyajáték erős idegzetűeknek. Csak egyedül játszható.",
		minPlayers: 1,
		maxPlayers: 1,
		durationInMinutes: 60
	},
	{
		name: "nagypályás foci",
		description: "berúgják a labdát a kapuba",
		minPlayers: 16,
		maxPlayers: 22,
		durationInMinutes: 90
	},
	{
		name: "szabadtéri távolbanézés",
		description: `"én még a balatont is látom innen"`,
		minPlayers: 2,
		maxPlayers: 100,
		durationInMinutes: 5
	}
];