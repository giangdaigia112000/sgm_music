import { Col, Popover, Rate, Row, Tooltip } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";
import {
    BiChevronRight,
    BiDotsHorizontalRounded,
    BiDownload,
    BiFlag,
    BiHeadphone,
    BiListPlus,
    BiMessageSquareAdd,
    BiMusic,
    BiPlay,
    BiPlayCircle,
    BiPlusCircle,
    BiStar,
} from "react-icons/bi";
import { RiVipCrown2Fill } from "react-icons/ri";
import { Song } from "../../interface";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { userReport } from "../../store/slice/loginSlice";
import { updatePlaylist } from "../../store/slice/playlistSlice";
import { pushSongList, setSongList } from "../../store/slice/playSlice";
import { dowload, setSingerId } from "../../store/slice/singerSlice";
import { notiSuccess, notiWarning } from "../../utils/notification";
import styles from "./Song.module.scss";
interface Props {
    song: Song;
}

const report = [
    "Vi phạm bản quyền",
    "Ngôn ngữ gây đả kích",
    "Nội dung phản cảm",
];
const SongDetail = ({ song }: Props) => {
    const { listSongPlay, songActive } = useAppSelector((state) => state.play);
    const { user } = useAppSelector((state) => state.login);
    const { allPlaylist } = useAppSelector((state) => state.playlist);

    const dispatch = useAppDispatch();
    const { push } = useRouter();
    const PlayList = () => {
        return (
            <div className="w-[160px] laptop:w-[200px] py-[10px] text-[#fff]">
                <span className="text-xs laptop:text-sm font-semibold  block mb-[5px] w-full text-center">
                    Danh sách Playlist
                </span>
                {allPlaylist.length > 0 &&
                    allPlaylist.map((pl) => (
                        <div
                            onClick={() => {
                                if (pl.music.includes(song)) {
                                    notiWarning("Bài hát đã có trong playlist");
                                    return;
                                }
                                dispatch(
                                    updatePlaylist({
                                        ...pl,
                                        idSong: song.id,
                                    })
                                );
                            }}
                            key={pl.id}
                            className="w-full pl-[2px] text-xs laptop:text-sm h-[40px] flex gap-[5px] items-center text-[#fff]  cursor-pointer hover:bg-[#493961]"
                        >
                            <BiMusic className="w-[20px] h-[20px] laptop:w-[28px] laptop:h-[28px] p-[3px]" />
                            <span className="flex items-center flex-1 justify-between">
                                {pl.name}
                            </span>
                        </div>
                    ))}
            </div>
        );
    };

    const RateStar = () => {
        return (
            <div className="p-[10px]">
                {/* <Rate onChange={setValue} value={value} /> */}
            </div>
        );
    };
    const PopoverPlayer = ({ pathname }: { pathname: string | undefined }) => {
        return (
            <div className="w-[160px] laptop:w-[200px] py-[7px]">
                <div
                    onClick={() => {
                        const listId = listSongPlay.map((song) => song.id);
                        if (
                            listSongPlay.length !== 0 &&
                            listId.includes(song.id)
                        ) {
                            notiWarning("Bài hát đã trong danh sách phát");
                            return;
                        }
                        dispatch(pushSongList(song));
                        notiSuccess("Đã thêm vào danh sách phát");
                    }}
                    className="w-full text-xs laptop:text-sm h-[40px] flex gap-[5px] items-center text-[#fff] px-[10px] cursor-pointer hover:bg-[#493961]"
                >
                    <BiListPlus className="w-[20px] h-[20px] laptop:w-[28px] laptop:h-[28px] p-[3px]" />
                    <span className="flex items-center flex-1 justify-between">
                        Thêm vào Phát
                    </span>
                </div>
                <div
                    onClick={() => {
                        if (user?.vip === 0 && song.free === 0) {
                            notiWarning(
                                "Bạn cần là thành viên vip để tải bài hát này."
                            );
                            return;
                        }
                        dispatch(dowload(pathname as string));
                    }}
                    className="w-full text-xs laptop:text-sm h-[40px] flex gap-[5px] items-center text-[#fff] px-[10px] cursor-pointer hover:bg-[#493961]"
                >
                    <BiDownload className="w-[20px] h-[20px] laptop:w-[28px] laptop:h-[28px] p-[3px]" />
                    <span className="flex items-center flex-1 justify-between">
                        Tải bài hát xuống
                    </span>
                </div>
                {user && (
                    <Popover
                        placement="right"
                        trigger="click"
                        _overlay={
                            <div className="w-[160px] laptop:w-[200px] py-[10px] text-[#fff] pl-[10px]">
                                {report.map((pl, idx) => (
                                    <div
                                        onClick={() => {
                                            dispatch(
                                                userReport({
                                                    id: song.id,
                                                    content: pl,
                                                })
                                            );
                                        }}
                                        key={idx}
                                        className="w-full pl-[2px] text-xs laptop:text-sm h-[40px] flex gap-[5px] items-center text-[#fff]  cursor-pointer hover:bg-[#493961]"
                                    >
                                        <span className="flex items-center flex-1 justify-between">
                                            {pl}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        }
                    >
                        <div className="w-full text-xs laptop:text-sm h-[40px] flex gap-[5px] items-center text-[#fff] px-[10px] cursor-pointer hover:bg-[#493961]">
                            <BiFlag className="w-[20px] h-[20px] laptop:w-[28px] laptop:h-[28px] p-[3px]" />
                            <span className="flex items-center flex-1 justify-between">
                                Báo cáo
                                <BiChevronRight className="w-[20px] h-[20px] laptop:w-[28px] laptop:h-[28px] p-[3px]" />
                            </span>
                        </div>
                    </Popover>
                )}

                {user && (
                    <Popover
                        placement="right"
                        trigger="click"
                        _overlay={<PlayList />}
                    >
                        <div className="w-full text-xs laptop:text-sm h-[40px] flex gap-[5px] items-center text-[#fff] px-[10px] cursor-pointer hover:bg-[#493961]">
                            <BiPlusCircle className="w-[20px] h-[20px] laptop:w-[28px] laptop:h-[28px] p-[3px]" />
                            <span className="flex items-center flex-1 justify-between">
                                Thêm vào Playlist
                                <BiChevronRight className="w-[20px] h-[20px] laptop:w-[28px] laptop:h-[28px] p-[3px]" />
                            </span>
                        </div>
                    </Popover>
                )}

                {/* <Popover
                    placement="right"
                    trigger="click"
                    _overlay={<RateStar />}
                >
                    <div className="w-full text-xs laptop:text-sm h-[40px] flex gap-[5px] items-center text-[#fff] px-[10px] cursor-pointer hover:bg-[#493961]">
                        <BiStar className="w-[20px] h-[20px] laptop:w-[28px] laptop:h-[28px] p-[3px]" />
                        <span className="flex items-center flex-1 justify-between">
                            Đánh giá
                            <BiChevronRight className="w-[20px] h-[20px] laptop:w-[28px] laptop:h-[28px] p-[3px]" />
                        </span>
                    </div>
                </Popover> */}
            </div>
        );
    };

    return (
        <div
            className={`w-full flex items-center p-[4px] tablet:p-[8px] laptop:p-[10px] hover:bg-[#2f2739] ${styles.song} rounded-md`}
        >
            <div
                className={`w-[60px] h-[60px] cursor-pointer overflow-hidden rounded relative mr-[10px] ${
                    listSongPlay.length === 0 ||
                    listSongPlay[songActive].id !== song.id
                        ? styles.songHover
                        : ""
                }`}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    className="w-full h-full object-cover"
                    src={`${process.env.HOST_NAME_STREAM}/image/${song.thumbnail}`}
                    alt="Song"
                />
                <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full bg-[#00000086]">
                    {listSongPlay.length !== 0 &&
                    listSongPlay[songActive].id === song.id ? (
                        //  eslint-disable-next-line @next/next/no-img-element
                        <img
                            className="w-full h-full object-cover"
                            src="/wave.gif"
                            alt="wave"
                        />
                    ) : (
                        <BiPlay
                            onClick={() => {
                                if (
                                    (user?.vip === 0 || !user) &&
                                    song.free === 0
                                ) {
                                    notiWarning(
                                        "Bạn cần là thành viên vip để nghe bài hát này."
                                    );
                                    return;
                                }
                                dispatch(setSongList([song]));
                            }}
                            className="w-[25px] h-[25px] tablet:w-[40px] tablet:h-[40px]   text-[#ffffff91] hover:text-[#ffffff] cursor-pointer"
                        />
                    )}
                </div>
                {song.free === 0 && (
                    <RiVipCrown2Fill className="w-[22px] h-[22px] text-[#e1fa00] absolute right-0 bottom-0" />
                )}
            </div>
            <div className={styles.title}>
                <h1 className="text-[#fff] text-xs tablet:text-sm font-bold hiddentitle pt-[8px] m-0">
                    {song?.title}
                </h1>
                <div className="flex gap-1">
                    {song?.singer.map((singer) => (
                        <span
                            key={singer.id}
                            onClick={() => {
                                dispatch(setSingerId(singer.id));
                                push(`/singerdetail/${singer.id}`);
                            }}
                            className="text-[#ffffff80] text-xs  hiddentitle  hover:text-[#891dee] cursor-pointer w-fit"
                        >
                            {singer.name},
                        </span>
                    ))}
                </div>
                <div className="flex gap-2 ">
                    <div className="text-[#ffffff80] text-nho tablet:text-xs   italic flex gap-1 items-center m-0 justify-center">
                        <span>{song.views}</span>
                        <BiHeadphone className="w-[15px] h-[15px]" />
                    </div>
                    <h1 className="text-[#ffffff80] text-nho tablet:text-xs   italic m-0">
                        {moment(song?.created_at).format("L")}
                    </h1>
                </div>
            </div>
            <div
                className={`${styles.option} flex justify-center items-center pl-[4px]`}
            >
                <Popover
                    placement="topRight"
                    trigger="click"
                    _overlay={<PopoverPlayer pathname={song.file_path} />}
                >
                    <BiDotsHorizontalRounded className="text-base bg-[#62616b] w-[28px] h-[28px] rounded-full p-[4px] cursor-pointer " />
                </Popover>
            </div>
        </div>
    );
};

export default SongDetail;
