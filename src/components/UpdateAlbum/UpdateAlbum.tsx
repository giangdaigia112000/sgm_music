import { Button, Form, Input, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { createAlbum, updateAlbum } from "../../store/slice/singerSlice";
import { Album } from "../../interface";
import { useEffect } from "react";

const { Option } = Select;

const UpdateAlbum = ({ album }: { album: Album }) => {
    const { detailSinger, loadingCreate } = useAppSelector(
        (state) => state.singer
    );
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();

    const onFinish = async (values: any) => {
        const { name, Thumbnail, musics } = values;
        dispatch(
            updateAlbum({
                id: album.id,
                name,
                musics,
                thumbnailFile: Thumbnail
                    ? Thumbnail.fileList[0].originFileObj
                    : null,
            })
        );
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    useEffect(() => {
        const songId = album.music.map((song) => song.id);
        form.setFieldsValue({
            name: album.name,
            musics: songId,
        });
    }, [album]);
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
                            Sửa album
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default UpdateAlbum;
