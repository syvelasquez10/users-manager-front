import React, { FC, useEffect, useState } from "react";
import { Button, Popconfirm, Table, notification } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import "./UsersTable.css";
import { User } from "../shared/models";
import { deleteUser, getUsers } from "../../services/http.service";
import UserForm from "../UserForm/UserForm";

export interface TaskTableProps {
  setModalVisible:(isModalVisible: boolean) => void;
  setModalInfo:(modalInfo: React.ReactElement) => void;
  setModalTitle:(title: string) => void;
  setTasksVisible: (areTasksVisible: boolean) => void;
  setSelectedUser: (user: User) => void;
}

const UsersTable: FC<TaskTableProps> = ({ setModalVisible, setModalInfo, setModalTitle, setTasksVisible, setSelectedUser }) => {
  const emptyUsers: User[] = [];
  const [users, setUsers] = useState(emptyUsers);
  const [isConfirmLoading, setConfirmLoading] = useState(false);
  const [isPopconfirmVisible, setPopconfirmVisible] = useState(-1);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    getUsers().then((users) => {
      users = users.map((user, index) => {
        user.key = index;
        return user;
      });
      setUsers(users);
      setConfirmLoading(false);
    });
  };

  const editUser = (key: number) => {
    setModalTitle('Edit User');
    setModalInfo(<UserForm user={users[key]} setModalVisible={setModalVisible} loadUsers={loadUsers}/>);
    setModalVisible(true);
  };

  const createUser = () => {
    setModalTitle('Create New User');
    setModalInfo(<UserForm setModalVisible={setModalVisible} loadUsers={loadUsers}/>);
    setModalVisible(true);
  };

  const clickDeleteUser =  (key: number) => {
    setConfirmLoading(true);
    deleteUser(users[key].id!!).then(() => {
      loadUsers();
      setConfirmLoading(false);
      setPopconfirmVisible(-1);
      notification.success({
        message: 'Success',
        description: 'The User was deleted'
      });
    }).catch( error => {
      notification.error({
        message: 'Error',
        description: error
      });
      setConfirmLoading(false);
      setPopconfirmVisible(-1);
    });
  };

  const seeTasks = (key: number) => {
    setSelectedUser(users[key]);
    setTasksVisible(true);
  };
  const showPopconfirm = (key: number) => {
    setPopconfirmVisible(key);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      dataIndex: "key",
      key: "key",
      render: (key: number) => (
        <>
          <EditFilled
            style={{ cursor: "pointer" }}
            onClick={() => editUser(key)}
          />

          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => clickDeleteUser(key)}
            onCancel={() => setPopconfirmVisible(-1)}
            okText="Yes"
            cancelText="No"
            visible={key === isPopconfirmVisible}
            okButtonProps={{ loading: isConfirmLoading }}
          >
            <DeleteFilled style={{ cursor: "pointer", marginLeft: "20px" }} onClick={() => showPopconfirm(key)} />
          </Popconfirm>
        </>
      ),
    },
    {
      title: "Tasks",
      dataIndex: "key",
      key: "key",
      render: (key: number) => (
        <Button onClick={() => seeTasks(key)}>See all</Button>
      ),
    },
  ];

  return (
    <div className="user-table">
      <h1>Users List</h1>
      <Button className="new-user" onClick={() => createUser()}>Crete new user</Button>
      <Table
        columns={columns}
        dataSource={users}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}

export default UsersTable;