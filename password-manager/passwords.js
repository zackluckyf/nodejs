(function() {

    'use strict';

    console.log('starting password manager');

    let storage = require('node-persist');
    let crypto = require('crypto-js');
    storage.initSync();

    // account.name Facebook
    // account.username user1234
    // account.password Password1234

    let argv = require('yargs')
        .command('create', 'Create a new account', function(yargs) {
            yargs.options({
                name: {
                    demand: true,
                    alias: 'n',
                    description: 'Account name (e.g. Twitter, Facebook, etc.)',
                    type: 'string'
                },
                username: {
                    demand: true,
                    alias: 'un',
                    description: 'Account username or email',
                    type: 'string'
                },
                password: {
                    demand: true,
                    alias: 'pw',
                    description: 'Account password',
                    type: 'string'
                },
                masterPassword: {
                    demand: true,
                    alias: 'm',
                    description: 'Master password',
                    type: 'string'
                }
            }).help('help');
        })
        .command('get', 'Get an existing account', function(yargs) {
            yargs.options({
                name: {
                    demand: true,
                    alias: 'n',
                    description: 'Account name (e.g. Twitter, Facebook, etc.)',
                    type: 'string'
                },
                masterPassword: {
                    demand: true,
                    alias: 'm',
                    description: 'Master password',
                    type: 'string'
                }
            }).help('help');
        })
        .help('help')
        .argv;

    var command = argv._[0];

    let account = (name, username, password) => {
        let options = {
            name: name,
            username: username,
            password: password
        };
        createAccount(options);
    };

    function getAccounts(masterPassword) {
        let encryptedAccount = storage.getItemSync('accounts');
        var accounts = [];
        if (encryptedAccount) {
            let bytes = crypto.AES.decrypt(encryptedAccount, masterPassword);
            accounts = JSON.parse(bytes.toString(crypto.enc.Utf8));
        }
        return accounts;
    }

    function saveAccounts(accounts, masterPassword) {
        let encryptedAccounts = crypto.AES.encrypt(JSON.stringify(accounts), masterPassword);
        storage.setItemSync('accounts', encryptedAccounts.toString());
        return accounts;
    }

    function createAccount(account, masterPassword) {
        var accounts = getAccounts(masterPassword);
        accounts.push(account);
        saveAccounts(accounts, masterPassword);
        return account;
    }

    function getAccount(accountName, masterPassword) {
        var accounts = getAccounts(masterPassword);
        for (let account of accounts) {
            if (account.name === accountName) {
                return account;
            }
        }
    }

    if (command === 'create') {
        try {
            var createdAccount = createAccount({
                name: argv.name,
                username: argv.username,
                password: argv.password
            }, argv.masterPassword);
            console.log('Account created!!!');
            console.log(createdAccount);
        } catch (e) {
            console.log('Unable to create account');
        }
    } else if (command === 'get') {
        try {
            var fetchedAccount = getAccount(argv.name, argv.masterPassword);

            if (fetchedAccount === undefined) {
                console.log('Account not found');
            } else {
                console.log('Account found');
                console.log(fetchedAccount);
            }
        } catch (e) {
            console.log('Unable to fetch account');
        }
    }

})();

// run node passwords.js --help
// then run node passwords.js create --help
// or run node passwords.js get --help
