const triSize = 100;

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
		// draw the center triangle
		const numPoints = 3;

		context.beginPath();
		context.fillStyle = 'white';
		for (let i = 0; i < numPoints; i++) {
			const amt = i / numPoints;
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
		context.fill();

		// sub triangles
		for (let i = 0; i < numPoints; i++) {
			const amt = i / numPoints;
			const angle = 2 * Math.PI * amt;

			const x = triSize * Math.cos(angle);
			const y = triSize * Math.sin(angle);

			this.drawSubTriangle(context, x, y, angle);
		}
	}

	/**
	 * @param {!CanvasRenderingContext2D} context
	 */
	drawSubTriangle(context, x, y, angle) {
		context.beginPath();
		context.fillStyle = 'white';
		context.moveTo(x, y);

		{
			const sideAngle = angle + Math.PI / 4;

			const dx = 2 * triSize * Math.cos(sideAngle);
			const dy = 2 * triSize * Math.sin(sideAngle);

			context.lineTo(x + dx, y + dy);
		}

		{
			const sideAngle = angle + Math.PI * (1 / 4 + 1 / 3);

			const dx = 2 * triSize * Math.cos(sideAngle);
			const dy = 2 * triSize * Math.sin(sideAngle);

			context.lineTo(x + dx, y + dy);
		}

		context.closePath();
		context.fill();
	}

}
