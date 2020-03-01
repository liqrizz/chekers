import Board from './class/Board';
import './src/style.css';
import $ from "jquery";
let brd = new Board();
brd.addNumber();
brd.createChecker('w', 12)
brd.createChecker('w', 13)
brd.createChecker('w', 4)
brd.createChecker('w', 5)
brd.createChecker('b', 9)
console.log(brd);
$('.black').click(function(){
    let index = $(this).data('index');
    let data = brd.getCells()['cell_'+index]
    if(data.cheker_obj!==null){
        brd.setActive(data.cheker_obj);
        let current_cheker = data.cheker_obj;
        let steps = current_cheker.getPossibleSteps().move;
        let attacks = current_cheker.getPossibleSteps().attack.steps;
        brd.cellLigh(steps);
        console.log(attacks);
    }else{
        let active = brd.getActive();
        if(active===null) return;
        let referal_index = active.getPosition().index;
        let color = active.getColor();
        let steps = active.getPossibleSteps().move;
        steps.forEach(step => {
            if(step!==index) return;
            brd.chekerDestroy(referal_index);
            brd.createChecker(color, step);
        });
    }
})