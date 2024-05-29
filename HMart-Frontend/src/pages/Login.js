import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from 'react-router-dom'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import Container from '../components/Container'
import CustomInput from '../components/CustomInput'
import { useFormik } from "formik"
import * as Yup from 'yup'
import { login } from "../features/auth/authSlice"

let schema = Yup.object().shape({
    email: Yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
    password: Yup.string().required("Password là bắt buộc"),
})

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(login(values))
        }
    })

    const authState = useSelector((state) => state.auth);

    const { user, isError, isSuccess, isLoading } = authState;

    useEffect(() => {
        if (isSuccess) {
            navigate("/");
            window.location.reload()
        } else {
            navigate("/login");
        }
    }, [user, isError, isSuccess, isLoading]);

    return (
        <>
            <Meta title={"Đăng Nhập"} />
            <BreadCrumb title='Đăng Nhập' />
            <Container class1="login-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className='text-center mb-3'>Đăng Nhập</h3>
                            <form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                                <CustomInput
                                    type="email"
                                    name='email'
                                    label='Email'
                                    val={formik.values.email}
                                    onCh={formik.handleChange("email")}
                                    onBl={formik.handleBlur("email")}
                                />
                                <div className="error">
                                    {formik.touched.email && formik.errors.email}
                                </div>
                                <CustomInput
                                    type="password"
                                    name='password'
                                    label='Mật khẩu'
                                    val={formik.values.password}
                                    onCh={formik.handleChange("password")}
                                    onBl={formik.handleBlur("password")}
                                />
                                <div className="error">
                                    {formik.touched.password && formik.errors.password}
                                </div>
                                <div>
                                    <Link to='/forgot-password'>Quên Mật Khẩu?</Link>
                                    <div className='mt-3 d-flex justify-content-center gap-15 align-items-center'>
                                        <button className='button border-0' type='submit'>Đăng nhập</button>
                                        <Link to='/signup' className='button signup'>Đăng ký</Link>
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

export default Login