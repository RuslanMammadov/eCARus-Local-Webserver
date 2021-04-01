/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-use-before-define */
/*
 *   Database handler. It provides function to save, update, load and delete from database.
 */
import mongoDB, { MongoError, Collection } from 'mongodb';

const MongoClient = mongoDB.MongoClient;

const URL = 'mongodb://localhost:27017';
const DB_NAME = 'ecarus';
const USER_COLLECTION = 'users';

const INIT_ADMIN = {
    LOGIN: 'admin',
    PASSWORD: 'admin'
}

class DatabaseHandler {
    client: mongoDB.MongoClient;
    userCollection: Collection | undefined;
    initPromise: Promise<void>;
    resolveInitPromise: Function | undefined;

    constructor() {
        this.client = new MongoClient(URL, { useUnifiedTopology: true });
        this.initPromise = new Promise((resolve) => {
            this.resolveInitPromise = resolve;
        });
    }

    init(): void {
        this.client.connect((error: MongoError) => {
            handleError(error, 'Error by creating database.');

            const database = this.client.db(DB_NAME);
            console.log("Database was created.");

            this.initPromise = database.createCollection(USER_COLLECTION).then((userCollection: Collection) => {
                console.log("Users collection was created.");
                
                this.userCollection = userCollection;
                this.resolveInitPromise!();
            }, (rejectionReason: any) => {
                handleError(rejectionReason, 'Error by creating user collection');
            });
        });
        this.createAdminIfNotExist();

    }

    createAdminIfNotExist(): void {
        this.loadUser(INIT_ADMIN.LOGIN).then((user) => {
            if (!user) {
                this.saveUser(INIT_ADMIN.LOGIN, INIT_ADMIN.PASSWORD, true);
            }
        });
    }

    async saveUser(login: string, password: string, isAdmin: boolean): Promise<object | undefined> {
        await this.initPromise;
        const user = {
            login,
            password,
            isAdmin
        };
        let commandResult;
        try {
            commandResult = await this.userCollection!.insertOne({ login });
        } catch(error) {
            handleError(error, `Could not update user ${login}.`);
        }
        return { user, result: commandResult?.result};
    }

    async updateOrSaveUser(login: string, password: string, isAdmin: boolean): Promise<object | undefined> {
        await this.initPromise;
        const user = {
            login,
            password,
            isAdmin
        };
        let commandResult;
        try {
            commandResult = await this.userCollection!.updateOne({ login }, { $set: user }, { upsert: true }); // Upsert means create if not found.
        } catch(error) {
            handleError(error, `Could not update user ${login}.`);
        }
        return { user, result: commandResult?.result};
    }

    async loadUser(login: string): Promise<object | null> {
        await this.initPromise;
        let user;
        try {
            user = await this.userCollection!.findOne({ login }); 
        } catch(error) {
            handleError(error, `Error by loading user ${login}.`);
        }
        return user;
    }

    async deleteUser(login: string): Promise<{login: string; result: object | undefined}> {
        await this.initPromise;
        let commandResult;
        try {
            commandResult = await this.userCollection!.deleteOne({ login }); 
        } catch(error) {
            handleError(error, `Error by loading user ${login}.`);
        }
        return { login, result: commandResult?.result};
    }

    async closeConnection(): Promise<void> {
        await this.client.close(true);
    }
}

function handleError(error: unknown, ourMessage: string): void {
    if (error) {
        console.log(ourMessage);
        throw error;
    }
}

export default DatabaseHandler;