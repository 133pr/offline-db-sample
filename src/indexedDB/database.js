import DB from "storix-db";

let connectedDb;

const connectToDb = () => {
    connectedDb = new DB("access_token", "indexedDB"); // localstorage | indexedDB
    return true;
};

const storeToDb = (key, value, table) => {
    if (!connectedDb) {
        connectToDb();
    }
    return connectedDb.store(key, value, table);
};

const loadFromDb = async (key, table) => {
    if (!connectedDb) {
        connectToDb();
    }
    return connectedDb.load(key, table);
};

export {storeToDb, loadFromDb};