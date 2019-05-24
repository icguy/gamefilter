import { Component, OnInit } from "@angular/core";
import { GameModel } from "./model";
import { FormControl } from "@angular/forms";
import { merge } from "rxjs";
import { debounceTime, tap } from "rxjs/operators";
import { GameListService } from "./game-list.service";

@Component({
	selector: "my-app",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"],
	providers: [GameListService]
})
export class AppComponent implements OnInit {
	public games: GameModel[] = [];

	public nameControl: FormControl = new FormControl(null);
	public numberControl: FormControl = new FormControl(null);
	public durationControl: FormControl = new FormControl(null);

	constructor(private gameListService: GameListService) {

	}

	public ngOnInit(): void {
		this.games = this.gameListService.getGameList();

		merge(
			this.nameControl.valueChanges,
			this.numberControl.valueChanges,
			this.durationControl.valueChanges
		).pipe(
			debounceTime(200)
		).subscribe(() => {
			this.games = this.gameListService.getGameList()
				.filter(g => !this.nameControl.value || g.name.includes(this.nameControl.value))
				.filter(g => this.isNullOrUndefined(this.numberControl.value)
					|| (this.numberControl.value >= g.minPlayers && this.numberControl.value <= g.maxPlayers)
				)
				.filter(g => this.isNullOrUndefined(this.durationControl.value) || g.durationInMinutes < this.durationControl.value);
		});
	}

	private isNullOrUndefined(value: any): boolean {
		return value === undefined || value === null;
	}
}
