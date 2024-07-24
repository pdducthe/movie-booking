import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Login from '../../../../pages/Admin/Login/Login';
import { localService } from "../../../../Services/localService";
import { Button, message, Space } from 'antd';

const Header = () => {
    const { userLogin } = useSelector(state => state.userReducer)
    const handleLogout = () => {
        window.localStorage.removeItem('USER_SIGNIN');
        window.location.href = "/login";
    };
    const [login, setLogin] = useState(false)
    const navigate = useNavigate()
    console.log('login', login)
    //lấy state từ localStorage
    const userStatus = JSON.parse(window.localStorage.getItem('USER_SIGNIN'));

    useEffect(() => {
        //nếu userStatus có tồn tại (khác null) thì mới set lại login
        if (userStatus !== null) {
            setLogin(true)
        }
    }, [userStatus])

    const handleLogin = ()=> {
        navigate("login")
    }

    const checkLoginStatus = () => {
        if (login === false) {
            // message.error('You need to login to use this function');
        }
        navigate("user")
    }

    return (
        <Container className="container mx-auto Login">
            <div className="container flex justify-between mx-auto h-20 items-center border-2 bg-amber-50">
                <div className="w-1/6 border-r-2 text-xl font-medium text-orange-700 h-full flex items-center justify-center">
                    DASHBOARD
                </div>
                <div className="w-5/6">
                    {login === false ? (
                        <div>
                            <button
                                    className="py-2 px-3 bg-blue-500 text-white rounded-md ml-4"
                                    onClick={() => {
                                        handleLogin();
                                    }}
                                >
                                    Đăng nhập
                                </button>
                        </div>)
                        : (
                            <div className="LoginUser pr-12">
                                Xin chào
                                <span className="ml-3 text-lg text-orange-700">{userLogin.taiKhoan}</span>
                                <button
                                    className="py-2 px-3 bg-red-500 text-white rounded-md ml-4"
                                    onClick={() => {
                                        handleLogout();
                                    }}
                                >
                                    Đăng xuất
                                </button>
                            </div>
                        )}
                </div>
            </div>
            <div className="flex border-2 border-t-0 h-screen">
                <div className="w-1/6 flex flex-col border-r-2 bg-amber-50">
                    <NavLink to="user" onClick={checkLoginStatus}>
                        <button className="text-lg font-medium mt-8 mb-4 py-2 w-full text-orange-500 hover:underline" >
                            Quản lý người dùng
                        </button>
                    </NavLink>
                    <NavLink to="film">
                        <button className="text-lg font-medium py-2 w-full  text-orange-500 hover:underline" >
                            Quản lý phim
                        </button>
                    </NavLink>
                </div>
                <div className="w-5/6 flex items-center justify-center">
                    <main className='h-full w-full'>

                        <Outlet />

                    </main>
                </div>
            </div>
        </Container>
    )
}

export default Header

const Container = styled.div`
    &.Login{
        .LoginUser{
            display:flex;
            align-items:center;
            justify-content:flex-end
        }
    }
`