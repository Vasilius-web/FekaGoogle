"use strict";
const add = (a) => {
    return (b) => {
        return a + b;
    };
};
const increment = add(1);
console.log(increment);
