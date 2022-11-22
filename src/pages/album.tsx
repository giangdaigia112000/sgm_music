import { useEffect, useState } from "react";
import ListAlbum from "../components/ListAlbum";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getListAlbumHome } from "../store/slice/homeSlice";

const Album = () => {
    const { listAlbumHome } = useAppSelector((state) => state.home);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (listAlbumHome.length > 0) return;
        dispatch(getListAlbumHome());
    }, []);
    return (
        <div className="w-full">
            <div className="w-full  pt-[20px] ">
                <h1 className="text-[#fff]  text-lg tablet:text-xl font-bold">
                    Mới & Hot
                </h1>
                <ListAlbum listAlbum={listAlbumHome} />
            </div>
            <div className="h-[200px]"></div>
        </div>
    );
};

export default Album;
