class TileItem{
    constructor() {
        this.walkable = true;
    }
    render() {
        Console.log("nead rending");
    }

    isWalkeble(){
        return walkable;
    }
    remove(){
        this.mesh.dispose();
    }

    getWeigth(){
        return this.weigth;
    }
    checkOkeySpot(){
        this.posebleDirections={};
        this.posebleDirections.right=true;
        this.posebleDirections.left=true;
        this.posebleDirections.top=true;
        this.posebleDirections.down=true;
        return true;
    }
    calculateDirection(){

    }
}