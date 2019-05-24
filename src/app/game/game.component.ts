import { Component, OnInit, Input } from "@angular/core";
import { GameModel } from "../model";

const hexChars: string = "0123456789abcdef";

@Component({
	selector: "app-game",
	templateUrl: "./game.component.html",
	styleUrls: ["./game.component.css"]
})
export class GameComponent implements OnInit {

	@Input() public game: GameModel;


	public ngOnInit(): void {
	}

	public getImage(): string {
		let hash = this.getHash(this.game.name);
		return `https://www.gravatar.com/avatar/${hash}?d=robohash`;
	}

	public getGameLink(): string {
		return `https://www.google.com/search?q=${encodeURI(this.game.name)}`;
	}

	private getHash(text: string): string {
		let result = "";
		for (let i = 0; i < text.length; i++) {
			result += hexChars[text.charCodeAt(i) % 16];
		}
		return result;
	}
}