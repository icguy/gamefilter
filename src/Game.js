import React from "react";

const hexChars = "0123456789abcdef";

function getHash(text) {
	let result = "";
	for (let i = 0; i < text.length; i++) {
		result += hexChars[text.charCodeAt(i) % 16];
	}
	return result;
}

function getImage(gameName) {
	let hash = getHash(gameName);
	return `https://www.gravatar.com/avatar/${hash}?d=robohash`;
}

function getGameLink(gameName) {
	return `https://www.google.com/search?q=${encodeURI(gameName)}`;
}

export function Game(props) {
	return (
		<a href={getGameLink(props.game.name)} >
			<div className="game-container">
				<img src={getImage(props.game.name)} />
				<div>
					<div className="name">
						Név: {props.game.name}
					</div>
					<div className="players">
						Játékosok: {props.game.minPlayers} - {props.game.maxPlayers} fő
					</div>
					<div className="duration">
						Időtartam: {props.game.durationInMinutes} perc
					</div>
					<div className="description">
						{props.game.description}
					</div>
				</div>
			</div>
		</a >
	);
}