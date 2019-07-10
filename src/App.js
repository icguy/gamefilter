import React from 'react';
import './App.css';
import { Game } from './Game.js';
import * as rx from "rxjs";
import * as rxop from "rxjs/operators";

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			nameFilter: undefined,
			numPlayersFilter: undefined,
			maxDurationFilter: undefined,
			currentList: window.games
		}
		this.inputChanged$ = new rx.Subject();
	}

	componentDidMount() {
		this.subscription = this.inputChanged$.pipe(
			rxop.debounceTime(300)
		).subscribe(() => this.filterList());
	}

	componentWillUnmount() {
		this.subscription.unsubscribe();
	}

	render() {
		return (
			<div className="AppContainer">
				<div className="Filters">
					<div className="filter">
						<span>Név:</span>
						<input onChange={this.onNameChanged} />
					</div>
					<div className="filter">
						<span>Játékosok száma:</span>
						<input type="number" onChange={this.onNumPlayersChanged} />
					</div>
					<div className="filter">
						<span>Max időtartam (perc):</span>
						<input type="number" onChange={this.onMaxDurationChanged} />
					</div>
				</div>
				<div className="App">
					{
						this.state.currentList.map(function (game) {
							return (
								<Game game={game} key={game.name}></Game>
							);
						})
					}
				</div>
			</div>
		);
	}

	onNameChanged = (e) => this.onInputChanged({ ...this.state, nameFilter: e.target.value });
	onNumPlayersChanged = (e) => this.onInputChanged({ ...this.state, numPlayersFilter: e.target.value });
	onMaxDurationChanged = (e) => this.onInputChanged({ ...this.state, maxDurationFilter: e.target.value });

	onInputChanged(newState) {
		this.setState(newState);
		this.inputChanged$.next();
	}

	filterList() {
		let filtered = window.games
			.filter(g => !this.state.nameFilter || g.name.includes(this.state.nameFilter))
			.filter(g => !this.state.numPlayersFilter || (this.state.numPlayersFilter >= g.minPlayers && this.state.numPlayersFilter <= g.maxPlayers))
			.filter(g => !this.state.maxDurationFilter || g.durationInMinutes < this.state.maxDurationFilter);
		this.setState({ ...this.state, currentList: filtered });
	}
}

export default App;
