import { useEffect, useState } from "react";
import Link from "next/link";
import classNames from "classnames/bind";
import { useRouter } from "next/router";
import {
    BiBarChartSquare,
    BiGridAlt,
    BiHomeAlt,
    BiIdCard,
} from "react-icons/bi";
import styles from "./Navbar.module.scss";
import { Tooltip } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setNav } from "../../store/slice/loginSlice";
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
        url: "/home1",
        icon: <BiGridAlt />,
        color: "#8f11d3",
    },
    {
        id: 3,
        title: "Bảng xếp hạng",
        desc: "BXH",
        url: "/home2",
        icon: <BiBarChartSquare />,
        color: "#11d37b",
    },
    {
        id: 4,
        title: "Nghệ sỹ",
        desc: "Singer",
        url: "/home3",
        icon: <BiIdCard />,
        color: "#e0880a",
    },
];
function Navbar() {
    const [checkPageLogin, setCheckPageLogin] = useState<boolean>(false);
    const { navActive } = useAppSelector((state) => state.login);
    const dispatch = useAppDispatch();
    const { pathname } = useRouter();

    useEffect(() => {
        if (pathname != "/login") {
            setCheckPageLogin(true);
        } else {
            setCheckPageLogin(false);
        }
    }, [pathname]);

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
                </div>
            </div>
        </>
    );
}

export default Navbar;
