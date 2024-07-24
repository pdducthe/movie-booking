import axios from 'axios'
import { Button, Checkbox, Form, Input, message } from "antd";
import { Typography } from "antd";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { userAction } from "../../../store/actions/userAction";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { USER_SIGNIN } from '../../../../src/store/types/UserManagement/userSignInType'

const { Title } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState(false);
  const { userLogin } = useSelector((state) => state.userReducer)
  console.log(userLogin)
  const onFinish = async (values) => {
    try {
      const result = await axios({
        url: 'https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap',
        method: 'POST',
        headers: {
          TokenCyberSoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMkUiLCJIZXRIYW5TdHJpbmciOiIyMC8wMy8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzkyNzA0MDAwMDAiLCJuYmYiOjE2NTA0NzQwMDAsImV4cCI6MTY3OTQxODAwMH0.S7l5kogAVJjRW8mjJ5gosJraYq5ahYjrBwnMJAaGxlY'
        },
        data: values
      })
      console.log('result', result)
      if (result.data.statusCode === 200) {
        dispatch({
          type: USER_SIGNIN,
          payload: result.data.content,
        })
        navigate("/user");
        message.success('Đăng nhập thành công')
      }
    }
    catch (error) {
      console.log(error.response.data)
      dispatch({
        type: USER_SIGNIN,
        payload: 'Thông tin tài khoản hoặc mật khẩu không chính xác',
      })
      message.error(error.response.data.content);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const checkLogin = () => {

  }

  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
    },
    onSubmit: (values) => {

      // dispatch(userAction.signInUser(values));
      // navigate("/user");
      // history.push("/admin/user"); khong chay duoc trong version react router 6
    }
  });

  // console.log('formik', formik.values)
  return (
    <Container className='Login'>

      <div className="FormWraper bg-white px-6 max-h-max flex flex-col items-center w-3/4   justify-center rounded-lg">
        <Form
          // onSubmitCapture={formik.handleSubmit}

          className="w-3/4 mt-6 max-h-max xl:h-128 flex flex-col justify-center"
          name="basic"
          layout="vertical"
          initialValues={{
            taiKhoan: '',
            matKhau: '',
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="xl:mb-4 text-center">
            <Title className="">
              <p className="text-3xl">Đăng nhập</p>
            </Title>
          </div>
          <Form.Item
            label="Tên đăng nhập"
            name="taiKhoan"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên đăng nhập",
              },
            ]}
          >
            <Input name='taiKhoan' onChange={formik.handleChange} placeholder="Your Username" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="matKhau"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu",
              },
            ]}
          >
            <Input.Password onChange={formik.handleChange} name='matKhau' placeholder="Your Password" />
          </Form.Item>

          <div className="mt-4">
            <div className="text-center mb-4">
              <button type="submit" className="py-1 px-4 bg-blue-700 md:text-lg  rounded-md text-white"
                onClick={checkLogin}
              >
                Đăng nhập
              </button>
            </div>

            <div className="mb-8 text-center">
              Bạn chưa có tài khoản?{" "}
              <NavLink to="/signup" className=" underline text-blue-500">
                {" "}
                Đăng ký
              </NavLink>
            </div>
          </div>
        </Form>
      </div>
      {

      }
    </Container>
  );
}

export default Login

const Container = styled.div`
  &.Login{
    display:flex;
    height:100%;
    align-items:center;
    justify-content:center;
    background:khaki;
    .FormWraper{
      background:white;
    }
  }
`