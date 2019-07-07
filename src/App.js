import React from 'react';
import './App.css';
import { Game } from './Game.js';

function App() {
	return (
		<div className="App">
			{
				window.games.map(function (game) {
					return (
						<Game game={game}></Game>
					);
				})
			}
		</div>
	);
}

export default App;
