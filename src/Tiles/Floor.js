/**
 * Created by bark on 2015-08-08.
 */

class Floor extends  TileItem{
    constructor() {
        super();
        this.walkable = true;

        this.weigth=100;
    }

  /*  checkOkeySpot(neighbors) {
        if (neighbors.right.having("Floor")||neighbors.left.having("Floor")||neighbors.top.having("Floor")||neighbors.down.having("Floor")){
            this.posebleDirections = {};
            this.posebleDirections.right = true;
            this.posebleDirections.left = true;
            this.posebleDirections.top = true;
            this.posebleDirections.down = true;
            return true;
        }
        return false;
    }
*/
    render(scene,temp) {

        //var floorTot = BABYLON.Mesh.CreateBox("wall", 0.1, scene);
        this.mesh = BABYLON.Mesh.CreateBox("wall", 0.1, scene);
        this.mesh.scaling.x = 9.9;
        this.mesh.scaling.z=9.9;

        var material = new BABYLON.StandardMaterial("material01", scene);

        if(temp){
            console.log("temp is true");
            material.alpha=0.5;
//            material.diffuseColor = new BABYLON.Color3(0, 1, 0);
        }

      //  Mainfloor.parent=floorTot;
        this.mesh.material = material;

       /*if(surondings[1][0].constructor.name=="Wall"||surondings[1][0].constructor.name=="Door"){
            var wall = BABYLON.Mesh.CreateBox("box", 0.1, scene);
            wall.scaling.x = 5;
            wall.scaling.z = 5;
            wall.position.x=-0.75;
            wall.parent=floorTot;
            wall.material = material;
        }
        if(surondings[1][2].constructor.name=="Wall"||surondings[1][2].constructor.name=="Door"){
            var wall = BABYLON.Mesh.CreateBox("box", 0.1, scene);
           // wall.scaling.x = 5;
            wall.scaling.x = 5;
            wall.scaling.z = 9.9;
            wall.position.x=0.75;
            wall.parent=floorTot;
            wall.material = material;
        }
        if(surondings[0][1].constructor.name=="Wall"||surondings[0][1].constructor.name=="Door"){
            var wall = BABYLON.Mesh.CreateBox("box", 0.1, scene);
            //wall.scaling.z = 5;
            wall.position.z=0.75;
            wall.parent=floorTot;
            wall.material = material;

        }
        if(surondings[2][1].constructor.name=="Wall"||surondings[2][1].constructor.name=="Door"){
            var wall = BABYLON.Mesh.CreateBox("box", 0.1, scene);
           // wall.scaling.z = 5;
            wall.scaling.x = 9.9;
            wall.scaling.z = 5;
            wall.position.z=0.75;

            wall.parent=floorTot;
            wall.material = material;
        }
        */


        return this.mesh;
    }




}