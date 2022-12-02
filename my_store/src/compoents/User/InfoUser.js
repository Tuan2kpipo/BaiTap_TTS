import { Breadcrumb, Layout, Button, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as ACTIONS from "../store/actions/user";
import { useNavigate } from "react-router-dom";
import "./InfoUser.css";
import { Space, Table, Tag } from "antd";
import CpnTable from "../Table/CpnTable";
import AddUserForm from "../public/FormUser/AddUserForm";

const { Content } = Layout;
const { Column, ColumnGroup } = Table;

function InfoUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state.infoUS);

  // cac ham cua modal
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);

  //Lay tat ca du lieu
  useEffect(() => {
    dispatch(ACTIONS.getAllUser());
  }, [dispatch]);

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

          <AddUserForm></AddUserForm>

          <CpnTable
            allInfo={allUsers}
            btnOne={"XEM"}
            btnTwo={"SỬA"}
            btnThree={"XÓA"}
            infoColumn={[
              {
                title: "Name",
                dataIndex: "username",
                key: "username",
              },
              {
                title: "Email",
                dataIndex: "email",
                key: "email",
              },
              {
                title: "Password",
                dataIndex: "password",
                key: "password",
              },
              {
                title: "Phone",
                dataIndex: "phone",
                key: "phone",
              },
            ]}
          ></CpnTable>
        </div>
      </Content>
    </>
  );
}

export default InfoUser;
