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
    console.log(user);

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
        console.log(singers);

        dispatch(
            createSong({
                id: user?.id,
                title,
                description,
                time,
                free,
                singers: singers ? singers : [],
                categories: categories ? categories : [],
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
                    label={<label style={{ color: "#fff" }}>T??n b??i h??t</label>}
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
                    label={<label style={{ color: "#fff" }}>M?? t???</label>}
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
                    label={<label style={{ color: "#fff" }}>Th???i l?????ng</label>}
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
                            B??i h??t n??y mi???n ph??
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
                        <label style={{ color: "#fff" }}>Ca s?? ?????ng h??nh</label>
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
                    label={<label style={{ color: "#fff" }}>Th??? lo???i</label>}
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
                    label={<label style={{ color: "#fff" }}>???nh thumb</label>}
                    rules={[
                        {
                            required: true,
                            message: "Nh???p v??o h??nh ???nh",
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
                        <Button icon={<UploadOutlined />}>Ch???n h???nh ???nh</Button>
                    </Upload>
                </Form.Item>
                <Form.Item
                    name="File"
                    label={
                        <label style={{ color: "#fff" }}>File ??m thanh</label>
                    }
                    rules={[
                        {
                            required: true,
                            message: "Nh???p v??o file mp3",
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
                        <Button icon={<UploadOutlined />}>Ch???n file Mp3</Button>
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
                            Th??m b??i h??t
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default AddSong;
