export default class Cheker {
    constructor(param){
        this._color = param.color;
        this.getCell = param.callback;
        this._position = param.position;
        this._type = param.type;
        this._steps = {};
    }

    get possibleSteps(){
        this.stepClear();
        this.stepCalc();
        return this._steps;
    }
    get position(){
        return this._position;
    }
    get color(){
        return this._color;
    }
    get type(){
        return this._type;
    }

    stepClear(){
        this._steps = {
            move:[],
            attack:[]
        };
    }
    
    stepCalc(){
        let y = this.position.y;
        let id = parseInt(this.position.index);

        const stepMathValues = {
            step: [
                {
                    target: (y%2===0)? 3 : 4,
                    attackRoad: (y%2===0)? 4 : 3,
                    animateStep: "72px, 72px",
                    animateAttack: "144px, 144px"
                },
                {
                    target: (y%2===0)? 4 : 5,
                    attackRoad: (y%2===0)? 5 : 4,
                    animateStep: "-72px, 72px",
                    animateAttack: "-144px, 144px"
                },
                {
                    target: (y%2===0)? -5 : -4,
                    attackRoad: (y%2===0)? -4 : -5,
                    animateStep: "72px, -72px",
                    animateAttack: "144px, -144px"
                },
                {
                    target: (y%2===0)? -4 : -3,
                    attackRoad: (y%2===0)? -3 : -4,
                    animateStep: "-72px, -72px",
                    animateAttack: "-144px, -144px"
                },
            ]
        }
        
        stepMathValues.step.forEach(mathValue => {
            let localtarget = mathValue.target;
            let outCell = id+localtarget;
            let localAttackStep = outCell + mathValue.attackRoad;
            let obj = this.getCell(outCell);

            if(obj===undefined || obj.xy.y===y || obj.xy.y===y+2 || obj.xy.y===y-2) return;
            
            let animateStep = mathValue.animateStep;
            let animateAttack = mathValue.animateAttack;
            
            this.targetPusher(outCell, localAttackStep, animateAttack);
            
            if (this.color==='w' && localtarget>0) this.bussyTest(outCell, false, animateStep);
            if (this.color==='b' && localtarget<0) this.bussyTest(outCell, false, animateStep);

        });
    }

    bussyTest(step, check = false, animate=null){
        let obj = this.getCell(step);
        if(obj.cheker_obj===null){
            if(!check) this._steps.move.push({step, animate});
            return {flag: true}
        }
        return {flag: false, color: obj.cheker_obj.color}
    }

    targetPusher(index, attack, animate){
        let obj = this.getCell(index);
        let attackCell = this.getCell(attack)
        
        if(obj.cheker_obj===null || attackCell===undefined) return;
        
        let objRoadToAttack = attackCell.cheker_obj;
        let targetY = obj.xy.y;
        let stepY = attackCell.xy.y;
        
        if(targetY===stepY || targetY===stepY+2 || targetY===stepY-2) return;
        
        if(obj.cheker_obj.color!==this.color && objRoadToAttack===null){
            this._steps.attack.push({
                step: attack,
                target: index,
                animate
            });
        }
    }
}