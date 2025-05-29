import React, { useEffect, useImperativeHandle, forwardRef } from "react";
import { Modal, Form, Input, InputNumber, Select, DatePicker } from "antd";
import dayjs from "dayjs";
import "./UserModal.css";

const formConfig = [
  {
    type: "input",
    lable: "姓名",
    name: "name",
    rules: [{ required: true, message: "请输入姓名" }],
  },
  {
    type: "inputNumber",
    lable: "年龄",
    name: "age",
    min: 18,
    max: 60,
    rules: [{ required: true, message: "请输入年龄" }],
  },
  {
    type: "select",
    lable: "性别",
    name: "sex",
    rules: [{ required: true, message: "请选择性别" }],
    options: [
      { label: "男", value: 1 },
      { label: "女", value: 0 },
    ],
  },
  {
    type: "date",
    lable: "生日",
    name: "birth",
    rules: [{ required: true, message: "请选择生日" }],
  },
  {
    type: "input",
    lable: "地址",
    name: "addr",
    rules: [{ required: true, message: "请输入地址" }],
  },
];

const UserModal = forwardRef(
  ({ visible, onCancel, onOk, record, modalLoading, confirmLoading }, ref) => {
    const [modalForm] = Form.useForm();

    const handleOk = async () => {
      try {
        const values = await modalForm.validateFields();
        if (values.birth) {
          values.birth = values.birth.format("YYYY-MM-DD");
        }
        onOk({ ...values });
      } catch (error) {
        console.error(error);
      }
    };

    const handleResetForm = () => {
      modalForm?.resetFields();
    };

    useImperativeHandle(ref, () => ({
      handleResetForm,
    }));

    useEffect(() => {
      if (visible && record) {
        // 处理日期格式
        const formValues = {
          ...record,
          sex: +record.sex,
          birth: record.birth ? dayjs(record.birth) : null,
        };
        modalForm.setFieldsValue(formValues);
      }
    }, [modalForm, visible, record]);

    return (
      <Modal
        className="user-modal"
        title={record ? "编辑用户" : "新增用户"}
        open={visible}
        onCancel={onCancel}
        onOk={handleOk}
        loading={modalLoading}
        confirmLoading={confirmLoading}
      >
        <Form form={modalForm} layout="vertical">
          {formConfig.map((item) => {
            return (
              <Form.Item
                key={item.name}
                label={item.lable}
                name={item.name}
                rules={item.rules}
              >
                {item.type === "input" && <Input placeholder={item.lable} />}
                {item.type === "inputNumber" && (
                  <InputNumber min={item.min} max={item.max} />
                )}
                {item.type === "select" && (
                  <Select>
                    {item.options.map((option) => (
                      <Select.Option key={option.value} value={option.value}>
                        {option.label}
                      </Select.Option>
                    ))}
                  </Select>
                )}
                {item.type === "date" && <DatePicker />}
              </Form.Item>
            );
          })}
        </Form>
      </Modal>
    );
  }
);

export default UserModal;
