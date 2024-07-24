import React from 'react'
import { Outlet } from 'react-router-dom'
import Login from '../../pages/Admin/Login/Login'
import Header from '../Organisms/Admin/Header/Header'
import Footer from '../Organisms/Admin/Footer/Footer'
import styled from 'styled-components'
const AdminMainLayout = () => {
  return (
    <Container className='MainLayout'>
      <Header/>
     
      <Footer/>
    </Container>
  )
}

export default AdminMainLayout

//styled không hỗ trợ extend hay mixin
const Container = styled.div`
&.MainLayout{
  /* min-height:100vh; */
  height:100%;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  .Header{

  }

  .main-content{
    flex:1;
  }

  .Footer{

  }
}
`