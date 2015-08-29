"USE STRICT";

function init() {

    var buildMode=false;
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);
    var ship;
    var scene;

    var golvKnapp=$("<button>").html("golv");
    var chosenBuildThing=undefined;
    var intervalId;
    $(".buildMenu").append(golvKnapp);

    var temparray=[];
    golvKnapp.click(function(){
        chosenBuildThing=Floor;

    });


    var wallButton=$("<button>").html("wall");
    $(".buildMenu").append(wallButton);
    wallButton.click(function(){
        chosenBuildThing=Wall;

    });
    var engineButton=$("<button>").html("engine");
    $(".buildMenu").append(engineButton);
    engineButton.click(function(){
        chosenBuildThing=Engine;
    });

    var wallButton=$("<button>").html("CalculateCentrumPoint");
    $(".buildMenu").append(wallButton);
    wallButton.click(function(){
        var centrumPoint=ship.calculateWeigthCenter();
        console.log(centrumPoint);
        var mesh =BABYLON.Mesh.CreateSphere("sphere", 10.0, 0.5, scene);
        mesh.position.y += 0.25;
        mesh.position.x += centrumPoint.x;
        mesh.position.z += centrumPoint.z;
        var material = new BABYLON.StandardMaterial("material01", scene);
        material.diffuseColor = new BABYLON.Color3(0, 1, 0);



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
            var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 15, -10), scene);

            //camera.attachControl(canvas, true);
            // This targets the camera to scene origin
            camera.setTarget(BABYLON.Vector3.Zero());
            camera.cameraDirection.z +=5;
            camera.cameraDirection.x +=5;
            $(window).keydown(function (e) {
                console.log(e);
                var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
                console.log(key)
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
                if(key==69){
                    // ArcRotateCamera >> Camera turning around a 3D point (here Vector zero) with mouse and cursor keys
                    // Parameters : name, alpha, beta, radius, target, scene
                    //var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene);

                    scene.activeCamera.detachControl(canvas); // Detach FreeCamera
                    scene.activeCamera = cameraFree[1]; // active Camera ArcRotate
                    scene.activeCamera.attachControl(canvas); // attache camera ArcRotate

                    cameraFree[1].target.x = _mesh.position.x;
                    cameraFree[1].target.y = _mesh.position.y + 5;
                    cameraFree[1].target.z = _mesh.position.z;
                    cameraFree[1].radius = 20;
                    CameraChanged = true;
                }
                if(key==81){
                    // ArcRotateCamera >> Camera turning around a 3D point (here Vector zero) with mouse and cursor keys
                    // Parameters : name, alpha, beta, radius, target, scene

                    scene.activeCamera.detachControl(canvas); // detach ArcRotateCamera
                    scene.activeCamera = cameraFree[0]; // Active FreeCamera
                    scene.activeCamera.attachControl(canvas); // Attache FreeCamera

                    cameraFree[0].position.x = cameraFree[1].position.x;
                    cameraFree[0].position.y = cameraFree[1].position.y;
                    cameraFree[0].position.z = cameraFree[1].position.z;
                  //  cameraFree[0].setTarget(_mesh.position);
                    CameraChanged = false;
                }

                //       alert( "Handler for .keydown() called." );
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
  /*  $("#renderCanvas").on("mouseover", function () {
       console.log("hover event");
    });

    */
    let fps = 0;
    engine.runRenderLoop(function () {
        fps++;
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
})