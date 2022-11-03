import {
    Button,
    Form,
    Input,
    Modal,
    Popconfirm,
    Select,
    Table,
    Upload,
} from "antd";
import { useEffect, useState } from "react";
import {
    EditFilled,
    DeleteFilled,
    PlusCircleFilled,
    UploadOutlined,
} from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import axiosClient from "../../utils/axiosClient";
import { notiError, notiSuccess } from "../../utils/notification";
import { Blog, Category, Slider } from "../../interface";
import TextArea from "antd/lib/input/TextArea";
import ReactQuill from "react-quill";

const { Option } = Select;

interface DataType {
    id: number;
    name: string;
    image: string;
}

const Home = () => {
    const [listData, setListData] = useState<Slider[]>([] as Slider[]);
    const [loadingInit, setLoadingInit] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [isAddOrFix, setIsAddOrFix] = useState<boolean>(true);
    const [imgFix, setImgFix] = useState<string>("");
    const [form] = Form.useForm();

    useEffect(() => {
        (async () => {
            setLoadingInit(true);
            try {
                const resData = await axiosClient.post("/api/admin/blog", {
                    _method: "get",
                });
                setListData(resData.data as Slider[]);
            } catch (error) {
                notiError("Lỗi!!!");
            } finally {
                setLoadingInit(false);
            }
        })();
    }, []);
    const handleCancelModal = () => {
        setIsOpenModal(false);
    };
    const handleRepair = (id: number) => {
        form.resetFields();
        setIsAddOrFix(false);
        setIsOpenModal(true);
        const slide = listData.filter((category) => category.id === id)[0];
        setImgFix(slide.image);
        form.setFieldsValue({
            name: slide.name,
            id: id,
        });
    };
    const handleDelete = async (id: number) => {
        try {
            const resData = await axiosClient.post(`/api/admin/slide/${id}`, {
                _method: "delete",
            });
            setListData((state) =>
                state.filter((slide) => {
                    return slide.id !== id;
                })
            );

            notiSuccess("Xóa thành công.");
        } catch (error) {
            notiError("Xóa thất bại.");
        }
    };

    const onSubmitForm = async (values: any) => {
        console.log(values);

        if (isAddOrFix === true) {
            //  -----------------------Đây là thêm mới --------------------------------
            const { name, imageFile } = values;
            const thumb = imageFile[0];
            try {
                setLoading(true);
                let bodyFormData = new FormData();
                bodyFormData.append("thumb", thumb.originFileObj);
                bodyFormData.append("name", name);
                const resData = await axiosClient.post(
                    "/api/admin/blog",
                    bodyFormData,
                    {
                        headers: {
                            accept: "multipart/form-data",
                        },
                    }
                );
                notiSuccess("Thêm thành công!!!");
            } catch (error) {
                notiError("lỗi!!!");
            } finally {
                setLoading(false);
            }
        } else {
            //  -----------------------Đây là sửa --------------------------------
            const { name, imageFile, id } = values;
            try {
                setLoading(true);
                let bodyFormData = new FormData();
                if (imageFile) {
                    const thumb = imageFile[0];
                    bodyFormData.append("thumb", thumb.originFileObj);
                }
                bodyFormData.append("name", name);
                bodyFormData.append("_method", "put");
                const resData = await axiosClient.post(
                    `/api/admin/blog/${id}`,
                    bodyFormData,
                    {
                        headers: {
                            accept: "multipart/form-data",
                        },
                    }
                );
                setListData((state) =>
                    state.map((cate) => {
                        if (cate.id === id) {
                            cate = resData.data;
                        }
                        return cate;
                    })
                );
                notiSuccess("Sửa thành công!!!");
            } catch (error) {
                notiError("lỗi!!!");
            } finally {
                setLoading(false);
            }
        }
    };
    const onSubmitFormFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    const normUpdateFile = (e: any) => {
        console.log(e);
        if (Array.isArray(e)) {
            console.log(e);
            return e;
        }
        return e?.fileList;
    };
    const columns: ColumnsType<DataType> = [
        {
            title: "Hành động",
            dataIndex: "id",
            width: 100,
            render: (id: number) => (
                <div key={id} className="flex gap-2">
                    <Button
                        type="primary"
                        icon={<EditFilled />}
                        onClick={() => handleRepair(id)}
                    />

                    <Popconfirm
                        placement="top"
                        title="Bạn muốn xóa bản ghi này?"
                        onConfirm={() => handleDelete(id)}
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{ loading: false }}
                    >
                        <Button type="primary" icon={<DeleteFilled />} danger />
                    </Popconfirm>
                </div>
            ),
        },
        {
            title: "Tiêu đề",
            dataIndex: "name",
            key: "name",
            width: 500,
        },
        {
            title: "Hình biểu diễn",
            dataIndex: "thumb",
            width: 200,
            render: (thumb: string) => (
                <div className="">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={`${process.env.HOST_NAME_API}/${thumb}`}
                        alt="icon"
                    />
                </div>
            ),
        },
    ];
    return (
        <div className="w-full">
            <div className="py-[10px]">
                <h1>Quản lý danh sách Slide</h1>
                <Button
                    type="primary"
                    size="large"
                    onClick={() => {
                        setIsOpenModal(true);
                        setIsAddOrFix(true);
                        form.resetFields();
                    }}
                >
                    <div className="flex justify-center items-center gap-2">
                        <PlusCircleFilled />
                        Thêm bản ghi
                    </div>
                </Button>
            </div>

            {/* --------------------------------------------Modal--------------------------------------------------- */}

            <Modal
                title={`${isAddOrFix ? "Thêm mới Slide" : "Sửa Slide"}`}
                visible={isOpenModal}
                onCancel={handleCancelModal}
                footer={[
                    <Button key="back" onClick={handleCancelModal}>
                        Cancel
                    </Button>,
                ]}
                width={1000}
            >
                <Form
                    name="basic"
                    form={form}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onSubmitForm}
                    onFinishFailed={onSubmitFormFailed}
                    autoComplete="off"
                >
                    {!isAddOrFix && (
                        <Form.Item
                            label="Id"
                            name="id"
                            rules={[
                                {
                                    required: true,
                                    message: "Không bỏ trống!!!",
                                },
                            ]}
                        >
                            <Input disabled />
                        </Form.Item>
                    )}
                    <Form.Item
                        label="Tiêu đề"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Không bỏ trống!!!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="imageFile"
                        label="Thumb"
                        valuePropName="image"
                        rules={[
                            {
                                required: isAddOrFix,
                                message: "Không bỏ trống!!!",
                            },
                        ]}
                        getValueFromEvent={normUpdateFile}
                    >
                        <Upload
                            listType={"picture-card"}
                            maxCount={1}
                            multiple={false}
                            showUploadList={{
                                showPreviewIcon: false,
                                showDownloadIcon: false,
                            }}
                            beforeUpload={() => {
                                return false;
                            }}
                            withCredentials={false}
                            accept="image/png, image/jpeg"
                        >
                            <Button icon={<UploadOutlined />}></Button>
                        </Upload>
                    </Form.Item>
                    {!isAddOrFix && (
                        <div className="w-full flex justify-center">
                            {/*  eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                className="max-w-[200px] p-[10px]"
                                src={`${process.env.HOST_NAME_API}/${imgFix}`}
                                alt="img"
                            />
                        </div>
                    )}

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                        >
                            {`${isAddOrFix ? "Thêm mới" : "Sửa"}`}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            {/* --------------------------------------------Modal--------------------------------------------------- */}

            <Table
                columns={columns}
                dataSource={listData}
                pagination={{
                    defaultPageSize: 8,
                    showSizeChanger: true,
                    pageSizeOptions: ["8", "20", "30"],
                }}
                tableLayout={"auto"}
                scroll={{ x: 900 }}
                loading={loadingInit}
                rowKey="id"
            />
        </div>
    );
};

export default Home;
