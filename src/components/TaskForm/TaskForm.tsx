import { Button, Form, Input, notification, Select } from "antd";
import React, { FC, useEffect, useState } from "react";
import { createTask, updateTask } from "../../services/http.service";
import { Task, TaskState } from "../shared/models";

export interface UserFormProps {
  task?: Task;
  userId: string;
  setModalVisible:(isModalVisible: boolean) => void;
  loadTasks:() => void;
}

const TaskForm: FC<UserFormProps> = ({ task, userId, setModalVisible, loadTasks }) => {
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    form.setFieldsValue({description: task ? task.description : "", state: task ? task.state : ""})
  });

  const onFinish = async (values: any) => {
    setLoading(true);
    if(task) {
      updateTask({ description: values.description, state: values.state, user_id: userId, id: task.id }).then(_ => {
        setModalVisible(false);
        setLoading(false);
        notification.success({
          message: 'Success',
          description: 'The Task was successfully updated'
        });
        form.resetFields();
        loadTasks();
      }).catch(error =>{
        notification.error({
          message: 'Error',
          description: error.message
        });
        setLoading(false);
      });
    } else {
      createTask({ description: values.description, state: values.state, user_id: userId }).then(_ => {
        setModalVisible(false);
        setLoading(false);
        notification.success({
          message: 'Success',
          description: 'The Task was successfully created'
        });
        form.resetFields();
        loadTasks();
      }).catch(error =>{
        notification.error({
          message: 'Error',
          description: error.message
        });
        setLoading(false);
      });
    }
  };

  return (
    <div className="user-form">
      <Form
        form={form}
        scrollToFirstError
        onFinish={onFinish}
      >
        {task ? <><strong>Id:</strong><p>{task.id}</p></>: <></>}
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please write a description" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="state"
          label="State"
          rules={[{ required: true, message: "Please write a State" }, () => ({
            validator(_, value) {
              return value in TaskState ? Promise.resolve() : Promise.reject('The state does not match the possible state values');
            },
          })]}
        >
          <Select>
            <Select.Option value="done">Done</Select.Option>
            <Select.Option value="to do">To do</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button className="action-button" type="primary" htmlType="submit" loading={isLoading}>
            {task ? "Update Task" : "Create Task"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TaskForm;
