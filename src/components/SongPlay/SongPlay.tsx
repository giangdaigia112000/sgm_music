import { Col, Popover, Rate, Row, Tooltip } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import {
    BiChevronRight,
    BiDotsHorizontalRounded,
    BiDownload,
    BiFlag,
    BiListPlus,
    BiMessageSquareAdd,
    BiMusic,
    BiPlay,
    BiPlayCircle,
    BiPlusCircle,
    BiStar,
} from "react-icons/bi";
import { BsSoundwave } from "react-icons/bs";
import { Song } from "../../interface";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { userReport } from "../../store/slice/loginSlice";
import { updatePlaylist } from "../../store/slice/playlistSlice";
import { setSongActive } from "../../store/slice/playSlice";
import { dowload, setSingerId } from "../../store/slice/singerSlice";
import { notiWarning } from "../../utils/notification";
import styles from "./SongPlay.module.scss";

interface Prop {
    song: Song;
}
const report = [
    "Vi phạm bản quyền",
    "Ngôn ngữ gây đả kích",
    "Nội dung phản cảm",
];
const SongPlay = ({ song }: Prop) => {
    const { listSongPlay, songActive } = useAppSelector((state) => state.play);
    const { user } = useAppSelector((state) => state.login);
    const { allPlaylist } = useAppSelector((state) => state.playlist);

    const dispatch = useAppDispatch();
    const [value, setValue] = useState<number>(0);
    const [active, setActive] = useState<boolean>(false);
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
                <Rate onChange={setValue} value={value} />
            </div>
        );
    };
    const PopoverPlayer = ({ pathname }: { pathname: string | undefined }) => {
        return (
            <div className="w-[160px] laptop:w-[200px] py-[7px]">
                <div
                    onClick={() => {
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
            className={`w-full flex items-center p-[4px] tablet:p-[8px] laptop:p-[10px] ${
                listSongPlay.length !== 0 &&
                listSongPlay[songActive].id === song.id &&
                "bg-[#362749]"
            } hover:bg-[#2f2739] ${styles.song} rounded-md`}
        >
            <div
                className={`${styles.option} flex justify-center items-center`}
            >
                <BiMusic className="text-base w-[25px] h-[25px]  p-[3px] text-[#ffffffa2] pr-[5px]" />
            </div>
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
                            onClick={() =>
                                dispatch(
                                    setSongActive(listSongPlay.indexOf(song))
                                )
                            }
                            className="w-[25px] h-[25px] tablet:w-[40px] tablet:h-[40px]   text-[#ffffff91] hover:text-[#ffffff] cursor-pointer"
                        />
                    )}
                </div>
            </div>
            <div className={styles.title}>
                <h1 className="text-[#fff] text-xs tablet:text-base font-bold hiddentitle pt-[8px] m-0 ">
                    {song.title}
                </h1>
                <div className="flex gap-1">
                    {song.singer.length > 0 &&
                        song.singer.map((singer) => (
                            <span
                                key={singer.id}
                                onClick={() => {
                                    dispatch(setSingerId(singer.id));
                                    push(`/singerdetail/${singer.id}`);
                                }}
                                className="text-[#ffffff80] text-xs tablet:text-sm  hiddentitle pt-[3px] hover:text-[#891dee] cursor-pointer w-fit"
                            >
                                {singer.name},
                            </span>
                        ))}
                </div>
            </div>
            <div className="h-full">
                <span className="text-[#ffffff80] italic text-xs tablet:text-sm">
                    {song.time}
                </span>
            </div>
            <div
                className={`${styles.option} flex justify-center items-center laptop:hidden pl-[4px]`}
            >
                <Popover
                    placement="topRight"
                    trigger="click"
                    _overlay={<PopoverPlayer pathname={song.file_path} />}
                >
                    <BiDotsHorizontalRounded className="text-base bg-[#62616b] w-[28px] h-[28px] rounded-full p-[4px] cursor-pointer " />
                </Popover>
            </div>
            <div className="h-full  justify-end items-center gap-[10px] hidden laptop:flex pl-[30px]">
                <Tooltip
                    placement="top"
                    color="volcano"
                    title={"Tải xuống"}
                    mouseLeaveDelay={0}
                    overlayInnerStyle={{
                        borderRadius: "5px",
                    }}
                >
                    <BiDownload
                        onClick={() => {
                            dispatch(dowload(song.file_path as string));
                        }}
                        className="w-[25px] h-[25px] laptop:w-[28px] laptop:h-[28px] p-[3px] text-[#ffffff91] hover:text-[#ffffff] cursor-pointer"
                    />
                </Tooltip>
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
                        <BiFlag className="w-[25px] h-[25px] laptop:w-[28px] laptop:h-[28px] p-[3px]  text-[#ffffff91] hover:text-[#ffffff] cursor-pointer" />
                    </Popover>
                )}
                {user && (
                    <Popover
                        placement="topRight"
                        trigger="click"
                        _overlay={<PlayList />}
                    >
                        <BiPlusCircle className="w-[25px] h-[25px] laptop:w-[28px] laptop:h-[28px] p-[3px]  text-[#ffffff91] hover:text-[#ffffff] cursor-pointer" />
                    </Popover>
                )}

                {/* <Popover
                    placement="topRight"
                    trigger="click"
                    _overlay={<RateStar />}
                >
                    <BiStar className="w-[25px] h-[25px] laptop:w-[28px] laptop:h-[28px] p-[3px]  text-[#ffffff91] hover:text-[#ffffff] cursor-pointer" />
                </Popover> */}
            </div>
        </div>
    );
};

export default SongPlay;
