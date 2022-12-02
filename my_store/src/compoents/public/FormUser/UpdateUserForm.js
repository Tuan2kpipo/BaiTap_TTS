import React, { useEffect, useState } from "react";
import { Button, Modal, Checkbox, Form, Input } from "antd";
import "../formProduct/AddFormProduct.css";
import { useDispatch } from "react-redux";
import { addUser, updateUserr } from "../../store/actions/User";

function AddUserForm(props) {
  const { idupdateUser } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  // show modal
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    dispatch(updateUserr(values, idupdateUser.id));
    setIsModalOpen(false);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // modal, day du lieu len input
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      id: idupdateUser.id,
      username: idupdateUser.username,
      email: idupdateUser.email,
      password: idupdateUser.password,
      phone: idupdateUser.phone,
    });
  }, [idupdateUser, form]);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Sửa
      </Button>
      <Modal
        forceRender
        title="Thêm người dùng"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="Username" name="username">
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input />
          </Form.Item>
          <Form.Item label="Phone" name="phone">
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="danger" htmlType="submit">
              Sửa
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
export default AddUserForm;
