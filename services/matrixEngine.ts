export class MatrixEngine {
  static create(rows: number, cols: number, initialValue: number = 0): number[][] {
    return Array(rows).fill(0).map(() => Array(cols).fill(initialValue));
  }

  static determinant(matrix: number[][]): number {
    const n = matrix.length;
    if (n !== matrix[0].length) throw new Error("Matrix must be square");
    if (n === 1) return matrix[0][0];
    if (n === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

    // Gaussian elimination for determinant
    let det = 1;
    const temp = matrix.map(row => [...row]); // Deep copy

    for (let i = 0; i < n; i++) {
      let pivot = i;
      // Find pivot
      for (let j = i + 1; j < n; j++) {
        if (Math.abs(temp[j][i]) > Math.abs(temp[pivot][i])) pivot = j;
      }
      
      if (Math.abs(temp[pivot][i]) < 1e-9) return 0; // Singular

      // Swap rows
      [temp[i], temp[pivot]] = [temp[pivot], temp[i]];
      if (i !== pivot) det = -det;

      det *= temp[i][i];

      // Eliminate
      for (let j = i + 1; j < n; j++) {
        const factor = temp[j][i] / temp[i][i];
        for (let k = i; k < n; k++) {
          temp[j][k] -= factor * temp[i][k];
        }
      }
    }

    return parseFloat(det.toFixed(4));
  }

  static rank(matrix: number[][]): number {
    const R = matrix.length;
    const C = matrix[0].length;
    let rank = C;
    const mat = matrix.map(row => [...row]);

    for (let row = 0; row < rank; row++) {
      if (mat[row][row]) {
        for (let col = 0; col < R; col++) {
          if (col !== row) {
            const mult = mat[col][row] / mat[row][row];
            for (let i = 0; i < rank; i++) mat[col][i] -= mult * mat[row][i];
          }
        }
      } else {
        let reduce = true;
        for (let i = row + 1; i < R; i++) {
          if (mat[i][row]) {
            [mat[row], mat[i]] = [mat[i], mat[row]];
            reduce = false;
            break;
          }
        }
        if (reduce) {
          rank--;
          for (let i = 0; i < R; i++) mat[i][row] = mat[i][rank];
        }
        row--;
      }
    }
    return rank;
  }
}