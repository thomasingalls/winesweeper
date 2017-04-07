import R from 'ramda';
import _ from 'lodash';

const notEmptyString = val => ((typeof val === 'string' && val.trim() !== '') || typeof val === 'number');
const notNone = R.filter(notEmptyString);
export const cx = arr => R.compose(R.uniqBy(String), notNone)(arr).join(' ');


const bombCell = {
  revealed: false,
  flag: false,
  value: -1,
};
const emptyCell = {
  revealed: false,
  flag: false,
  value: 0,
};

const top_l = (cols, i) => i % cols !== 0 && i - cols - 1;
const top_c = (cols, i) => i - cols;
const top_r = (cols, i) => (i+1) % cols !== 0 && i - cols + 1;
const mid_l = (cols, i) => i % cols !== 0 && i - 1;
const mid_r = (cols, i) => (i+1) % cols !== 0 && i + 1;
const low_l = (cols, i) => i % cols !== 0 && i + cols - 1;
const low_c = (cols, i) => i + cols;
const low_r = (cols, i) => (i+1) % cols !== 0 && i + cols + 1;

export const newBoard = (bombs, rows, cols) => {
  const total = rows * cols;
  const empties = rows * cols - bombs;
  const conditions = [
    top_l,
    top_c,
    top_r,
    mid_l,
    mid_r,
    low_l,
    low_c,
    low_r,
  ];

  const board = _.shuffle(Array
    .from({ length: total }, () => emptyCell)
    .fill(bombCell, 0, bombs));

  return board
    .map((cell, idx) => {
      if (cell.value === -1) return cell;

      let value = 0;
      conditions.forEach(fn => {
        const loc = board[fn(cols, idx)];
        if (loc && loc.value === -1) value++
      });

      return Object.assign({}, cell, { value });
    });
}

export const expandSelection = (cols, origin, board) => {
  let updatedBoard = Array.from(board);
  const conditions = [
    top_l,
    top_c,
    top_r,
    mid_l,
    mid_r,
    low_l,
    low_c,
    low_r,
  ];

  let updatedBox = Object.assign({}, board[origin], { revealed: true });
  updatedBoard = updatedBoard.map((box, idx) => idx == origin ? updatedBox : box);

  if (updatedBoard[origin] && updatedBoard[origin].value === 0) {

    let neighbors = conditions.map(fn => fn(cols, parseInt(origin)));

    neighbors.forEach(neighbor => {
      console.log(neighbor, updatedBoard[neighbor]);
      if (updatedBoard[neighbor] && updatedBoard[neighbor].value >= 0 && !updatedBoard[neighbor].revealed) {

        updatedBoard = expandSelection(cols, parseInt(neighbor), updatedBoard)
      }
    });
  }

  return updatedBoard;
}

  /*
   *  Accessing
   *
   *  i % cols = 0                  (i+1) % cols = 0
   *
   *  i - cols - 1     i - cols     i - cols + 1
   *  i        - 1     i            i        + 1
   *  i + cols - 1     i + cols     i + cols + 1
   */