import { Pagination } from "antd";
import { useEffect, useState } from "react";
import ListAlbum from "../components/ListAlbum";
import ListSinger from "../components/ListSinger";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getAllSinger } from "../store/slice/singerSlice";

const Singer = () => {
    const { allSinger } = useAppSelector((state) => state.singer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (allSinger.length > 0) return;
        dispatch(getAllSinger());
    }, []);
    return (
        <>
            <div className="w-full">
                <div className="w-full  pt-[20px] ">
                    <h1 className="text-[#fff]  text-lg tablet:text-xl font-bold z-10">
                        Nghệ Sỹ Hot
                    </h1>
                    <ListSinger listSinger={allSinger} />
                </div>
            </div>
        </>
    );
};

export default Singer;
