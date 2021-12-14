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

let wall ={
    width: 66,
    height: 2
}

const texture = new THREE.TextureLoader().load( "Textures/Green_Field.jpg" );
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 4, 4 );
/**
 * backgroundPlane
 */
let backgroundPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(world.width+5, world.height+5, 1, 1),
    new THREE.MeshPhongMaterial({
        //color: 0xFFFFFF
        map : texture
    })
);
backgroundPlane.position.z = -1;
backgroundPlane.receiveShadow = true;

//   // Draw side walls
//   const wallShape = new THREE.Shape();
//   wallShape.moveTo(0, 0);
//   wallShape.lineTo(1.4, 0);
//   wallShape.lineTo(1.4, .75);
//   wallShape.lineTo(0, .75);
//   wallShape.lineTo(0, 0);
//   const wallGeometry = new THREE.ExtrudeBufferGeometry([ wallShape ], {
//     steps: 1,
//     depth: 5,
//     bevelEnabled: false,
//     curveSegments: 32
//   });
//   const wallA = new THREE.Mesh(wallGeometry, new THREE.MeshStandardMaterial({ color: 0xff9999 }));
//   wallA.rotateY(-Math.PI / 2);
//   wallA.translateZ(50);
//   //house.add(wallA);
  
//   const wallB = wallA.clone();
//   wallB.translateZ(-50);
//   //house.add(wallB);

let northernwall = new THREE.Mesh(
    new THREE.BoxGeometry(wall.width, wall.height, 1, 1),
    new THREE.MeshPhongMaterial({
        color: 0xFFFFFF
        //map : texture
    })
);
northernwall.position.z = -1;
northernwall.position.y = 32;
northernwall.receiveShadow = true;

let southernwall = new THREE.Mesh(
    new THREE.BoxGeometry(wall.width, wall.height, 1, 1),
    new THREE.MeshPhongMaterial({
        color: 0xFFFFFF
        //map : texture
    })
);
southernwall.position.z = -1;
southernwall.position.y = -32;
southernwall.receiveShadow = true;

let easternwall = new THREE.Mesh(
    new THREE.BoxGeometry(wall.height, wall.width, 1, 1),
    new THREE.MeshPhongMaterial({
        color: 0xFFFFFF
        //map : texture
    })
);
easternwall.position.z = -1;
easternwall.position.x = 32;
easternwall.receiveShadow = true;

let westernwall = new THREE.Mesh(
    new THREE.BoxGeometry(wall.height, wall.width, 1, 1),
    new THREE.MeshPhongMaterial({
        color: 0xFFFFFF
        //map : texture
    })
);
westernwall.position.z = -1;
westernwall.position.x = -32;
westernwall.receiveShadow = true;
// const texture = new THREE.TextureLoader().load( "Textures/Green_Field.jpg" );
// texture.wrapS = THREE.RepeatWrapping;
// texture.wrapT = THREE.RepeatWrapping;
// texture.repeat.set( 4, 4 );
scene.add(backgroundPlane,northernwall,southernwall,easternwall,westernwall);
////    ////    ////
///    ////    ////
//    ////    ////

// /**
//  * AUDIO
//  */
// var stream = "BGM/js_sounds_snakebgm.mp3";

// var audioLoader = new THREE.AudioLoader();
// var listener = new THREE.AudioListener();
// var audio = new THREE.Audio(listener);
// audioLoader.load(stream, function(buffer) {
//     audio.setBuffer(buffer);
//     audio.setLoop(true);
//     audio.play();
// });


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
// directionalLight.shadow.mapSize.width = 5120; // default 512
// directionalLight.shadow.mapSize.height = 5120; // default 512
// directionalLight.shadow.camera.near = 0; // default
// directionalLight.shadow.camera.far = 1000
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

/**
 * Food
 */
 let food = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshLambertMaterial({
        color: 0xff0000
    })
);
scene.add(food);
food.castShadow = true;

let foodLight = new THREE.PointLight(0xff0000, 1, 20);
scene.add(foodLight);

////    ////    ////
///    ////    ////
//    ////    ////
function setup() {
    spawnfood();
}

function spawnfood() {
    food.position.x = Math.round(Math.random() * world.width - world.width / 2);
    food.position.y = Math.round(Math.random() * world.height - world.height / 2);

    foodLight.position.set(food.position.x, food.position.y, 3);
    // var stream = "Sound_Effects/POL-cinematic-boom-01.wav";
    // var audioLoader = new THREE.AudioLoader();
    // var listener = new THREE.AudioListener();
    // var audio = new THREE.Audio(listener);
    // audioLoader.load(stream, function(buffer) {
    //     audio.setBuffer(buffer);
    //     audio.setLoop(true);
    //     audio.play();
    // });

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