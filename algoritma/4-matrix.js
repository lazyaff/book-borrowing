const matrix = [
    [1, 2, 0],
    [4, 5, 6],
    [7, 8, 9],
];

function diagonal(mtx) {
    const length = mtx.length;
    let left = 0;
    let right = 0;
    for (let i = 0; i < length; i++) {
        left += mtx[i][i];
        right += mtx[i][length - 1 - i];
    }
    return Math.abs(left - right);
}

console.log(diagonal(matrix));
