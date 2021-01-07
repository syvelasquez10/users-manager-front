import React, { useState } from "react";
import { Modal } from "antd";
import { User } from "../shared/models";
import TaskTable from "../TaskTable/TaskTable";
import UsersTable from "../UsersTable/UsersTable";

export function Home() {
  const emptyModalInfo: React.ReactNode = <></>;
  const emptyUser: User = { name: "" };
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState(emptyModalInfo);
  const [modalTitle, setModalTitle] = useState("");
  const [areTasksVisible, setTasksVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(emptyUser);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="home">
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
      <UsersTable
        setTasksVisible={setTasksVisible}
        setSelectedUser={setSelectedUser}
        setModalInfo={setModalInfo}
        setModalTitle={setModalTitle}
        setModalVisible={setModalVisible}
      />
      {areTasksVisible ? (
        <TaskTable
          user={selectedUser}
          setModalInfo={setModalInfo}
          setModalTitle={setModalTitle}
          setModalVisible={setModalVisible}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
