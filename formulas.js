class Formulas {
	constructor() {
	}
	getNextPos = (x, y, theta, speed) => {
		return {
			x: x - Math.sin(theta) * speed,
			y: y + Math.cos(theta) * speed
		}
	}
	getNextOrbit(x, y, theta) {
		return {
			x: (x * Math.cos(theta)) - (y * Math.sin(theta)),
			y: (x * Math.sin(theta)) + (y * Math.cos(theta))
		}
	}
	getDistanceXY = (from, destination) => {
		let AB = (destination.position.x) - (from.position.x)
		let AC = (destination.position.y) - (from.position.y)
		let distance = Math.sqrt((AB * AB) + (AC * AC))
		console.log("distanceXY:", distance)
		return distance
	}
	getDistanceXYZ = (A, B) => {
		{
			if (!B) { B = { position: { x: 0, y: 0, z: 0 } } }
			let AB = (B.position.x) - (A.position.x)
			let AC = (B.position.y) - (A.position.y)
			let BC = (B.position.z) - (A.position.z)
			let distance = Math.floor(Math.sqrt((AB * AB) + (AC * AC) + (BC * BC)))
			return distance
		}
	}

	get_NextOrbitPosXYZ = (obj, centerObj = false) => {
		if (centerObj === false) { centerObj = { position: { x: 0, y: 0, z: 0 } } }
		let distance = this.getDistanceXYZ(obj, centerObj);
		if (obj.theta[0] > obj.theta[1]) {
			obj.theta[0] = obj.theta[0] - obj.theta[1]
		}
		let centerX = 0;
		let centerY = 0;
		let centerZ = 0;
		let centerW = .1;
		let centerH = .1;
		let centerD = .1;
		// 	// new pos
		let x2 = 0
		let y2 = 0
		let z2 = 0
		if (distance > 0) {
			// console.log('player check orbital force')
			x2 = centerX + ((distance) * (Math.cos(obj.theta.x[0])));
			y2 = centerY + ((distance) * (Math.sin(obj.theta.y[0])));
			z2 = centerZ + ((distance) * (Math.sin(obj.theta.z[0])));
		}
		else {
			x2 = centerX + (centerW * (Math.cos(obj.theta.x[0])));
			y2 = centerY + (centerH * (Math.sin(obj.theta.y[0])));
			z2 = centerZ + (centerD * (Math.sin(obj.theta.z[0])));
		}
		if (obj.theta.x[2] > 0) {
			obj.position.x = x2// - (obj.geometry.parameters.width / 2)
			obj.theta.x[0] = obj.theta.x[0] + obj.theta.x[2];
			obj.rotation.x = THREE.Math.degToRad(obj.theta.x[0])
		}
		if (obj.theta.y[2] > 0) {
			obj.position.y = y2
			obj.theta.y[0] = obj.theta.y[0] + obj.theta.y[2];
			obj.rotation.y = THREE.Math.degToRad(obj.theta.y[0])
		}
		if (obj.theta.z[2] > 0) {
			obj.position.z = z2
			obj.theta.z[0] = obj.theta.z[0] + obj.theta.z[2];
			obj.rotation.z = THREE.Math.degToRad(obj.theta.z[0])
		}
		if (obj.target) {
			obj.target.position.set(0, 0, 0);
		}
	}
	get_NextOrbitPosXYZ2 = (obj, centerObj = false) => {
		if (centerObj === false) { centerObj = { position: { x: 0, y: 0, z: 0 } } }
		let distance = obj.centerDistance
		if (obj.theta[0] > obj.theta[1]) {
			obj.theta[0] = obj.theta[0] - obj.theta[1]
		}
		//sun pos
		let centerX = 0;
		let centerY = 0;
		let centerZ = 0;
		let centerW = .1;
		let centerH = .1;
		let centerD = .1;
		//new pos
		let x2 = 0
		let y2 = 0
		let z2 = 0
		if (distance > 0) {
			x2 = centerX + ((distance) * (Math.cos(obj.theta.x[0])));
			y2 = centerY + ((distance) * (Math.sin(obj.theta.y[0])));
			z2 = centerZ + ((distance) * (Math.cos(obj.theta.z[0])));
		}
		else {
			x2 = centerX + (centerW * (Math.cos(obj.theta.x[0])));
			y2 = centerY + (centerH * (Math.sin(obj.theta.y[0])));
			z2 = centerZ + (centerD * (Math.sin(obj.theta.z[0])));
		}
		if (obj.theta.x[2] > 0) {
			obj.position.x = x2
			obj.theta.x[0] = obj.theta.x[0] + obj.theta.x[2];
		}
		if (obj.theta.y[2] > 0) {
			obj.position.y = y2
			obj.theta.y[0] = obj.theta.y[0] + obj.theta.y[2];
		}
		if (obj.theta.z[2] > 0) {
			obj.position.z = z2
			obj.theta.z[0] = obj.theta.z[0] + obj.theta.z[2];
		}
		if (obj.target) {
			obj.target.position.set(0, 0, 0);
		}
	}
}
