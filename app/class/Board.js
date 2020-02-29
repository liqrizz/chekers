import $ from "jquery";
export default class Board {
    constructor() {
        this._cells = {};
        this._turn = 'w';
        let i = 0;
        for(let yi = 0; yi<8; yi++){
            for(let xi = 0; xi<4; xi++){
                this._cells['cell_'+i] = {
                    xy: {
                        x: xi,
                        y: yi,
                        index: i,
                    },
                    cheker_obj: null
                };
                i++;
            }
        }
    }
    getCells(){
        return this._cells;
    }
    draw(){
        let cells = this.getCells();
        for (let cell in cells) {
            if (this.getCells()[cell].cheker_obj !== null) {
                let cherker = this.getCells()[cell].cheker_obj;
                let color = cherker.getColor();
                let elem = this.htmlElem(cell);
                let className = color==='b' ? 'dott-b' : 'dott-w';
                $(elem).addClass(className)
            }
        }
    }
    setTurn(turn){
        this._turn = turn;
    }
    chekerDestroy(cell){
        this.getCells()[cell].cheker_obj = null;
    }
    htmlElem(cell){
        let current_cell = this.getCells()[cell];
        let x = current_cell.xy.x;
        let y = current_cell.xy.y;
        let elem = document.querySelector('[data-x="'+x+'"][data-y="'+y+'"]');
        return elem;
    }
    addNumber(){
        let i = 0;
        let cells = this.getCells();
        for (let key in cells) {
            let elem = this.htmlElem(key);
            elem.innerText = i;
            $(elem).data('index', i);
            i++;
        }
    }
    cellLigh(cells){
        $('.green').removeClass('green');
        cells.forEach(cell_number => {
            let elem = this.htmlElem('cell_'+cell_number);
            elem.classList.add("green");   
        });
    }
}