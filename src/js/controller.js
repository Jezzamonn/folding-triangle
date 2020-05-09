import { easeInOut, experp, slurp } from './util';

const triSize = 50;

export default class Controller {

    constructor() {
        this.animAmt = 0;
        this.period = 3;
    }

    /**
     * Simulate time passing.
     *
     * @param {number} dt Time since the last frame, in seconds 
     */
    update(dt) {
        this.animAmt += dt / this.period;
        this.animAmt %= 1;
    }

	/**
	 * Render the current state of the controller.
	 *
	 * @param {!CanvasRenderingContext2D} context
	 */
	render(context) {
		context.rotate(Math.PI / 2);

		const scale = experp(1, 4, this.animAmt);
		context.scale(scale, scale);

		context.beginPath();
		context.fillStyle = 'white';

		// draw the center hex
		for (let i = 0; i < 6; i++) {
			const amt = i / 6;
			const angle = 2 * Math.PI * amt;

			const x = triSize * Math.cos(angle);
			const y = triSize * Math.sin(angle);

			if (i == 0) {
				context.moveTo(x, y);
			}
			else {
				context.lineTo(x, y);
			}
		}
		context.closePath();

		// sub triangles
		for (let i = 0; i < 3; i++) {
			const amt = i / 3;
			const angle = 2 * Math.PI * amt;

			const x = triSize * Math.cos(angle);
			const y = triSize * Math.sin(angle);

			this.drawSubTriangle(context, x, y, angle);
		}
		context.fill();
	}

	/**
	 * @param {!CanvasRenderingContext2D} context
	 */
	drawSubTriangle(context, x, y, angle) {
		context.moveTo(x, y);

		const spinAmt = easeInOut(this.animAmt, 3);

		let startAngle = angle + (2 - 1 / 3) * Math.PI * spinAmt;

		{
			const sideAngle = startAngle - Math.PI / 3;

			const dx = triSize * Math.cos(sideAngle);
			const dy = triSize * Math.sin(sideAngle);

			context.lineTo(x + dx, y + dy);
		}

		{
			const sideAngle = startAngle - Math.PI * (1 / 3 + 1 / 3);

			const dx = triSize * Math.cos(sideAngle);
			const dy = triSize * Math.sin(sideAngle);

			context.lineTo(x + dx, y + dy);
		}
		context.closePath();
	}

}
