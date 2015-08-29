/**
 * Created by bark on 2015-08-08.
 */

class Ship{

    /*

        <--z-->

        ^
        |
        x
        |


     */



    constructor(scene){


        this.ship = [];

        for (let i = 0; i < 100; i++) {//x dvs columner
            let tempArr=[];
            this.ship.push(tempArr);
            for (let j = 0; j < 100; j++) {//z dvs rows
                var tile=new Tile(i,j,scene);
                tempArr.push(tile);
                var mesh=tile.getMesh();
                mesh.position.x+=i;
                mesh.position.z+=j;

            }
        }


        for(let i=1;i<99;i++) {//columns
            for (let j = 1; j < 99; j++) {//rows
                this.ship[i][j].setNeighbors({
                    downLeft:this.ship[i-1][j-1],
                    left:this.ship[i-1][j],
                    topLeft:this.ship[i-1][j+1],
                    down:this.ship[i][j-1],
                    top:this.ship[i][j+1],
                    downRight:this.ship[i+1][j-1],
                    right:this.ship[i+1][j],
                    topRight:this.ship[i+1][j+1]});
            }
        }

      /*  for(let i=40;i<60;i++) {//columns
            for (let j = 40; j < 60; j++) {//rows
                this.ship[i][j].addItem(new Floor());
            }
        }*/

        this.ship[40][40].addItem(new Floor());

        this.ship[40][41].addItem(new Floor());

        this.ship[40][42].addItem(new Floor());

        this.ship[40][43].addItem(new Floor());
        this.ship[40][44].addItem(new Floor());

      /*  this.ship[40][40].addItem(new Wall("left"));
        this.ship[40][40].addItem(new Wall("down"));
        this.ship[41][40].addItem(new Wall("down"));
        this.ship[42][40].addItem(new Wall("down"));
        this.ship[43][40].addItem(new Wall("down"));
        this.ship[44][40].addItem(new Wall("down"));
        this.ship[45][40].addItem(new Wall("down"));
        this.ship[46][40].addItem(new Wall("down"));
*/
      //  this.ship[40][41].addItem(new Wall(["down"]));
      //  this.ship[40][42].addItem(new Wall(["down"]));
      //  this.ship[40][43].addItem(new Wall(["down"]));
      //  this.ship[40][44].addItem(new Wall(["down"]));





        console.log(this.items);
    }

    render(scene){
       /* for (let i = 0; i < 100; i++) {
            for (let j = 0; j < 100; j++) {
                let tile=this.ship[i][j].render(scene);
                if(tile!=null) {
                    tile.position.x+=j;
                    tile.position.y+=0;
                    tile.position.z+=i;

                }
            }
        }*/


       // var ship = new BABYLON.Mesh.CreateBox("ship", 1, scene);


        /*for (let i = 0; i < this.items.length; i++) {
            let row=this.items[i];


            var smalArr=this.items.slice(((i-1)>0)?i-1:0,i+2);
            for (let j = 0; j < row.length; j++) {
                var sendInArr=[];
                sendInArr[0]=smalArr[0].slice(j-1,j+2);
                sendInArr[1]=smalArr[1].slice(j-1,j+2);
                if(smalArr.length>2) {
                    sendInArr[2] = smalArr[2].slice(j-1, j + 2);
                }


                let obj=row[j].render(scene,sendInArr);
                if(obj!=null) {
                    obj.position.x+=j;
                    obj.position.y+=0;
                    obj.position.z+=i;

                    //  = new BABYLON.Vector3(j, 0, i);
                }
            }

        }*/


    }

    calculateWeigthCenter(){
        var currentXPoint=0;
        var currentZPoint=0;
        var totalWeigth=0;
        var takeFirst=true;

        for(let i=0;i<100;i++) {//columns

            for (let j = 0; j < 100; j++) {//rows
                var newPointWeigth=this.ship[i][j].getWeigth();

                if(newPointWeigth!=0) {
                    console.log("currentXPoint"+currentXPoint+" currentZPoint:"+currentZPoint+" weigth:"+totalWeigth);

                    console.log("newPointWeigth"+newPointWeigth+" i:"+i+" j:"+j);


                    if(takeFirst){
                        takeFirst=false;
                        currentXPoint=i;
                        currentZPoint=j;
                        totalWeigth=newPointWeigth;
                    }else {
                        var howMuchMovement = (totalWeigth+newPointWeigth) / newPointWeigth;

                        console.log("howMuchMovement: "+(1/howMuchMovement));


                        var distanceInZ = j- currentZPoint ;

                        var distanceInX =i- currentXPoint;


                        console.log("distanceInZ:"+distanceInZ+"  distanceInX:"+distanceInX);


                        currentZPoint =currentZPoint+( (1/howMuchMovement) * distanceInZ);

                        currentXPoint = currentXPoint+((1/howMuchMovement) * distanceInX);

                        totalWeigth += newPointWeigth;
                    }
                }






            }
        }
        return {x:currentXPoint,z:currentZPoint,weigth:totalWeigth};
    }



    getPosition(x,z){
        return this.ship[x][z];
    }

}