import { useEffect, useState } from "react";
import Link from "next/link";
import classNames from "classnames/bind";
import { useRouter } from "next/router";
import {
    HomeFilled,
    CustomerServiceFilled,
    GoldFilled,
    ContactsFilled,
    ReadFilled,
    AlertFilled,
    DoubleRightOutlined,
    DoubleLeftOutlined,
} from "@ant-design/icons";
import styles from "./Navbar.module.scss";
import { Tooltip } from "antd";
const cx = classNames.bind(styles);
function Navbar() {
    const navList = [
        {
            id: 1,
            title: "Home",
            desc: "Trang chủ",
            url: "/home",
            icon: <HomeFilled />,
            color: "#ee2b2b",
        },
        {
            id: 2,
            title: "Category 1",
            desc: "Trang chủ",
            url: "/home1",
            icon: <CustomerServiceFilled />,
            color: "#8f11d3",
        },
        {
            id: 3,
            title: "Category 2",
            desc: "Trang chủ",
            url: "/home2",
            icon: <GoldFilled />,
            color: "#11d37b",
        },
        {
            id: 4,
            title: "Category 3",
            desc: "Trang chủ",
            url: "/home3",
            icon: <AlertFilled />,
            color: "#e0880a",
        },
    ];
    const [checkPageLogin, setCheckPageLogin] = useState<boolean>(false);
    const [navActive, setNavActive] = useState<boolean>(false);

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
            <div className={cx("nav", `${navActive ? "nav--active" : ""}`)}>
                <div className={cx("nav-container")}>
                    <div
                        className={cx("nav-logo")}
                        onClick={() => setNavActive((state) => !state)}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            className={cx("nav-logo_small")}
                            src="/juwanfood-logo-short.png"
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
