const vasya = {name: 'Vasya', lastname: 'Tytiuchenko', sister: null};
const vika = {name: 'Vika', lastname: 'Tytiuchenko'};
vasya.sister = vika;
vika.brother = vasya;

vasya.age = 21;
vika.age = 17;


const youShellNotPass = (user) => {
    if (user.age >= 18) {
        console.log(`${user.name} can pass`);
    } else {
        console.log(`${user.name} can not pass`);
    }
}
youShellNotPass(vasya);
youShellNotPass(vika);

vika.age = 18;

youShellNotPass(vika);

const family = {
    son: {
        ...vasya,
        single: true,
    }
}
console.log(family.son?.wife?.name)

class User {

    constructor(name, lastName) {
        this.name = name;
        this.lastName = lastName;
    }
    sayName(){
        console.log(`My name is ${this.name}`);
    }
}

const vasya1 = new User('Vasya', 'Tytiuchenko');

vasya1.sayName();