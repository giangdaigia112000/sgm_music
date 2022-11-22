import { Col, Row } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiPlay } from "react-icons/bi";
import Loading from "../../components/Loading";
import Song from "../../components/Song";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getDetailPlaylist } from "../../store/slice/playlistSlice";
import { setSongList } from "../../store/slice/playSlice";
import { notiWarning } from "../../utils/notification";

const mang = [1, 2, 3, 4, 5, 6];
const PlaylistDetail = () => {
    const { detailPlaylist, loadingApi, playlistId, allPlaylist } =
        useAppSelector((state) => state.playlist);

    const playlist = allPlaylist.filter((pl) => pl.id === playlistId);
    const dispatch = useAppDispatch();
    const { push } = useRouter();

    useEffect(() => {
        dispatch(getDetailPlaylist(playlistId));
    }, [playlistId]);

    return (
        <>
            {loadingApi && <Loading />}
            <div className="bg-blur absolute"></div>
            <div className="bg-alpha absolute"></div>

            <div className="w-full pb-[300px] z-10 relative">
                <h1 className=" text-[#fff] font-bold text-sm tablet:text-xl m-0 relative pb-[20px]">
                    CHI TIẾT PLAYLIST
                </h1>
                {detailPlaylist && (
                    <div className="w-full pt-[20px] flex tablet:flex-row flex-col">
                        <div className=" tablet:px-[20px] w-full tablet:w-[340px] pb-[20px] flex flex-row tablet:flex-col items-center justify-center tablet:justify-start gap-[20px]">
                            <div className="p-[10px]">
                                <h1 className="text-center text-[#fff] font-bold text-sm tablet:text-xl m-0">
                                    {detailPlaylist.name}
                                </h1>
                                <h2 className="text-center text-sm m-0 mt-4 text-[#fff] italic">
                                    {moment(detailPlaylist.created_at).format(
                                        "L"
                                    )}
                                </h2>
                                <div className="flex justify-center items-center mb-[10px] mt-4">
                                    <div
                                        onClick={() => {
                                            if (
                                                detailPlaylist.music.length ===
                                                0
                                            ) {
                                                notiWarning("Album rỗng.");
                                                return;
                                            }
                                            push("/play");
                                            dispatch(
                                                setSongList(playlist[0].music)
                                            );
                                        }}
                                        className=" cursor-pointer flex gap-[5px] items-center text-sm tablet:text-base bg-[#9b4de0] p-[5px] w-[100px] tablet:w-[120px] justify-center rounded-3xl  "
                                    >
                                        <BiPlay /> Phát tất cả
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="tablet:flex-1 ">
                            {detailPlaylist?.music.length > 0 && (
                                <>
                                    <h1 className="text-[#fff] text-xs tablet:text-base font-bold hiddentitle pt-[8px] pb-[10px]">
                                        Danh sách bài hát
                                    </h1>
                                    <Row justify="start" align="middle">
                                        {playlist[0]?.music.map((song) => (
                                            <Col
                                                xs={24}
                                                md={24}
                                                xl={12}
                                                key={song.id}
                                            >
                                                <Song song={song} />
                                            </Col>
                                        ))}
                                    </Row>
                                </>
                            )}
                            {detailPlaylist?.music.length === 0 && (
                                <h1 className="text-center text-sm m-0 mt-4 text-[#fff] italic">
                                    Danh sách rỗng.
                                </h1>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default PlaylistDetail;
