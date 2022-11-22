import { Button, DatePicker, Form, Input } from "antd";
import {
    LockOutlined,
    UserOutlined,
    DownloadOutlined,
    MailOutlined,
    OneToOneOutlined,
} from "@ant-design/icons";
import { useRef, useState, useEffect } from "react";
import moment from "moment";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
    setSingerId,
    updateUserPass,
    updateUserProfile,
} from "../store/slice/singerSlice";

const Profile = () => {
    const { user } = useAppSelector((state) => state.login);
    const { loadingProfile } = useAppSelector((state) => state.singer);
    const dispatch = useAppDispatch();

    const [form] = Form.useForm();
    const { push } = useRouter();

    const [active, setActive] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [updateProfile, setUpdateProfile] = useState<boolean>(false);

    const imgInp = useRef<any>();
    const imgpre = useRef<any>();

    const onFinishProfile = async (values: any) => {
        const { name, email, address, date } = values;
        dispatch(
            updateUserProfile({
                id: user?.id,
                name,
                email,
                address,
                date: date._d.toString(),
                avataFile:
                    imgInp.current.files.length > 0
                        ? imgInp.current.files[0]
                        : null,
            })
        );
    };
    const onFinishFailedProfile = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    const onFinish = async (values: any) => {
        const { newPass } = values;
        dispatch(
            updateUserPass({
                id: user?.id,
                pass: newPass,
            })
        );
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    const handleSetActive = (id: number) => {
        if (id === active) return;
        setActive(id);
    };

    useEffect(() => {
        if (!user) return;
        form.setFieldsValue({
            name: user.name as string,
            email: user.email as string,
            address: user.address as string,
            date: moment(user.date_of_birth),
        });
    }, [user, updateProfile]);
    return (
        <div className="w-full pb-[200px]">
            {user && (
                <>
                    <div className="w-full flex gap-[10px] tablet:gap-[20px] items-start">
                        <span
                            onClick={() => handleSetActive(0)}
                            className={`${
                                active === 0
                                    ? "font-bold border-b-[5px] border-[#9b4de0] pb-[5px]"
                                    : ""
                            }  tablet:text-lg cursor-pointer`}
                        >
                            CÁ NHÂN
                        </span>
                        <span
                            onClick={() => handleSetActive(1)}
                            className={`${
                                active === 1
                                    ? "font-bold border-b-[5px] border-[#9b4de0] pb-[5px]"
                                    : ""
                            }  tablet:text-lg cursor-pointer`}
                        >
                            ĐỔI MẬT KHẨU
                        </span>
                        {user.permissions[0] == "singer" && (
                            <span
                                onClick={() => {
                                    dispatch(setSingerId(user.id));
                                    push(`/singerdetail/${user.id}`);
                                }}
                                className={`${
                                    active === 3
                                        ? "font-bold border-b-[5px] border-[#9b4de0] pb-[5px]"
                                        : " text-[#9b4de0]"
                                }  tablet:text-lg cursor-pointer`}
                            >
                                CA SỸ
                            </span>
                        )}
                    </div>
                    <hr className="bg-[#b4b4b4] mt-[1px]" />
                    <div className="w-full flex justify-center pt-[20px]">
                        {active === 0 ? (
                            <>
                                <div
                                    className=" p-[20px] w-full  tablet:max-w-[800px] rounded-xl"
                                    style={{
                                        backgroundColor: "#46345f79",
                                        backdropFilter: "blur(19px)",
                                        height: "fit-content",
                                    }}
                                >
                                    <div className="w-full flex flex-col justify-center items-center ">
                                        <Button
                                            onClick={() => {
                                                setUpdateProfile(
                                                    (state) => !state
                                                );
                                            }}
                                            type="ghost"
                                            size={"middle"}
                                            className="text-[#fff] mb-[10px]"
                                        >
                                            {updateProfile
                                                ? "Hủy sửa thông tin"
                                                : "Sửa thông tin"}
                                        </Button>
                                        <div className="w-[150px] tablet:w-[300px] pb-[10px] ">
                                            <div className="w-full pt-[100%] relative">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    ref={imgpre}
                                                    className="w-full h-full absolute top-0 left-0 rounded-full object-cover"
                                                    src={`${process.env.HOST_NAME_STREAM}/image/${user.avatar}`}
                                                    alt="avata"
                                                />
                                            </div>
                                        </div>
                                        {updateProfile && (
                                            <Button
                                                onClick={() => {
                                                    imgInp.current.click();
                                                }}
                                                type="primary"
                                                shape="circle"
                                                icon={<DownloadOutlined />}
                                                size={"middle"}
                                            />
                                        )}

                                        <input
                                            onChange={(e) => {
                                                const file = e.target.files;
                                                console.log(file);

                                                if (!file) return;
                                                console.log(file[0]);

                                                imgpre.current.src =
                                                    URL.createObjectURL(
                                                        file[0]
                                                    );
                                            }}
                                            className="h-full invisible"
                                            accept="image/*"
                                            type="file"
                                            ref={imgInp}
                                        />
                                    </div>
                                    <Form
                                        name="basic"
                                        initialValues={{ remember: true }}
                                        labelCol={{ span: 4 }}
                                        onFinish={onFinishProfile}
                                        onFinishFailed={onFinishFailedProfile}
                                        autoComplete="off"
                                        form={form}
                                    >
                                        <Form.Item
                                            name="email"
                                            label={
                                                <label
                                                    style={{ color: "#fff" }}
                                                >
                                                    Email
                                                </label>
                                            }
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Nhập vào email",
                                                },
                                            ]}
                                        >
                                            <Input
                                                disabled={!updateProfile}
                                                placeholder="Email của bạn"
                                                size="middle"
                                                prefix={
                                                    <MailOutlined className="site-form-item-icon" />
                                                }
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="name"
                                            label={
                                                <label
                                                    style={{ color: "#fff" }}
                                                >
                                                    Tên đầy đủ
                                                </label>
                                            }
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Nhập vào tên",
                                                },
                                            ]}
                                        >
                                            <Input
                                                disabled={!updateProfile}
                                                placeholder="Tên của bạn"
                                                size="middle"
                                                prefix={
                                                    <UserOutlined className="site-form-item-icon" />
                                                }
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="date"
                                            label={
                                                <label
                                                    style={{ color: "#fff" }}
                                                >
                                                    Ngày sinh
                                                </label>
                                            }
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Nhập vào ngày sinh",
                                                },
                                            ]}
                                        >
                                            <DatePicker
                                                format={"DD/MM/YYYY"}
                                                placeholder="Ngày sinh của bạn"
                                                disabled={!updateProfile}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="address"
                                            label={
                                                <label
                                                    style={{ color: "#fff" }}
                                                >
                                                    Địa chỉ
                                                </label>
                                            }
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Nhập vào địa chỉ",
                                                },
                                            ]}
                                        >
                                            <Input
                                                disabled={!updateProfile}
                                                placeholder="Địa chỉ của bạn"
                                                size="middle"
                                                prefix={
                                                    <OneToOneOutlined className="site-form-item-icon" />
                                                }
                                            />
                                        </Form.Item>
                                        {updateProfile && (
                                            <div className="w-full flex justify-center">
                                                <Form.Item>
                                                    <Button
                                                        type="primary"
                                                        htmlType="submit"
                                                        size="middle"
                                                        loading={loadingProfile}
                                                        danger
                                                    >
                                                        Sửa thông tin
                                                    </Button>
                                                </Form.Item>
                                            </div>
                                        )}
                                    </Form>
                                </div>
                            </>
                        ) : (
                            <>
                                <div
                                    className=" p-[20px] w-full  tablet:max-w-[800px] rounded-xl"
                                    style={{
                                        backgroundColor: "#46345f79",
                                        backdropFilter: "blur(19px)",
                                        height: "fit-content",
                                    }}
                                >
                                    <Form
                                        name="basic"
                                        layout="vertical"
                                        initialValues={{ remember: true }}
                                        onFinish={onFinish}
                                        onFinishFailed={onFinishFailed}
                                        autoComplete="off"
                                    >
                                        <Form.Item
                                            name="currentPass"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Nhập vào mật khẩu!",
                                                },
                                            ]}
                                        >
                                            <Input.Password
                                                placeholder="Mật khẩu hiện tại"
                                                size="middle"
                                                prefix={
                                                    <LockOutlined className="site-form-item-icon" />
                                                }
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="newPass"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Nhập vào mật khẩu!",
                                                },
                                            ]}
                                        >
                                            <Input.Password
                                                placeholder="Mật khẩu mới"
                                                size="middle"
                                                prefix={
                                                    <LockOutlined className="site-form-item-icon" />
                                                }
                                            />
                                        </Form.Item>

                                        <div className="w-full flex justify-center">
                                            <Form.Item>
                                                <Button
                                                    type="primary"
                                                    htmlType="submit"
                                                    size="middle"
                                                    loading={loadingProfile}
                                                    danger
                                                >
                                                    Đổi mật khẩu
                                                </Button>
                                            </Form.Item>
                                        </div>
                                    </Form>
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Profile;
