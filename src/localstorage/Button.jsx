import {loadFromDb, storeToDb} from "./database.js";
import {useCallback, useEffect, useState} from "react";

const STORE_KEY = "count";

const handleLoadFromDb = async () => {
    return await loadFromDb(STORE_KEY);
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
        storeToDb(STORE_KEY, newCount);
    }, [count]);

    return (
        <button onClick={handleClick}>
           <span>Local Storage</span> count is {count}
        </button>
    );
};

export default Button;