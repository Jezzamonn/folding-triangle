import { easeInOut, experp, slurp } from './util';

const triSideLength = 50;

export default class Controller {

	constructor() {
		this.animAmt = 0;
		this.period = 10;
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
		// context.rotate(Math.PI / 2);
		const localAnimAmt = (2 * this.animAmt) % 1;
		const animState = Math.floor(2 * this.animAmt);
		if (animState == 1) {
			context.translate(
				0,
				-Math.sqrt(3) * triSideLength);
		}

		const scale = slurp(1, 2, localAnimAmt);

		const halfRows = 3;
		const halfCols = 3;
		for (let row = -halfRows; row <= halfRows; row++) {
			for (let col = -halfCols; col <= halfCols; col++) {
				const x = (col + (row % 2 == 0 ? 0 : 0.5)) * 3 * triSideLength;
				const y = row * (3 / 2) * Math.sqrt(3) * triSideLength;

				context.save();
				context.translate(x, y);

				context.scale(scale, scale);

				this.drawSplittingTriangle(context, localAnimAmt);
				context.restore();
			}
		}
	}

	drawSplittingTriangle(context, animAmt) {
		context.beginPath();
		context.fillStyle = 'white';

		// draw the center hex
		for (let i = 0; i < 6; i++) {
			const amt = i / 6;
			const angle = 2 * Math.PI * amt;

			const x = triSideLength * Math.cos(angle);
			const y = triSideLength * Math.sin(angle);

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

			const x = triSideLength * Math.cos(angle);
			const y = triSideLength * Math.sin(angle);

			this.drawSubTriangle(context, x, y, angle, animAmt);
		}
		context.fill();
	}

	/**
	 * @param {!CanvasRenderingContext2D} context
	 */
	drawSubTriangle(context, x, y, angle, animAmt) {
		context.moveTo(x, y);

		const spinAmt = easeInOut(animAmt, 3);

		let startAngle = angle + (2 - 1 / 3) * Math.PI * spinAmt;

		{
			const sideAngle = startAngle - Math.PI / 3;

			const dx = triSideLength * Math.cos(sideAngle);
			const dy = triSideLength * Math.sin(sideAngle);

			context.lineTo(x + dx, y + dy);
		}

		{
			const sideAngle = startAngle - Math.PI * (1 / 3 + 1 / 3);

			const dx = triSideLength * Math.cos(sideAngle);
			const dy = triSideLength * Math.sin(sideAngle);

			context.lineTo(x + dx, y + dy);
		}
		context.closePath();
	}

}
