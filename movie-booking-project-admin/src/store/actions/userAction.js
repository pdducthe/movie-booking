import axios from 'axios'
import { GET_USERLIST } from '../types/UserManagement/userType'
import { USER_SIGNIN } from '../types/UserManagement/userSignInType'
import { ADD_NEWUSER } from '../types/UserManagement/userAddNewType'
import { EDIT_USER } from '../types/UserManagement/userEditType'
import { USER_DELETE } from '../types/UserManagement/userDeleteType'
import { USER_REGISTER } from '../types/UserManagement/userRegisterType'

export const userAction = {
    getUserList: (tenUser = '') => {
        if (tenUser.trim() !== '') {
            return async (dispatch) => {
                const result = await axios({
                    url: `https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01&tuKhoa=${tenUser}`,
                    method: 'GET',
                    headers: {
                        TokenCyberSoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMkUiLCJIZXRIYW5TdHJpbmciOiIyMC8wMy8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzkyNzA0MDAwMDAiLCJuYmYiOjE2NTA0NzQwMDAsImV4cCI6MTY3OTQxODAwMH0.S7l5kogAVJjRW8mjJ5gosJraYq5ahYjrBwnMJAaGxlY'
                    }
                })
                dispatch({
                    type: GET_USERLIST,
                    payload: result.data.content,
                })
            }
        }
        return async (dispatch) => {
            const result = await axios({
                url: `https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01`,
                method: 'GET',
                headers: {
                    TokenCyberSoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMkUiLCJIZXRIYW5TdHJpbmciOiIyMC8wMy8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzkyNzA0MDAwMDAiLCJuYmYiOjE2NTA0NzQwMDAsImV4cCI6MTY3OTQxODAwMH0.S7l5kogAVJjRW8mjJ5gosJraYq5ahYjrBwnMJAaGxlY'
                }
            })
            dispatch({
                type: GET_USERLIST,
                payload: result.data.content,
            })
        }

    },
    signInUser: (signInData) => {
        return async (dispatch) => {
            // try {
            //     const result = await axios({
            //         url: 'https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap',
            //         method: 'POST',
            //         headers: {
            //             TokenCyberSoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMkUiLCJIZXRIYW5TdHJpbmciOiIyMC8wMy8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzkyNzA0MDAwMDAiLCJuYmYiOjE2NTA0NzQwMDAsImV4cCI6MTY3OTQxODAwMH0.S7l5kogAVJjRW8mjJ5gosJraYq5ahYjrBwnMJAaGxlY'
            //         },
            //         data: signInData
            //     })
            //     console.log('result', result)
            //     if (result.data.statusCode === 200) {
            //         dispatch({
            //             type: USER_SIGNIN,
            //             payload: result.data.content,
            //         })
            //     }
            // }
            // catch (error) {
            //     console.log(error.response.data)
            //     dispatch({
            //         type: USER_SIGNIN,
            //         payload: 'Thông tin tài khoản hoặc mật khẩu không chính xác',
            //     })
            // }
        }
    },
    addNewUser: (userData) => {
        return async (dispatch) => {
            const result = await axios({
                url: 'https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung',
                method: 'POST',
                headers: {
                    "TokenCyberSoft": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMkUiLCJIZXRIYW5TdHJpbmciOiIyMC8wMy8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzkyNzA0MDAwMDAiLCJuYmYiOjE2NTA0NzQwMDAsImV4cCI6MTY3OTQxODAwMH0.S7l5kogAVJjRW8mjJ5gosJraYq5ahYjrBwnMJAaGxlY',

                    "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidXNlclRlc3QwMSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InVzZXJUZXN0MDFAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIlF1YW5UcmkiLCJ1c2VyVGVzdDAxQGdtYWlsLmNvbSIsIkdQMDEiXSwibmJmIjoxNjY3MjQ0NDc1LCJleHAiOjE2NjcyNDgwNzV9.fkMN7S09HVQPjfNPITN3pTUWus8N21juyAzzTU-93vI',

                },
                data: userData
            })
            console.log('result', userData)
            dispatch({
                type: ADD_NEWUSER,
                payload: result.data.content,
            })
        }
    },
    updateUser: (userData) => {
        return async (dispatch) => {
            const result = await axios({
                url: 'https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung',
                method: 'POST',
                headers: {
                    "TokenCyberSoft": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMkUiLCJIZXRIYW5TdHJpbmciOiIyMC8wMy8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzkyNzA0MDAwMDAiLCJuYmYiOjE2NTA0NzQwMDAsImV4cCI6MTY3OTQxODAwMH0.S7l5kogAVJjRW8mjJ5gosJraYq5ahYjrBwnMJAaGxlY',

                    "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidXNlclRlc3QwMSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InVzZXJUZXN0MDFAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIlF1YW5UcmkiLCJ1c2VyVGVzdDAxQGdtYWlsLmNvbSIsIkdQMDEiXSwibmJmIjoxNjY3MjQ0NDc1LCJleHAiOjE2NjcyNDgwNzV9.fkMN7S09HVQPjfNPITN3pTUWus8N21juyAzzTU-93vI',

                },
                data: userData
            })
            console.log('result', userData)
            dispatch({
                type: EDIT_USER,
                payload: result.data.content,
            })
        }
    },
    deleteUser: (userData) => {
        return async (dispatch) => {
            // try {
            //     const result = await axios({
            //         url: `https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${userData}`,
            //         method: 'DELETE',
            //         headers: {
            //             "TokenCyberSoft": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMkUiLCJIZXRIYW5TdHJpbmciOiIyMC8wMy8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzkyNzA0MDAwMDAiLCJuYmYiOjE2NTA0NzQwMDAsImV4cCI6MTY3OTQxODAwMH0.S7l5kogAVJjRW8mjJ5gosJraYq5ahYjrBwnMJAaGxlY',

            //             "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidXNlclRlc3QwMSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InVzZXJUZXN0MDFAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIlF1YW5UcmkiLCJ1c2VyVGVzdDAxQGdtYWlsLmNvbSIsIkdQMDEiXSwibmJmIjoxNjY3MjQ0NDc1LCJleHAiOjE2NjcyNDgwNzV9.fkMN7S09HVQPjfNPITN3pTUWus8N21juyAzzTU-93vI',
            //         },
            //     })
            //     if (result.data.statusCode === 200) {
            //         console.log('result', result)
            //         dispatch({
            //             type: USER_DELETE,
            //             payload: result.data.content,
            //         })
            //     }
            // }
            // catch (error) {
            //     console.error(error.response.data)
            //     console.log(error.response.data)
            //     dispatch({
            //         type: USER_DELETE,
            //         payload: `Tài khoản không xoá được vì đã đặt vé !`,
            //     })
            // }
            // if (result.data.statusCode === 500) {
            //     console.log('wanirng zone')
            //     dispatch({
            //         type: USER_DELETE,
            //         payload: `Tài khoản ${userData} không xoá được vì đã đặt vé !`,
            //     })
            // }
        }
    },
    registerUser: (userData) => {
        return async (dispatch) => {
            // try {
            //     const result = await axios({
            //         url: 'https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy',
            //         method: 'POST',
            //         headers: {
            //             "TokenCyberSoft": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMkUiLCJIZXRIYW5TdHJpbmciOiIyMC8wMy8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzkyNzA0MDAwMDAiLCJuYmYiOjE2NTA0NzQwMDAsImV4cCI6MTY3OTQxODAwMH0.S7l5kogAVJjRW8mjJ5gosJraYq5ahYjrBwnMJAaGxlY',
            //         },
            //         data: userData
            //     })
            //     console.log('result', userData)
            //     if (result.data.statusCode === 200) {
            //         dispatch({
            //             type: USER_REGISTER,
            //             payload: result.data.content,
            //         })
            //     }
            // } catch (error) {
            //     console.log(error.response.data)
            // }
        }
    },
}