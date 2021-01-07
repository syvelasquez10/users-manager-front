import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Table, Modal, notification } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import "./UsersTable.css";
import { User } from "../shared/models";
import { deleteUser, getUsers } from "../../services/http.service";
import UserForm from "../UserForm/UserForm";

export function UsersTable() {
  const emptyUsers: User[] = [];
  const emptyModalInfo: React.ReactNode = <></>;
  const [users, setUsers] = useState(emptyUsers);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState(emptyModalInfo);
  const [modalTitle, setModalTitle] = useState('');
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
    console.log(key);
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

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="user-table">
      <Modal
        title={modalTitle} 
        visible={isModalVisible}
        onOk={handleCloseModal}
        onCancel={handleCloseModal}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        {modalInfo}
      </Modal>
      <Button className="new-user" onClick={() => createUser()}>Crete new user</Button>
      <Table
        columns={columns}
        dataSource={users}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}
