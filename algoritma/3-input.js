const input = ["xc", "dz", "bbb", "dz"];
const query = ["bbb", "ac", "dz"];

function solution(input, query) {
    let result = [];
    let count = 0;
    for (let i = 0; i < query.length; i++) {
        for (let j = 0; j < input.length; j++) {
            if (query[i] === input[j]) {
                count++;
            }
        }
        result.push(count);
        count = 0;
    }
    return result;
}

console.log(solution(input, query));
