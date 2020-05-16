import Board from './class/Board';
import './src/style.css';
import $ from "jquery";
let brd = new Board();
$('.black').click(function(){
    let index = $(this).data('index');
    brd.cellHandler(index);
})