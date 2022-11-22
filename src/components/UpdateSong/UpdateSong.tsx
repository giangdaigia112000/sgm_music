import { Button, Checkbox, Form, Input, Select, Upload } from "antd";
import {
    LockOutlined,
    UserOutlined,
    DownloadOutlined,
    MailOutlined,
    OneToOneOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
    createSong,
    getAllSinger,
    updateSong,
} from "../../store/slice/singerSlice";
import { useEffect } from "react";
import { getAllCategory } from "../../store/slice/categorySlice";
import { Song } from "../../interface";

const { Option } = Select;

const UpdateSong = ({ song }: { song: Song }) => {
    const [form] = Form.useForm();
    const { loadingCreate, allSinger } = useAppSelector(
        (state) => state.singer
    );
    const { allCategory } = useAppSelector((state) => state.category);
    const { user } = useAppSelector((state) => state.login);
    const dispatch = useAppDispatch();
    console.log(allSinger);

    useEffect(() => {
        dispatch(getAllSinger());
        dispatch(getAllCategory());
    }, []);

    useEffect(() => {
        const singerId = song.singer
            .filter((singer) => singer.id !== user?.id)
            .map((singer) => singer.id);

        form.setFieldsValue({
            title: song.title,
            description: song.description,
            time: song.time,
            free: song.free,
            singers: [...singerId],
        });
    }, [song]);

    const onFinish = async (values: any) => {
        const { title, description, time, free, singers } = values;
        dispatch(
            updateSong({
                id: user?.id,
                idSong: song.id,
                title,
                description,
                time,
                free,
                singers,
            })
        );
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <div className=" p-[20px] w-full  tablet:max-w-[800px] rounded-xl">
            <Form
                form={form}
                name="basic"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    name="title"
                    label={<label style={{ color: "#fff" }}>Tên bài hát</label>}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label={<label style={{ color: "#fff" }}>Mô tả</label>}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="time"
                    label={<label style={{ color: "#fff" }}>Thời lượng</label>}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={
                        <label style={{ color: "#fff" }}>
                            Bài hát này miễn phí
                        </label>
                    }
                    name="free"
                    valuePropName="checked"
                >
                    <Checkbox></Checkbox>
                </Form.Item>
                <Form.Item
                    name="singers"
                    label={
                        <label style={{ color: "#fff" }}>Ca sĩ đồng hành</label>
                    }
                >
                    <Select mode="multiple" placeholder="Please select">
                        {allSinger.length > 0 &&
                            allSinger
                                .filter((singer) => singer.id !== user?.id)
                                .map((singer) => (
                                    <Option key={singer.id} value={singer.id}>
                                        {singer.name}
                                    </Option>
                                ))}
                    </Select>
                </Form.Item>

                <div className="w-full flex justify-center">
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="middle"
                            danger
                            loading={loadingCreate}
                        >
                            Sửa bài hát
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default UpdateSong;
