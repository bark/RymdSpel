/**
 * Created by bark on 2015-08-08.
 */

class Engine extends  TileItem{


    constructor(x,z) {
        super();
        this.weigth=200;
        this.power=100;
        this.klickedPoint={x,z};

        if (typeof(x)==='string'){
            this.walkable = false;
            this.direction=x;
        }else{

        }
    }
    calculateDirection(){

        var pointList=[];
        pointList.push(this.getPointsFromdirections("right",this.klickedPoint));
        pointList.push(this.getPointsFromdirections("left",this.klickedPoint));
        pointList.push(this.getPointsFromdirections("top",this.klickedPoint));
        pointList.push(this.getPointsFromdirections("down",this.klickedPoint));
        console.log(pointList);
        var pointlistSorted=_.sortBy(pointList,"value");
        console.log(pointlistSorted);
        this.direction=pointlistSorted[0].direction;


    }
    getPointsFromdirections(direction,value){
        if(this.posebleDirections[direction]){
            switch (direction){
                case "right":
                    return {direction: direction, value: 0.5-value.x};
                case "left":
                    return {direction: direction, value: 0.5+value.x};
                case "top":
                    return {direction: direction, value: 0.5-value.z};
                case "down":
                    return {direction: direction, value: 0.5+value.z};

            }

        }
    }




    checkOkeySpot(neighbors){
        console.log(neighbors);
        var checkOk=false;
        this.posebleDirections={};
        if(neighbors.right.having("Wall",{obj:"direction","value":"left"})||neighbors.local.having("Wall",{obj:"direction","value":"right"})){
            checkOk=true;
            this.posebleDirections.right=true;
        }
        if(neighbors.left.having("Wall",{obj:"direction","value":"right"})||neighbors.local.having("Wall",{obj:"direction","value":"left"})){
            checkOk=true;
            this.posebleDirections.left=true;
        }
        if(neighbors.top.having("Wall",{obj:"direction","value":"down"})||neighbors.local.having("Wall",{obj:"direction","value":"top"})){
            checkOk=true;
            this.posebleDirections.top=true;
        }
        if(neighbors.down.having("Wall",{obj:"direction","value":"top"})||neighbors.local.having("Wall",{obj:"direction","value":"down"})){
            checkOk=true;
            this.posebleDirections.down=true;
        }
        console.log(this.posebleDirections);
        return checkOk;

    }


    render(scene,temp) {

        //(name, height, diamTop, diamBottom, tessellation, [optional height subdivs], scene, updatable)

        this.mesh  = BABYLON.Mesh.CreateCylinder("cylinder", 1, 0.7, 0.3, 10, 1, scene, false);
        this.mesh.position.y+=1;//in the middle of the wall.
        var material = new BABYLON.StandardMaterial("material02", scene);
        material.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        switch (this.direction){
            case "right":
                this.mesh.rotation.z = Math.PI / 2;
                break;
            case "left":
                this.mesh.rotation.z = -Math.PI / 2;
                break;
            case "top":
                this.mesh.rotation.x = -Math.PI / 2;
                break;
            case "down":
                this.mesh.rotation.x = Math.PI / 2;
                break;
        }




/*        this.mesh = BABYLON.Mesh.CreateBox("wall", 0.1, scene);
       // box.scaling.x = 10;
        this.mesh.scaling.y = 20;
        this.mesh.position.y += 1;
        this.mesh.isVisible=false;

        var material = new BABYLON.StandardMaterial("material01", scene);
        material.diffuseColor = new BABYLON.Color3(1, 0, 0);
        if(temp){
            material.alpha=0.5;
        }
        this.mesh.material = material;

       // for(let direction of this.directions ) {
            if (this.direction === "down") {
                var wall = BABYLON.Mesh.CreateBox("box", 0.1, scene);
                wall.scaling.x = 10;
                wall.position.z -= 0.5;
                wall.parent = this.mesh;
                wall.material = material;
            }

            if (this.direction === "top") {
                var wall = BABYLON.Mesh.CreateBox("box", 0.1, scene);
                wall.scaling.x = 10;
                wall.position.z += 0.5;
                wall.parent = this.mesh;
                wall.material = material;

            }
            if (this.direction === "left") {
                var wall = BABYLON.Mesh.CreateBox("box", 0.1, scene);
                wall.scaling.z = 10;
                wall.position.x -= 0.5;
                wall.parent = this.mesh;
                wall.material = material;

            }
            if (this.direction === "right") {
                var wall = BABYLON.Mesh.CreateBox("box", 0.1, scene);
                wall.scaling.z = 10;
                wall.position.x += 0.5;
                wall.parent = this.mesh;
                wall.material = material;

            }
*/

        return this.mesh;
    }

}