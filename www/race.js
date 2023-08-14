import { LitElement, css, html } from 'lit';

import { MovementController } from './movement.js';

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
customElements.define('race-be', GameElement);
