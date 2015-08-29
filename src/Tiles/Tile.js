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
        if(item.checkOkeySpot(this.neighbors)) {
            item.calculateDirection();
            this.items.push(item);
            var meshThing = item.render(this.scene);
            meshThing.parent = this.mesh;
        }
    }

    setNeighbors(neighbors){
        neighbors.local=this;
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


    having(name,valueCheck){
        for(let item of this.items){
            if(item.constructor.name===name){
                if(valueCheck===undefined){
                    return true;
                }else if(item[valueCheck.obj]==valueCheck.value){
                    return true;

                }


            }
        }
        return false;
    }
    getItem(name){
        for(let item of this.items){
            if(item.constructor.name===name){
                return item;
            }
        }
    }


    addTempItem(item){
        if(item.checkOkeySpot(this.neighbors)) {
            item.calculateDirection();
            this.tempItems.push(item);
            var meshThing = item.render(this.scene, true);
            meshThing.parent = this.mesh;
        }

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