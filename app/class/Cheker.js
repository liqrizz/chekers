export default class Cheker {
    constructor(color, position, callback){
        this._color = color;
        this.getCells = callback;
        this._type = 0;
        this._steps = {};
        this._position = position;
    }
    stepClear(){
        this._steps = {
            move:[],
            attack:{
                targets:[],
                steps: []
            }
        };
    }
    getPosition(){
        return this._position;
    }
    getColor(){
        return this._color;
    }
    getMathVal(y){
        let mathval = 0;
        let color = this.getColor();
        if(y%2!==0)mathval = 1;
        if(color==='b')mathval-=8;
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
    targetPusher(index){
        let obj = this.getCells()['cell_'+index];
        if(obj.cheker_obj===null) return;
        if(obj.cheker_obj.getColor()!==this.getColor()){
            let attacks = this.getSteps().attack.targets;
            let pushtester = true;
            attacks.forEach((attack)=>{
                if(attack===index)pushtester = false;
            })
            if(pushtester)this.getSteps().attack.targets.push(index);
        }
    }
    attackPusher(id){
        let targets = this.getSteps().attack.targets;
        let cells = this.getCells();
        targets.forEach((target)=>{
            let step = null;
            if(target-3===id){
                step = target + 4;
            }else if(target-4===id){
                step = target + 5;
            }else if(target+5===id){
                step = target - 4;
            }else if(target+4===id){
                step = target - 3;
            }
            if(step>31) return;
            let obj = cells['cell_'+step];
            if(obj.cheker_obj===null){
                this.getSteps().attack.steps.push(step);
            }
        })
    }
    getPossibleSteps(){
        this.stepClear();
        let x = this.getPosition().x;
        let y = this.getPosition().y;
        let adaptive_x_left = y%2===0 ? 0 : 1;
        let adaptive_x_right = y%2===0 ? 1 : 0;
        let magicVal = this.getMathVal(y);
        let id = parseInt(this.getPosition().index);
        //steps
        if((x+adaptive_x_left)>0)this.bussyTest(id+3+magicVal);
        if((x-adaptive_x_right)<3) this.bussyTest(id+4+magicVal);
        //targets
        if((x+adaptive_x_left)>0){
            this.targetPusher(id+3+adaptive_x_left)  
            this.targetPusher(id-5+adaptive_x_left);
        };
        if((x-adaptive_x_right)<3){
            this.targetPusher(id+4+adaptive_x_left);
            this.targetPusher(id-4+adaptive_x_left);
        }
        this.attackPusher(id);
        return this.getSteps();
    }
}