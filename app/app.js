import Board from './classes/Board';
import './src/style.scss';
import {elemClick} from "./utils/DOMUtils";
const brd = new Board();
elemClick('.black', elem => {
    const index = Number.parseInt(elem.dataset.index);
    brd.cellHandler(index);
});