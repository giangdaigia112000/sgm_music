import { useEffect } from "react";
import Song from "../components/Song";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getListSongHomeBXH } from "../store/slice/homeSlice";

const BXH = () => {
    const { listSongBXH } = useAppSelector((state) => state.home);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getListSongHomeBXH());
    }, []);
    return (
        <>
            {/* {loadingApi && <Loading />} */}
            <div className="bg-blur absolute"></div>
            <div className="bg-alpha absolute"></div>

            <div className="w-full pb-[300px] z-10 relative">
                <h1 className=" text-[#fff] font-bold text-sm tablet:text-xl m-0 relative pb-[20px]">
                    BẢNG XẾP HẠNG BÀI HÁT
                </h1>
                <div className="w-full flex justify-center">
                    <div className="max-w-[700px]">
                        {listSongBXH.length > 0 &&
                            listSongBXH.map((song, index) => (
                                <div
                                    key={song.id}
                                    className="w-full flex items-center"
                                >
                                    <span
                                        style={{
                                            fontSize: "40px",
                                            WebkitTextStroke: `2px ${
                                                index > 2
                                                    ? "#fff"
                                                    : index == 0
                                                    ? "#4a90e2"
                                                    : index == 1
                                                    ? "#50e3c2"
                                                    : "#e35050"
                                            }`,
                                        }}
                                        className=" font-bold text-[#fff0] tablet:pr-[40px]"
                                    >
                                        {index + 1}
                                    </span>
                                    <div className="w-[16px] h-[3px] bg-white mx-[10px] tablet:mx-[50px]"></div>
                                    <div className="flex-1">
                                        <Song song={song} />
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BXH;
