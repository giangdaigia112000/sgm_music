import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import { Button, Form, Input, Space, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import {
  PlusOutlined,
  MinusCircleOutlined,
  UploadOutlined
} from "@ant-design/icons";
import { getCompany, updateCompany, uploadFile } from "../utils/fetchApi";
import { openNotificationWithIcon } from "../contexts/auth";
import classNames from "classnames/bind";
import styles from "../styles/Index.module.scss"
import Image from "next/image";
const cx = classNames.bind(styles);
export type Company = {
  id: string;
  name: string;
  logo: string;
  motto: string;
  mottotitle: string;
  mottolist: string[];
  description: string;
}

const Home: NextPage = () => {
  const [company, setCompany] = useState<Company>();
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  const handleGetCompany = async () => {
    setLoading(true);
    try {
      const res = await getCompany();
      const resCompany = res.data[0]
      setCompany(resCompany);
      form.setFieldsValue({
        name: resCompany.name as string,
        motto: resCompany.motto as string,
        mottotitle: resCompany.mottotitle as string,
        mottolistinput: resCompany.mottolist?.map((motto: string) => {
          return { motto: motto }
        }),
        description: resCompany.description as string,
      });
    } catch (error: any) {
      console.log(error);
      openNotificationWithIcon("error", "Lỗi", error?.message);
    } finally {
      setLoading(false);
    }
  }


  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      let logo = company?.logo as string;
      if (values.image) {
        let bodyFormData = new FormData();
        bodyFormData.append("file", values.image[0].originFileObj);
        const resImg = await uploadFile(bodyFormData);
        logo = resImg.data.path;
      }
      const id = company?.id as string;
      const { name, motto, mottotitle, mottolistinput, description } = values
      const mottolist = mottolistinput?.map((motto: any) => {
        return motto?.motto;
      })
      await updateCompany(id as string, { name, logo, motto, mottotitle, mottolist, description });
      openNotificationWithIcon(
        "success",
        "Thông tin",
        "Cập nhật thành công!!"
      );
      handleGetCompany();
    } catch (error: any) {
      console.log(error);
      openNotificationWithIcon("error", "Lỗi", error?.message);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    handleGetCompany();
  }, [])
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <main className={cx("home")}>
      <Head>
        <title>VFAST SOFT ADMIN</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={cx("home-form")}>
        <h1>Thông tin chung</h1>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Tên công ty"
            name="name"
            rules={[{ required: true, message: 'Vui lòng không bỏ trống!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Logo"
          >
            <div style={{ width: "150px", height: "120px" }}>
              {
                company?.logo && <Image
                  src={process.env.HOST_NAME_API + company?.logo}
                  alt="partner"
                  layout="fill"
                  objectFit="contain"
                />
              }
            </div>
          </Form.Item>
          <Form.Item
            name="image"
            label="Thay logo thành"
            valuePropName="fileList"
            getValueFromEvent={normFile}
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
          <Form.Item
            label="Phương châm"
            name="motto"
            rules={[{ required: true, message: 'Vui lòng không bỏ trống!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tiêu đề phương châm"
            name="mottotitle"
            rules={[{ required: true, message: 'Vui lòng không bỏ trống!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phương châm "
          >
            <Form.List name="mottolistinput">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }, index) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...restField}
                        label={index + 1}
                        name={[name, 'motto']}
                        rules={[{ required: true, message: 'Vui lòng không bỏ trống!' }]}
                      >
                        <Input style={{ width: '100%' }} />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(name)}
                        />
                      ) : null}
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Thêm
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: 'Vui lòng không bỏ trống!' }]}
          >
            <TextArea rows={8} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </div>
    </main>
  );
};

export default Home;
