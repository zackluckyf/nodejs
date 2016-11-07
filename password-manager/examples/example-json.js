'use strict';

let person = {
    name: 'Andrew',
    age: 24
};

let personJSON = JSON.stringify(person);

console.log(personJSON);
console.log(typeof personJSON);

let personObject = JSON.parse(personJSON);
console.log(personObject);
console.log(typeof personObject);

console.log('CHALLENGE AREA');

let animal = '{"name":"Halley"}';

// convert to js object

// add age prop

// convert back to JSON

// log out

let obj = JSON.parse(animal);

obj.age = 13;

JSON.stringify(obj);

console.log(obj);
