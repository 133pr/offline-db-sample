# storix-db

[![npm](https://img.shields.io/npm/v/storix-db.svg)](https://www.npmjs.com/package/storix-db)
[![npm downloads](https://img.shields.io/npm/dm/storix-db.svg)](https://www.npmjs.com/package/storix-db)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![GitHub Repo stars](https://img.shields.io/github/stars/133pr/storix-db-sample?style=social)](https://github.com/133pr/storix-db-sample)
[![GitHub forks](https://img.shields.io/github/forks/133pr/storix-db-sample?style=social)](https://github.com/133pr/storix-db-sample)
[![GitHub issues](https://img.shields.io/github/issues/133pr/storix-db-sample)](https://github.com/133pr/storix-db-sample/issues)

A lightweight client-side database wrapper for **React.js** and **Vue.js**, supporting **IndexedDB**, **LocalStorage**, and **Cache Storage**. Ideal for storing data offline in a simple and consistent way.

> ⚠️ For **Next.js**, make sure to use this package inside a `use client` component.

---

## Features

- Supports **IndexedDB**, **LocalStorage**, and **Cache Storage**
- Easy-to-use API for storing and retrieving data
- Works in **React.js** and **Vue.js** applications
- **TypeScript** definitions included
- Requires an **access token** for database initialization

---

## Installation
```bash
npm install storix-db
```
---

## Usage

### 1. Using IndexedDB
```javascript
import DB from "storix-db";

let connectedDb;

const connectToDb = () => {
    connectedDb = new DB("access_token", "indexedDB");
    return true;
};

const storeToDb = (key, value, table) => {
    if (!connectedDb) connectToDb();
    return connectedDb.store(key, value, table);
};

const loadFromDb = async (key, table) => {
    if (!connectedDb) connectToDb();
    return connectedDb.load(key, table);
};

export { storeToDb, loadFromDb };
```
**Example:**
```javascript
await storeToDb("user", { name: "John" }, "users");
const user = await loadFromDb("user", "users");
console.log(user); // { name: "John" }
```
---

### 2. Using LocalStorage
```javascript
import DB from "storix-db";

let connectedDb;

const connectToDb = () => {
    connectedDb = new DB("access_token", "localstorage");
    return true;
};

const storeToDb = (key, value) => {
    if (!connectedDb) connectToDb();
    return connectedDb.store(key, value);
};

const loadFromDb = async (key) => {
    if (!connectedDb) connectToDb();
    return connectedDb.load(key);
};

export { storeToDb, loadFromDb };
```
**Example:**
```javascript
storeToDb("theme", "dark");
const theme = await loadFromDb("theme");
console.log(theme); // "dark"
```
---

### 3. Using Cache Storage

```javascript
import DB from "storix-db";

let connectedDb;

const connectToDb = () => {
    connectedDb = new DB("access_token", "cacheStorage");
    return true;
};

const storeToDb = (key, value, table) => {
    if (!connectedDb) connectToDb();
    return connectedDb.store(key, value, table);
};

const loadFromDb = async (key, table) => {
    if (!connectedDb) connectToDb();
    return connectedDb.load(key, table);
};

export { storeToDb, loadFromDb };
```
**Example:**
```javascript
await storeToDb("count", "1", "items");
const value = await loadFromDb("count", "items");
console.log(value); // "1"
```
---

## API Reference

### `new DB(accessToken: string, driver: 'indexedDB' | 'localstorage' | 'cacheStorage')`
Creates a new DB instance.

- `accessToken` (**string**, required): Key for data isolation.
- `driver` (**'indexedDB'** | **'localstorage'** | **'cacheStorage'**, required): Storage backend.

### `.store(key, value, table?)`
Stores a value by key.

- `key`: **string**
- `value`: Any serializable data
- `table`: **string** (required for IndexedDB and Cache Storage, ignored for LocalStorage)

### `.load(key, table?)`
Returns value for a key.

- For **Cache Storage**, both the input and output are always of type **string**. It's advisable to use string keys, stringified JSON values, and string table names to ensure compatibility.
- **Security**: All data is encrypted using the given access token for all drivers, including Cache Storage. Never share your access token publicly.

---

## Notes

* Always provide a valid `access_token` when initializing the database.
* For **Next.js**, this package must run in the client context (`use client`).
* For **Cache Storage**, all input and output values are **strings**. If you wish to store objects or arrays, use `JSON.stringify` before saving and `JSON.parse` after reading.
* The `table` argument refers to an IndexedDB/Cached object store. For LocalStorage, it’s ignored.
* Each method returns a stringified result; handle deserialization as needed.

---

## Supported Browsers

- Modern browsers with [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API), [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), or [Cache Storage](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage) support.
- Not supported in server environments.

---

## TypeScript Support

Type definitions are included out of the box.

---

## Security

All drivers—including **Cache Storage**—encrypt stored values using the provided access token, ensuring your sensitive data remains secure at rest. **Never share your access token publicly.** All key, value, and response types are strings; handle type conversions in your application code as appropriate.

---

## Contributing

Contributions and bug reports are welcome!  
Please open an [issue](https://github.com/yourusername/storix-db/issues) or submit a pull request.

---

## License

MIT
