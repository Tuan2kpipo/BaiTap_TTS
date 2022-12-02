import React, { useState } from "react";
import { Table, Space, Button, Modal } from "antd";
import { useDispatch } from "react-redux";
import * as ACTIONS from "../store/actions/user";
import "./CpnTable.css";
import UpdateUser from "../public/FormUser/UpdateUser";

function CpnTable(props) {
  const { allInfo } = props;
  const { Column } = Table;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [NameUser, setNameUser] = useState("");
  const [EmailUser, setEmailUser] = useState("");
  const [PasswordUser, setPasswordUser] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const dispatch = useDispatch();

  // chuc nang xem
  const handleDetail = (user) => {
    setIsModalOpen(true);
    setNameUser(user.username);
    setEmailUser(user.email);
    setPasswordUser(user.email);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // chuc nang xoa
  const handleDelete = (id) => {
    if (window.confirm("Ban co muon xoa khong")) {
      dispatch(ACTIONS.deleteUser(id));
    }
  };

  // chuc nang sua
  const handleUpdate = (id) => {
    dispatch(ACTIONS.getSingUser(id));
    setIsUpdate(true);
  };

  return (
    <div className="tb_cpn">
      {isUpdate && <UpdateUser></UpdateUser>}
      <Table dataSource={allInfo}>
        <Column title="UserName" dataIndex="username" key="username" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Password" dataIndex="password" key="password" />
        <Column title="Phone" dataIndex="phone" key="phone" />
        <Column
          className="tb_action"
          title="Action"
          key="action"
          render={(_, record) => (
            <Space className="space_tb" size="middle">
              {/* <Button
                className="btn_tb"
                onClick={() => handleUpdate(record.id)}
              >
                Sửa
              </Button> */}

              <UpdateUser idupdateUser={record}></UpdateUser>

              <Button className="btn_tb" onClick={() => handleDelete(record)}>
                Xóa
              </Button>
              <Button className="btn_tb" onClick={() => handleDetail(record)}>
                Xem
              </Button>
            </Space>
          )}
        />
      </Table>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Name: {NameUser}</p>
        <p>Email: {EmailUser}</p>
        <p>Password: {PasswordUser}</p>
      </Modal>
    </div>
  );
}

export default CpnTable;
