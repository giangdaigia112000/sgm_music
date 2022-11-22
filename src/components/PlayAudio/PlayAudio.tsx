import AudioPlayer from "react-h5-audio-player";
import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";
import {
    BiChevronRight,
    BiDotsHorizontalRounded,
    BiDownload,
    BiFlag,
    BiMusic,
    BiPauseCircle,
    BiPlayCircle,
    BiPlusCircle,
    BiStar,
} from "react-icons/bi";
import { Popover, Rate, Tooltip } from "antd";
import { useRouter } from "next/router";
import { notiError, notiWarning } from "../../utils/notification";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getPlaySong, setSongActive } from "../../store/slice/playSlice";
import { updatePlaylist } from "../../store/slice/playlistSlice";
import { dowload, setSingerId } from "../../store/slice/singerSlice";
import { userReport } from "../../store/slice/loginSlice";
const report = [
    "Vi phạm bản quyền",
    "Ngôn ngữ gây đả kích",
    "Nội dung phản cảm",
];
const PlayAudio = () => {
    const { listSongPlay, songActive } = useAppSelector((state) => state.play);
    const { allPlaylist } = useAppSelector((state) => state.playlist);
    const { user } = useAppSelector((state) => state.login);

    const dispatch = useAppDispatch();

    const audioRef = useRef<any>();
    const PlayAudio = useRef<any>();

    const { push } = useRouter();

    const [value, setValue] = useState<number>(3);
    const [isPlay, setIsPlay] = useState<boolean>(false);

    const handleClickPrevious = () => {
        dispatch(
            setSongActive(
                songActive === 0 ? listSongPlay.length - 1 : songActive - 1
            )
        );
    };

    const handleClickNext = () => {
        dispatch(
            setSongActive(
                songActive < listSongPlay.length - 1 ? songActive + 1 : 0
            )
        );
    };

    useEffect(() => {
        if (listSongPlay.length === 0) return;
        dispatch(getPlaySong(listSongPlay[songActive].id));
    }, [listSongPlay, songActive]);

    useEffect(() => {
        if (listSongPlay.length === 0) return;
        if (listSongPlay.length === 1) dispatch(setSongActive(0));
        if (Hls.isSupported()) {
            if (!audioRef.current) return;
            const hls = new Hls();
            const name = listSongPlay[songActive].file_path;
            hls.loadSource(
                `${process.env.HOST_NAME_STREAM}/${name}/${name}.m3u8`
            );
            hls.attachMedia(audioRef.current.audio.current);
            audioRef.current.audio.current.play();

            return () => {
                hls.destroy();
            };
        }
    }, [listSongPlay, songActive]);

    const PlayList = () => {
        return (
            <div className="w-[160px] laptop:w-[200px] py-[10px] text-[#fff]">
                <span className="text-xs laptop:text-sm font-semibold  block mb-[5px] w-full text-center">
                    Danh sách Playlist
                </span>
                {allPlaylist.length > 0 &&
                    allPlaylist.map((pl) => (
                        <div
                            key={pl.id}
                            onClick={() => {
                                if (
                                    pl.music.includes(listSongPlay[songActive])
                                ) {
                                    notiWarning("Bài hát đã có trong playlist");
                                    return;
                                }
                                dispatch(
                                    updatePlaylist({
                                        ...pl,
                                        idSong: listSongPlay[songActive].id,
                                    })
                                );
                            }}
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

    const PopoverPlayer = () => {
        return (
            <div className="w-[160px] laptop:w-[200px] py-[7px]">
                <div
                    onClick={() => {
                        if (
                            user?.vip === 0 &&
                            listSongPlay[songActive].free === 0
                        ) {
                            notiWarning(
                                "Bạn cần là thành viên vip để tải bài hát này."
                            );
                            return;
                        }
                        dispatch(
                            dowload(
                                listSongPlay[songActive].file_path as string
                            )
                        );
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
                                                    id: listSongPlay[songActive]
                                                        .id,
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
        <>
            {listSongPlay.length !== 0 && (
                <div
                    ref={PlayAudio}
                    className="play-audio flex flex-col tablet:flex-row tablet:px-[15px] z-10 tra translate-y-[50px] hover:translate-y-0 tablet:translate-y-0 transition-all"
                >
                    <div className="h-full w-full tablet:w-fit laptop:w-[1/2]  flex  items-center px-[15px] pt-[10px] tablet:py-[10px] relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            onClick={(e) => {
                                push("/play");
                            }}
                            className={` w-[35px] h-[35px] rounded-full tablet:h-[60px] tablet:w-[60px] object-cover cursor-pointer ${
                                isPlay
                                    ? "animate-spin-slow rounded-full"
                                    : "laptop:rounded-lg"
                            }  `}
                            style={{
                                transition: " 0.5s all ease-in",
                            }}
                            src={`${process.env.HOST_NAME_STREAM}/image/${listSongPlay[songActive].thumbnail}`}
                            alt="thumb"
                        />
                        <div className="h-full  flex justify-center flex-col mx-[15px]">
                            <Tooltip
                                placement="top"
                                color="volcano"
                                title={"Tình sầu thiên thu muôn lối"}
                                mouseLeaveDelay={0}
                                overlayInnerStyle={{
                                    borderRadius: "5px",
                                }}
                            >
                                <span className="hiddentext1 font-semibold pb-[5px] text-xs tablet:text-sm  text-[#ffffffe7] hiddentext">
                                    {listSongPlay[songActive].title}
                                </span>
                            </Tooltip>
                            {listSongPlay[songActive].singer.length > 0 &&
                                listSongPlay[songActive].singer.map(
                                    (singer) => (
                                        <span
                                            key={singer.id}
                                            onClick={() => {
                                                dispatch(
                                                    setSingerId(singer.id)
                                                );
                                                push(
                                                    `/singerdetail/${singer.id}`
                                                );
                                            }}
                                            className="text-[#ffffff80] text-xs tablet:text-sm cursor-pointer hover:text-[#0e12d8] W-fit"
                                        >
                                            {singer.name}
                                        </span>
                                    )
                                )}
                        </div>

                        <div className="h-full  flex items-center px-[10px] tablet:hidden absolute top-0 right-0">
                            <Popover
                                placement="topRight"
                                trigger="click"
                                _overlay={<PopoverPlayer />}
                            >
                                <BiDotsHorizontalRounded className="text-base bg-[#62616b] w-[28px] h-[28px] rounded-full p-[4px] cursor-pointer" />
                            </Popover>
                        </div>
                        <div className="h-full flex-1  justify-end items-center gap-[5px] hidden tablet:flex laptop:hidden">
                            <BiDownload
                                onClick={() => {
                                    if (
                                        user?.vip === 0 &&
                                        listSongPlay[songActive].free === 0
                                    ) {
                                        notiWarning(
                                            "Bạn cần là thành viên vip để tải bài hát này."
                                        );
                                        return;
                                    }
                                    dispatch(
                                        dowload(
                                            listSongPlay[songActive]
                                                .file_path as string
                                        )
                                    );
                                }}
                                className="w-[25px] h-[25px] laptop:w-[28px] laptop:h-[28px] p-[3px] text-[#ffffff80] hover:text-[#ffffff] cursor-pointer"
                            />
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
                                                                id: listSongPlay[
                                                                    songActive
                                                                ].id,
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
                            <Popover
                                placement="topRight"
                                trigger="click"
                                _overlay={<PlayList />}
                            >
                                <BiPlusCircle className="w-[25px] h-[25px] laptop:w-[28px] laptop:h-[28px] p-[3px]  text-[#ffffff80] hover:text-[#ffffff] cursor-pointer" />
                            </Popover>
                            {/* <Popover
                                placement="topRight"
                                trigger="click"
                                _overlay={<RateStar />}
                            >
                                <BiStar className="w-[25px] h-[25px] laptop:w-[28px] laptop:h-[28px] p-[3px]  text-[#ffffff80] hover:text-[#ffffff] cursor-pointer" />
                            </Popover> */}
                        </div>
                    </div>
                    <div className="h-full flex-1 w-full">
                        <AudioPlayer
                            ref={audioRef}
                            src={""}
                            showSkipControls={true}
                            showJumpControls={false}
                            onClickPrevious={handleClickPrevious}
                            onClickNext={handleClickNext}
                            customIcons={{
                                play: (
                                    <BiPlayCircle className="text-[#ffffff80]" />
                                ),
                                pause: (
                                    <BiPauseCircle className="text-[#ffffff80]" />
                                ),
                            }}
                            onPlay={() => setIsPlay(true)}
                            onPause={() => setIsPlay(false)}
                            // onPlayError={() => notiError("Trình phát lỗi.")}
                        />
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
                                    if (
                                        user?.vip === 0 &&
                                        listSongPlay[songActive].free === 0
                                    ) {
                                        notiWarning(
                                            "Bạn cần là thành viên vip để tải bài hát này."
                                        );
                                        return;
                                    }
                                    dispatch(
                                        dowload(
                                            listSongPlay[songActive]
                                                .file_path as string
                                        )
                                    );
                                }}
                                className="w-[25px] h-[25px] laptop:w-[28px] laptop:h-[28px] p-[3px] text-[#ffffff80] hover:text-[#ffffff] cursor-pointer"
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
                                                            id: listSongPlay[
                                                                songActive
                                                            ].id,
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
                        <Popover
                            placement="topRight"
                            trigger="click"
                            _overlay={<PlayList />}
                        >
                            <BiPlusCircle className="w-[25px] h-[25px] laptop:w-[28px] laptop:h-[28px] p-[3px]  text-[#ffffff80] hover:text-[#ffffff] cursor-pointer" />
                        </Popover>
                        {/* <Popover
                            placement="topRight"
                            trigger="click"
                            _overlay={<RateStar />}
                        >
                            <BiStar className="w-[25px] h-[25px] laptop:w-[28px] laptop:h-[28px] p-[3px]  text-[#ffffff80] hover:text-[#ffffff] cursor-pointer" />
                        </Popover> */}
                    </div>
                </div>
            )}
        </>
    );
};

export default PlayAudio;
