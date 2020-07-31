export default class Checker {
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
        const y = this.position.y;
        const id = parseInt(this.position.index);

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
        };
        
        stepMathValues.step.forEach(mathValue => {
            const localTarget = mathValue.target;
            const outCell = id + localTarget;
            const localAttackStep = outCell + mathValue.attackRoad;
            const obj = this.getCell(outCell);

            if(obj===undefined || obj.xy.y===y || obj.xy.y===y+2 || obj.xy.y===y-2) return;
            
            const animateStep = mathValue.animateStep;
            const animateAttack = mathValue.animateAttack;
            
            this.targetPusher(outCell, localAttackStep, animateAttack);
            
            if (this.color==='w' && localTarget>0) this.cellTest(outCell, false, animateStep);
            if (this.color==='b' && localTarget<0) this.cellTest(outCell, false, animateStep);

        });
    }

    cellTest(step, check = false, animate=null){
        const obj = this.getCell(step);
        if(obj.checker_obj===null){
            if(!check) this._steps.move.push({step, animate});
            return {flag: true};
        }
        return {flag: false, color: obj.checker_obj.color};
    }

    targetPusher(index, attack, animate){
        const obj = this.getCell(index);
        const attackCell = this.getCell(attack);
        
        if(obj.checker_obj===null || attackCell===undefined) return;
        
        const objRoadToAttack = attackCell.checker_obj;
        const targetY = obj.xy.y;
        const stepY = attackCell.xy.y;
        
        if(targetY===stepY || targetY===stepY+2 || targetY===stepY-2) return;
        
        if(obj.checker_obj.color!==this.color && objRoadToAttack===null){
            this._steps.attack.push({
                step: attack,
                target: index,
                animate
            });
        }
    }
}