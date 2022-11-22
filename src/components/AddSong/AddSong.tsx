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
import { createSong, getAllSinger } from "../../store/slice/singerSlice";
import { useEffect } from "react";
import { getAllCategory } from "../../store/slice/categorySlice";

const { Option } = Select;

const AddSong = () => {
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

    const onFinish = async (values: any) => {
        const {
            title,
            description,
            time,
            free,
            Thumbnail,
            File,
            singers,
            categories,
        } = values;
        dispatch(
            createSong({
                id: user?.id,
                title,
                description,
                time,
                free,
                singers,
                categories,
                thumbnailFile: Thumbnail.fileList[0].originFileObj,
                mp3File: File.fileList[0].originFileObj,
            })
        );
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <div className=" p-[20px] w-full  tablet:max-w-[800px] rounded-xl">
            <Form
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
                            Tính phí bài hát
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
                <Form.Item
                    name="categories"
                    label={<label style={{ color: "#fff" }}>Thể loại</label>}
                >
                    <Select mode="multiple" placeholder="Please select">
                        {allCategory.length > 0 &&
                            allCategory.map((cate) => (
                                <Option key={cate.id} value={cate.id}>
                                    {cate.name}
                                </Option>
                            ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="Thumbnail"
                    label={<label style={{ color: "#fff" }}>Ảnh thumb</label>}
                    rules={[
                        {
                            required: true,
                            message: "Nhập vào hình ảnh",
                        },
                    ]}
                >
                    <Upload
                        maxCount={1}
                        listType="picture"
                        multiple={false}
                        beforeUpload={() => {
                            return false;
                        }}
                        withCredentials={false}
                        showUploadList={true}
                        accept="image/png, image/jpeg"
                        onChange={(e) => {}}
                    >
                        <Button icon={<UploadOutlined />}>Chọn hỉnh ảnh</Button>
                    </Upload>
                </Form.Item>
                <Form.Item
                    name="File"
                    label={
                        <label style={{ color: "#fff" }}>File âm thanh</label>
                    }
                    rules={[
                        {
                            required: true,
                            message: "Nhập vào file mp3",
                        },
                    ]}
                >
                    <Upload
                        maxCount={1}
                        listType="picture"
                        multiple={false}
                        beforeUpload={() => {
                            return false;
                        }}
                        withCredentials={false}
                        showUploadList={true}
                        accept="audio/mpeg"
                        onChange={(e) => {}}
                    >
                        <Button icon={<UploadOutlined />}>Chọn hỉnh ảnh</Button>
                    </Upload>
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
                            Thêm bài hát
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default AddSong;
