import DB from "offline-db";

let connectedDb;

const connectToDb = () => {
    connectedDb = new DB("access_token", "localstorage"); // localstorage | indexedDB
    return true;
};

const storeToDb = (key, value) => {
    if (!connectedDb) {
        connectToDb();
    }
    return connectedDb.store(key, value);
};

const loadFromDb = async (key) => {
    if (!connectedDb) {
        connectToDb();
    }
    return connectedDb.load(key);
};

export {storeToDb, loadFromDb};