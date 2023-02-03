class Formulas {
	constructor() {
	}

	/*
	Cette fonction calcule la position suivante d'un objet en mouvement à vitesse constante dans un espace 2D.
	Elle utilise l'angle "theta" pour déterminer la direction de déplacement de l'objet et la vitesse "speed" pour déterminer la distance de déplacement.
	Les nouvelles coordonnées (x, y) de l'objet sont calculées en utilisant les formules trigonométriques pour déterminer les composantes x et y du déplacement. 
	*/
	getNextPos = (x, y, theta, speed) => {
		return {
			x: x - Math.sin(theta) * speed,
			y: y + Math.cos(theta) * speed
		}
	}

	/*
	Cette fonction calcule les coordonnées du prochain point dans un orbite en 2D.
	Les coordonnées du point actuel (x, y) sont transformées en utilisant une rotation d'angle "theta" dans le plan. 
	La formule utilisée pour la transformation est la "transformation de coordonnées polaires vers les coordonnées cartésiennes."
	*/
	getNextOrbit(x, y, theta) {
		return {
			x: (x * Math.cos(theta)) - (y * Math.sin(theta)),
			y: (x * Math.sin(theta)) + (y * Math.cos(theta))
		}
	}
	/*
	Cette fonction calcule la distance entre deux points dans un espace 2D.
	Les points sont représentés par les objets "from" et "destination" qui ont chacun une propriété "position" avec des coordonnées x et y.
	La fonction calcule la différence des coordonnées x (AB) et y (AC) entre les deux points, puis calcule la distance en utilisant la formule de distance Euclidienne (racine carrée de la somme des carrés des différences).
	La distance est ensuite renvoyée en tant que résultat de la fonction.
	*/
	getDistanceXY = (from, destination) => {
		let AB = (destination.position.x) - (from.position.x)
		let AC = (destination.position.y) - (from.position.y)
		let distance = Math.sqrt((AB * AB) + (AC * AC))
		console.log("distanceXY:", distance)
		return distance
	}
	/*
	Cette fonction calcule la distance entre deux points dans un espace 3D.
	Les points sont représentés par les objets "A" et "B" qui ont chacun une propriété "position" avec des coordonnées x, y et z.
	Si l'objet "B" n'est pas fourni, il est défini par défaut à (0, 0, 0).
	La fonction calcule la différence des coordonnées x (AB), y (AC) et z (BC) entre les deux points, puis calcule la distance en utilisant la formule de distance Euclidienne en 3D (racine carrée de la somme des carrés des différences).
	La distance est ensuite arrondie et renvoyée en tant que résultat de la fonction.
	*/
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
	/*
	Cette fonction calcule la prochaine position d'un objet en orbite autour d'un objet central.
	Si l'objet central n'est pas spécifié, il est considéré comme étant situé à l'origine (0, 0, 0).
	La distance entre les deux objets est calculée à l'aide de la méthode getDistanceXYZ.
	Ensuite, la fonction calcule la nouvelle position en utilisant les angles obj.theta et la distance entre les deux objets.
	Les nouvelles positions en X, Y et Z sont stockées dans x2, y2 et z2.
	Si l'angle de rotation dans une direction particulière (X, Y ou Z) est supérieur à zéro, la rotation et la position de l'objet en orbite sont mis à jour en conséquence.
	Si l'objet en orbite a une cible, sa position est définie à (0, 0, 0).
	*/
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
	/*
	Le script "get_NextOrbitPosXYZ2" ressemble beaucoup au script "get_NextOrbitPosXYZ", mais avec quelques différences notables :
	Il utilise un objet "centerObj" en option qui peut être passé en argument ou défini comme un objet par défaut si aucun n'est fourni.
	Il calcule les nouvelles positions en x, y et z en utilisant la formule mathématique cosinus pour déterminer la distance de l'objet à son centre d'orbite.
	Les nouvelles positions sont ensuite stockées dans les propriétés de position de l'objet.
	Il n'a pas la fonctionnalité de définir un objet cible.
	La logique dans le script "get_NextOrbitPosXYZ2" est différente de celle dans le script "get_NextOrbitPosXYZ", mais les deux scripts accomplissent les mêmes tâches en utilisant des approches différentes.
	*/
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
