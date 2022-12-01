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
import "../Layout/content.css";

const { Content } = Layout;
const { Meta } = Card;

const style = {
  background: "#ccc",
  padding: "8px 0",
  display: "flex",
  justifyContent: "center",
};

function SearchContent() {
  const [isAddd, setAdd] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const dispatch = useDispatch();
  const { allProducts, product, getSearch } = useSelector(
    (state) => state.infoRd
  );
  const [titleCard, setTitleCard] = useState("");
  const [descriptionCard, setdescriptionCard] = useState("");
  const { userLogin } = useSelector((state) => state.infoRd);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("token");
  const keys = ["description"];
  //Lay tat ca du lieu
  useEffect(() => {
    dispatch(ACTIONS.getAll());
  }, [dispatch]);

  // su kien hien thi form them
  const handleClickAdd = () => {
    setAdd(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
          {token && (
            <>
              <Button onClick={handleClickAdd} type="primary">
                Thêm sản phẩm
              </Button>
            </>
          )}

          {/* <Button onClick={handleClickAdd} type="primary">
            Thêm sản phẩm
          </Button> */}

          {isAddd && <FormAdd product={product}></FormAdd>}
          {isUpdate && <FormUpdate></FormUpdate>}

          <Divider orientation="left">Danh sách sản phẩm</Divider>
          <Row gutter={16}>
            {allProducts
              .filter((item) =>
                keys.some((key) => item[key].toLowerCase().includes(getSearch))
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

export default SearchContent;
