import { Button, Form, Input, notification } from "antd";
import { title } from "process";
import React, { FC, useEffect, useState } from "react";
import { createUser, updateUser } from "../../services/http.service";
import { User } from "../shared/models";
import "./UserForm.css";

export interface UserFormProps {
  user?: User;
  setModalVisible:(isModalVisible: boolean) => void;
  loadUsers:() => void;
}

const UserForm: FC<UserFormProps> = ({ user, setModalVisible, loadUsers }) => {
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    form.setFieldsValue({name: user ? user.name : ""})
  });

  const onFinish = async (values: any) => {
    setLoading(true);
    if(user) {
      user.name = values.name;
      updateUser(user).then(_ => {
        setModalVisible(false);
        setLoading(false);
        notification.success({
          message: 'Success',
          description: 'The User was successfully updated'
        });
        form.resetFields();
        loadUsers();
      });
    } else {
      createUser(values.name).then(_ => {
        setModalVisible(false);
        setLoading(false);
        notification.success({
          message: 'Success',
          description: 'The User was successfully created'
        });
        form.resetFields();
        loadUsers();
      });
    }
  };

  return (
    <div className="user-form">
      <Form
        form={form}
        title={title}
        scrollToFirstError
        onFinish={onFinish}
      >
        {user ? <><strong>Id:</strong><p>{user.id}</p></>: <></>}
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please write a name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button className="action-button" type="primary" htmlType="submit" loading={isLoading}>
            {user ? "Update User" : "Create User"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserForm;
