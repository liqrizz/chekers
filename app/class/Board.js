import $ from "jquery";
import Cheker from './Cheker';
import Queen from './Queen';
export default class Board {
    constructor() {
        this._cells = {};
        this._canMove = null;
        this._active = null;
        this._turn = 'w';
        this._caller = 'ui';
        this._queenCells = {
            w: [28, 29, 30, 31],
            b: [0, 1, 2, 3],
        };
        let i = 0;
        for(let yi = 0; yi<8; yi++){
            for(let xi = 0; xi<4; xi++){
                this._cells['cell_'+i] = {
                    xy: {
                        x: xi,
                        y: yi,
                        index: i++,
                    },
                    cheker_obj: null
                };
            }
        }
        this.init()
    }

    get cells(){
        return this._cells;
    }

    get active(){
        return this._active;
    }

    get turn(){
        return this._turn;
    }

    set turn(turn){
        let invert = turn==='w' ? 'b' : 'w'; 
        this._turn = invert;
    }

    set active(cell){
        this._active = cell;
    }

    getCell(index){
        return this.cells['cell_'+index]
    }

    stepsData(index){
        const data = this.getCell(index);
        
        if(data===undefined || data.cheker_obj===null) return null;
        
        let current_cheker = data.cheker_obj;
        let attack = current_cheker.possibleSteps.attack;
        let move = current_cheker.possibleSteps.move;
        let color = current_cheker.color;
        let type = current_cheker.type;
        
        return {color, attack, move, type};
    }

    cellHandler(index, from='ui'){
        let data = this.stepsData(index);
        
        if(data===null){
            this.action(index); 
            return;
        }
        
        if(data.color===this.turn && this._caller===from && this.impotant(index, from)){
            let steps = data.attack.length>0 ? data.attack : data.move;
            this.cellLigh(index, steps);
            this.active = index;
        }
    }

    action(index){
        let active = this.stepsData(this.active);

        if(active===null) return;

        let steps = active.attack.length>0
            ?   active.attack
            :   active.move;

        steps.forEach(objStep => {
            if(objStep.step!==index) return;

            this._caller = 'ui';

            let toDestroy = [this.active];

            if(objStep.target!==undefined) toDestroy.push(objStep.target);

            this.chekerDestroy(toDestroy);

            let triggerCells = this._queenCells[active.color];
            let type = triggerCells.includes(objStep.step) ? 'queen' :  active.type;
            
            this.createChecker(active.color, objStep.step, type, objStep.animate);
            this.active = null;

            let lookToCell = this.stepsData(objStep.step);

            if(objStep.target!==undefined && lookToCell.attack.length>0){
                this._caller = 'class';
                this.cellHandler(objStep.step, 'class');
                return;
            }

            this.turn = active.color;
        });
    }

    createChecker(color, cell, type="default", animate=null){
        let current_cell = this.getCell(cell);
        const param = {
            position: current_cell.xy,
            callback: this.getCell.bind(this),
            color,
            type
        }

        current_cell.cheker_obj = type==='default'
            ?   new Cheker(param)
            :   new Queen(param);
        
        let elem = this.htmlElem(cell);
        let className = color==='b' ? 'b '+type : 'w '+type;
        let cheker = document.createElement('span');
        
        cheker.className = 'cheker '+className;
        cheker.style.transform = animate===null
            ?   'translate(0, 0)'
            :   'translate('+ animate +')';

        elem.append(cheker);
        setTimeout(()=>cheker.style.transform = 'translate(0px, 0px)', 0)

        $('.black').removeClass('green active');
    }

    impotant(index, from){
        if(from==='class') return true;
        
        let cells = this.cells;
        let important = [];
        
        for (let cell in cells){
            let curent_cheker = cells[cell].cheker_obj;
            let turn = this.turn;
            
            if(curent_cheker!==null && curent_cheker.color==turn){
                let index = cell.replace('cell_', '');
                let data = this.stepsData(index);
                if(data.attack.length>0) important.push(index);
            }
        }

        if(important.length===0) return true;
        return important.includes(index.toString());
    }

    canmove(){
        for (let cell in cells){
            let curent_cheker = cells[cell].cheker_obj;
            let turn = this.turn;
            
            if(curent_cheker!==null && curent_cheker.color==turn){
                let index = cell.replace('cell_', '');
                let data = this.stepsData(index);
                if(data.attack.length>0) important.push(index);
            }
        }
    }

    chekerDestroy(cell_index_array){
        cell_index_array.forEach(cell_index=>{
            this.getCell(cell_index).cheker_obj = null;
            let elem = this.htmlElem(cell_index);
            elem.childNodes.forEach(elem => elem.remove())
        });
    }

    htmlElem(cell){
        let current_cell = this.getCell(cell);
        let x = current_cell.xy.x;
        let y = current_cell.xy.y;
        let elem = document.querySelector('[data-x="'+x+'"][data-y="'+y+'"]');
        return elem;
    }

    cellLigh(index, cells){
        $('.black').removeClass('green active');
        
        if(cells.length<1) return;

        let active = this.htmlElem(index)
        active.classList.add("active");
        
        cells.forEach(cell_index => {
            let elem = this.htmlElem(cell_index.step);
            elem.classList.add("green");   
        });
    }

    init(){
        let i = 0;
        let cells = this.cells;
        for (let key in cells) {
            let elem = this.htmlElem(key.replace('cell_', ''));
            $(elem).data('index', i);
            i++;
        }
        for(let w=0; w<12; w++){
            this.createChecker('w', w);
            this.createChecker('b', (31-w));
        }
    }
}