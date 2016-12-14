var Colors = {
	red: 0xED6A5A,
	grey: 0xD8DBE2,
	green: 0x96E6B3,
	brown: 0x9F7E69,
	mintcream: 0xF1FFFA,
	blue: 0xA5DCE5,
	black: 0x000000
};

var points = 0;
var moneyzArray = [];
var knivesArray = [];
var paused = true;


var scene, camera, fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH,
		renderer, container;

function buildScene() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

  scene = new THREE.Scene;

  scene.fog = new THREE.Fog(0xF1FFFA, 100, 950);

  aspectRatio = WIDTH/HEIGHT;
  fieldOfView = 60;
  nearPlane = 1;
  farPlane = 10000;
  camera = new THREE.PerspectiveCamera (
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
  );

  camera.position.x = 0;
  camera.position.z = 200;
  camera.position.y = 100;

  renderer = new THREE.WebGLRenderer ({
    alpha: true,
    antialias: true,
  });

  renderer.setSize(WIDTH, HEIGHT);

  renderer.shadowMap.enabled = true;

  container = $('#wall-street');
  //adds the domElement of the rendered to wallstreet
  container.append(renderer.domElement);
  renderer.render(scene, camera);
  window.addEventListener('resize', handleWindowResize, false);

}
//redefine for the window size
function handleWindowResize() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
  console.log('this window is resizing!')
}

var hemisphereLight, shadowLight;
//set the mood for flying dog
//let's name him now
//i name my flying dog Doggo

function buildLights() {
  hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)
	ambientLight = new THREE.AmbientLight(0xdc8874, .5);
  shadowLight = new THREE.DirectionalLight(0xFFFFFF, .9);
  shadowLight.position.set(150, 350, 350);
  shadowLight.castShadow = true;
  shadowLight.shadow.camera.left = -400;
	shadowLight.shadow.camera.right = 400;
	shadowLight.shadow.camera.top = 400;
	shadowLight.shadow.camera.bottom = -400;
	shadowLight.shadow.camera.near = 1;
	shadowLight.shadow.camera.far = 1000;

  shadowLight.shadow.mapSize.width = 2048;
  shadowLight.shadow.mapSize.height = 2048;

  scene.add(hemisphereLight);
  scene.add(shadowLight);
	scene.add(ambientLight);
  console.log('lights are on')
}

//build wall-street


var WallStreet = function() {
	var loader = new THREE.TextureLoader();

	var that = this;

  // load a resource
  loader.load(
  	// resource URL
  	'../textures/brickwall.jpg',
  	// Function when resource is loaded
  	function ( texture ) {
  		// do something with the texture
  		var material = new THREE.MeshBasicMaterial( {
  			map: texture,
        transparent: true,
        opacity: .8,
        shading: THREE.FlatShading
  		 } );
    	var geometry = new THREE.CylinderGeometry(120,120,150,16,4);
			geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
			that.mesh = new THREE.Mesh( geometry, material );
			that.mesh.position.y = -50
		});
}

var wallStreet;

function buildWallStreet() {
	wallStreet = new WallStreet();
	setTimeout(function(){
		scene.add(wallStreet.mesh)}, 2000);
 // renderer.render(scene, camera)
}


Money = function() {
	var loader = new THREE.TextureLoader();

	var that = this;

	// load a resource
	loader.load(
		// resource URL
		'../textures/cash.png',
		// Function when resource is loaded
		function ( texture ) {
			// do something with the texture
			var material = new THREE.MeshBasicMaterial( {
				map: texture,
				transparent: true,
				opacity: .8
			 } );
			 var geometry = new THREE.BoxGeometry( 25, 10, 10 );
			 geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
			 that.mesh = new THREE.Mesh( geometry, material );
			//  that.mesh.position.y= 50;
		});
}

Knife = function() {
	var loader = new THREE.TextureLoader();

	var that = this;

	// load a resource
	loader.load(
		// resource URL
		'../textures/knife.png',
		// Function when resource is loaded
		function ( texture ) {
			// do something with the texture
			var material = new THREE.MeshBasicMaterial( {
				map: texture,
				transparent: true,
				opacity: .8
			 } );
			 var geometry = new THREE.BoxGeometry( 30, 0, 30 );
			 geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
			 that.mesh = new THREE.Mesh( geometry, material );
			 that.mesh.position.y= 150;
		});
}


Cloud = function(){
	// Create an empty container that will hold the different parts of the cloud
	//CREATES A SINGLE CLOUD
	this.mesh = new THREE.Object3D();

	// create a cube geometry;
	// this shape will be duplicated to create the cloud
	var geom = new THREE.BoxGeometry(20,20,20);

	// create a material; a simple white material will do the trick
	var mat = new THREE.MeshPhongMaterial();
	mat.color.set(Colors.grey)

	// duplicate the geometry a random number of times
	var nBlocs = 3+Math.floor(Math.random()*3);
	for (var i=0; i<nBlocs; i++ ){

		// create the mesh by cloning the geometry
		var m = new THREE.Mesh(geom, mat);

		// set the position and the rotation of each cube randomly
		m.position.x = i*15;
		m.position.y = Math.random()*10;
		m.position.z = Math.random()*10;
		m.rotation.z = Math.random()*Math.PI*2;
		m.rotation.y = Math.random()*Math.PI*2;

		// set the size of the cube randomly
		var s = .1 + Math.random()*.9;
		m.scale.set(s,s,s);

		// allow each cube to cast and to receive shadows
		m.castShadow = true;
		m.receiveShadow = true;

		// add the cube to the container we first created
		this.mesh.add(m);
	}
}

allMoneyz = function() {
	this.mesh = new THREE.Object3D();
	// let's scatter some money in the sky
	// this.mesh = new THREE.Object3D();
	this.nMoneyz = 20;

	var that = this;

	var stepMoneyAngle = Math.PI*2;


	for (var i = 0; i < this.nMoneyz; i++) {
		m = new Money();

		moneyzArray.push(m);
	}

	setTimeout(function() {
		moneyzArray.forEach(function(m) {
			a = stepMoneyAngle * Math.random(20);
			h = 700 + Math.random() * 50;

			m.mesh.position.y = Math.sin(a) * h;
			m.mesh.position.x = Math.cos(a) * h;

			m.mesh.rotation.z = a + Math.PI/2;
			m.mesh.position.z = 0;

			s = 0.5+Math.random()*0.5;
			m.mesh.scale.set(s,s,s);

			that.mesh.add(m.mesh);
		})
	}, 1000)
}

allKnives = function() {
	this.mesh = new THREE.Object3D();

	this.nKnives = 20;

	var that = this;

	var stepKnifeAngle = Math.PI*2;


	for (var i = 0; i < this.nKnives; i++) {
		k = new Knife();

		knivesArray.push(k);
	}

	setTimeout(function() {
		knivesArray.forEach(function(k) {
			a = stepKnifeAngle * Math.random(20);
			h = 700 + Math.random() * 50;

			k.mesh.position.y = Math.sin(a) * h;
			k.mesh.position.x = Math.cos(a) * h;

			k.mesh.rotation.z = a + Math.PI/2;
			k.mesh.position.z = 0;

			s = 0.5+Math.random()*0.5;
			k.mesh.scale.set(s,s,s);

			that.mesh.add(k.mesh);
		})
	}, 1000)

}

// Define a Sky Object
allClouds = function(){
	// Create an empty container
	// CREATES A WHOLE BUNCH OF CLOUDS

	this.mesh = new THREE.Object3D();

	// choose a number of clouds to be scattered in the sky
	this.nClouds = 20;

	// To distribute the clouds consistently,
	// we need to place them according to a uniform angle
	var stepCloudAngle = Math.PI*2 / this.nClouds;

	// create the clouds
	for (var i=0; i<this.nClouds; i++) {
		c = new Cloud();

		// set the rotation and the position of each cloud;
		// for that we use a bit of trigonometry
		a = stepCloudAngle*i; // this is the final angle of the cloud
		h = 750 + Math.random()*200; // this is the distance between the center of the axis and the cloud itself

		// Trigonometry!!! I hope you remember what you've learned in Math :)
		// in case you don't:
		// we are simply converting polar coordinates (angle, distance) into Cartesian coordinates (x, y)
		c.mesh.position.y = Math.sin(a)*h;
		c.mesh.position.x = Math.cos(a)*h;

		// rotate the cloud according to its position
		c.mesh.rotation.z = a + Math.PI/2;

		// for a better result, we position the clouds
		// at random depths inside of the scene
		c.mesh.position.z = -400-Math.random()*400;

		// we also set a random scale for each cloud
		s = 1+Math.random()*2;
		c.mesh.scale.set(s,s,s);

		// do not forget to add the mesh of each cloud in the scene
		this.mesh.add(c.mesh);
	}
}



// Now we instantiate the sky and push its center a bit
// towards the bottom of the screen

// var sky;
//
// function buildSky(){
// 	sky = new Sky();
// 	sky.mesh.position.y = -600;
// 	scene.add(sky.mesh);
// 	// money = new Money();
// 	// setTimeout(function(){
// 	// 	scene.add(money.mesh)
// 	// },1000);
// 	// allMoneyz.push(money);
// }

var clouds;

function buildClouds() {
	clouds = new allClouds();
	clouds.mesh.position.y = -600;
	scene.add(clouds.mesh)
}

var knives;

function buildKnives() {
	knives = new allKnives();
	knives.mesh.position.y = -600;
	scene.add(knives.mesh)
}

var moneyz;

function buildMoneyz() {
	moneyz = new allMoneyz();
	moneyz.mesh.position.y = -600;
	scene.add(moneyz.mesh)
}

var Dog = function() {
  this.mesh = new THREE.Object3D();

  var geomBody = new THREE.BoxGeometry(60,40,50,1,1,1)
	var matBody = new THREE.MeshPhongMaterial({
		shading: THREE.FlatShading
	})
	matBody.color.set(Colors.brown);

	var body = new THREE.Mesh(geomBody, matBody);
	body.castShadow = true;
	body.receiveShadow = true;
	body.position.y = -10;
	this.mesh.add(body)

	var geomHead = new THREE.BoxGeometry(30,50,50,1,1,1);
	var matHead = new THREE.MeshPhongMaterial({color:Colors.brown, shading:THREE.FlatShading});
	var head = new THREE.Mesh(geomHead, matHead);
	head.position.x = 40;
	head.castShadow = true;
	head.receiveShadow = true;
	this.mesh.add(head);

	var geomRightEye = new THREE.BoxGeometry(5,10,1,1,1,1);
	var matRightEye = new THREE.MeshPhongMaterial({color: Colors.black, shading: THREE.FlatShading});
	var rightEye = new THREE.Mesh(geomRightEye, matRightEye);
	rightEye.position.x = 40;
	rightEye.position.y = 10;
	rightEye.position.z = 25;
	rightEye.receiveShadow = true;
	this.mesh.add(rightEye)

	var geomLeftEye = new THREE.BoxGeometry(5,10,1,1,1,1);
	var matLeftEye = new THREE.MeshPhongMaterial({color: Colors.black, shading: THREE.FlatShading});
	var leftEye = new THREE.Mesh(geomLeftEye, matLeftEye);
	leftEye.position.x = 40;
	leftEye.position.y = 10;
	leftEye.position.z = -25;
	leftEye.receiveShadow = true;
	this.mesh.add(leftEye)

	var geomMouth = new THREE.BoxGeometry(20,30,30,1,1,1);
	var matMouth = new THREE.MeshPhongMaterial({color:Colors.brown, shading:THREE.FlatShading});
	var mouth = new THREE.Mesh(geomMouth, matMouth);
	mouth.position.x = 60;
	mouth.position.y = -10;
	mouth.castShadow = true;
	mouth.receiveShadow = true;
	this.mesh.add(mouth);

	var geomNose = new THREE.BoxGeometry(10,10,5,1,1,1);
	var matNose = new THREE.MeshPhongMaterial({color:Colors.black, shading:THREE.FlatShading});
	var nose = new THREE.Mesh(geomNose, matNose);
	nose.position.x = 70;
	nose.position.y = 1;
	nose.position.z = 0;
	nose.receiveShadow = true;
	this.mesh.add(nose);

	var geomLeftEar = new THREE.BoxGeometry(20,30,10,1,1,1);
	var matLeftEar = new THREE.MeshPhongMaterial({color:Colors.black, shading:THREE.FlatShading});
	this.leftEar = new THREE.Mesh(geomLeftEar, matLeftEar);
	this.leftEar.position.x = 20;
	this.leftEar.position.y = 10;
	this.leftEar.position.z = -25;
	this.leftEar.castShadow = true;
	this.leftEar.receiveShadow = true;
	this.mesh.add(this.leftEar);

	var geomRightEar = new THREE.BoxGeometry(20,30,10,1,1,1);
	var matRightEar = new THREE.MeshPhongMaterial({color:Colors.black, shading:THREE.FlatShading});
	this.rightEar = new THREE.Mesh(geomRightEar, matRightEar);
	this.rightEar.position.x = 20;
	this.rightEar.position.y = 10;
	this.rightEar.position.z = 25;
	this.rightEar.castShadow = true;
	this.rightEar.receiveShadow = true;
	this.mesh.add(this.rightEar);

	var geomTail = new THREE.BoxGeometry(15,5,5,1,1,1);
	var matTail = new THREE.MeshPhongMaterial({color:Colors.black, shading:THREE.FlatShading});
	this.tail = new THREE.Mesh(geomTail, matTail);
	this.tail.position.x = -35;
	this.tail.position.y = 5;
	this.tail.position.z = 0;
	this.tail.receiveShadow = true;
	this.mesh.add(this.tail);


}

var dog;

function buildDog() {
	dog = new Dog();
	dog.mesh.scale.set(.25,.25,.25);
	dog.mesh.position.y = 100;
	scene.add(dog.mesh)
}


function loop() {
	// money.mesh.rotation.z += .005;
	if (paused == false) {
		wallStreet.mesh.rotation.z += .005;
		clouds.mesh.rotation.z += .005;
		knives.mesh.rotation.z += .002;
		moneyz.mesh.rotation.z += .002;
		$(document.body).css("cursor", "none")
		updateDogPos();
	} else {
		wallStreet.mesh.rotation.z += 0;
		clouds.mesh.rotation.z += 0;
		knives.mesh.rotation.z += 0;
		moneyz.mesh.rotation.z += 0;
		$(document.body).css("cursor", "default")
	}

  renderer.render(scene, camera);
  // console.log("where is my bloody wallstreet")
	requestAnimationFrame(loop);
}


var mousePos = {
	x : 0,
	y : 0
};

function handleMouseMove(event) {
	// here we are converting the mouse position value received
	// to a normalized value varying between -1 and 1;
	// this is the formula for the horizontal axis:
	var tx = -1 + (event.clientX / WIDTH)*2;
	// for the vertical axis, we need to inverse the formula
	// because the 2D y-axis goes the opposite direction of the 3D y-axis
	var ty = 1 - (event.clientY / HEIGHT)*2;
	mousePos = {x:tx, y:ty};
};

function updateDogPos() {
	checkWin();
	checkGetMoney();
	checkGetStabbed();

	// let's move the airplane between -100 and 100 on the horizontal axis,
	// and between 25 and 175 on the vertical axis,
	// depending on the mouse position which ranges between -1 and 1 on both axes;
	// to achieve that we use a normalize function (see below)
	var targetX = normalize(mousePos.x, -.75, .75, -100, 100);
	var targetY = normalize(mousePos.y, -.75, .75, 25, 175);
	dog.mesh.position.y += (targetY-dog.mesh.position.y)*0.1;
	// update the airplane's position
	dog.mesh.position.y = targetY;
	dog.mesh.position.x = targetX;
	dog.tail.rotation.x += 0.3;
	dog.rightEar.rotation.y += 0.5;
	dog.leftEar.rotation.y += 0.5;


}

function normalize(v,vmin,vmax,tmin, tmax){

	var nv = Math.max(Math.min(v,vmax), vmin);
	var dv = vmax-vmin;
	var pc = (nv-vmin)/dv;
	var dt = tmax-tmin;
	var tv = tmin + (pc*dt);
	return tv;

}

function checkGetMoney() {
	// console.log(dog.mesh.position.x)
	// console.log(dog.mesh.position.y)
	//for each mesh
	for (var i = 0; i < scene.children[4].children.length; i++) {
		obj = scene.children[4].children[i]
		objNumber = obj.length
		var position = new THREE.Vector3();
		moneyX = position.setFromMatrixPosition(obj.matrixWorld).x;
		moneyY = position.setFromMatrixPosition(obj.matrixWorld).y;


		var mXRange = [moneyX-12, moneyX + 5];
		var mYRange = [moneyY-5, moneyY + 5];
		//give a range to the dog
		var dogXRange = [dog.mesh.position.x - 15, dog.mesh.position.x]
		var dogYRange = [dog.mesh.position.y - 5, dog.mesh.position.y + 10]

		if (dogXRange[1] >= mXRange[0] && dogXRange[0] <= mXRange[1]
			&& dogYRange[1] >= mYRange[0] && dogYRange[0] <= mYRange[1]) {
			scene.children[4].remove(obj);
			addMoney();
		}
	}
}


function checkGetStabbed() {
	// console.log(dog.mesh.position.x)
	// console.log(dog.mesh.position.y)
	//for each mesh


	for (var i = 0; i < scene.children[5].children.length; i++) {
		obj = scene.children[5].children[i];
		var position = new THREE.Vector3();
		knifeX = position.setFromMatrixPosition(obj.matrixWorld).x;
		knifeY = position.setFromMatrixPosition(obj.matrixWorld).y;

		var mXRange = [knifeX-12, knifeX + 5];
		var mYRange = [knifeY-5, knifeY + 5];
		//give a range to the dog
		var dogXRange = [dog.mesh.position.x - 15, dog.mesh.position.x]
		var dogYRange = [dog.mesh.position.y - 5, dog.mesh.position.y + 10]

		if (dogXRange[1] >= mXRange[0] && dogXRange[0] <= mXRange[1]
			&& dogYRange[1] >= mYRange[0] && dogYRange[0] <= mYRange[1]) {
				scene.children[5].remove(obj);
				deductMoney();
		}
	}
}


function addMoney() {
	points += 1;
	$('#amount').text(points)
	// $('#amount').css("transform","scale(1.2)")
}

function deductMoney() {
	points -= 1;
	$('#amount').text(points)
}

function checkWin() {
	if (points == 1) {
		paused = true;
		loop();
		$('#outcome').toggle();
		winAnimation();
	}
}

function winAnimation() {
	requestAnimationFrame( winAnimation );
	dog.mesh.scale.set(.5,.5,.5);
	dog.mesh.rotation.x += 0.005;
	dog.mesh.rotation.y += 0.01;

	renderer.render( scene, camera );
}

function start() {
	buildScene();
	buildLights();
	buildWallStreet();

	// buildSky();
	buildClouds();
	buildMoneyz(); //this is child 4
	buildKnives(); //this is child 5
	buildDog();
	// // start a loop that will update the objects' positions
	// // and render the scene on each frame
	$(document).on("mousemove",handleMouseMove)
	setTimeout(function(){loop()},2000);
}

window.addEventListener('load', start, false);


$(document).ready(function() {
	$('#letsplay').on("mousedown", function() {
		paused = false;
		$('#play').hide();
		$('#controls').show();
		$('.fa-play').hide();
		// updateDogPos();
		loop();
	})

	$('.fa-pause').on("mousedown", function() {
		paused = true;
		$('.fa-play').show();
		$('.fa-pause').hide();
		// updateDogPos();
		loop();
	})

	$('.fa-play').on("mousedown", function() {
		paused = false;
		$('.fa-pause').show();
		$('.fa-play').hide();
		// updateDogPos();
		loop();
	})

});
