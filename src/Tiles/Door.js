/**
 * Created by bark on 2015-08-08.
 */

class Door extends  TileItem{
    constructor() {
        super();
        this.walkable = false;
    }

    render(scene,surondings) {

        var baseWall = BABYLON.Mesh.CreateBox("wall", 0.1, scene);
        baseWall.scaling.y = 20;
        baseWall.position.y += 1;
        var material = new BABYLON.StandardMaterial("material02", scene);
        material.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0);
        baseWall.material = material;

        if(surondings[1][0].constructor.name=="Wall"){//Down
            var wall = BABYLON.Mesh.CreateBox("box", 0.1, scene);
            wall.scaling.x = 10;
            wall.position.x-=0.5;
            wall.parent=baseWall;
            wall.material = material;
        }
        if(surondings[1][2].constructor.name=="Wall"){
            var wall = BABYLON.Mesh.CreateBox("box", 0.1, scene);
            wall.scaling.x = 10;
            wall.position.x+=0.5;
            wall.parent=baseWall;
            wall.material = material;
        }
        if(surondings[0][1].constructor.name=="Wall"){
            var wall = BABYLON.Mesh.CreateBox("box", 0.1, scene);
            wall.scaling.z = 10;
            wall.position.z-=0.5;
            wall.parent=baseWall;
            wall.material = material;

        }
        if(surondings[2][1].constructor.name=="Wall"){
            var wall = BABYLON.Mesh.CreateBox("box", 0.1, scene);
            wall.scaling.z = 10;
            wall.position.z+=0.5;
            wall.parent=baseWall;
            wall.material = material;
        }




        return baseWall;
    }

}