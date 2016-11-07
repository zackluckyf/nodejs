function doWork() {
    'use strict';
    throw new Error('Unable to do work!');
}

try {
    doWork();
} catch (e) {
    console.log(e.message);
} finally {
    console.log('finally block execute');
}

console.log('try catch ended');
