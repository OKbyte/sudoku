module.exports = function solveSudoku(matrix) {
  "use strict";

  let emptyCellsCount = 0;
  let sudokuChanged = false;

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 0) {
        emptyCellsCount++;
        matrix[i][j] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      }
    }
  }

  function fillSudoku() {
    sudokuChanged = false;

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (typeof matrix[i][j] !== "number") {
          if (checkRow(i, j)) {
            sudokuChanged = true;
            emptyCellsCount--;
            continue;
          }

          if (checkCol(i, j)) {
            sudokuChanged = true;
            emptyCellsCount--;
            continue;
          }
        }
      }
    }

    if (sudokuChanged && emptyCellsCount > 0) {
      fillSudoku();
    } else if (emptyCellsCount > 0) {
      for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
          if (typeof matrix[i][j] !== "number") {
            matrix[i][j] = 0;
          }
        }
      }
    }
  }

  function checkRow(row, cell) {
    for (let i = 0; i < matrix[row].length; i++) {
      if (i !== cell && typeof matrix[row][i] === "number") {
        const cur = matrix[row][i];
        const curIndex = matrix[row][cell].indexOf(cur);

        if (cur && curIndex > 0) matrix[row][cell].splice(curIndex, 1);

        if (matrix[row][cell].length === 1) {
          matrix[row][cell] = matrix[row][cell][0];

          break;
        }
      }
    }

    if (typeof matrix[row][cell] === "number") {
      return true;
    } else {
      return false;
    }
  }

  function checkCol(row, cell) {
    for (let i = 0; i < matrix.length; i++) {
      if (i !== row && typeof matrix[i][cell] === "number") {
        const cur = matrix[i][cell];
        const curIndex = matrix[row][cell].indexOf(cur);

        if (cur && curIndex >= 0) matrix[row][cell].splice(curIndex, 1);

        if (matrix[row][cell].length === 1) {
          matrix[row][cell] = matrix[row][cell][0];

          break;
        }
      }
    }

    if (typeof matrix[row][cell] === "number") {
      return true;
    } else {
      return false;
    }
  }

  function checkBlc(row, cell) {
    
  }

  fillSudoku();

  return matrix;
};
