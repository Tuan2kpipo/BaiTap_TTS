import {
  Breadcrumb,
  Layout,
  Card,
  Col,
  Row,
  Divider,
  Button,
  Modal,
} from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as ACTIONS from "../store/actions/Product";
import "./content.css";
import "./LayOutContent.css";
import { useNavigate } from "react-router-dom";
import AddFormProduct from "../public/formProduct/AddFormProduct";
import UpdateFormProduct from "../public/formProduct/UpdateFormProduct";

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
  const [isUpdate, setIsUpdate] = useState(false);
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.infoRd);
  const [titleCard, setTitleCard] = useState("");
  const [descriptionCard, setdescriptionCard] = useState("");
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const token = localStorage.getItem("token");

  // cac ham cua modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //Lay tat ca du lieu
  useEffect(() => {
    dispatch(ACTIONS.getAll());
  }, [dispatch]);

  //xoa
  const handleDelete = (id) => {
    if (window.confirm("Ban co muon xoa khong")) {
      dispatch(ACTIONS.deleteProduct(id));
    }
  };

  //sua
  const handleUpdate = (id) => {
    dispatch(ACTIONS.getSingProduct(id));
    // setIsUpdate(true);
    setShowModalUpdate(true);
  };

  //xem
  const handleDetail = (products) => {
    setIsModalOpen(true);
    setTitleCard(products.title);
    setdescriptionCard(products.description);
  };

  const handleUser = () => {
    navigate("/user");
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
          <AddFormProduct></AddFormProduct>

          <Button type="primary" onClick={handleUser}>
            Thông tin người dùng
          </Button>

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
                        <Meta title={products.description} />
                        <div className="btn_card_product">
                          <Button
                            type="primary"
                            className="btn_delete"
                            onClick={() => handleDelete(products.id)}
                          >
                            Xóa
                          </Button>

                          <UpdateFormProduct
                            products={products}
                          ></UpdateFormProduct>

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
