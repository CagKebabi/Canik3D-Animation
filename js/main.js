//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

//Create a Three.JS Scene
const scene = new THREE.Scene();
//create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(
  8,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//Keep track of the mouse position, so we can make the eye move
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

//Keep the 3D object on a global variable so we can access it later
let object;
let bullet;
let bulletProjectile;
let bulletCase;
let bulletParts;
let canik;
let magazinePart1;
let magazinePart2;
let magazinePart3;
let magazinePart4;
let trigger1;
let trigger2;
let slide_low;
let opticcut_low;
let rear_sight_low;
let indicator_low;

//OrbitControls allow the camera to move around the scene
let controls;

//Set which object to render
let objToRender = "canik";

//Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

//Play Audio
function play() {
  var audio = new Audio("/gunshot.mp3");
  audio.play();
}

//Load the file
//BULLET
loader.load(
  `models/bullet/scene.gltf`,
  function (gltf) {
    bullet = gltf.scene;
    bulletParts = bullet.children[0].children[0].children[0];
    bulletProjectile = bullet.children[0].children[0].children[0].children[1];
    bulletCase = bullet.children[0].children[0].children[0].children[0];
    scene.add(bullet);
    bullet.scale.x = 0.05;
    bullet.scale.y = 0.05;
    bullet.scale.z = 0.05;
    bullet.rotation.z = 0.05;
    bullet.rotation.y = 2.7;
    bulletParts.position.x = 0.5;
    bulletParts.position.y = 11.3;
    bulletParts.position.z = -8;
  },
  function (xhr) {
    //While it is loading, log the progress
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    //If there is an error, log it
    console.error(error);
  }
);

//CANIK
loader.load(
  `models/${objToRender}/scene.gltf`,
  function (gltf) {
    //If the file is loaded, add it to the scene
    object = gltf.scene;
    canik = object.children[0].children[0].children[0].children;
    magazinePart1 = canik[3]
    magazinePart2 = canik[4]
    magazinePart3 = canik[5]
    magazinePart4 = canik[6]
    trigger1 = canik[8]
    trigger2 = canik[9]
    slide_low = canik[15]
    opticcut_low = canik[16]
    rear_sight_low = canik[17]
    indicator_low = canik[18]
    scene.add(object);
    object.rotation.y = -2;
    magazinePart1.scale.set(0,0,0) 
    magazinePart2.scale.set(0,0,0)
    magazinePart3.scale.set(0,0,0)
    magazinePart4.scale.set(0,0,0)
    console.log(trigger1);
    gsap.timeline()
      .to(camera.position, {
        x:10,
        y: -8,
        z: -2,
        duration: 4,
        onUpdate: () => {camera.lookAt(0,0,0)}
      })
      .to(camera.position, {
        x: -20.7,
        y: 8.2,
        z: 11,
        duration: 3,
        onUpdate: () => {camera.lookAt(0,0,0)}
      })
    
    document.addEventListener("keydown", function (e) {
      if (e.keyCode == 83) {
        play();
        gsap.fromTo(
          trigger1.rotation,
          { y: 0, yoyo: true, repeat: 1 },
          { y: -0.4, yoyo: true, repeat: 1, duration: 0.1 }
        );
        gsap.fromTo(
          trigger2.rotation,
          { y: 0, yoyo: true, repeat: 1 },
          { y: -0.9, yoyo: true, repeat: 1, duration: 0.1 }
        );
        gsap.fromTo(
          slide_low.position,
          { x: 0, yoyo: true, repeat: 1 },
          { x: 30, yoyo: true, repeat: 1, duration: 0.1 }
        );
        gsap.fromTo(
          opticcut_low.position,
          { x: 0, yoyo: true, repeat: 1 },
          { x: 30, yoyo: true, repeat: 1, duration: 0.1 }
        );
        gsap.fromTo(
          rear_sight_low.position,
          { x: 80, yoyo: true, repeat: 1 },
          { x: 110, yoyo: true, repeat: 1, duration: 0.1 }
        );
        gsap.fromTo(
          indicator_low.position,
          { x: 100, yoyo: true, repeat: 1 },
          { x: 130, yoyo: true, repeat: 1, duration: 0.1 }
        );
        gsap.fromTo(
          object.rotation,
          { z: 0, yoyo: true, repeat: 1 },
          { z: -0.15, yoyo: true, repeat: 1, duration: 0.1 }
        );
        gsap.fromTo(
          ".fireLight",
          { opacity: 0, repeat: 1 },
          { opacity: 1, yoyo: true, repeat: 1, duration: 0.05 }
        );
        gsap.fromTo(
          bulletParts.rotation,
          { x: 0, yoyo: true, repeat: 1 },
          { x: -0.15, yoyo: true, repeat: 1, duration: 0.1 }
        );
        gsap.fromTo(
          bulletCase.position,
          { x: -5.650801371896957e-16, y: 0.01853053644299507 },
          { x: -185, y: 45, duration: 0.9 }
        );
        gsap.fromTo(
          bulletProjectile.position,
          { z: 2.2435128688812256 },
          { z: 540, duration: 0.1 }
        );
      }
    });
  },
  function (xhr) {
    //While it is loading, log the progress
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    //If there is an error, log it
    console.error(error);
  }
);

//Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); //Alpha: true allows for the transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

//Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

//Set how far the camera will be from the 3D model
camera.position.z = objToRender === "canik" ? 25 : 500;

//Add lights to the scene, so we can actually see the 3D model
const topLight = new THREE.DirectionalLight(0xffffff, 5); // (color, intensity)
topLight.position.set(0, 2000, 0); //top-left-ish
topLight.castShadow = true;
const leftLight = new THREE.DirectionalLight(0xffffff, 5); // (color, intensity)
leftLight.position.set(0, 2500, -2900); //top-left-ish
leftLight.castShadow = true;
const rightLight = new THREE.DirectionalLight(0xffffff, 5); // (color, intensity)
rightLight.position.set(0, 2500, 2900); //top-left-ish
rightLight.castShadow = true;
scene.add(topLight, leftLight, rightLight);

const ambientLight = new THREE.AmbientLight(
  0x333333,
  objToRender === "canik" ? 5 : 1
);
scene.add(ambientLight);

//This adds controls to the camera, so we can rotate / zoom it with the mouse
// if (objToRender === "canik") {
//   controls = new OrbitControls(camera, renderer.domElement);
// }

//Render the scene
function animate() {
  requestAnimationFrame(animate);
  //Here we could add some code to update the scene, adding some automatic movement

  //Make the eye move
  // if (object && objToRender === "eye") {
  //   //I've played with the constants here until it looked good
  //   object.rotation.y = -3 + (mouseX / window.innerWidth) * 3;
  //   object.rotation.x = -1.2 + (mouseY * 2.5) / window.innerHeight;
  // }
  renderer.render(scene, camera);
}

//Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//add mouse position listener, so we can make the eye move
document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
};

//Start the 3D rendering
animate();

//BULLET LICENSE
//Model Information:
//* title:	Bullet 9 mm
//* source:	https://sketchfab.com/3d-models/bullet-9-mm-4cc75b7ef1bc474392c319a47fd97348
//* author:	Y2JHBK (https://sketchfab.com/Y2JHBK)
//
//Model License:
//* license type:	CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
//* requirements:	Author must be credited. Commercial use is allowed.

// window.addEventListener("click", () => {
//   console.log(trigger1);
// })