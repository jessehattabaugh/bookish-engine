const rightKeys = ['d', 'ArrowRight'];
const leftKeys = ['a', 'ArrowLeft'];

export class MovementController {
	host;
	direction = 0;
	moving = 0;

	constructor(host) {
		this.host = host;
		host.addController(this);
	}

	_onKeyDown = (event) => {
		const { key } = event;
		console.log('👇', { key });
		event.preventDefault();

		const rightKeyPressed = rightKeys.includes(key);
		const leftKeyPressed = leftKeys.includes(key);
		if (rightKeyPressed && leftKeyPressed) throw new Error('how!?');

		//right this.direction;
		if (rightKeyPressed || leftKeyPressed) {
			this.direction = rightKeyPressed ? 1 : leftKeyPressed ? -1 : 0;
			this.host.requestUpdate();
		}
	};

	_onKeyUp = (event) => {
		const { key } = event;
		event.preventDefault();
		console.log('☝️', { key });
		const movingLeft = leftKeys.includes(key) && this.direction == -1;
		const movingRight = rightKeys.includes(key) && this.direction == 1;
		if (movingRight || movingLeft) {
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
