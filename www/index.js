import { LitElement, css, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

const rightKeys = ['d', 'ArrowRight'];
const leftKeys = ['a', 'ArrowLeft'];

class MovementController {
	host;
	direction = 0;
	moving = 0;

	constructor(host) {
		this.host = host;
		host.addController(this);
	}

	_onKeyDown = (event) => {
		console.log('👇', event.key);
		event.preventDefault();

		const rightKeyPressed = rightKeys.includes(event.key);
		const leftKeyPressed = leftKeys.includes(event.key);
		if (rightKeyPressed && leftKeyPressed) throw new Error('how!?');

		//right this.direction;

		if (rightKeyPressed || leftKeyPressed) {
			this.direction = rightKeyPressed ? 1 : leftKeyPressed ? -1 : 0;
			this.host.requestUpdate();
		}
	};

	_onKeyUp = (event) => {
		event.preventDefault();
		console.log('☝️', event.key);
		if (
			(rightKeys.includes(event.key) && this.direction == 1) ||
			(leftKeys.includes(event.key) && this.direction == -1)
		) {
			this.direction = 0;
			this.host.requestUpdate();
		}
	};

	hostConnected() {
		window.addEventListener('keyup', this._onKeyUp);
		window.addEventListener('keydown', this._onKeyDown);
		// todo: listen for pointer/gamepad events
	}

	hostDisconnected() {
		window.removeEventListener('keyup', this._onKeyUp);
		window.removeEventListener('keydown', this._onKeyDown);
	}
}

class GameElement extends LitElement {
	moving = new MovementController(this);

	constructor() {
		super();
	}

	static styles = css`
		:host {
			align-items: center;
			background: linear-gradient(0deg, DarkOliveGreen 49vh, SkyBlue 50vh);
			display: flex;
			height: 100vh;
			overflow: scroll;
			position: relative;
			white-space: nowrap;
			width: 100vw;
		}
		div {
			position: absolute;
			top: 0;
			left: 0;
		}
	`;

	render() {
		return html`
			<div>${this.moving.direction ? '👈' : '👉'}</div>
			<slot name="player"></slot>
			<slot></slot>
		`;
	}
}

class ThingElement extends LitElement {
	constructor() {
		super();
	}
	static styles = css`
		:host {
			line-height: 100vh;
			font-size: 10vw;
			text-shadow: 0 0.05em 0.1em hsl(100deg 50% 10% / 50%);
		}
	`;
	render() {
		return html`<span>
			<slot></slot>
		</span>`;
	}
}

class PlayerElement extends ThingElement {
	constructor() {
		super();
	}
	static styles = [
		ThingElement.styles,
		css`
			:host {
				position: absolute;
			}
		`,
	];
	render() {
		return html`<span>🙂</span>`;
	}
}

// define custom elements
customElements.define('game-be', GameElement);
customElements.define('player-be', PlayerElement);
customElements.define('thing-be', ThingElement);
