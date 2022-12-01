import { Breadcrumb, Layout, Card, Button, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as ACTIONS from "../store/actions/user";
import { useNavigate } from "react-router-dom";
import "./InfoUser.css";
import UpdateUser from "../public/updateUser/UpdateUser";
import FormAddUser from "../public/updateUser/AddUserForm";

const { Content } = Layout;
const { Meta } = Card;

const style = {
  background: "#ccc",
  padding: "8px 0",
  display: "flex",
  justifyContent: "center",
};

function InfoUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state.infoUS);
  const [NameUser, setNameUser] = useState("");
  const [EmailUser, setEmailUser] = useState("");
  const [PasswordUser, setPasswordUser] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

  // cac ham cua modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //Lay tat ca du lieu
  useEffect(() => {
    dispatch(ACTIONS.getAllUser());
  }, [dispatch]);

  const showModalAdd = () => {
    setIsModalOpenAdd(true);
  };

  const handleOkAdd = () => {
    setIsModalOpenAdd(false);
  };

  const handleCancelAdd = () => {
    setIsModalOpenAdd(false);
  };
  //xoa
  const handleDelete = (id) => {
    if (window.confirm("Ban co muon xoa khong")) {
      dispatch(ACTIONS.deleteUser(id));
    }
  };

  //sua
  const handleUpdate = (id) => {
    dispatch(ACTIONS.getSingUser(id));
    setIsUpdate(true);
  };

  //xem
  const handleDetail = (user) => {
    setIsModalOpen(true);
    setNameUser(user.username);
    setEmailUser(user.email);
    setPasswordUser(user.email);
  };

  const handleBackHome = () => {
    navigate("/content");
  };

  return (
    <>
      <Content
        className="site-layout"
        style={{
          padding: "0 50px",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        ></Breadcrumb>
        <div
          className="site-layout-background"
          style={{
            padding: 24,
            minHeight: 380,
          }}
        >
          <Button type="primary" onClick={handleBackHome}>
            Quay lại
          </Button>

          <Button type="primary" onClick={showModalAdd}>
            Thêm Người Dùng
          </Button>
          <Modal
            className="modal_add"
            title="FORM THÊM"
            open={isModalOpenAdd}
            onOk={handleOkAdd}
            onCancel={handleCancelAdd}
          >
            <FormAddUser></FormAddUser>
          </Modal>

          {isUpdate && <UpdateUser></UpdateUser>}
          <table className="table_user">
            <thead>
              <tr>
                <th>Họ tên</th>
                <th>Email</th>
                <th>Mật khẩu</th>
                <th>SDT</th>
                <th>Thêm/Sửa</th>
              </tr>
            </thead>
            <tbody>
              {allUsers &&
                allUsers.length > 0 &&
                allUsers.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.password}</td>
                      <td>{user.phone}</td>
                      <td className="td_tsx">
                        <Button
                          className="btn_tb"
                          onClick={() => handleUpdate(user.id)}
                        >
                          Sửa
                        </Button>
                        <Button
                          className="btn_tb"
                          onClick={() => handleDelete(user.id)}
                        >
                          Xóa
                        </Button>
                        <Button
                          className="btn_tb"
                          onClick={() => handleDetail(user)}
                        >
                          Xem
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </Content>

      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Name: {NameUser}</p>
        <p>Email: {EmailUser}</p>
        <p>Password: {PasswordUser}</p>
      </Modal>
    </>
  );
}

export default InfoUser;
