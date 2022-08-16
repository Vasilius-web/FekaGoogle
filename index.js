const isEven = (number) => {
    return number % 2 === 0;
}

const evenArr = [];
for (let i = 0; i < 100; i++) {
    if (isEven(i)) {
        evenArr.push(i);
    }
}

const generateEvenArr = (from, to) => {
    const arr = [];
    for (let i = from; i < to; i++) {
        if (isEven(i)) arr.push(i);
    }
    return arr;
}
const getSecondDigit = (number) => number.toString()[1];


console.log(
    generateEvenArr(50, 70)
        .concat(generateEvenArr(30, 40))
        .map((item) => item + 1)
        .filter((item) => getSecondDigit(item) == 7)
);



