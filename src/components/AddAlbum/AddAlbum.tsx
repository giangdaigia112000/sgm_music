import { Button, Form, Input, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { createAlbum } from "../../store/slice/singerSlice";

const { Option } = Select;

const AddAlbum = () => {
    const { detailSinger, loadingCreate } = useAppSelector(
        (state) => state.singer
    );
    const dispatch = useAppDispatch();
    console.log(detailSinger.detail.music);

    const onFinish = async (values: any) => {
        const { name, Thumbnail, musics } = values;
        dispatch(
            createAlbum({
                name,
                musics,
                thumbnailFile: Thumbnail.fileList[0].originFileObj,
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
                    name="name"
                    label={<label style={{ color: "#fff" }}>Tên album</label>}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="musics"
                    label={<label style={{ color: "#fff" }}>Bài hát</label>}
                >
                    <Select mode="multiple" placeholder="Please select">
                        {detailSinger &&
                            detailSinger.detail.music.length > 0 &&
                            detailSinger.detail.music.map((music: any) => (
                                <Option key={music.id} value={music.id}>
                                    {music.title}
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

                <div className="w-full flex justify-center">
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="middle"
                            danger
                            loading={loadingCreate}
                        >
                            Thêm album
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default AddAlbum;
