import { Button, Modal, Select } from "antd";
import React, { useState } from "react";
import { Form, Input, InputNumber, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
// import { getUserServ } from "../../../Services/userServices";
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "../../../store/actions/userAction";

const { Option } = Select;

const layout = {
    labelCol: {
        span: 8,
        offset: 0,
    },
    wrapperCol: {
        span: 16,
    },
    labelAlign: "left",
};
const validateMessages = {
    required: "Bắt buộc nhập ${label}!",
    types: {
        email: "${label} không hợp lệ!",
    },
};

const AddUser = ({ isOpenModal, setIsOpenModal }) => {
    const dispatch = useDispatch();

    return (
        <>
            <Modal
                title="Thêm người dùng mới"
                footer={null}
                centered
                visible={isOpenModal}
                onCancel={() => {
                    setIsOpenModal(false);
                }}
            >
                <div>
                    <Form
                        {...layout}
                        name="nest-messages"
                        onFinish={(values) => {
                            let newAccount = { ...values, maNhom: "GP01" };
                            console.log('newAccount',newAccount)
                            dispatch(userAction.addNewUser(newAccount))
                            setIsOpenModal(false);
                            message.success("Thêm thành công");
                            //   getUserServ
                            //     .postNewAccount(newAccount)
                            //     .then((res) => {
                            //       setIsOpenModal(false);
                            //       setUpdate(res.data.content);
                            //       message.success("Thêm thành công");
                            //     })
                            //     .catch((err) => {
                            //       message.error(err.response.data.content);
                            //     });
                        }}
                        validateMessages={validateMessages}
                        className="w-5/6 mt-2 max-h-max xl:h-128 flex flex-col justify-center mx-auto"
                    >
                        <Form.Item
                            name={["hoTen"]}
                            label="Họ tên"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={["taiKhoan"]}
                            label="Tên đăng nhập"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={["email"]}
                            label="Email"
                            rules={[
                                {
                                    type: "email",
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={["soDT"]}
                            label="Số điện thoại"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    width: "100%",
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            name={["matKhau"]}
                            label="Mật khẩu"
                            rules={[{ required: true }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Mật khẩu"
                            />
                        </Form.Item>
                        <Form.Item
                            name={["maLoaiNguoiDung"]}
                            label="Loại người dùng"
                            rules={[{ required: true }]}
                        >
                            <Select placeholder="Chọn loại người dùng" allowClear>
                                <Option value="KhachHang">Khách hàng</Option>
                                <Option value="QuanTri">Quản trị</Option>
                            </Select>
                        </Form.Item>

                        <div className="text-center mb-8">
                            <button className="py-1 px-4 bg-blue-700 md:text-base rounded-md text-white">
                                Thêm mới
                            </button>
                        </div>
                    </Form>
                </div>
            </Modal>
        </>
    );
};

export default AddUser;

