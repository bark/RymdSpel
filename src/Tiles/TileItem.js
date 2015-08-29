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
}