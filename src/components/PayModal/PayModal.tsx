import { Button, Form, Input, InputNumber, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { createAlbum } from "../../store/slice/singerSlice";
import Cards from "react-credit-cards";
import { useState } from "react";
import { userPayVip } from "../../store/slice/loginSlice";
const { Option } = Select;

const PayModal = () => {
    const dispatch = useAppDispatch();
    const [cvc, setCvc] = useState<string>("");
    const [expiry, setExpiry] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [number, setNumber] = useState<string>("");
    const { loading } = useAppSelector((state) => state.login);
    const onFinish = async (values: any) => {
        dispatch(userPayVip(values));
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <div className=" p-[20px] w-full  tablet:max-w-[800px] rounded-xl">
            <div className="w-full">
                <h1>Âm nhạc không giới hạn chỉ với 5$/tháng </h1>
            </div>
            <Cards
                cvc={cvc}
                expiry={expiry}
                focused={"name"}
                name={name}
                number={number}
            />
            <Form
                name="basic"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    name="number"
                    label={<label style={{ color: "#fff" }}>Sổ thẻ</label>}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        onChange={(e) => {
                            setNumber(e.target.value);
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name="date"
                    label={
                        <label style={{ color: "#fff" }}>
                            Thời gian hết hạn
                        </label>
                    }
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        onChange={(e) => {
                            setExpiry(e.target.value);
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name="name"
                    label={<label style={{ color: "#fff" }}>Tên chủ thẻ</label>}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name="cvc"
                    label={<label style={{ color: "#fff" }}>Mã CvC</label>}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        onChange={(e) => {
                            setCvc(e.target.value);
                        }}
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
                            Thánh toán
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default PayModal;
