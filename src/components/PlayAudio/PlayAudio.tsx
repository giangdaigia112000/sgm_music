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

const PlayAudio = () => {
    const audioRef = useRef<any>();
    const [value, setValue] = useState<number>(3);
    const [isPlay, setIsPlay] = useState<boolean>(false);

    useEffect(() => {
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(
                "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
            );
            hls.attachMedia(audioRef.current.audio.current);
            return () => {
                hls.destroy();
            };
        }
    }, []);

    const PlayList = () => {
        return (
            <div className="w-[160px] laptop:w-[200px] py-[10px] text-[#fff]">
                <span className="text-xs laptop:text-sm font-semibold  block mb-[5px] w-full text-center">
                    Danh sách Playlist
                </span>
                <div className="w-full pl-[2px] text-xs laptop:text-sm h-[40px] flex gap-[5px] items-center text-[#fff]  cursor-pointer hover:bg-[#493961]">
                    <BiMusic className="w-[20px] h-[20px] laptop:w-[28px] laptop:h-[28px] p-[3px]" />
                    <span className="flex items-center flex-1 justify-between">
                        Nhạc hay nghe lúc tắm
                    </span>
                </div>
                <div className="w-full pl-[2px] text-xs laptop:text-sm h-[40px] flex gap-[5px] items-center text-[#fff]  cursor-pointer hover:bg-[#493961]">
                    <BiMusic className="w-[20px] h-[20px] laptop:w-[28px] laptop:h-[28px] p-[3px]" />
                    <span className="flex items-center flex-1 justify-between">
                        Nhạc hay nghe lúc tắm
                    </span>
                </div>
                <div className="w-full pl-[2px] text-xs laptop:text-sm h-[40px] flex gap-[5px] items-center text-[#fff]  cursor-pointer hover:bg-[#493961]">
                    <BiMusic className="w-[20px] h-[20px] laptop:w-[28px] laptop:h-[28px] p-[3px]" />
                    <span className="flex items-center flex-1 justify-between">
                        Nhạc hay nghe lúc tắm
                    </span>
                </div>
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
                <div className="w-full text-xs laptop:text-sm h-[40px] flex gap-[5px] items-center text-[#fff] px-[10px] cursor-pointer hover:bg-[#493961]">
                    <BiDownload className="w-[20px] h-[20px] laptop:w-[28px] laptop:h-[28px] p-[3px]" />
                    <span className="flex items-center flex-1 justify-between">
                        Tải bài hát xuống
                    </span>
                </div>
                <div className="w-full text-xs laptop:text-sm h-[40px] flex gap-[5px] items-center text-[#fff] px-[10px] cursor-pointer hover:bg-[#493961]">
                    <BiFlag className="w-[20px] h-[20px] laptop:w-[28px] laptop:h-[28px] p-[3px]" />
                    <span className="flex items-center flex-1 justify-between">
                        Báo cáo
                    </span>
                </div>
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
                <Popover
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
                </Popover>
            </div>
        );
    };
    return (
        <div className="play-audio flex flex-col laptop:flex-row laptop:px-[15px]">
            <div className=" h-full w-full laptop:w-fit laptop:w-[1/2]  flex  items-center px-[15px] pt-[10px] laptop:py-[10px] relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    className={` w-[35px] h-[35px] rounded-full laptop:h-[60px] laptop:w-[60px] object-cover ${
                        isPlay
                            ? "animate-spin-slow rounded-full"
                            : "laptop:rounded-lg"
                    }  `}
                    style={{
                        transition: "0.5s",
                    }}
                    src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/b/6/d/e/b6deae9187fdee862e95ed77ed752f4f.jpg"
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
                        <span className="hiddentext1 font-semibold pb-[5px] text-xs tablet:text-sm  text-[#ffffffb2] hiddentext">
                            Tình sầu thiên thu muôn lối.
                        </span>
                    </Tooltip>
                    <span className="text-[#ffffffe7] text-xs tablet:text-sm cursor-pointer hover:text-[#0e12d8]">
                        OSAD
                    </span>
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
                    <BiDownload className="w-[25px] h-[25px] laptop:w-[28px] laptop:h-[28px] p-[3px] text-[#ffffff91] hover:text-[#ffffff] cursor-pointer" />
                    <BiFlag className="w-[25px] h-[25px] laptop:w-[28px] laptop:h-[28px] p-[3px]  text-[#ffffff91] hover:text-[#ffffff] cursor-pointer" />
                    <Popover
                        placement="topRight"
                        trigger="click"
                        _overlay={<PlayList />}
                    >
                        <BiPlusCircle className="w-[25px] h-[25px] laptop:w-[28px] laptop:h-[28px] p-[3px]  text-[#ffffff91] hover:text-[#ffffff] cursor-pointer" />
                    </Popover>
                    <Popover
                        placement="topRight"
                        trigger="click"
                        _overlay={<RateStar />}
                    >
                        <BiStar className="w-[25px] h-[25px] laptop:w-[28px] laptop:h-[28px] p-[3px]  text-[#ffffff91] hover:text-[#ffffff] cursor-pointer" />
                    </Popover>
                </div>
            </div>
            <div className="h-full flex-1 w-full">
                <AudioPlayer
                    ref={audioRef}
                    src={
                        "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
                    }
                    showSkipControls={true}
                    showJumpControls={false}
                    customIcons={{
                        play: <BiPlayCircle />,
                        pause: <BiPauseCircle />,
                    }}
                    onPlay={() => setIsPlay(true)}
                    onPause={() => setIsPlay(false)}
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
                    <BiDownload className="w-[25px] h-[25px] laptop:w-[28px] laptop:h-[28px] p-[3px] text-[#ffffff91] hover:text-[#ffffff] cursor-pointer" />
                </Tooltip>
                <Tooltip
                    placement="top"
                    color="volcano"
                    title={"Báo cáo"}
                    mouseLeaveDelay={0}
                    overlayInnerStyle={{
                        borderRadius: "5px",
                    }}
                >
                    <BiFlag className="w-[25px] h-[25px] laptop:w-[28px] laptop:h-[28px] p-[3px]  text-[#ffffff91] hover:text-[#ffffff] cursor-pointer" />
                </Tooltip>
                <Popover
                    placement="topRight"
                    trigger="click"
                    _overlay={<PlayList />}
                >
                    <BiPlusCircle className="w-[25px] h-[25px] laptop:w-[28px] laptop:h-[28px] p-[3px]  text-[#ffffff91] hover:text-[#ffffff] cursor-pointer" />
                </Popover>
                <Popover
                    placement="topRight"
                    trigger="click"
                    _overlay={<RateStar />}
                >
                    <BiStar className="w-[25px] h-[25px] laptop:w-[28px] laptop:h-[28px] p-[3px]  text-[#ffffff91] hover:text-[#ffffff] cursor-pointer" />
                </Popover>
            </div>
        </div>
    );
};

export default PlayAudio;
