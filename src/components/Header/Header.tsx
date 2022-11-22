import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import classNames from "classnames/bind";
import { LogoutOutlined } from "@ant-design/icons";
import { useAuth } from "../../contexts/auth";
import styles from "./Header.module.scss";
import { Avatar, Button, Form, Input, Popover, Tooltip } from "antd";
import { UserOutlined, LoadingOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector, useDebounce } from "../../store/hooks";
import { logOut, setNav, userCheckMe } from "../../store/slice/loginSlice";
import {
    BiArrowBack,
    BiDownload,
    BiFlag,
    BiListPlus,
    BiLogInCircle,
    BiPlay,
    BiUpload,
    BiUserPin,
} from "react-icons/bi";
import { userSearch } from "../../store/slice/homeSlice";
import { setSongList } from "../../store/slice/playSlice";
import { setSingerId } from "../../store/slice/singerSlice";
import { RiVipCrown2Fill } from "react-icons/ri";
const cx = classNames.bind(styles);
const { Search } = Input;
function Header(): JSX.Element {
    const { pathname, push } = useRouter();
    const search = useRef<any>();
    const { back } = useRouter();
    const [checkPageLogin, setCheckPageLogin] = useState<boolean>(false);
    const [changePass, setChangePass] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [popup, setPopup] = useState<boolean>(false);
    const [searchString, setSearchString] = useState<string>("");

    const { ChangePassword } = useAuth();
    const { user, isLogin } = useAppSelector((state) => state.login);
    const { loadingSearch, listSingerSearch, listSongSearch } = useAppSelector(
        (state) => state.home
    );

    const searchInput = useDebounce(searchString, 300);
    const dispatch = useAppDispatch();

    const handleCheckChangePass = (option: string) => {
        if (option == "logout") {
            if (!changePass) return;
            setChangePass(false);
        }
        if (option == "changepass") {
            if (changePass) return;
            setChangePass(true);
        }
    };

    const onSearch = (value: string) => console.log(value);
    const handleClick = useCallback(
        (e: any) => {
            if (!search.current.contains(e.target)) {
                setPopup(false);
            }
        },
        [popup]
    );

    useEffect(() => {
        dispatch(userCheckMe());
    }, []);

    useEffect(() => {
        if (isLogin && pathname === "/login") {
            push("/home");
        }
    }, [pathname, isLogin]);

    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    useEffect(() => {
        if (loadingSearch) return;
        if (searchInput === "") return;
        console.log("search start");
        dispatch(userSearch(searchInput));
    }, [searchInput]);
    const PopoverPlayer = () => {
        return (
            <div className="w-[160px] laptop:w-[200px] py-[7px]">
                <div
                    onClick={() => push("/profile")}
                    className="w-full text-xs laptop:text-sm h-[40px] flex gap-[5px] items-center text-[#fff] px-[10px] cursor-pointer hover:bg-[#493961]"
                >
                    <BiUserPin className="w-[20px] h-[20px] laptop:w-[28px] laptop:h-[28px] p-[3px]" />
                    <span className="flex items-center flex-1 justify-between">
                        Trang cá nhân
                    </span>
                </div>
                <div
                    onClick={() => dispatch(logOut())}
                    className="w-full text-xs laptop:text-sm h-[40px] flex gap-[5px] items-center text-[#fff] px-[10px] cursor-pointer hover:bg-[#493961]"
                >
                    <BiLogInCircle className="w-[20px] h-[20px] laptop:w-[28px] laptop:h-[28px] p-[3px]" />
                    <span className="flex items-center flex-1 justify-between">
                        Đăng xuất
                    </span>
                </div>
            </div>
        );
    };
    return (
        <>
            <header className={`${cx("header")} px-[10px] laptop:px-[50px] `}>
                <div className={cx("header-search")}>
                    {/*  eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        className="h-full p-[5px] laptop:hidden cursor-pointer"
                        src="/sgm-short.png"
                        alt="logo vfast"
                        onClick={() => dispatch(setNav(true))}
                    />
                    <span
                        className="hidden laptop:block text-xl cursor-pointer mr-[50px]"
                        onClick={() => back()}
                    >
                        <BiArrowBack />
                    </span>
                    <div
                        className={cx(
                            "search",
                            `${popup ? "search--active" : ""}`
                        )}
                        ref={search}
                    >
                        <Search
                            placeholder="Tìm kiếm "
                            size="large"
                            onSearch={onSearch}
                            value={searchString}
                            onChange={(e) => {
                                setSearchString(e.target.value);
                            }}
                            className="w-[220px] tablet:w-[400px] laptop:w-[400px]"
                            onFocus={() => setPopup(true)}
                        />
                        <div className={cx("search-result")}>
                            <h1 className="font-semibold py-[5px] text-sm tablet:text-base">
                                Gợi ý kết quả
                                {loadingSearch && <LoadingOutlined />}
                            </h1>
                            {listSingerSearch.length === 0 &&
                                listSongSearch.length === 0 && (
                                    <div className="w-full text-center p-[10px]">
                                        Không tìm thấy kết quả nào.
                                    </div>
                                )}

                            {listSingerSearch.length !== 0 && (
                                <>
                                    {listSingerSearch.map((singer) => (
                                        <div
                                            key={singer.id}
                                            onClick={() => {
                                                dispatch(
                                                    setSingerId(singer.id)
                                                );
                                                push(
                                                    `/singerdetail/${singer.id}`
                                                );
                                            }}
                                            className="w-full p-[5px] flex items-center hover:bg-[#493961] cursor-pointer"
                                        >
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                className="w-[30px] h-[30px] tablet:w-[50px] tablet:h-[50px] object-cover rounded-full"
                                                src={`${process.env.HOST_NAME_STREAM}/image/${singer.avatar}`}
                                                alt="Nghệ sỹ"
                                            />
                                            <div className="h-full ml-[10px] text-xs tablet:text-sm">
                                                <h2 className="font-semibold text-xs tablet:text-sm m-0">
                                                    {singer.name}
                                                </h2>
                                                <span className="text-[#50505073] opacity-[0.7] ">
                                                    Nghệ sĩ
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                            {/* ------------------------------------------------- */}

                            {listSongSearch.length !== 0 && (
                                <>
                                    {listSongSearch.map((song) => (
                                        <div
                                            key={song.id}
                                            onClick={() => {
                                                push("/play");
                                                dispatch(setSongList([song]));
                                            }}
                                            className="w-full p-[5px] flex items-center hover:bg-[#493961] cursor-pointer"
                                        >
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                className="w-[30px] h-[30px] tablet:w-[50px] tablet:h-[50px] object-cover rounded-sm"
                                                src={`${process.env.HOST_NAME_STREAM}/image/${song.thumbnail}`}
                                                alt="Nghệ sỹ"
                                            />
                                            <div className="h-full ml-[10px] text-xs tablet:text-sm">
                                                <h2 className="font-semibold text-xs tablet:text-sm m-0">
                                                    {song.title}
                                                </h2>
                                                <span className="text-[#47257473] opacity-[0.7]">
                                                    {song.singer.length !== 0 &&
                                                        song.singer.map(
                                                            (singer) => (
                                                                <span
                                                                    key={
                                                                        singer.id
                                                                    }
                                                                    className="text-[#492788]"
                                                                >
                                                                    {
                                                                        singer.name
                                                                    }
                                                                    ,
                                                                </span>
                                                            )
                                                        )}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className={cx("header-profile")}>
                    {!isLogin ? (
                        <>
                            <div
                                onClick={() => push("/login")}
                                className="hidden tablet:flex h-[30px] ml-[10px] cursor-pointer   items-center text-sm tablet:text-base bg-[#9b4de0] p-[5px] w-[100px] tablet:w-[120px] justify-center rounded-3xl "
                            >
                                Đăng nhập
                            </div>
                            <div
                                onClick={() => push("/login")}
                                className="flex tablet:hidden h-[40px] ml-[10px] cursor-pointer   items-center text-sm tablet:text-base bg-[#9b4de0] p-[5px] w-[40px]  justify-center rounded-3xl "
                            >
                                <BiLogInCircle className="w-[22px] h-[22px]" />
                            </div>
                        </>
                    ) : (
                        <>
                            {user && (
                                <Popover
                                    placement="topRight"
                                    trigger="click"
                                    _overlay={<PopoverPlayer />}
                                >
                                    <div className={cx("header-profile_show")}>
                                        <Avatar
                                            size={40}
                                            icon={<UserOutlined />}
                                            src={`${process.env.HOST_NAME_STREAM}/image/${user.avatar}`}
                                        />
                                        <span className="font-bold pl-[10px] hidden tablet:block">
                                            {user.name}
                                        </span>
                                        {user.vip === 1 && (
                                            <RiVipCrown2Fill className="w-[22px] h-[22px] text-[#e1fa00]" />
                                        )}
                                    </div>
                                </Popover>
                            )}
                        </>
                    )}
                </div>
            </header>
        </>
    );
}

export default Header;
