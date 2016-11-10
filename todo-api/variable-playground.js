(function() {
    'use strict';

    let person = {
        name: 'Zack',
        age: 25
    };

    function updatePerson(obj) {
        obj.age = 28;
    }

    updatePerson(person);
    console.log(person);

})();
