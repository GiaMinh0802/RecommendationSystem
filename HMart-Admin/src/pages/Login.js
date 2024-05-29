import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../features/auth/authSlice'

let schema = Yup.object().shape({
  email: Yup.string().email("Email không đúng định dạng!").required("Yêu cầu Email"),
  password: Yup.string().required("Yêu cầu mật khẩu"),
})

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
  const authState = useSelector((state) => state)
  const { user, isLoading, isError, isSuccess, message } = authState.auth
  useEffect(() => {
    if (isSuccess) {
      navigate("admin")
      window.location.reload()
    } else {
      navigate("")
    }
  }, [user, isLoading, isError, isSuccess])

  return (
    <div className='py-5' style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-50 bg-white rounded-3 mx-auto p-4">
        <h4 className='text-center title'>Đăng Nhập</h4>
        <p className='text-center'>Đăng nhập vào tài khoản của bạn để tiếp tục</p>
        <div className="error text-center">
          {message.message === "Rejected" ? "Bạn không phải là Admin" : ""}
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name='email'
            label="Địa chỉ Email"
            id="email"
            val={formik.values.email}
            onCh={formik.handleChange("email")}
          />
          <div className="error">
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </div>
          <CustomInput
            type="password"
            name='password'
            label="Mật khẩu"
            id="pass"
            val={formik.values.password}
            onCh={formik.handleChange("password")}
          />
          <div className="error">
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>
          <div className='mb-3 text-end'>
            <Link to='forgot-password' className=''>Quên Mật Khẩu?</Link>
          </div>
          <button className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5" type='submit' style={{ background: "#ffd333" }}>
            Đăng nhập
          </button>
        </form>

      </div>
    </div>
  )
}

export default Login