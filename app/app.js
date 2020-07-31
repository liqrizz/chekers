import Board from './class/Board';
import './src/style.scss';
import $ from "jquery";
const brd = new Board();
$('.black').click(function(){
    const index = $(this).data('index');
    brd.cellHandler(index);
});