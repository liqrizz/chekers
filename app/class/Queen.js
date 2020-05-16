import Cheker from './Cheker';
export default class Queen extends Cheker {
    constructor(param){
        super(param)
    }

    stepCalc(){
        let y = this.position.y;
        let id = parseInt(this.position.index);
        const stepMathValues = {
            true: {
                step: [
                    {target: 3},
                    {target: 4},
                    {target: -5},
                    {target: -4},
                ],
            },
            false:{
                step: [
                    {target: 4},
                    {target: 5},
                    {target: -4},
                    {target: -3},
                ],
            },
            animate: [
                {
                    x: 72,
                    y: 72
                },
                {
                    x: -72,
                    y: 72
                },
                {
                    x: 72,
                    y: -72
                },
                {
                    x: -72,
                    y: -72
                }
            ],
            limiter: [0, 1, 2, 3, 7, 8, 15, 16, 23, 24, 28, 29, 30, 31]
        }

        let diagonal = [];
        let currentMathTree = stepMathValues[(y%2===0).toString()];
        
        //Подготовка сторон оветвления 
        currentMathTree.step.forEach( (mathValue, index) => {
            let localtarget = mathValue.target;
            let outCell = id + localtarget;
            let obj = this.getCell(outCell);

            if(obj===undefined || obj.xy.y===y || obj.xy.y===y+2 || obj.xy.y===y-2) return;
            
            let animate = stepMathValues.animate[index];

            diagonal.push({
                cell: outCell,
                id: index,
                find: {flag: false},
                animate
            });
        });

        let search = true;
        let animation_iterator = 1;

        while(search){
            let iterationData = [];

            diagonal.forEach(elem => {
                if(elem.end) return;
                
                let cell = elem.cell;
                let find = elem.find.flag ? elem.find : this.targetDetecter(cell);
                let target = elem.find.flag ? elem.target : cell;
                let x = elem.animate.x * animation_iterator;
                let y = elem.animate.y * animation_iterator;
                let animateStep = x+'px, '+ y +'px';
                let bussy = this.bussyTest(cell, false, animateStep);

                if(bussy.flag && elem.find.flag){
                    this._steps.attack.push({
                        step: cell,
                        target,
                        animate: animateStep
                    });
                }

                let id = elem.id;
                let localY = this.getCell(cell).xy.y;
                let localCurrentMathTree = stepMathValues[(localY%2===0).toString()];
                let localtarget = localCurrentMathTree.step[id].target;
                let outCell = cell + localtarget;
                let animate = stepMathValues.animate[id];
                let end = stepMathValues.limiter.includes(cell);
                if(!end && find.flag && !this.bussyTest(outCell, true).flag) end = true;
                
                if(!end && elem.find.flag){
                    localCurrentMathTree.step.forEach((test, testIndex)=>{
                        let testoutcell = cell + test.target

                        if(testoutcell === elem.find.cell || end) return;
                        if(!this.targetDetecter(testoutcell).flag) return;

                        let testY = this.getCell(testoutcell).xy.y;
                        let testCurrentMathTree = stepMathValues[(testY%2===0).toString()];
                        let testTarget = testCurrentMathTree.step[testIndex].target;
                        let cheking_bussy_cell = testoutcell + testTarget;

                        if(cheking_bussy_cell<0 || cheking_bussy_cell>31) return;
                        if(!this.targetDetecter(cheking_bussy_cell).flag) end = true
                    });
                }
            
                if(!end && bussy.color===this.color) end = true;
                
                iterationData.push({
                    cell: outCell, id, end, target, find, animate
                });

            });
            
            diagonal = [...iterationData];
            
            if(diagonal.filter(elem=>!elem.end).length===0){
                search = false;
            }
            animation_iterator++;
        }
    }

    targetDetecter(index){
        let obj = this.getCell(index);
        if(obj.cheker_obj===null) return {flag: false, cell: index};
        if(obj.cheker_obj.color!==this.color) return {flag: true, cell: index};
        return {flag: false, cell: index}
    }
}