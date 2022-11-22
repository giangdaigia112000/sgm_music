import { useEffect, useState } from "react";
import Link from "next/link";
import classNames from "classnames/bind";
import { useRouter } from "next/router";
import {
    BiBarChartSquare,
    BiDotsHorizontalRounded,
    BiDownload,
    BiGridAlt,
    BiHomeAlt,
    BiIdCard,
    BiMusic,
} from "react-icons/bi";
import { RiVipFill } from "react-icons/ri";
import styles from "./Navbar.module.scss";
import { Button, Form, Input, Modal, Popover, Tooltip } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setNav } from "../../store/slice/loginSlice";
import {
    BsFillArchiveFill,
    BsFillBrushFill,
    BsPlusSquareDotted,
} from "react-icons/bs";
import {
    deletePlaylist,
    getAllPlaylist,
    setPlaylistId,
    setPlaylistUpdateId,
} from "../../store/slice/playlistSlice";
import AddSong from "../AddSong";
import AddPlaylist from "../AddPlaylist";
import UpdatePlaylist from "../UpdatePlaylist";

const cx = classNames.bind(styles);
const navList = [
    {
        id: 1,
        title: "Trang chủ",
        desc: "Home",
        url: "/home",
        icon: <BiHomeAlt />,
        color: "#ee2b2b",
    },
    {
        id: 2,
        title: "Album",
        desc: "Album",
        url: "/album",
        icon: <BiGridAlt />,
        color: "#8f11d3",
    },
    {
        id: 3,
        title: "Bảng xếp hạng",
        desc: "BXH",
        url: "/bxh",
        icon: <BiBarChartSquare />,
        color: "#11d37b",
    },
    {
        id: 4,
        title: "Nghệ sỹ",
        desc: "Singer",
        url: "/singer",
        icon: <BiIdCard />,
        color: "#e0880a",
    },
];
function Navbar() {
    const { pathname, push } = useRouter();
    const { navActive, user } = useAppSelector((state) => state.login);
    const { allPlaylist, playlistUpdateId } = useAppSelector(
        (state) => state.playlist
    );
    const dispatch = useAppDispatch();
    console.log(allPlaylist);

    const [openModalAddPlaylist, setOpenModalAddPlaylist] =
        useState<boolean>(false);
    const [openUpdatePlaylist, setOpenUpdatePlaylist] =
        useState<boolean>(false);
    useEffect(() => {
        if (!user) return;
        dispatch(getAllPlaylist());
    }, [user]);

    const PopoverPlayer = ({ id }: { id: number }) => {
        return (
            <>
                <div className="w-[160px] laptop:w-[200px] py-[7px]">
                    <div
                        onClick={() => {
                            dispatch(deletePlaylist(id));
                        }}
                        className="w-full text-xs laptop:text-sm h-[40px] flex gap-[5px] items-center text-[#fff] px-[10px] cursor-pointer hover:bg-[#493961]"
                    >
                        <BsFillArchiveFill className="w-[20px] h-[20px] laptop:w-[20px] laptop:h-[20px] p-[3px]" />
                        <span className="flex items-center flex-1 justify-between">
                            Xóa playlist
                        </span>
                    </div>
                    <div
                        onClick={() => {
                            dispatch(setPlaylistUpdateId(id));
                            setOpenUpdatePlaylist(true);
                        }}
                        className="w-full text-xs laptop:text-sm h-[40px] flex gap-[5px] items-center text-[#fff] px-[10px] cursor-pointer hover:bg-[#493961]"
                    >
                        <BsFillBrushFill className="w-[20px] h-[20px] laptop:w-[20px] laptop:h-[20px] p-[3px]" />
                        <span className="flex items-center flex-1 justify-between">
                            Sửa playlist
                        </span>
                    </div>
                </div>
            </>
        );
    };
    return (
        <>
            <div
                className={`${
                    navActive ? "fixed" : "hidden"
                } laptop:hidden w-screen h-screen bg-[#00000075]  top-0 left-0 z-50 `}
                style={{ backdropFilter: "blur(5px)" }}
                onClick={() => dispatch(setNav(!navActive))}
            ></div>
            <div
                className={`${cx(
                    "nav",
                    `${navActive ? "nav--active" : ""}`
                )} fixed top-0 left-0 translate-x-[-100%] ${
                    navActive ? "translate-x-[0]" : ""
                } laptop:translate-x-[0] laptop:relative z-50`}
            >
                <div className={cx("nav-container")}>
                    <div
                        className={cx("nav-logo")}
                        onClick={() => dispatch(setNav(!navActive))}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            className={cx("nav-logo_small")}
                            src="/sgm-short.png"
                            alt="logo vfast"
                        />
                    </div>
                    <nav>
                        <ul>
                            {navList.map((item) => {
                                return (
                                    <Link key={item.id} href={item.url}>
                                        <Tooltip
                                            placement="right"
                                            color="volcano"
                                            title={item.desc}
                                            mouseLeaveDelay={0}
                                            overlayInnerStyle={{
                                                borderRadius: "5px",
                                            }}
                                        >
                                            <li
                                                className={cx(
                                                    `${
                                                        pathname == item.url
                                                            ? "active"
                                                            : ""
                                                    }`
                                                )}
                                            >
                                                <div className={cx("nav-icon")}>
                                                    {item.icon}
                                                </div>
                                                <span
                                                    className={cx("nav-title")}
                                                >
                                                    {item.title}
                                                </span>
                                            </li>
                                        </Tooltip>
                                    </Link>
                                );
                            })}
                        </ul>
                    </nav>
                    <div className={cx("vip")}>
                        <div className={cx("vip-main")}>
                            <p className="font-bold">
                                Nghe nhạc không giới hạn
                            </p>
                            <span className="font-semibold cursor-pointer ">
                                <span>NÂNG CẤP VIP</span>
                                <RiVipFill className="w-[20px] h-[20px]" />
                            </span>
                        </div>
                    </div>
                    {user && (
                        <div
                            className={`flex-1 flex justify-between flex-col ${cx(
                                "playlist"
                            )}`}
                        >
                            <div className="w-full">
                                <>
                                    <div className="w-full flex items-center">
                                        <div className="w-[60px] h-[60px] flex justify-center items-center">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                className="w-[30px] h-[30px]"
                                                src="/my-playlist.svg"
                                                alt="playlist"
                                            />
                                        </div>
                                        <span className={cx("nav-title")}>
                                            Playlist
                                        </span>
                                    </div>
                                    {allPlaylist.length > 0 &&
                                        allPlaylist.map((playlist) => (
                                            <div
                                                key={playlist.id}
                                                className={`w-full pl-[20px] flex justify-start items-center cursor-pointer h-[40px] ${cx(
                                                    "playlist__item"
                                                )}`}
                                            >
                                                <BiMusic
                                                    onClick={() => {
                                                        dispatch(
                                                            setPlaylistId(
                                                                playlist.id
                                                            )
                                                        );
                                                        push(
                                                            `/playlistdetail/${playlist.id}`
                                                        );
                                                    }}
                                                    className={`w-[20px] h-[20px] laptop:w-[28px] laptop:h-[28px] p-[3px] ${cx(
                                                        "icon-item"
                                                    )}`}
                                                />
                                                <div className={cx("title")}>
                                                    <span
                                                        onClick={() => {
                                                            dispatch(
                                                                setPlaylistId(
                                                                    playlist.id
                                                                )
                                                            );
                                                            push(
                                                                `/playlistdetail/${playlist.id}`
                                                            );
                                                        }}
                                                    >
                                                        {playlist.name}
                                                    </span>
                                                    <Popover
                                                        placement="right"
                                                        trigger="click"
                                                        _overlay={
                                                            <PopoverPlayer
                                                                id={playlist.id}
                                                            />
                                                        }
                                                    >
                                                        <BiDotsHorizontalRounded className="text-base bg-[#62616b] w-[28px] h-[28px] rounded-full p-[4px] cursor-pointer " />
                                                    </Popover>
                                                </div>
                                            </div>
                                        ))}
                                </>
                            </div>
                            <div
                                onClick={() => {
                                    setOpenModalAddPlaylist(true);
                                }}
                                className="w-full flex items-center cursor-pointer "
                            >
                                <div className="w-[60px] h-[60px] flex justify-center items-center">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <BsPlusSquareDotted className=" w-[30px] h-[30px]" />
                                </div>
                                <span className={cx("nav-title")}>
                                    Tạo Playlist
                                </span>
                            </div>
                            <Modal
                                title="Thêm Playlist"
                                centered
                                onCancel={() => setOpenModalAddPlaylist(false)}
                                visible={openModalAddPlaylist}
                            >
                                <AddPlaylist />
                            </Modal>
                        </div>
                    )}
                </div>
            </div>
            <Modal
                title="Sửa Playlist"
                centered
                onCancel={() => setOpenUpdatePlaylist(false)}
                visible={openUpdatePlaylist}
            >
                <UpdatePlaylist id={playlistUpdateId} />
            </Modal>
        </>
    );
}

export default Navbar;
