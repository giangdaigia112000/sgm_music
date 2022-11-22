import { Button, Form, Input, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { createAlbum } from "../../store/slice/singerSlice";
import {
    createPlaylist,
    updatePlaylistNav,
} from "../../store/slice/playlistSlice";
import { useEffect } from "react";

const { Option } = Select;

const UpdatePlaylist = ({ id }: { id: number }) => {
    const { loadingApi, allPlaylist } = useAppSelector(
        (state) => state.playlist
    );
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const playlistUpdate = allPlaylist.filter((pl) => pl.id === id)[0];
    const onFinish = async (values: any) => {
        const { name, music } = values;
        dispatch(updatePlaylistNav({ name, music, id: id }));
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    useEffect(() => {
        form.setFieldsValue({
            name: playlistUpdate.name,
            music: playlistUpdate.music.map((music) => music.id),
        });
    }, [id]);
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
                    label={
                        <label style={{ color: "#fff" }}>Tên playlist</label>
                    }
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="music"
                    label={<label style={{ color: "#fff" }}>Bài hát</label>}
                >
                    <Select mode="multiple" placeholder="Please select">
                        {playlistUpdate &&
                            playlistUpdate.music.length > 0 &&
                            playlistUpdate.music.map((music: any) => (
                                <Option key={music.id} value={music.id}>
                                    {music.title}
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
                            loading={loadingApi}
                        >
                            Sửa Playlist
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default UpdatePlaylist;
