import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import classNames from "classnames/bind";
import { LogoutOutlined } from "@ant-design/icons";
import { useAuth } from "../../contexts/auth";
import styles from "./Header.module.scss";
import { Avatar, Button, Form, Input, Popover } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logOut, setNav } from "../../store/slice/loginSlice";
import { BiArrowBack } from "react-icons/bi";
const cx = classNames.bind(styles);
const { Search } = Input;
function Header(): JSX.Element {
    const { pathname } = useRouter();
    const search = useRef<any>();
    const { back } = useRouter();
    const [checkPageLogin, setCheckPageLogin] = useState(false);
    const [changePass, setChangePass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [popup, setPopup] = useState<boolean>(false);

    const { ChangePassword } = useAuth();
    const { user } = useAppSelector((state) => state.login);
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
    const onFinish = async (values: any) => {
        setLoading(true);
        const { currentpassword, newpassword } = values;
        await ChangePassword({
            id: user?.id || "",
            currentpassword,
            newpassword,
        });
        setLoading(false);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
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
        if (pathname != "/login") {
            setCheckPageLogin(true);
        } else {
            setCheckPageLogin(false);
        }
    }, [pathname]);

    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);
    return (
        <>
            {checkPageLogin && (
                <>
                    <header
                        className={`${cx(
                            "header"
                        )} px-[10px] laptop:px-[50px] `}
                    >
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
                                    className="w-[220px] tablet:w-[400px] laptop:w-[400px]"
                                    onFocus={() => setPopup(true)}
                                />
                                <div className={cx("search-result")}>
                                    <h1 className="font-semibold py-[5px]">
                                        Gợi ý kết quả
                                    </h1>
                                    <div className="w-full p-[5px] flex items-center hover:bg-[#493961] cursor-pointer">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            className="w-[30px] h-[30px] tablet:w-[50px] tablet:h-[50px] object-cover rounded-full"
                                            src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/4/1/2/0/412070e4279baaf3628e59ab319cad2a.jpg"
                                            alt="Nghệ sỹ"
                                        />
                                        <div className="h-full ml-[10px] text-xs tablet:text-sm">
                                            <h2 className="font-semibold">
                                                Thái Học
                                            </h2>
                                            <span className="text-[#50505073] opacity-[0.7]">
                                                Nghệ sĩ
                                            </span>
                                        </div>
                                    </div>
                                    {/* ------------------------------------------------- */}
                                    <div className="w-full p-[5px] flex items-center hover:bg-[#493961] cursor-pointer">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            className="w-[30px] h-[30px] tablet:w-[50px] tablet:h-[50px] object-cover rounded-sm"
                                            src="https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_webp/cover/b/5/c/f/b5cfe3d54669f19af4618cc5b9bc654e.jpg"
                                            alt="Nghệ sỹ"
                                        />
                                        <div className="h-full ml-[10px] text-xs tablet:text-sm">
                                            <h2 className="font-semibold">
                                                Em là con thuyền cô đơn
                                            </h2>
                                            <span className="text-[#50505073] opacity-[0.7]">
                                                Thái học
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx("header-profile")}>
                            <div className={cx("header-profile_show")}>
                                <Avatar
                                    size={40}
                                    icon={<UserOutlined />}
                                    src="https://joeschmoe.io/api/v1/random"
                                />
                            </div>
                            <div
                                className={cx(
                                    "header-profile_hover",
                                    `${changePass ? "is-change-pass" : ""}`
                                )}
                            >
                                <div className={cx("header-profile_control")}>
                                    <span
                                        className={cx(
                                            `${!changePass ? "active" : ""}`
                                        )}
                                        onClick={() =>
                                            handleCheckChangePass("logout")
                                        }
                                    >
                                        Đăng xuất
                                    </span>
                                    <span
                                        className={cx(
                                            `${changePass ? "active" : ""}`
                                        )}
                                        onClick={() =>
                                            handleCheckChangePass("changepass")
                                        }
                                    >
                                        Đổi mật khẩu
                                    </span>
                                </div>
                                <div className={cx("header-profile_main")}>
                                    {!changePass ? (
                                        <div
                                            className={cx(
                                                "header-profile_logout"
                                            )}
                                        >
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                danger
                                                onClick={() =>
                                                    dispatch(logOut())
                                                }
                                            >
                                                Đăng xuất
                                            </Button>
                                        </div>
                                    ) : (
                                        <div
                                            className={cx(
                                                "header-profile_changepass"
                                            )}
                                        >
                                            <Form
                                                name="basic"
                                                labelCol={{ span: 10 }}
                                                wrapperCol={{ span: 14 }}
                                                initialValues={{
                                                    remember: true,
                                                }}
                                                onFinish={onFinish}
                                                onFinishFailed={onFinishFailed}
                                                autoComplete="off"
                                            >
                                                <Form.Item
                                                    label="Mật khẩu hiện tại"
                                                    name="currentpassword"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                "Vui lòng không bỏ trống!",
                                                        },
                                                    ]}
                                                >
                                                    <Input.Password />
                                                </Form.Item>

                                                <Form.Item
                                                    label="Mật khẩu mới"
                                                    name="newpassword"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                "Vui lòng không bỏ trống!",
                                                        },
                                                    ]}
                                                >
                                                    <Input.Password />
                                                </Form.Item>

                                                <Form.Item
                                                    wrapperCol={{
                                                        offset: 8,
                                                        span: 16,
                                                    }}
                                                >
                                                    <Button
                                                        type="primary"
                                                        htmlType="submit"
                                                        danger
                                                        loading={loading}
                                                    >
                                                        Đổi mật khẩu
                                                    </Button>
                                                </Form.Item>
                                            </Form>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </header>
                </>
            )}
        </>
    );
}

export default Header;
