import $ from "jquery";
import Checker from './Checker';
import Queen from './Queen';

export default class Board {
    constructor() {
        this._cells = {};
        this._active = null;
        this._turn = 'w';
        this._caller = 'ui';
        this._queenCells = {
            w: [28, 29, 30, 31],
            b: [0, 1, 2, 3],
        };
        this.init();
    }

    get cells() {
        return this._cells;
    }

    get active() {
        return this._active;
    }

    get turn() {
        return this._turn;
    }

    set turn(turn) {
        this._turn = turn === 'w' ? 'b' : 'w';
    }

    set active(cell) {
        this._active = cell;
    }

    getCell(index) {
        return this.cells['cell_' + index];
    }

    stepsData(index) {
        const data = this.getCell(index);

        if (data === undefined || data.checker_obj === null) return null;

        const current_checker = data.checker_obj;
        const attack = current_checker.possibleSteps.attack;
        const move = current_checker.possibleSteps.move;
        const color = current_checker.color;
        const type = current_checker.type;

        return {color, attack, move, type};
    }

    cellHandler(index, from = 'ui') {
        const data = this.stepsData(index);

        if (data === null) {
            this.action(index);
            return;
        }

        if (data.color === this.turn && this._caller === from && this.important(index, from)) {
            const steps = data.attack.length > 0 ? data.attack : data.move;
            this.cellLight(index, steps);
            this.active = index;
        }
    }

    action(index) {
        const active = this.stepsData(this.active);

        if (active === null) return;

        const steps = active.attack.length > 0
            ? active.attack
            : active.move;

        steps.forEach(objStep => {
            if (objStep.step !== index) return;

            this._caller = 'ui';

            const toDestroy = [this.active];

            if (objStep.target !== undefined) toDestroy.push(objStep.target);

            this.checkerDestroy(toDestroy);

            const triggerCells = this._queenCells[active.color];
            const type = triggerCells.includes(objStep.step) ? 'queen' : active.type;

            this.createChecker(active.color, objStep.step, type, objStep.animate);
            this.active = null;

            const lookToCell = this.stepsData(objStep.step);

            if (objStep.target !== undefined && lookToCell.attack.length > 0) {
                this._caller = 'class';
                this.cellHandler(objStep.step, 'class');
                return;
            }

            this.turn = active.color;
        });
    }

    createChecker(color, cell, type = "default", animate = null) {
        const current_cell = this.getCell(cell);
        const param = {
            position: current_cell.xy,
            callback: this.getCell.bind(this),
            color,
            type
        };

        current_cell.checker_obj = type === 'default'
            ? new Checker(param)
            : new Queen(param);

        const elem = this.htmlElem(cell);
        const className = color === 'b' ? 'b ' + type : 'w ' + type;
        const checker = document.createElement('span');

        checker.className = 'checker ' + className;
        checker.style.transform = animate === null
            ? 'translate(0, 0)'
            : 'translate(' + animate + ')';

        elem.append(checker);
        setTimeout(() => checker.style.transform = 'translate(0px, 0px)', 0);

        $('.black').removeClass('green active');
    }

    important(index, from) {
        if (from === 'class') return true;

        const cells = this.cells;
        const important = [];

        for (const cell in cells) {
            const current_checker = cells[cell].checker_obj;
            const turn = this.turn;

            if (current_checker !== null && current_checker.color === turn) {
                const index = cell.replace('cell_', '');
                const data = this.stepsData(index);
                if (data.attack.length > 0) important.push(index);
            }
        }

        if (important.length === 0) return true;
        return important.includes(index.toString());
    }

    checkerDestroy(cell_index_array) {
        cell_index_array.forEach(cell_index => {
            this.getCell(cell_index).checker_obj = null;
            const elem = this.htmlElem(cell_index);
            elem.childNodes.forEach(elem => elem.remove());
        });
    }

    htmlElem(cell) {
        const current_cell = this.getCell(cell);
        const x = current_cell.xy.x;
        const y = current_cell.xy.y;
        return document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
    }

    cellLight(index, cells) {
        $('.black').removeClass('green active');

        if (cells.length < 1) return;

        const active = this.htmlElem(index);
        active.classList.add("active");

        cells.forEach(cell_index => {
            const elem = this.htmlElem(cell_index.step);
            elem.classList.add("green");
        });
    }

    init() {
        let k = 0;
        for (let yi = 0; yi < 8; yi++) {
            for (let xi = 0; xi < 4; xi++) {
                this._cells['cell_' + k] = {
                    xy: {
                        x: xi,
                        y: yi,
                        index: k,
                    },
                    checker_obj: null
                };

                $(this.htmlElem(k)).data('index', k);

                if(k < 12){
                    this.createChecker('w', k);
                }

                if(k > 19){
                    this.createChecker('b', k);
                }

                k++;
            }
        }
    }
}