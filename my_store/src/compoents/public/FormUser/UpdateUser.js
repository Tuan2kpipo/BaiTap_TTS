import React, { useEffect, useState } from "react";
import { Button, Modal, Checkbox, Form, Input } from "antd";
import "../FormProduct/AddFormProduct.css";
import { useDispatch } from "react-redux";
import { addUser, updateUserr } from "../../store/actions/user";

function AddUserForm(props) {
  const { idupdateUser } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const dispatch = useDispatch();
  const onFinish = (values) => {
    // setIsModalOpen(false);

    dispatch(updateUserr(values, idupdateUser.id));
    // console.log("uerrrrrrrrrrr", idupdateUser);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      username: idupdateUser.username,
      email: idupdateUser.email,
      password: idupdateUser.password,
      phone: idupdateUser.phone,
    });
  }, []);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Sửa
      </Button>
      <Modal
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
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
export default AddUserForm;
