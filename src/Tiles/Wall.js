/**
 * Created by bark on 2015-08-08.
 */

class Wall extends  TileItem{


    constructor(x,z) {
        super();
        this.weigth=100;
        this.klickedPoint={x,z};
        if (typeof(x)==='string'){
            this.walkable = false;
            this.direction=x;
        }else{
           // this.calculateDirection();

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
    checkOkeySpot(neighbors) {
        if (neighbors.local.having("Floor")){
            this.posebleDirections = {};
            this.posebleDirections.right = true;
            this.posebleDirections.left = true;
            this.posebleDirections.top = true;
            this.posebleDirections.down = true;
            return true;
        }
        return false;
    }


    getPointsFromdirections(direction,value){
        if(this.posebleDirections[direction]){
            switch (direction){
                case "right":
                    return {direction: direction, value: 0.5-value.x};
                    break;
                case "left":
                    return {direction: direction, value: 0.5+value.x};
                    break;
                case "top":
                    return {direction: direction, value: 0.5-value.z};
                    break;
                case "down":
                    return {direction: direction, value: 0.5+value.z};
                    break;

            }

        }
    }



    render(scene,temp) {

        this.mesh = BABYLON.Mesh.CreateBox("wall", 0.1, scene);
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
        //}



        // console.log(surondings);
      //  console.log(surondings[1][2].constructor.name);
        /*
        if(surondings.left.having("Wall")){
            var wall = BABYLON.Mesh.CreateBox("box", 0.1, scene);
            wall.scaling.x = 5;
            wall.position.x-=0.25;
            wall.parent=baseWall;
            wall.material = material;
        }
        if(surondings.right.having("Wall")){
            var wall = BABYLON.Mesh.CreateBox("box", 0.1, scene);
            wall.scaling.x = 5;
            wall.position.x+=0.25;
            wall.parent=baseWall;
            wall.material = material;
        }
        if(surondings.top.having("Wall")){
            var wall = BABYLON.Mesh.CreateBox("box", 0.1, scene);
            wall.scaling.z = 5;
            wall.position.z-=0.25;
            wall.parent=baseWall;
            wall.material = material;

        }
        if(surondings.down.having("Wall")){
            var wall = BABYLON.Mesh.CreateBox("box", 0.1, scene);
            wall.scaling.z = 5;
            wall.position.z+=0.25;
            wall.parent=baseWall;
            wall.material = material;
        }*/




        return this.mesh;
    }

}