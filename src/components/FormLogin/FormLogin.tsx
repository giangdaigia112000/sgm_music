import { Button, Form, Input, Upload } from "antd";
import {
    LockOutlined,
    UserOutlined,
    DownloadOutlined,
    MailOutlined,
    OneToOneOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import { useRef } from "react";
import { rejects } from "assert";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { userLogin } from "../../store/slice/loginSlice";
import { useRouter } from "next/router";

const FormLogin = () => {
    const { push } = useRouter();
    const { loading, isLogin } = useAppSelector((state) => state.login);
    const dispatch = useAppDispatch();

    const onFinish = async (values: any) => {
        const { email, password } = values;
        dispatch(
            userLogin({
                email,
                password,
            })
        ).then(() => {
            if (isLogin) push("/home");
        });
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <Form
            name="basic"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                name="email"
                label={<label style={{ color: "#fff" }}>Email</label>}
                rules={[
                    {
                        required: true,
                        message: "Nhập vào tài khoản!",
                    },
                ]}
            >
                <Input
                    size="middle"
                    placeholder="Tên đăng nhập"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                />
            </Form.Item>

            <Form.Item
                name="password"
                label={<label style={{ color: "#fff" }}>Mật khẩu</label>}
                rules={[
                    {
                        required: true,
                        message: "Nhập vào mật khẩu!",
                    },
                ]}
            >
                <Input.Password
                    placeholder="Mật khẩu"
                    size="middle"
                    prefix={<LockOutlined className="site-form-item-icon" />}
                />
            </Form.Item>

            <div className="w-full flex justify-center">
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        size="middle"
                        danger
                        loading={loading}
                    >
                        Đăng nhập
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
};

export default FormLogin;
