import { GET_USERLIST } from "../types/UserManagement/userType";
import { USER_SIGNIN} from "../types/UserManagement/userSignInType";
import { ADD_NEWUSER } from "../types/UserManagement/userAddNewType";
import { EDIT_USER } from "../types/UserManagement/userEditType";
import { USER_DELETE } from "../types/UserManagement/userDeleteType";
import {USER_REGISTER} from "../types/UserManagement/userRegisterType"

const stateDefault = {
    userList:[],
    userLogin:{},
    userInfo:{},
    selectedUser:null,
    error:'',
}

export const userReducer = (state=stateDefault,{payload,type})=>{
    switch(type){
        case GET_USERLIST:{
            let data =[...state.userList]
            data = payload
            return {...state,userList:data}
        }
        case  USER_SIGNIN:{
            let data = {...state.userLogin}
            data = payload
            localStorage.setItem(USER_SIGNIN,JSON.stringify(data));
            return {...state,userLogin:data}
        }
        case ADD_NEWUSER:{
            let data =[...state.userList]
            let user = payload
            data.push(user)
            return {...state,userList:data}
        }
        case EDIT_USER:{
            const newUserList = state.userList.map(item=>item.taiKhoan ===payload.taiKhoan?payload:item)
            state.selectedUser = null
            return{...state,userList:newUserList}
        }
        case USER_DELETE: {
            let data = state.userList.filter((item) => item.taiKhoan !== payload)
            
            return { ...state, userInfo: data,error:payload }
        }
        case USER_REGISTER: {
            let data =[...state.userList]
            let user = payload
            data.push(user)
            return {...state,userList:data}
        }
        
        default: return state
    }
}