import {
    Button,
    Checkbox,
    Form,
    Input,
    InputNumber,
    Modal,
    Popconfirm,
    Select,
    Space,
    Table,
    Upload,
} from "antd";
import { useEffect, useState } from "react";
import {
    EditFilled,
    DeleteFilled,
    PlusCircleFilled,
    UploadOutlined,
    MinusCircleOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import axiosClient from "../../utils/axiosClient";
import { notiError, notiSuccess } from "../../utils/notification";
import { Category, Product } from "../../interface";
import TextArea from "antd/lib/input/TextArea";

const { Option } = Select;
interface DataType {
    id: number;
    name: string;
    thumb: string;
    category_id: number;
    description: string;
}

const Product = () => {
    const [listData, setListData] = useState<Product[]>([] as Product[]);
    const [listCategory, setListCategory] = useState<Category[]>(
        [] as Category[]
    );
    console.log(listData);

    const [loadingInit, setLoadingInit] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [isAddOrFix, setIsAddOrFix] = useState<boolean>(true);
    const [imgFix, setImgFix] = useState<string>("");
    const [form] = Form.useForm();

    useEffect(() => {
        (async () => {
            try {
                setLoadingInit(true);
                const resCategory = await axiosClient.post(
                    "/api/admin/category",
                    {
                        _method: "get",
                    }
                );
                setListCategory(resCategory.data as Category[]);
                const resData = await axiosClient.post("/api/admin/product", {
                    _method: "get",
                });
                setListData(resData.data as Product[]);
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
        const product = listData.filter((category) => category.id === id)[0];
        setImgFix(product.thumb);
        form.setFieldsValue({
            name: product.name,
            id: id,
            category_id: product.category_id,
            description: product.description,
            sale: product.sale,
            options: product.options.size.map((op) => {
                return {
                    op: op.op,
                    price: op.price,
                };
            }),
        });
    };
    const handleDelete = async (id: number) => {
        try {
            const resData = await axiosClient.post(`/api/admin/product/${id}`, {
                _method: "delete",
            });
            setListData((state) =>
                state.filter((category) => {
                    return category.id !== id;
                })
            );

            notiSuccess("Xóa thành công.");
        } catch (error) {
            notiError("Xóa thất bại.");
        }
    };

    const onSubmitForm = async (values: any) => {
        console.log(values);
        // --------------------------Thêm bản ghi-------------------------------
        if (isAddOrFix === true) {
            const { name, imageFile, description, category_id, options, sale } =
                values;
            const thumb = imageFile[0];
            try {
                setLoading(true);
                const optionPut = {
                    size: [...options],
                };
                let bodyFormData = new FormData();
                bodyFormData.append("thumb", thumb.originFileObj);
                bodyFormData.append("name", name);
                bodyFormData.append("category_id", category_id);
                bodyFormData.append("product_content", "1");
                bodyFormData.append("has_option", "1");
                bodyFormData.append("price_sale", "0");
                bodyFormData.append("price", "0");
                bodyFormData.append("description", "0");
                bodyFormData.append("_method", "put");

                const dataProduct = {
                    name,
                    sale,
                    description,
                    category_id,
                    has_option: 1,
                    price: 0,
                    price_sale: 0,
                    product_content: "1",
                    options: optionPut,
                };
                const resData = await axiosClient.post(
                    "/api/admin/product",
                    dataProduct,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                const resData2 = await axiosClient.post(
                    `/api/admin/product/${resData.data.id}`,
                    bodyFormData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
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
            // --------------------------Sửa bản ghi------------------------------
            const {
                name,
                imageFile,
                id,
                description,
                category_id,
                options,
                sale,
            } = values;

            try {
                setLoading(true);
                let bodyFormData = new FormData();
                const optionPut = {
                    size: [...options],
                };
                if (imageFile) {
                    const thumb = imageFile[0];
                    bodyFormData.append("thumb", thumb.originFileObj);
                }
                bodyFormData.append("name", name);
                bodyFormData.append("category_id", category_id);
                bodyFormData.append("product_content", "1");
                bodyFormData.append("has_option", "1");
                bodyFormData.append("price_sale", "0");
                bodyFormData.append("price", "0");
                bodyFormData.append("description", "0");
                bodyFormData.append("_method", "put");

                const resData = await axiosClient.put(
                    `/api/admin/product/${id}`,
                    bodyFormData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                const dataFix = {
                    name,
                    sale,
                    description,
                    category_id,
                    has_option: 1,
                    price: 0,
                    price_sale: 0,
                    product_content: "1",
                    options: optionPut,
                };
                const resData2 = await axiosClient.put(
                    `/api/admin/product/${id}`,
                    dataFix,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
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
            title: "Tên",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Thể loại",
            dataIndex: "category_id",
            filters: listCategory.map((cate) => {
                return {
                    text: cate.name,
                    value: cate.name,
                };
            }),

            render: (category_id: number) => (
                <span>
                    {(listCategory.length > 0 &&
                        listCategory.filter(
                            (cate) => cate.id === category_id
                        )[0]?.name) ||
                        ""}
                </span>
            ),
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Hình thumb",
            dataIndex: "thumb",
            width: 400,
            render: (thumb: string) => (
                <div className="">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        className="max-w-[200px] max-h-[300px] object-cover"
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
                <h1>Quản lý danh sách Product</h1>
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

            {/* --------------------------Modal------------------------------------ */}
            <Modal
                title={`${isAddOrFix ? "Thêm mới Product" : "Sửa Product"}`}
                visible={isOpenModal}
                onCancel={handleCancelModal}
                footer={[
                    <Button key="back" onClick={handleCancelModal}>
                        Cancel
                    </Button>,
                ]}
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
                        label="Tên sản phẩm"
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
                        label="Mô tả"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: "Không bỏ trống!!!",
                            },
                        ]}
                    >
                        <TextArea />
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
                                className="max-w-[200px] max-h-[300px] object-cover p-[10px]"
                                src={`${process.env.HOST_NAME_API}/${imgFix}`}
                                alt="img"
                            />
                        </div>
                    )}
                    <Form.Item
                        name="category_id"
                        label="Category"
                        rules={[
                            { required: true, message: "Không bỏ trống!!!" },
                        ]}
                    >
                        <Select placeholder="Category" allowClear>
                            {listCategory.length > 0 &&
                                listCategory.map((cate) => (
                                    <Option key={cate.id} value={cate.id}>
                                        {cate.name}
                                    </Option>
                                ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Option"
                        rules={[
                            ({ getFieldValue }) => ({
                                validator: async (rule, value) => {
                                    console.log(getFieldValue("imageFile"));
                                    if (
                                        getFieldValue("options") &&
                                        getFieldValue("options").length
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject("Please add Option");
                                },
                            }),
                        ]}
                    >
                        <Form.List name="options">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(
                                        (
                                            { key, name, ...restField },
                                            index
                                        ) => (
                                            <Space
                                                key={key}
                                                style={{
                                                    display: "flex",
                                                    marginBottom: 8,
                                                }}
                                                align="baseline"
                                            >
                                                <Form.Item
                                                    {...restField}
                                                    label={
                                                        "Option " +
                                                        `${index + 1}`
                                                    }
                                                    name={[name, "op"]}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                "Vui lòng không bỏ trống!",
                                                        },
                                                    ]}
                                                >
                                                    <Input
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    label={"giá"}
                                                    name={[name, "price"]}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                "Vui lòng không bỏ trống!",
                                                        },
                                                    ]}
                                                >
                                                    <InputNumber
                                                        size="middle"
                                                        min={1}
                                                        max={1_000_000_000}
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                    />
                                                </Form.Item>
                                                {fields.length > 1 ? (
                                                    <MinusCircleOutlined
                                                        className="dynamic-delete-button"
                                                        onClick={() =>
                                                            remove(name)
                                                        }
                                                    />
                                                ) : null}
                                            </Space>
                                        )
                                    )}

                                    <Form.Item>
                                        <Button
                                            type="dashed"
                                            onClick={() => add()}
                                            block
                                            icon={<PlusOutlined />}
                                        >
                                            Thêm
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                        <Form.Item name="sale" valuePropName="checked">
                            <Checkbox>Sản phẩm khuyến mãi</Checkbox>
                        </Form.Item>
                    </Form.Item>
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

            {/* --------------------------Modal------------------------------------ */}

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

export default Product;
