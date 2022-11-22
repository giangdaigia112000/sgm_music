import { useEffect, useState } from "react";
import { NextPage } from "next";
import classNames from "classnames/bind";
import { Button, DatePicker, Form, Input, Select, Tabs } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./Login.module.scss";
import { useAuth, UserLogin } from "../../contexts/auth";
import { useRouter } from "next/router";
import FormLogin from "../../components/FormLogin";
import FormRegister from "../../components/FormRegister";
const cx = classNames.bind(styles);
const { Option } = Select;
const Login: NextPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { Login, SetLoading, user } = useAuth();
    const { push } = useRouter();
    const onFinish = async (values: UserLogin) => {
        const userLogin = values;
        setLoading(true);
        await Login(userLogin);
        setLoading(false);
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    useEffect(() => {
        if (user) {
            push("/");
        }
    }, [user]);
    return (
        <main
            className={`${cx(
                "bg-image"
            )} w-full p-[5%] flex justify-center text-[#fff] rounded-xl overflow-hidden flex-col tablet:flex-row `}
            style={{
                boxShadow:
                    "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
            }}
        >
            <div className=" p-[20px]  tablet:max-w-[800px] rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="w-[50%]" src="/sgm.png" alt="sgm" />
                <Tabs
                    defaultActiveKey="1"
                    className="text-[#fff] font-semibold "
                >
                    <Tabs.TabPane tab="Đăng nhập" key="1">
                        <FormLogin />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Đăng ký" key="2">
                        <FormRegister />
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </main>
    );
};
export default Login;
