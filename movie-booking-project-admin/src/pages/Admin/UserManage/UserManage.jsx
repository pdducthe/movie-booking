import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Space, Table, Tag, Input, message, Popconfirm } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  VideoCameraAddOutlined,
} from "@ant-design/icons";
import axios from 'axios'
import styled from 'styled-components';
import { AudioOutlined } from '@ant-design/icons';
import { confirm } from "react-confirm-box";
import { userReducer } from '../../../store/reducers/userReducer'
import { userAction } from '../../../store/actions/userAction';
import AddUser from '../AddUser/AddUser'
import { USER_DELETE } from '../../../../src/store/types/UserManagement/userDeleteType'
import style from './style.scss';
import EditUser from '../EditUser/EditUser';
import DeleteFilmWarning from '../DeleteFilmWarning/DeleteFilmWarning';

const { Search } = Input;




const UserManage = () => {
  const dispatch = useDispatch()
  const { userList } = useSelector((state) => state.userReducer)
  const { userLogin } = useSelector((state) => state.userReducer)
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [editUserInfo, setEditUserInfo] = useState({});
  const [isOpenModalModify, setOpenModalModify] = useState(false);
  const [visible, setVisible] = useState(false);
  const [update, setUpdate] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const { error } = useSelector((state) => state.userReducer)
  const [login, setLogin] = useState(false)

  const userStatus = JSON.parse(window.localStorage.getItem('USER_SIGNIN'));

  const columns = [
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
      width: 150,
      // align:'center',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
      // align:'center',
      width: 150,
      textWrap: 'word-break',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 180,
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Mật khẩu",
      dataIndex: "matKhau",
      key: "matKhau",
      align: 'center',
      width: 150,

      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "soDT",
      key: "soDT",
      width: 100,
      align: 'center',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Loại Người Dùng",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
      width: 150,
      align: 'center',
      render: (text) => {
        return (
          <span>
            {text == "KhachHang" ? (
              <Tag color="purple">Khách hàng</Tag>
            ) : (
              <Tag color="orange">Quản Trị</Tag>
            )}
          </span>
        );
      },
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      align: 'center',
      render: (action, item) => {
        return (
          <>
            <Button
              className="edit transition duration-200 border-none mr-1 "
              onClick={() => {
                onEdit(item);
                setEditUserInfo(item);
                console.log('editing item', item)
              }}
            >
              <EditOutlined />
            </Button>
            <Button className="delete transition duration-200 border-none ml-1">
              <Popconfirm
                title="Are you sure to delete this user?"
                onConfirm={() => { confirm(item) }}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <span href="#" className="fas fa-trash-alt text-white block">
                  <a href="#" className='block'></a>
                </span>

                {/* <a href="#">Delete</a> */}
              </Popconfirm>

            </Button>
            {/* <Button
              className="delete transition duration-200 border-none mr-1"
              onClick={() => {
                onDelete(item);

                // onClick(onConfirm, item)
                console.log('item', item)
              }}
            >

              <DeleteOutlined />
            </Button> */}
          </>
        );
      },
    },
  ];
  const data = userList


  useEffect(() => {
    dispatch(userAction.getUserList())
    console.log('userlist', data)
  }, [update])

  //xét điều kiện login
  useEffect(() => {
    //nếu userStatus có tồn tại (khác null) thì mới set lại login
    if (userStatus !== null) {
      setLogin(true)
    }
  }, [userStatus])

  console.log('userList', data)
  const handleAddNewAccount = () => {
    if (login !== true) {
      message.warning('You need to login to use this function')
    }
    else {
      setIsOpenModal(true);
    }
  };

  const onSearch = (value) => {
    dispatch(userAction.getUserList(value))
    console.log(value);
  }

  const handleInputChange = (e) => {
    if (e.target.value != "") {
      setSearchInput(e.target.value);
    } else if (e.target.value == "") {
      setUpdate(Math.random());
    }
  };

  const onEdit = () => {
    if (login !== true) {
      message.warning('You need to login to use this function')
    }
    else {
      setOpenModalModify(true);
    }
    // setEditUserInfo(userInfor);
  }

  const onDelete = (item) => {

    let result = confirm("Want to delete?");
    if (result) {
      console.log('delete this item')
    }
  }

  const confirm = async (item) => {
    if (login !== true) {
      message.warning('You need to login to use this function')
    }
    else {

      try {
        const result = await axios({
          url: `https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${item.taiKhoan}`,
          method: 'DELETE',
          headers: {
            "TokenCyberSoft": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMkUiLCJIZXRIYW5TdHJpbmciOiIyMC8wMy8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzkyNzA0MDAwMDAiLCJuYmYiOjE2NTA0NzQwMDAsImV4cCI6MTY3OTQxODAwMH0.S7l5kogAVJjRW8mjJ5gosJraYq5ahYjrBwnMJAaGxlY',

            "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidXNlclRlc3QwMSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InVzZXJUZXN0MDFAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIlF1YW5UcmkiLCJ1c2VyVGVzdDAxQGdtYWlsLmNvbSIsIkdQMDEiXSwibmJmIjoxNjY3MjQ0NDc1LCJleHAiOjE2NjcyNDgwNzV9.fkMN7S09HVQPjfNPITN3pTUWus8N21juyAzzTU-93vI',
          },
        })
        if (result.data.statusCode === 200) {
          console.log('result', result)
          dispatch({
            type: USER_DELETE,
            payload: result.data.content,
          })
          message.success('Xoá người dùng thành công !');
        }
      }
      catch (error) {
        console.log(error.response.data)
        dispatch({
          type: USER_DELETE,
          payload: `Tài khoản không xoá được vì đã đặt vé !`,
        })
        message.error("Không thể xoá người dùng vì đã đặt vé")
      }

    }
    // dispatch(userAction.deleteUser(item.taiKhoan))

  };

  const cancel = (e) => {

  };

  const onConfirm = {
    closeOnOverlayClick: false,
    labels: {
      confirmable: "Confirm",
      cancellable: "Cancel"
    }
  };

  return (
    <Container className='UserManage mr-2 ml-2 pt-2'>
      <div className="flex justify-between mb-2">
        <span className='text-2xl semi-bold'>Quản Lý Người Dùng</span>
        <button className="py-2 px-3 bg-blue-500 text-neutral-100 rounded-md hover:bg-blue-700 transition duration-200 text-base"
          onClick={handleAddNewAccount}
        >+ Thêm Người Dùng</button>
      </div>
      <Search
        placeholder="Nhập từ khóa "
        onSearch={onSearch}
        className='mb-5 Search'
        onChange={(e) => {
          handleInputChange(e);
        }}
      />
      <div className=''>
        <Table columns={columns} dataSource={data} rowKey='taiKhoan' scroll={{ x: 500, y: 500 }} />
        {isOpenModal && (
          <AddUser
            isOpenModal={isOpenModal}
            setIsOpenModal={setIsOpenModal}
            setUpdate={setUpdate}
          />
        )}
        {isOpenModalModify && (
          <EditUser
            editUserInfo={editUserInfo}
            isOpenModalModify={isOpenModalModify}
            setOpenModalModify={setOpenModalModify}
            setUpdate={setUpdate}
          />
        )}


      </div>
    </Container>
  )
}

export default UserManage

const Container = styled.div`
&.UserManage{
    button{
    }
    button.delete{
    background-color:tomato;
    border:none;
    color:gray;
    &:hover{
        color:white
    }
    }
    button.edit{
    background-color:deepskyblue;
    border:none;
    color:gray;
    &:hover{
        color:white
    }
    }
    button.create{
    background-color:springgreen;
    border:none;
    color:gray;
    &:hover{
        color:white
    }
    }
    .Search{
    height:3rem;
        input,button{height:3rem}
}
a {     
   display: inline-block;     
   position: relative;    
   z-index: 1;     
   padding: 2em;     
   margin: -2em; 
}

}
`