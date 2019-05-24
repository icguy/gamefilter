import { Injectable } from "@angular/core";
import { GameModel } from "./model";

@Injectable()
export class GameListService {

	public getGameList(): GameModel[] {
		return (window as any).games || [];
	}
}