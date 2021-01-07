import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Button, Popconfirm, Table, notification, Card } from "antd";
import React, { FC, useEffect, useState } from "react";
import { getTasks, deleteTask} from "../../services/http.service";
import { Task, User } from "../shared/models";
import './TaskTable.css';

export interface TaskTableProps {
  user: User;
  setModalVisible:(isModalVisible: boolean) => void;
  setModalInfo:(modalInfo: React.ReactElement) => void;
  setModalTitle:(title: string) => void;
}

const TaskTable: FC<TaskTableProps> = ({ user }) => {
  const emptyTasks: Task[] = [];
  const emptyModalInfo: React.ReactNode = <></>;
  const [tasks, setTasks] = useState(emptyTasks);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState(emptyModalInfo);
  const [modalTitle, setModalTitle] = useState('');
  const [isConfirmLoading, setConfirmLoading] = useState(false);
  const [isPopconfirmVisible, setPopconfirmVisible] = useState(-1);

  useEffect(() => {
    loadTasks();
  }, [user]);

  const loadTasks = () => {
    getTasks(user.id!!).then((tasksRes) => {
      console.log(tasksRes)
      tasksRes = tasksRes.map((task, index) => {
        task.key = index;
        return task;
      });
      setTasks(tasksRes);
      setConfirmLoading(false);
    });
  };

  const editTask = (key: number) => {
    setModalTitle('Edit Task');
    // setModalInfo(<TaskForm task={tasks[key]} setModalVisible={setModalVisible} loadTasks={loadTasks}/>);
    setModalVisible(true);
  };

  const createTask = () => {
    setModalTitle('Create New Task');
    // setModalInfo(<TaskForm setModalVisible={setModalVisible} loadTasks={loadTasks}/>);
    setModalVisible(true);
  };

  const clickDeleteTask =  (key: number) => {
    setConfirmLoading(true);
    deleteTask(tasks[key].id!!).then(() => {
      loadTasks();
      setConfirmLoading(false);
      setPopconfirmVisible(-1);
      notification.success({
        message: 'Success',
        description: 'The Task was deleted'
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
      title: "User Id",
      dataIndex: "user_id",
      key: "user_id",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "Actions",
      dataIndex: "key",
      key: "key",
      render: (key: number) => (
        <>
          <EditFilled
            style={{ cursor: "pointer" }}
            onClick={() => editTask(key)}
          />

          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => clickDeleteTask(key)}
            onCancel={() => setPopconfirmVisible(-1)}
            okText="Yes"
            cancelText="No"
            visible={key === isPopconfirmVisible}
            okButtonProps={{ loading: isConfirmLoading }}
          >
            <DeleteFilled
              style={{ cursor: "pointer", marginLeft: "20px" }}
              onClick={() => showPopconfirm(key)}
            />
          </Popconfirm>
        </>
      ),
    }
  ];

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="user-task">
      <Card title={`Tasks of user ${user.name}`}>
      <Table
        columns={columns}
        dataSource={tasks}
        pagination={{ pageSize: 5 }}
      />
      <Button className="new-task" onClick={() => createTask()}>
        Crete new task for {user.name}
      </Button>
      </Card>
    </div>
  );
};

export default TaskTable;
