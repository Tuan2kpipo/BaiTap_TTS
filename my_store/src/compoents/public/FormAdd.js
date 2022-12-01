import { Button, Form, Input, InputNumber, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import "./FormAdd.css";
import { useDispatch } from "react-redux";
import { addProduct, addUser } from "../store/actions";

function FormAdd() {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });
  const { name, price, description, category, image } = state;

  const handleInputOnChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });

    console.log(state);
  };

  const handleInputOnChangeXacnhan = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });

    dispatch(addProduct(state));
  };

  return (
    <form className="form_create">
      <div className="ip_form">
        <label className="title_formcreate text-xs">Name</label>
        <Input
          name="name"
          onChange={handleInputOnChange}
          type="text"
          className="input-from"
          value={name || ""}
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
          <Button onClick={handleInputOnChangeXacnhan} className="btn_f">
            Xac nhan
          </Button>
        </div>
      </div>
    </form>
  );
}

export default FormAdd;
