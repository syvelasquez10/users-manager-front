import React from "react";
import { Button, Table } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import "./UsersTable.css";

export function UsersTable() {
  const data = [
    {
      id: "1",
      name: "John Brown",
    },
    {
      id: "2",
      name: "Jim Green",
    },
    {
      id: "3",
      name: "Joe Black",
    },
  ];

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
      render: () => (
        <>
          <EditFilled style={{ cursor: "pointer" }} />
          <DeleteFilled style={{ cursor: "pointer", marginLeft: "20px" }} />
        </>
      ),
    },
    {
      title: "Tasks",
      render: () => (
        <>
          <Button>See all</Button>
        </>
      ),
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
    </>
  );
}
