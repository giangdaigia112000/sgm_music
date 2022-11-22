import { Button, Form, Input, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { createAlbum } from "../../store/slice/singerSlice";
import { createPlaylist } from "../../store/slice/playlistSlice";
import { useEffect } from "react";

const { Option } = Select;

const AddPlaylist = () => {
    const { loadingApi, allPlaylist } = useAppSelector(
        (state) => state.playlist
    );
    const dispatch = useAppDispatch();

    const onFinish = async (values: any) => {
        const { name } = values;
        dispatch(createPlaylist({ name }));
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

                <div className="w-full flex justify-center">
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="middle"
                            danger
                            loading={loadingApi}
                        >
                            Thêm Playlist
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default AddPlaylist;
