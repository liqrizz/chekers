export default class Cheker {
    constructor(color, position, callback){
        this._color = color;
        this._oldPosition = null;
        this.getCells = callback;
        this._type = 0;
        this._steps = {
            move: [],
            attack: []
        };
        this._position = position;
    }
    getPosition(){
        return this._position;
    }
    getColor(){
        return this._color;
    }
    setPosition(position){
        this._oldPosition = this.getPosition();
        this._position = position;
    }
    getMathVal(){
        let mathval = 0;
        let color = this.getColor();
        let y = this.getPosition().y;
        if(y%2!==0){
            mathval = 1;
        }
        if(color==='b'){
            mathval-=8;
        }
        return parseInt(mathval);
    }
    getSteps(){
        return this._steps;
    }
    bussyTest(index){
        let obj = this.getCells()['cell_'+index];
        if(obj.cheker_obj===null){
            this.getSteps().move.push(index);
        }
    }
    getPossibleSteps(){
        let cells = this.getCells();
        this.getSteps().move = [];
        let x = this.getPosition().x;
        let magicVal = this.getMathVal();
        let id = parseInt(this.getPosition().index);
        if(x>0)this.bussyTest(id+3+magicVal);
        if(x<3)this.bussyTest(id+4+magicVal);
        return this.getSteps().move;
    }
}