import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Button, Popconfirm, Table, notification, Card } from "antd";
import React, { FC, useEffect, useState } from "react";
import { getTasks, deleteTask} from "../../services/http.service";
import { Task, User } from "../shared/models";
import TaskForm from "../TaskForm/TaskForm";
import './TaskTable.css';

export interface TaskTableProps {
  user: User;
  setModalVisible:(isModalVisible: boolean) => void;
  setModalInfo:(modalInfo: React.ReactElement) => void;
  setModalTitle:(title: string) => void;
}

const TaskTable: FC<TaskTableProps> = ({ user, setModalVisible, setModalInfo, setModalTitle }) => {
  const emptyTasks: Task[] = [];
  const [tasks, setTasks] = useState(emptyTasks);
  const [isConfirmLoading, setConfirmLoading] = useState(false);
  const [isPopconfirmVisible, setPopconfirmVisible] = useState(-1);

  useEffect(() => {
    loadTasks();
  }, [user]);

  const loadTasks = () => {
    getTasks(user.id!!).then((tasksRes) => {
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
    setModalInfo(<TaskForm task={tasks[key]} userId={user.id!!} setModalVisible={setModalVisible} loadTasks={loadTasks}/>);
    setModalVisible(true);
  };

  const createTask = () => {
    console.log('llega')
    setModalTitle('Create New Task');
    setModalInfo(<TaskForm setModalVisible={setModalVisible} userId={user.id!!} loadTasks={loadTasks}/>);
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
            title="Are you sure to delete this task?"
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

  return (
    <div className="user-task">
      <Card title={`Tasks of user ${user.name}`}>
      <Button className="new-task" onClick={() => createTask()}>
        Crete new task for {user.name}
      </Button>
      <Table
        columns={columns}
        dataSource={tasks}
        pagination={{ pageSize: 5 }}
      />
      </Card>
    </div>
  );
};

export default TaskTable;
