import {loadFromDb, storeToDb} from "./database.js";
import {useCallback, useEffect, useState} from "react";

const STORE_KEY = "count";
const TABLE_NAME = "items";

const handleLoadFromDb = async () => {
    return await loadFromDb(STORE_KEY, TABLE_NAME);
};

const Button = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        handleLoadFromDb().then((value) => {
            setCount(value ? parseInt(value) : 0);
        });
    }, []);

    const handleClick = useCallback(() => {
        const newCount = count + 1;
        setCount(newCount);
        storeToDb(STORE_KEY, newCount, TABLE_NAME);
    }, [count]);

    return (
        <button onClick={handleClick}>
            <span>Cache Storage</span> count is {count}
        </button>
    );
};

export default Button;