const add = (a:number) => {
    return (b: number) => {
        return a + b;
    };
};


const increment = add(1);
const add5 = add(5);
console.log(increment(1));