class Point {

	constructor() {
		const [x, y] = [width, height].map(n => n / 2);
		this.coordinates = {x, y};
		this.vector = this.randomVector();
	}

	move() {
		this.coordinates.x += this.vector.x;
		this.coordinates.y += this.vector.y;

		if (
			this.coordinates.x < 0          ||
			this.coordinates.x > width  - 1 ||
			this.coordinates.y < 0          ||
			this.coordinates.y > height - 1
		) {
			this.coordinates.x = constrain(this.coordinates.x, 0, width  - 1);
			this.coordinates.y = constrain(this.coordinates.y, 0, height - 1);
			this.vector = this.randomVector();
		}
	}

	randomVector() {
		const [x, y] = Array.from({length: 2}, () => random(settings.speed.min, settings.speed.max) * (Math.random() < 0.5 ? -1 : 1));
		return {x, y};
	}
}

const settings = {
	numberOfPoints : 16,

	speed : {
		min :  0,
		max : 32,
	},
};

setup = () => {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB);
	noFill();
	strokeWeight(0.2);

	settings.points = Array.from({length: settings.numberOfPoints}, () => new Point);
}

draw = () => {
	for (let i = 0; i < settings.points.length; i++) {
		const [
			{x: x1, y: y1},
			{x: x2, y: y2},
			{x: x3, y: y3},
			{x: x4, y: y4},
		] = Array.from({length: 4}, (_, n) => settings.points[(i + n) % settings.points.length].coordinates);

		stroke([360, 100, 100].map(n => (frameCount + n / settings.numberOfPoints * i) % n));
		bezier(x1, y1, x2, y2, x3, y3, x4, y4);
		settings.points[i].move();
	}
}

windowResized = () => {
	resizeCanvas(windowWidth, windowHeight);
}