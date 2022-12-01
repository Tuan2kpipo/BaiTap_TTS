import {
  Breadcrumb,
  Layout,
  Card,
  Col,
  Row,
  Slider,
  Divider,
  Button,
  Modal,
} from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormAdd from "../public/FormAdd";
import FormUpdate from "../public/FormUpdate";
import * as ACTIONS from "../store/actions";
import "./content.css";
import "./LayOutContent.css";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Meta } = Card;

const style = {
  background: "#ccc",
  padding: "8px 0",
  display: "flex",
  justifyContent: "center",
};

function LayOutContent() {
  const navigate = useNavigate();
  const [isAddd, setAdd] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const dispatch = useDispatch();
  const { allProducts, product } = useSelector((state) => state.infoRd);
  const [titleCard, setTitleCard] = useState("");
  const [descriptionCard, setdescriptionCard] = useState("");
  const token = localStorage.getItem("token");

  // cac ham cua modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const showModalAdd = () => {
    setIsModalOpenAdd(true);
  };
  const handleOkAdd = () => {
    setIsModalOpenAdd(false);
  };
  const handleCancelAdd = () => {
    setIsModalOpenAdd(false);
  };

  const handleOk = () => {
    setIsModalOpenAdd(false);
  };
  const handleCancel = () => {
    setIsModalOpenAdd(false);
  };

  //Lay tat ca du lieu
  useEffect(() => {
    dispatch(ACTIONS.getAll());
  }, [dispatch]);

  // su kien hien thi form them
  // const handleClickAdd = () => {
  //   setAdd(true);
  // };

  //xoa
  const handleDelete = (id) => {
    if (window.confirm("Ban co muon xoa khong")) {
      dispatch(ACTIONS.deleteProduct(id));
    }
  };

  //sua
  const handleUpdate = (id) => {
    dispatch(ACTIONS.getSingProduct(id));
    setIsUpdate(true);
  };

  //xem
  const handleDetail = (products) => {
    setIsModalOpen(true);
    setTitleCard(products.title);
    setdescriptionCard(products.description);
  };

  const handleUser = () => {
    navigate("/search");
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
          {token && (
            <>
              <Button type="primary" onClick={showModalAdd}>
                Thêm sản phẩm
              </Button>
              <Modal
                className="modal_add"
                title="FORM THÊM"
                open={isModalOpenAdd}
                onOk={handleOkAdd}
                onCancel={handleCancelAdd}
              >
                <FormAdd product={product}></FormAdd>
              </Modal>

              <Button type="primary" onClick={handleUser}>
                Thông tin người dùng
              </Button>
            </>
          )}

          {isUpdate && <FormUpdate></FormUpdate>}

          <Divider orientation="left">Danh sách sản phẩm</Divider>
          <Row gutter={16}>
            {allProducts &&
              allProducts.length > 0 &&
              allProducts.map((products, index) => {
                return (
                  <Col key={index} className="gutter-row" span={4}>
                    <div style={style}>
                      <Card
                        hoverable
                        style={{
                          width: 240,
                        }}
                        cover={
                          <img
                            className="img_card"
                            alt="example"
                            src={products.image}
                          />
                        }
                      >
                        <Meta
                          title={products.description}
                          description={products.category}
                        />
                        <div className="btn_card_product">
                          <Button
                            className="btn_delete"
                            onClick={() => handleDelete(products.id)}
                          >
                            Xóa
                          </Button>

                          <Button
                            className="btn_delete"
                            onClick={() => handleUpdate(products.id)}
                          >
                            Sửa
                          </Button>

                          <Button
                            type="primary"
                            onClick={() => handleDetail(products)}
                          >
                            Xem
                          </Button>
                        </div>
                      </Card>
                    </div>
                  </Col>
                );
              })}
          </Row>

          <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>{titleCard}</p>
            <p>{descriptionCard}</p>
          </Modal>
        </div>
      </Content>
    </>
  );
}

export default LayOutContent;
