class Tile{
    constructor(i,j,scene) {
        this.x=i;
        this.z=j;
        this.walkable = true;
        this.items=[];
        this.tempItems=[];
        this.scene=scene;
        this.mesh = BABYLON.Mesh.CreateBox("tile", 0.1, scene);
        this.mesh.isVisible=false;
    }
    addItem(item){
        this.items.push(item);
        var meshThing=item.render(this.scene);
        meshThing.parent=this.mesh;
    }

    render(scene) {

       /* tile.isVisible=false;
        for(let item of this.items){
            var meshThing=item.render(scene,this.neighbors);

            meshThing.parent=tile;
        }
        return tile;*/
    }
    setNeighbors(neighbors){
        this.neighbors=neighbors;
    }
    getMesh(){
       return this.mesh;
    }
    getWeigth(){
        var totWeigth=0;
        for(let item of this.items){
            totWeigth+=item.getWeigth();
        }
        return totWeigth;
    }


    having(name){
        for(let item of this.items){
            if(item.constructor.name===name){
                return true;
            }
        }
        return false;
    }
    addTempItem(item){

        this.tempItems.push(item);
        var meshThing=item.render(this.scene,true);
        meshThing.parent=this.mesh;

    }
    removeTemp(){
        console.log("this.tempItems.length"+this.tempItems.length);
        while(this.tempItems.length!=0) {
            this.tempItems.pop().remove();
        }
        this.tempItems=[];
    }



    isWalkeble(){
        return walkable;
    }
}