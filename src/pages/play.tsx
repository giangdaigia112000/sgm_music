import { Col, Row } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ListAlbum from "../components/ListAlbum";
import Song from "../components/Song";
import SongPlay from "../components/SongPlay";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getRecommendSong } from "../store/slice/playSlice";
const mang = [1, 2, 3, 4, 5, 6];
const Play = () => {
    const [isPlaylist, setIsPlaylist] = useState<boolean>(true);
    const { push } = useRouter();
    const { listSongPlay, songActive, listSongRecommend } = useAppSelector(
        (state) => state.play
    );
    const { listSongHome } = useAppSelector((state) => state.home);
    console.log(listSongPlay);

    const ddisspatch = useAppDispatch();
    useEffect(() => {
        if (listSongPlay.length === 0) return;
        ddisspatch(getRecommendSong(listSongPlay[songActive].id));
    }, [listSongPlay[songActive]]);
    return (
        <>
            <div className="bg-blur absolute"></div>
            <div className="bg-alpha absolute"></div>
            <div className="w-full pb-[300px] z-10 relative">
                <div className="w-full pt-[20px] flex tablet:flex-row flex-col">
                    <div className=" tablet:px-[20px] w-full tablet:w-[340px] flex flex-row tablet:flex-col items-center gap-[20px]">
                        {listSongPlay.length > 0 && (
                            <>
                                <div className="w-[180px] tablet:w-[300px]">
                                    <div className="relative w-full pt-[100%] ">
                                        <div
                                            className={`absolute top-0 left-0 right-0 bottom-0 overflow-hidden rounded-lg `}
                                        >
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                className="w-full h-full object-cover rounded-full "
                                                src={`${process.env.HOST_NAME_STREAM}/image/${listSongPlay[songActive].thumbnail}`}
                                                alt="Category"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-[10px]">
                                    <h1 className="text-center text-[#fff] font-bold tablet:text-xl">
                                        {listSongPlay[songActive].title}
                                    </h1>
                                    <div className="flex justify-center gap-[10px]">
                                        <h1 className="text-[#ffffff8e] text-xs tablet:text-base  hiddentitle pt-[3px] text-center italic">
                                            {listSongPlay[songActive].views}{" "}
                                            Lượt nghe
                                        </h1>
                                    </div>
                                    <div className="flex justify-center gap-[10px]">
                                        <h1 className="text-[#8c4bd68e] text-xs tablet:text-base  hiddentitle pt-[3px] text-center italic">
                                            {moment(
                                                listSongPlay[songActive]
                                                    .created_at
                                            ).format("L")}
                                        </h1>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="tablet:flex-1 ">
                        {listSongPlay.length > 0 && (
                            <>
                                <h1 className="text-[#fff] text-xs tablet:text-base font-bold hiddentitle pt-[8px] pb-[10px]">
                                    Danh sách phát
                                </h1>
                                {listSongPlay.map((song) => (
                                    <SongPlay song={song} key={song.id} />
                                ))}
                            </>
                        )}

                        <h1 className="text-[#fff] text-xs tablet:text-base font-bold hiddentitle pt-[8px] pb-[10px]">
                            Gợi ý cho bạn
                        </h1>
                        <Row justify="start" align="middle">
                            {listSongRecommend.length > 0 &&
                                listSongRecommend.map((song) => (
                                    <Col xs={24} md={24} xl={12} key={song.id}>
                                        <Song song={song} />
                                    </Col>
                                ))}
                        </Row>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Play;
