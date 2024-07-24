import axios from 'axios'
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
} from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { USER_REGISTER } from '../../../store/types/UserManagement/userRegisterType';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const SignUp = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async(values) => {
    console.log('Received values of form: ', values);
    try {
      const result = await axios({
          url: 'https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy',
          method: 'POST',
          headers: {
              "TokenCyberSoft": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMkUiLCJIZXRIYW5TdHJpbmciOiIyMC8wMy8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzkyNzA0MDAwMDAiLCJuYmYiOjE2NTA0NzQwMDAsImV4cCI6MTY3OTQxODAwMH0.S7l5kogAVJjRW8mjJ5gosJraYq5ahYjrBwnMJAaGxlY',
          },
          data: values
      })
      console.log('result', result)
      if (result.data.statusCode === 200) {
          dispatch({
              type: USER_REGISTER,
              payload: result.data.content,
          })
          message.success('Tạo tài khoản thành công')
          navigate("/login")
      }
  } catch (error) {
      console.log(error.response.data)
      message.error(error.response.data.content)
  }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="USD">$</Option>
        <Option value="CNY">¥</Option>
      </Select>
    </Form.Item>
  );

  // const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);

  const onWebsiteChange = (value) => {
    if (!value) {
      // setAutoCompleteResult([]);
    } else {
      // setAutoCompleteResult(['.com', '.org', '.net'].map(domain => `${value}${domain}`));
    }
  };

  // const websiteOptions = autoCompleteResult.map(website => ({
  //   label: website,
  //   value: website,
  // }));

  return (
    <Container className='SignUp h-full'>
      <div className='FormWraper bg-white px-6 flex flex-col items-center justify-center rounded-lg h-full '>
        <Form
          className='border border-light'
          style={{ padding: '3rem 5rem' }}
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            residence: ['zhejiang', 'hangzhou', 'xihu'],
            prefix: '86',
          }}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="matKhau"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('matKhau') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="soDT"
            label="Phone Number"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="hoTen"
            label="Full Name"
            rules={[{ required: true, message: 'Please input your name' }]}
          >
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>
          <Form.Item
            name="taiKhoan"
            label="User"
            rules={[{ required: true, message: 'Please input your user' }]}
          >
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>
          

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>

      </div>

    </Container>

  );
};

export default SignUp;

const Container = styled.div`
  &.Login{
    display:flex;
    /* height:100%; */
    align-items:center;
    justify-content:center;
    background:khaki;
    .FormWraper{
      background:white;
      
    }
  }
`