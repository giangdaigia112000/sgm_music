import { Button, DatePicker, Form, Input, Select, Upload } from "antd";
import {
    LockOutlined,
    UserOutlined,
    DownloadOutlined,
    MailOutlined,
    OneToOneOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import moment from "moment";
import { userRegister } from "../../store/slice/loginSlice";

const FormRegister = () => {
    const Option = Select.Option;
    const { loading } = useAppSelector((state) => state.login);
    const dispatch = useAppDispatch();

    const onFinish = async (values: any) => {
        const { name, email, address, date, role, password } = values;
        dispatch(
            userRegister({
                name,
                email,
                address,
                password,
                role,
                date_of_birth: date._d,
            })
        );
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
                name="name"
                label={<label style={{ color: "#fff" }}>Họ và tên</label>}
                rules={[
                    {
                        required: true,
                        message: "Nhập vào tài khoản!",
                    },
                ]}
            >
                <Input
                    size="middle"
                    placeholder="Tên của bạn"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                />
            </Form.Item>
            <Form.Item
                name="address"
                label={<label style={{ color: "#fff" }}>Địa chỉ</label>}
                rules={[
                    {
                        required: true,
                        message: "Nhập vào địa chỉ",
                    },
                ]}
            >
                <Input
                    size="middle"
                    placeholder="Địa chỉ của bạn của bạn"
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
            <Form.Item
                name="date"
                label={<label style={{ color: "#fff" }}>Ngày sinh</label>}
                rules={[
                    {
                        required: true,
                        message: "Nhập vào ngày sinh",
                    },
                ]}
            >
                <DatePicker
                    format={"DD/MM/YYYY"}
                    placeholder="Ngày sinh của bạn"
                />
            </Form.Item>
            <Form.Item
                name="role"
                label={<label style={{ color: "#fff" }}>Loại tài khoản</label>}
                rules={[{ required: true }]}
            >
                <Select placeholder="Chọn loại tài khoản" allowClear>
                    <Option value={4}>Người nghe nhạc</Option>
                    <Option value={3}>Nghệ sĩ</Option>
                </Select>
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
                        Tạo tài khoản
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
};

export default FormRegister;
