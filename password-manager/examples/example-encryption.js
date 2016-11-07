(function() {
    'use strict';

    let crypto = require('crypto-js');

    let secretMessage = {
        name: 'andrew',
        secretname: '007'
    };

    let secretKey = '123abc';

    // encrypt
    let encryptedMessage = crypto.AES.encrypt(JSON.stringify(secretMessage), secretKey);
    console.log(`Encrypted Message: ${encryptedMessage}`);

    // decrypt
    let bytes = crypto.AES.decrypt(encryptedMessage, secretKey);
    let decryptedMessage = JSON.parse(bytes.toString(crypto.enc.Utf8));
    console.log(decryptedMessage.secretname);

})();
