import DatabaseHandler from '../src/database-handler/database-handler';

async function test(): Promise<boolean> {
    let testWasSuccesfull = true;
    const databaseHandler = new DatabaseHandler();
    databaseHandler.init();
    await databaseHandler.deleteUser('Thor').then(result => console.log(result));
    await databaseHandler.loadUser('admin').then((result) => console.log(result));
    await databaseHandler.updateOrSaveUser('admin', 'admin', true).then(result => console.log(result));
    await databaseHandler.saveUser('Thor', 'password', false).then(result => console.log(result));
    await databaseHandler.deleteUser('Thor').then(output => console.log(output));
    await databaseHandler.loadUser('Thor').then((result) => {
        if (result !== null) {
            testWasSuccesfull = false;
            console.log('Deleting user Thor was not succesfull.');
        }
    });
    await databaseHandler.closeConnection();
    return testWasSuccesfull;
}

test().then((wasSuccesfull) => {
    if (wasSuccesfull) { 
        console.log('Database Handler test successed!');
    } else {
        console.log('Database Handler test did not success!'); 
    }
});
