module.exports = function solveSudoku(matrix) {
    return step(matrix);
}

function step(matrix) {
    let n=next(matrix);
    if (n===null){
        return matrix;
    }
    let vs=available(matrix, n.w, n.h);

    if (vs.size===0){
        return null;
    }
    for(let v of vs){
        matrix[n.w][n.h]=v;
        if (step(matrix)!==null){
            return step(matrix)
        }
    }
    matrix[n.w][n.h]=0;
    return null;
}

function available(matrix, w, h) {
    if (matrix[w][h] !== 0) {
        return new Set();
    }
    let av = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    existentW(matrix, w).forEach(v => av.delete(v));

    existentH(matrix, h).forEach(v => av.delete(v));
    existentSqr(matrix, w, h).forEach(v => av.delete(v));
    return av;
}

function existentW(matrix, w) {
    let res = new Set();
    for (let i = 0; i < 9; i++) {
        if (matrix[w][i] > 0) {
            res.add(matrix[w][i]);
        }
    }
    return res;
}

function existentH(matrix, h) {
    let res = new Set();
    for (let i = 0; i < 9; i++) {
        if (matrix[i][h] > 0) {
            res.add(matrix[i][h]);
        }
    }
    return res;
}

function existentSqr(matrix, w, h) {
    let res = new Set();
    let sw = Math.floor(w / 3);
    let sh = Math.floor(h / 3);

    let l = sw + sh === 0;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (matrix[sw * 3 + i][sh * 3 + j] > 0) {
                res.add(matrix[sw * 3 + i][sh * 3 + j]);
            }
        }
    }
    return res;
}

function next(matrix) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (matrix[i][j]===0){
                return {"w": i, "h": j};
            }
        }
    }
    return null;
}
