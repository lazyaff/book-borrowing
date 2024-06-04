const str = "NEGIE1";

function reverse(string) {
    let lastIdx = string.length - 1;
    let sliced = string.slice(0, lastIdx);

    return string[lastIdx] + sliced.split("").reverse().join("");
}

console.log(reverse(str));
