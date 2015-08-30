"USE STRICT";

function init() {

    var buildMode=false;
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);
    var ship;
    var scene;
    var camera;

    var golvKnapp=$("<button>").html("golv");
    var chosenBuildThing;
    var intervalId;
    var currentKeys=[];


    $(".buildMenu").append(golvKnapp);

    var temparray=[];
    golvKnapp.click(function(event){
        chosenBuildThing=Floor;
        event.stopPropagation();
    });


    var wallButton=$("<button>").html("wall");
    $(".buildMenu").append(wallButton);
    wallButton.click(function(event){
        chosenBuildThing=Wall;
        event.stopPropagation();
    });
    var engineButton=$("<button>").html("engine");
    $(".buildMenu").append(engineButton);
    engineButton.click(function(event){
        chosenBuildThing=Engine;
        event.stopPropagation();
    });

    var calculateCentrumPoint=$("<button>").html("CalculateCentrumPoint");
    $(".driveMenu").append(calculateCentrumPoint);
    calculateCentrumPoint.click(function(){
        var centrumPoint=ship.calculateWeigthCenter();
        console.log(centrumPoint);
        var mesh =BABYLON.Mesh.CreateSphere("sphere", 10.0, 0.5, scene);
        mesh.position.y += 0.25;
        mesh.position.x += centrumPoint.x;
        mesh.position.z += centrumPoint.z;
        var material = new BABYLON.StandardMaterial("material01", scene);
        material.diffuseColor = new BABYLON.Color3(0, 1, 0);
    });


    var centerCammeran=function(){
        var centrumPoint=ship.calculateWeigthCenter();
        console.log(centrumPoint);
        console.log("camera.position.z"+camera.position.z+" camera.position.x"+camera.position.x);
        camera.position.z= centrumPoint.z-camera.position.y;
        camera.position.x = centrumPoint.x;
        console.log("camera.position.z"+camera.position.z+" camera.position.x"+camera.position.x);
    };
    var centerCammeranButton=$("<button>").html("Center cameran");
    $(".driveMenu").append(centerCammeranButton);

    centerCammeranButton.click(centerCammeran);




    $("#buildModeToggle").click(function(){
        buildMode=!buildMode;
        console.log("buildMode"+buildMode);
        if(buildMode){
            $(".buildMenu").show();
        }else{
            $(".buildMenu").hide();
        }
    });




    intervalId=setInterval(function () {
        if(chosenBuildThing){
            while(temparray.length!=0) {
                temparray.pop().removeTemp();
            }

            var pickResult = scene.pick(scene.pointerX, scene.pointerY);


            var tile=ship.getPosition(Math.round(pickResult.pickedPoint.x),Math.round(pickResult.pickedPoint.z));

            temparray.push(tile);
            var localX=pickResult.pickedPoint.x-Math.round(pickResult.pickedPoint.x);
            var localZ=pickResult.pickedPoint.z-Math.round(pickResult.pickedPoint.z);

            tile.addTempItem(new chosenBuildThing(localX,localZ));
        }
    }, 50);
    window.addEventListener("click", function () {
        if(chosenBuildThing) {
            // We try to pick an object
            var pickResult = scene.pick(scene.pointerX, scene.pointerY);
            var tile = ship.getPosition(Math.round(pickResult.pickedPoint.x), Math.round(pickResult.pickedPoint.z));
            var localX=pickResult.pickedPoint.x-Math.round(pickResult.pickedPoint.x);
            var localZ=pickResult.pickedPoint.z-Math.round(pickResult.pickedPoint.z);

            tile.addItem(new chosenBuildThing(localX,localZ));
        }

    });





    var normal=$("<button>").html("normal");
    $(".buildMenu").append(normal);
    normal.click(function(){
        chosenBuildThing=undefined;
    });




    var createScene = function () {

        // This creates a basic Babylon Scene object (non-mesh)
        scene = new BABYLON.Scene(engine);


        // This attaches the camera to the canvas
        // camera.attachControl(canvas, true);

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;

        var surrondings = BABYLON.Mesh.CreateBox("wall", 200, scene);
        surrondings.position.y+=100;
        var material = new BABYLON.StandardMaterial("material01", scene);
        material.diffuseColor = new BABYLON.Color3(0, 1, 0);
        surrondings.material=material;


        // paintLotsOfSquares(scene);
        ship = new Ship(scene);
        //ship.render(scene);
        // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene

        function setUpCamera() {
            // This creates and positions a free camera (non-mesh)
            camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 10, -10), scene);
            camera.setTarget(BABYLON.Vector3.Zero());

            centerCammeran();
            //camera.attachControl(canvas, true);
            // This targets the camera to scene origin
           // camera.cameraDirection.z +=5;
           // camera.cameraDirection.x +=5;
/*
            var accz=1;
            var animationBox = new BABYLON.Animation("myAnimation", "position.z", 60,
                BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
            // An array with all animation keys
            var keys = [];

            //At the animation key 0, the value of scaling is "1"
            keys.push({
                frame: 0,
                value: 0
            });


            //At the animation key 100, the value of scaling is "1"
            keys.push({
                frame: 100,
                value: accz
            });
            animationBox.setKeys(keys);

            ship.getMesh().animations.push(animationBox);
            scene.beginAnimation(ship.getMesh(), 0, 100, true);
*/
            var accZ=0;

            $(window).keydown(function (e) {
                console.log(e);
                var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
                console.log(key)


                if(buildMode) {
                    var step = 0.5;
                    if (key === 87) {
                        camera.cameraDirection.z += step;
                    }
                    if (key === 83) {//83
                        camera.cameraDirection.z -= step;
                    }
                    if (key === 65) {
                        camera.cameraDirection.x -= step;
                    }
                    if (key === 68) {
                        camera.cameraDirection.x += step;
                    }
                    if (key == 69) {
                        // ArcRotateCamera >> Camera turning around a 3D point (here Vector zero) with mouse and cursor keys
                        // Parameters : name, alpha, beta, radius, target, scene
                        //var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene);
                        camera.rotation.y += Math.PI / 4;
                        camera.position.z = camera.position.z + camera.position.y;
                        camera.position.x = camera.position.x + camera.position.y;

                    }
                    if (key == 81) {
                        camera.rotation.y -= Math.PI / 4;
                        camera.position.z = camera.position.z + camera.position.y;
                        camera.position.x = camera.position.x - camera.position.y;
                    }
                }else{


                    if (key === 87) {//w
                        currentKeys.push("w");

                    }if (key === 83) {//s
                        currentKeys.push("s");
                    }
                    if (key === 65) {//a
                        currentKeys.push("a");
                    }
                    if (key === 68) {//d
                        currentKeys.push("d");
                    }

                }

                //       alert( "Handler for .keydown() called." );
            });
            $(window).keyup(function (e) {
                var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
                console.log(key)
                if (key === 87) {//w
                    currentKeys=_.without(currentKeys,"w");

                }if (key === 83) {//s
                    currentKeys=_.without(currentKeys,"s");
                }
                if (key === 65) {//a
                    currentKeys=_.without(currentKeys,"a");
                }
                if (key === 68) {//d
                    currentKeys=_.without(currentKeys,"d");
                }

            });

            $(window).on('mousewheel DOMMouseScroll', function (e) {

                var direction = (function () {

                    var delta = (e.type === 'DOMMouseScroll' ?
                    e.originalEvent.detail * -40 :
                        e.originalEvent.wheelDelta);

                    return delta > 0 ? 0 : 1;
                }());

                if (direction === 0) {
                    console.log('Scroll down');

                    camera.cameraDirection.y -= 0.5;
                    camera.cameraDirection.z += 0.5;
                }
                if (direction === 1) {
                   console.log('Scroll up');
                    camera.cameraDirection.z -= 0.5;
                    camera.cameraDirection.y += 0.5;
                }
                e.preventDefault();
            });

        }

        setUpCamera();

        return scene;
 
    };

    var scene = createScene();

    scene.registerBeforeRender(function () {


    });
  /*  $("#renderCanvas").on("mouseover", function () {
       console.log("hover event");
    });

    */
    let fps = 0;
    engine.runRenderLoop(function () {
        fps++;
        ship.keysDown(currentKeys);
        ship.move();
        scene.render();
    });
    setInterval(function () {
        $(".fps").html(fps);
        fps = 0;
    }, 1000);


    // Resize
    window.addEventListener("resize", function () {
        engine.resize();
    });

    createScene();
}
$(document).ready(function(){
    init();
});