import { Col, Row } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiPlay } from "react-icons/bi";
import Loading from "../../components/Loading";
import Song from "../../components/Song";
import SongPlay from "../../components/SongPlay";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getDetailAlbum } from "../../store/slice/albumSlice";
import { setSongList } from "../../store/slice/playSlice";
import { notiWarning } from "../../utils/notification";

const AlbumDetail = () => {
    const { detailAlbum, loadingApi, albumId } = useAppSelector(
        (state) => state.album
    );
    const { user } = useAppSelector((state) => state.login);
    const dispatch = useAppDispatch();
    const { push, query } = useRouter();
    useEffect(() => {
        dispatch(getDetailAlbum(albumId));
    }, [albumId]);
    return (
        <>
            {loadingApi && <Loading />}
            <div className="bg-blur absolute"></div>
            <div className="bg-alpha absolute"></div>

            <div className="w-full pb-[300px] z-10 relative">
                <h1 className=" text-[#fff] font-bold text-sm tablet:text-xl m-0 relative pb-[20px]">
                    CHI TIẾT ALBUM
                </h1>
                {detailAlbum && (
                    <div className="w-full pt-[20px] flex tablet:flex-row flex-col">
                        <div className=" tablet:px-[20px] w-full tablet:w-[340px] pb-[20px] flex flex-row tablet:flex-col items-center justify-center tablet:justify-start gap-[20px]">
                            <div className="w-[180px] tablet:w-[300px]">
                                <div className="relative w-full pt-[100%] ">
                                    <div
                                        className={`absolute top-0 left-0 right-0 bottom-0 overflow-hidden rounded-lg `}
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            className="w-full h-full object-cover "
                                            src={`${process.env.HOST_NAME_STREAM}/image/${detailAlbum.thumbnail}`}
                                            alt="Category"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="p-[10px]">
                                <div className="flex justify-center items-center mb-[10px]">
                                    <div
                                        onClick={() => {
                                            if (
                                                detailAlbum.music.length === 0
                                            ) {
                                                notiWarning("Album rỗng.");
                                                return;
                                            }
                                            push("/play");
                                            dispatch(
                                                setSongList(
                                                    detailAlbum.music.filter(
                                                        (music) =>
                                                            !(
                                                                (user?.vip ===
                                                                    0 ||
                                                                    !user) &&
                                                                music.free === 0
                                                            )
                                                    )
                                                )
                                            );
                                        }}
                                        className=" cursor-pointer flex gap-[5px] items-center text-sm tablet:text-base bg-[#9b4de0] p-[5px] w-[100px] tablet:w-[120px] justify-center rounded-3xl  "
                                    >
                                        <BiPlay /> Phát tất cả
                                    </div>
                                </div>
                                <h1 className="text-center text-[#fff] font-bold text-sm tablet:text-xl m-0">
                                    {detailAlbum.name}
                                </h1>
                                <div className="flex justify-center gap-[10px]">
                                    <h1
                                        onClick={() => push("/singerdetail/1")}
                                        className="m-0 text-[#ffffff8e] text-xs tablet:text-base  hiddentitle pt-[3px] hover:text-[#891dee] cursor-pointer text-center"
                                    >
                                        {detailAlbum.singer.name}
                                    </h1>
                                    <h1 className="text-[#ffffff8e] text-xs tablet:text-base  hiddentitle pt-[3px] text-center italic m-0">
                                        {moment(detailAlbum.created_at).format(
                                            "L"
                                        )}
                                    </h1>
                                </div>
                                <h1 className="text-[#ffffff8e] text-xs tablet:text-base  hiddentitle  text-center italic m-0">
                                    2000 Lượt Nghe
                                </h1>
                            </div>
                        </div>

                        <div className="tablet:flex-1 ">
                            {detailAlbum?.music.length > 0 && (
                                <>
                                    <h1 className="text-[#fff] text-xs tablet:text-base font-bold hiddentitle pt-[8px] pb-[10px]">
                                        Danh sách bài hát
                                    </h1>
                                    <Row justify="start" align="middle">
                                        {detailAlbum?.music.map((song) => (
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
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default AlbumDetail;
