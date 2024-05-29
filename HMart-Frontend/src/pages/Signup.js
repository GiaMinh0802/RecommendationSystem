import React from "react"
import { useDispatch } from "react-redux"
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import Container from '../components/Container'
import CustomInput from '../components/CustomInput'
import { useFormik } from "formik"
import * as Yup from 'yup'
import { register } from "../features/auth/authSlice"

let schema = Yup.object().shape({
  firstname: Yup.string().required('FirstName is required'),
  lastname: Yup.string().required('LastName is required'),
  email: Yup.string().email("Email should be valid").required("Email is required"),
  mobile: Yup.string().required("Mobile is required"),
  password: Yup.string().required("Password is required"),
})

const Signup = () => {
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      password: ""
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(register(values))
      formik.resetForm()
    }
  })

  return (
    <>
      <Meta title={"Đăng Ký"} />
      <BreadCrumb title='Đăng Ký' />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className='text-center mb-3'>Đăng Ký</h3>
              <form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                <CustomInput
                  type="text"
                  name='firstname'
                  label='Họ'
                  val={formik.values.firstname}
                  onCh={formik.handleChange("firstname")}
                  onBl={formik.handleBlur("firstname")}
                />
                <div className="error">
                  {formik.touched.firstname && formik.errors.firstname}
                </div>
                <CustomInput
                  type="text"
                  name='lastname'
                  label='Tên'
                  val={formik.values.lastname}
                  onCh={formik.handleChange("lastname")}
                  onBl={formik.handleBlur("lastname")}
                />
                <div className="error">
                  {formik.touched.lastname && formik.errors.lastname}
                </div>
                <CustomInput
                  type="tel"
                  name='mobile'
                  label='Số điện thoại'
                  val={formik.values.mobile}
                  onCh={formik.handleChange("mobile")}
                  onBl={formik.handleBlur("mobile")}
                />
                <div className="error">
                  {formik.touched.mobile && formik.errors.mobile}
                </div>
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
                  <div className='mt-3 d-flex justify-content-center gap-15 align-items-center'>
                    <button className='button border-0' type='submit'>Đăng ký</button>
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

export default Signup