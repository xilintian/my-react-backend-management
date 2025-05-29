import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input, Table, message, Popconfirm } from "antd";
import {
  getUserList,
  addUser,
  editUser,
  deleteUser,
  getUserById,
} from "../../api";
import UserModal from "./components/UserModal";

const User = () => {
  const modalRef = useRef();

  const [userList, setUserList] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, messageContextHolder] = message.useMessage();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const columns = [
    {
      title: "序号",
      dataIndex: "index",
      render: (text, record, index) => {
        return (pagination.page - 1) * pagination.limit + index + 1;
      },
    },
    {
      title: "姓名",
      dataIndex: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
    },
    {
      title: "性别",
      dataIndex: "sex",
      render: (text) => {
        return text === 0 ? "女" : "男";
      },
    },
    {
      title: "生日",
      dataIndex: "birth",
    },
    {
      title: "地址",
      dataIndex: "addr",
    },
    {
      title: "操作",
      dataIndex: "operation",
      render: (text, record) => {
        return (
          <div style={styles.operation}>
            <Button
              type="link"
              size="small"
              onClick={() => handleAction("edit", record)}
            >
              编辑
            </Button>
            <Popconfirm
              title="确定删除此用户？"
              style={styles.popconfirmButtons}
              onConfirm={() => handleDelete(record.id)}
              okText="确定"
              cancelText="取消"
            >
              <Button type="link" size="small" danger>
                删除
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const handleDelete = async (id) => {
    try {
      const { data } = await deleteUser({ id });
      if (data.code === 200) {
        messageApi.success("删除成功");
      }
    } catch (error) {
      console.error(error);
      messageApi.error("删除失败");
    } finally {
      getUserListData();
    }
  };

  const handleAction = async (type, record = null) => {
    setModalVisible(true);

    if (type === "add") {
      setCurrentRecord(null);
      return;
    }

    try {
      setModalLoading(true);
      const { data } = await getUserById({ id: record.id });
      setCurrentRecord(data.data);
    } catch (error) {
      console.error(error);
      setCurrentRecord(null);
    } finally {
      setModalLoading(false);
    }
  };

  const handleModalOk = async (values) => {
    try {
      setConfirmLoading(true);
      if (currentRecord) {
        const { data } = await editUser({ ...values, id: currentRecord.id });
        if (data.code === 200) {
          messageApi.success("编辑成功");
        }
      } else {
        const { data } = await addUser(values);
        if (data.code === 200) {
          messageApi.success("新增成功");
        }
      }
      setModalVisible(false);
      getUserListData();
    } catch (error) {
      console.error(error);
      messageApi.error(currentRecord ? "编辑失败" : "新增失败");
    } finally {
      setConfirmLoading(false);
      modalRef.current.handleResetForm();
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    modalRef.current.handleResetForm();
  };

  const getUserListData = async (params = null) => {
    try {
      const formInfo = form.getFieldsValue();
      setLoading(true);
      params = params ?? { ...pagination, ...formInfo };
      const { data } = await getUserList(params);
      setUserList(data.list);
      setTotal(data.count);
    } catch (error) {
      console.error(error);
      setUserList([]);
      setTotal(0);
      messageApi.error("获取用户列表失败");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserListData();
  }, []);

  return (
    <div className="user-page">
      {messageContextHolder}
      <div className="user-page-header" style={styles.header}>
        <Button type="primary" onClick={() => handleAction("add")}>
          + 新增用户
        </Button>
        <Form
          form={form}
          layout="inline"
          onFinish={(data) => getUserListData({ ...pagination, ...data })}
        >
          <Form.Item label="" name="name">
            <Input allowClear placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="user-page-content">
        <Table
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={userList}
          loading={loading}
          pagination={{
            total,
            pageSize: pagination.limit,
            onChange: (page, pageSize) => {
              const newPagination = { ...pagination, page, limit: pageSize };
              setPagination(newPagination);
              getUserListData(newPagination);
            },
          }}
        />
      </div>
      <UserModal
        ref={modalRef}
        visible={modalVisible}
        confirmLoading={confirmLoading}
        modalLoading={modalLoading}
        onCancel={handleCancel}
        onOk={handleModalOk}
        record={currentRecord}
      />
    </div>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  operation: {
    display: "flex",
    alignItems: "center",
  },
  popconfirmButtons: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "8px",
  },
};

export default User;
