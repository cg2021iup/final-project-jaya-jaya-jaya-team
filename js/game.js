//          ////////////////////////////
//         ////     SNAKE GAME     ////
//        ////    Created By      ////
//       ////   Jaya Jaya Team   ////
//      ////////////////////////////

//// ////
let raycaster;
let mouse;

let world = {
    width: 60,
    height: 60
}

/**
 * backgroundPlane
 */
let backgroundPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(world.width, world.height, 1, 1),
    new THREE.MeshPhongMaterial({
        color: 0xFFFFFF
    })
);
backgroundPlane.position.z = -1;
backgroundPlane.receiveShadow = true;
scene.add(backgroundPlane);
////    ////    ////
///    ////    ////
//    ////    ////

/**
 * ambientLight
 */
let ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight); //
////    ////    ////
///    ////    ////
//    ////    ////

/**
 * directionalLight 
 */
var directionalLight = new THREE.PointLight(0xffffff, 1, 500, 0.01);
directionalLight.castShadow = true; // default false

//Set up shadow properties for the light
directionalLight.shadow.mapSize.width = 5120; // default 512
directionalLight.shadow.mapSize.height = 5120; // default 512
directionalLight.shadow.camera.near = 0; // default
directionalLight.shadow.camera.far = 1000
// default
scene.add(directionalLight);

/**
 * player
 */
let player = new Player();
////    ////    ////
///    ////    ////
//    ////    ////

/**
 * Game controller for all user input
 */
let controller = new Controller();
controller.setup();
////    ////    ////
///    ////    ////
//    ////    ////

/**
 * Time Keeper
 */
let clock = new THREE.Clock(true);
////    ////    ////
///    ////    ////
//    ////    ////

////    ////    ////
///    ////    ////
//    ////    ////
function setup() {
    
}


let deltaTime;
let then = 0;
let frameCount = 0;
/**
 * @description Master Function for running the game   
 * requestAnimationFrame(gameLoop);  
 * update();  
 * render();  
 */
function gameLoop(now) {

    now *= 0.001; // make it seconds

    deltaTime = now - then;
    then = now;

    requestAnimationFrame(gameLoop);
    frameCount++;

    if (frameCount > 10) {
        update();
        render();
    }

}
////    ////    ////
///    ////    ////
//    ////    ////

/**
 * update
 */
function update() {

    controller.update();

    if (controller.uparrow) {
        if (player.direction == "down") {
            player.direction = "down";
        } else {
            player.direction = "up";
        }
    }
    if (controller.downarrow) {
        if (player.direction == "up") {
            player.direction = "up";
        } else {
            player.direction = "down";
        }
    }
    if (controller.leftarrow) {
        if (player.direction == "right") {
            player.direction = "right";
        } else {
            player.direction = "left";
        }
    }
    if (controller.rightarrow) {
        if (player.direction == "left") {
            player.direction = "left";
        } else {
            player.direction = "right";
        }
    }

    if (clock.getElapsedTime() > 0.09) {
        if (controller.keyCodes[32]) {
        }
        player.update();
        clock.start();
    }

}
////    ////    ////
///    ////    ////
//    ////    ////

/**
 * render
 */
function render() {
    renderer.render(scene, camera);
}
////    ////    ////
///    ////    ////
//    ////    ////

setup();
gameLoop();

////////////////////////////////////