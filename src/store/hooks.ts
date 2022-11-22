import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import type { AppDispatch, AppState } from "./index";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const useDebounce = (query: string, time: number) => {
    const [search, setSearch] = useState<string>(query);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setSearch(query);
        }, time);
        return () => {
            clearTimeout(timeout);
        };
    }, [query]);
    return search;
};
