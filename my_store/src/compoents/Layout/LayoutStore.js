import { Button, Layout, Input, Dropdown, Space } from "antd";
import React, { useCallback, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./content.css";
import { path } from "../Ultils/constant";
import { useDispatch, useSelector } from "react-redux";
import { getSearchh } from "../store/actions";

const { Header } = Layout;

function LayoutStore() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();

  // den trang dang nhap
  const goLogin = useCallback(() => {
    navigate(path.LOGIN);
  }, []);

  // den trang chinh
  const goHome = useCallback(() => {
    navigate(path.CONTENT);
  }, []);

  // dang xuat
  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  // search
  const handleSearch = (e) => {
    const keys = e.target.value;
    // setValueInput(keys);
    dispatch(getSearchh(keys));
    if (keys.length > 0) {
      navigate("/content");
    } else navigate("/content");
  };

  return (
    <>
      <Layout>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
          }}
        >
          <div className="btn_layout_header">
            <Button type="primary" onClick={goHome}>
              Trang chủ
            </Button>

            <Input placeholder="Tim kiem" onChange={handleSearch} />
            {token ? (
              <Button
                className="cursor-pointer hover:text-orange-500 text-blue-500 py-2 flex items-center gap-2"
                onClick={logOut}
              >
                Đăng xuất
              </Button>
            ) : (
              <div className="dropdown">
                <Button type="primary" onClick={goLogin}>
                  Đăng nhập
                </Button>
              </div>
            )}
          </div>
        </Header>
      </Layout>

      <div>
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default LayoutStore;
