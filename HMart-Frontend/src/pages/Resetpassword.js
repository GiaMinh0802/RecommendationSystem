import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import Container from '../components/Container'
import CustomInput from '../components/CustomInput'

const Resetpassword = () => {
    return (
        <>
            <Meta title={"Đặt Lại Mật Khẩu"} />
            <BreadCrumb title='Đặt Lại Mật Khẩu' />
            <Container class1="login-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className='text-center mb-3'>Đặt Lại Mật Khẩu</h3>
                            <form action="" className='d-flex flex-column gap-15'>
                                <CustomInput
                                    type="password"
                                    name='password'
                                    label='Password'
                                />
                                <CustomInput
                                    type="password"
                                    name='confpassword'
                                    label='Confirm Password'
                                />
                                <div>
                                    <div className='mt-3 d-flex justify-content-center gap-15 align-items-center'>
                                        <button className='button border-0' type='submit'>Đặt Lại</button>
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

export default Resetpassword