import { Button, Form, Input, InputNumber, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useState, useE, useEffect } from "react";
import "./FormAdd.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../store/actions";

function FormUpdate(idProduct) {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });
  const { title, price, description, category, image } = state;

  const { product } = useSelector((state) => state.infoRd);
  const handleInputOnChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });

    console.log(state);
  };

  const handleInputOnChangeXacnhan = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
    dispatch(updateProduct(state, product.id));
    setState("");
  };

  useEffect(() => {
    if (product) {
      setState({ ...product });
    }
  }, [product]);

  return (
    <form className="form_create">
      <div className="ip_form">
        <label className="title_formcreate text-xs">Title</label>
        <Input
          name="title"
          onChange={handleInputOnChange}
          type="text"
          className="input-from"
          value={title || ""}
        ></Input>

        <label className="text-xs">Price</label>
        <Input
          name="price"
          onChange={handleInputOnChange}
          type="text"
          className="input-from"
          value={price || ""}
        ></Input>

        <label className="text-xs">Description</label>
        <Input
          name="description"
          onChange={handleInputOnChange}
          type="text"
          className="input-from"
          value={description || ""}
        ></Input>

        <label className="text-xs">Category</label>
        <Input
          name="category"
          onChange={handleInputOnChange}
          type="text"
          className="input-from"
          value={category || ""}
        ></Input>

        <label className="text-xs">Image</label>
        <Input
          name="image"
          onChange={handleInputOnChange}
          type="text"
          className="input-from"
          value={image || ""}
        ></Input>

        <div className="btn_form_add">
          <Button className="btn_f btn_close">Dong</Button>

          <Button onClick={handleInputOnChangeXacnhan} className="btn_f">
            Sua
          </Button>
        </div>
      </div>
    </form>
  );
}

export default FormUpdate;
