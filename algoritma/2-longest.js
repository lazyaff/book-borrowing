const sent = "Saya sangat senang mengerjakan soal algoritma";

function longest(sentence) {
    let arr = sentence.split(" ");
    let longest = 0;
    let longestWord = "";
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].length > longest) {
            longest = arr[i].length;
            longestWord = arr[i];
        }
    }
    return longestWord + " : " + longest + " characters";
}

console.log(longest(sent));
