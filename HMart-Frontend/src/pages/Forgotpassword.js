import React from 'react'
import { Link } from 'react-router-dom'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import Container from '../components/Container'
import CustomInput from '../components/CustomInput'

const Forgotpassword = () => {
  return (
    <>
      <Meta title={"Quên Mật Khẩu"} />
      <BreadCrumb title='Quên Mật Khẩu' />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className='text-center mb-3'>Đặt Lại Mật Khẩu Của Bạn</h3>
              <p className='text-center mt-2 mb-3'>Chúng tôi sẽ gửi cho bạn một email để đặt lại mật khẩu của bạn</p>

              <form action="" className='d-flex flex-column gap-15'>
                <CustomInput
                  type="email"
                  name='email'
                  label='Email'
                />
                <div>
                  <div className='mt-3 d-flex justify-content-center flex-column gap-15 align-items-center'>
                    <button className='button border-0' type='submit'>Nhận</button>
                    <Link to='/login'>Huỷ</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Forgotpassword