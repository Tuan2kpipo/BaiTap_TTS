import { Button, Form, Input, InputNumber, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { addUser } from "../../store/actions/user";

function AddUserForm() {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });
  const { username, email, password, phone } = state;

  const handleInputOnChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });

    console.log(state);
  };

  const handleInputOnChangeXacnhan = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });

    console.log("state form adduser", state);
    dispatch(addUser(state));
  };

  return (
    <form className="form_create">
      <div className="ip_form">
        <label className="title_formcreate text-xs">Name</label>
        <Input
          name="username"
          onChange={handleInputOnChange}
          type="text"
          className="input-from"
          value={username || ""}
        ></Input>

        <label className="text-xs">Email</label>
        <Input
          name="email"
          onChange={handleInputOnChange}
          type="text"
          className="input-from"
          value={email || ""}
        ></Input>

        <label className="text-xs">Password</label>
        <Input
          name="password"
          onChange={handleInputOnChange}
          type="text"
          className="input-from"
          value={password || ""}
        ></Input>

        <label className="text-xs">SDT</label>
        <Input
          name="phone"
          onChange={handleInputOnChange}
          type="text"
          className="input-from"
          value={phone || ""}
        ></Input>

        <div className="btn_form_add">
          <Button className="btn_f btn_close">Dong</Button>

          <Button onClick={handleInputOnChangeXacnhan} className="btn_f">
            Them
          </Button>
        </div>
      </div>
    </form>
  );
}

export default AddUserForm;
