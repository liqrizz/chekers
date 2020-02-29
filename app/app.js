import Board from './class/Board';
import Cheker from './class/Cheker';
import './src/style.css';
import $ from "jquery";
let brd = new Board();
brd.addNumber();
brd.getCells().cell_21.cheker_obj = new Cheker('b',  brd.getCells().cell_21.xy, brd.getCells.bind(brd));
brd.getCells().cell_5.cheker_obj = new Cheker('w',  brd.getCells().cell_5.xy, brd.getCells.bind(brd));
brd.draw();
$('.black').click(function(){
    let index = $(this).data('index');
    let data = brd.getCells()['cell_'+index]
    if(data.cheker_obj!==null){
        let current_cheker = data.cheker_obj;
        let steps = current_cheker.getPossibleSteps();
        brd.cellLigh(steps);
        console.log(steps);
    }
})