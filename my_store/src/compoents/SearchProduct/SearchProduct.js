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
import FormUpdate from "../public/FormUpdate";
import * as ACTIONS from "../store/actions/index";
import { useNavigate } from "react-router-dom";

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
  const [isUpdate, setIsUpdate] = useState(false);
  const dispatch = useDispatch();
  const { allProducts, product } = useSelector((state) => state.infoRd);
  const [titleCard, setTitleCard] = useState("");
  const [descriptionCard, setdescriptionCard] = useState("");
  const token = localStorage.getItem("token");

  const { getSearch } = useSelector((state) => state.infoRd);

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
    setIsUpdate(true);
  };

  //xem
  const handleDetail = (products) => {
    setIsModalOpen(true);
    setTitleCard(products.title);
    setdescriptionCard(products.description);
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
          <Divider orientation="left">Danh sách sản phẩm</Divider>
          <Row gutter={16}>
            {allProducts &&
              allProducts
                .filter((item) =>
                  item.description.toLowerCase().includes(getSearch)
                )
                .map((products, index) => {
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

export default InfoUser;
