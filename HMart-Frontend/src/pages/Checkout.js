import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
import Container from '../components/Container'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { removeCart } from '../features/cart/cartSlice'
import { createOrder, createPayment } from '../features/order/orderSlice'
import { getProvinces, getDistricts, getWards } from '../features/address/addressSlice'


let schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  mobile: yup.string().required(),
  province: yup.string().required(),
  district: yup.string().required(),
  ward: yup.string().required(),
  street: yup.string().required(),
  typePayment: yup.string().required()
})

const Checkout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cartState = useSelector(state => state?.cart?.carts)
  const userState = useSelector(state => state?.auth?.user)
  const addressState = useSelector(state => state?.address)
  const [totalAmount, setTotalAmount] = useState(null)
  const [cartProductState, setCartProductState] = useState([])

  useEffect(() => {
    dispatch(getProvinces())
  }, [])

  useEffect(() => {
    let sum = 0
    for (let i = 0; i < cartState?.length; i++) {
      sum = sum + (cartState[i].quantity * cartState[i].price)
    }
    setTotalAmount(sum)
  }, [cartState])

  useEffect(() => {
    let items = []
    for (let i = 0; i < cartState.length; i++) {
      items.push({
        product: cartState[i].product._id,
        color: cartState[i].color._id,
        price: cartState[i].price,
        quantity: cartState[i].quantity,
      })
    }
    setCartProductState(items)
  }, [])

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      mobile: "",
      province: "",
      district: "",
      ward: "",
      street: "",
      typePayment: ""
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const shippingInfo = {
        firstname: values.firstName,
        lastname: values.lastName,
        mobile: values.mobile,
        province: values.province.split('-')[0],
        district: values.district.split('-')[0],
        ward: values.ward.split('-')[0],
        street: values.street
      }
      const typePayment = values.typePayment
      if (typePayment === "COD") {
        dispatch(createOrder({ totalPrice: totalAmount, shippingInfo, orderItems: cartProductState, typePayment }))
        dispatch(removeCart())
        setTimeout(() => {
          navigate('/order')
        }, 500)
      } else {
        const paymentData = {
          "amount": totalAmount,
          "bankCode": typePayment,
          "language": "vn"
        }
        localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
        localStorage.setItem('totalAmount', totalAmount);
        localStorage.setItem('cartProductState', JSON.stringify(cartProductState));
        localStorage.setItem('typePayment', typePayment);
        dispatch(createPayment(paymentData)).then(
          action => {
            window.location.href = action.payload.url
          }
        )
      }
    }
  })

  const handleProvinceChange = (e) => {
    formik.handleChange(e)
    const idProvince = e.target.value.split('-')[1]
    dispatch(getDistricts(idProvince))
  };

  const handleDistrictChange = (e) => {
    formik.handleChange(e)
    const idProvince = formik.values.province.split('-')[1]
    const idDistrict = e.target.value.split('-')[1]
    dispatch(getWards({ idProvince: idProvince, idDistrict: idDistrict }))
  };

  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h4 className="mb-3">Thông Tin Liên Lạc</h4>
              <p className="user-details total">{userState?.firstname + " " + userState?.lastname + " | " + userState?.mobile + " | " + userState?.email}</p>
              <form onSubmit={formik.handleSubmit} action="" className='d-flex gap-15 flex-wrap justify-content-between'>
                <div className='w-100'>
                  <h4 className='mb-3'>Địa Chỉ Nhận Hàng</h4>
                </div>
                <div className='flex-grow-2'>
                  <input name='firstName' value={formik.values.firstName} onChange={formik.handleChange("firstName")} onBlur={formik.handleBlur("firstName")} type="text" placeholder='Họ' className='form-control' />
                  <div className="error ms-2 my-1">
                    {formik.touched.firstName && formik.errors.firstName}
                  </div>
                </div>
                <div className='flex-grow-1'>
                  <input name='lastName' value={formik.values.lastName} onChange={formik.handleChange("lastName")} onBlur={formik.handleBlur("lastName")} type="text" placeholder='Tên' className='form-control' />
                  <div className="error ms-2 my-1">
                    {formik.touched.lastName && formik.errors.lastName}
                  </div>
                </div>
                <div className='flex-grow-1'>
                  <input name='mobile' value={formik.values.mobile} onChange={formik.handleChange("mobile")} onBlur={formik.handleBlur("mobile")} type="text" placeholder='Số điện thoại' className='form-control' />
                  <div className="error ms-2 my-1">
                    {formik.touched.mobile && formik.errors.mobile}
                  </div>
                </div>
                <div className='flex-grow-2'>
                  <select name='province' value={formik.values.province} onChange={handleProvinceChange} onBlur={formik.handleBlur("province")} className="form-control form-select" id=''>
                    <option value="" disabled selected>Tỉnh/ Thành phố</option>
                    {
                      addressState && addressState?.provinces?.map((item, index) => {
                        return (
                          <option key={index} value={`${item.province}-${item._id}`}>{item.province}</option>
                        )
                      })
                    }
                  </select>
                  <div className="error ms-2 my-1">
                    {formik.touched.province && formik.errors.province}
                  </div>
                </div>
                <div className='flex-grow-1'>
                  <select name='district' value={formik.values.district} onChange={handleDistrictChange} onBlur={formik.handleBlur("district")} className="form-control form-select" id=''>
                    <option value="" disabled selected>Quận/ Huyện</option>
                    {
                      addressState && addressState?.districts?.map((item, index) => {
                        return (
                          <option key={index} value={`${item.district}-${item._id}`}>{item.district}</option>
                        )
                      })
                    }
                  </select>
                  <div className="error ms-2 my-1">
                    {formik.touched.district && formik.errors.district}
                  </div>
                </div>
                <div className='flex-grow-1'>
                  <select name='ward' value={formik.values.ward} onChange={formik.handleChange("ward")} onBlur={formik.handleBlur("ward")} className="form-control form-select" id=''>
                    <option value="" disabled selected>Phường/ Xã</option>
                    {
                      addressState && addressState?.wards?.map((item, index) => {
                        return (
                          <option key={index} value={`${item.ward}-${item._id}`}>{item.ward}</option>
                        )
                      })
                    }
                  </select>
                  <div className="error ms-2 my-1">
                    {formik.touched.ward && formik.errors.ward}
                  </div>
                </div>
                <div className='w-100'>
                  <input name='street' value={formik.values.street} onChange={formik.handleChange("street")} onBlur={formik.handleBlur("street")} type="text" placeholder='Tên đường, Tòa nhà, Số nhà' className='form-control' />
                  <div className="error ms-2 my-1">
                    {formik.touched.street && formik.errors.street}
                  </div>
                </div>
                <div className='w-100'>
                  <h4 className='mb-3'>Phương Thức Thanh Toán</h4>
                </div>
                <div className='w-100'>
                  <select name='typePayment' value={formik.values.typePayment} onChange={formik.handleChange("typePayment")} onBlur={formik.handleBlur("typePayment")} className="form-control form-select" id=''>
                    <option value="" disabled selected>Chọn phương thức thanh toán</option>
                    <option value="COD">Thanh toán khi nhận hàng</option>
                    <option value="VNBANK">Thanh toán qua ATM - Tài khoản ngân hàng nội địa</option>
                    <option value="VNPAYQR">Thanh toán qua ứng dụng hỗ trợ VNPAYQR</option>
                    <option value="INTCARD">Thanh toán qua thẻ quốc tế</option>
                  </select>
                  <div className="error ms-2 my-1">
                    {formik.touched.typePayment && formik.errors.typePayment}
                  </div>
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to='/cart' className='text-dark'>
                      <IoIosArrowBack className='me-2' />
                      Giỏ hàng
                    </Link>
                    {cartState.length !== 0 ? (<button className='button' type="submit">Đặt hàng</button>) : null}
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            <div className='border-bottom py-4'>
              {
                Array.isArray(cartState) && cartState?.map((item, index) => {
                  return (
                    <div key={index} className="d-flex gap-10 mb-2 align-items-center">
                      <div className='w-75 d-flex gap-10'>
                        <div className='w-25 position-relative'>
                          <span style={{ "top": "-5px", "right": "-5px" }} className="badge bg-secondary text-white rounded-circle p-2 position-absolute">{item?.quantity}</span>
                          <img className='img-fluid' width={100} height={100} src={item?.product?.images[0].url} alt="productimg" />
                        </div>
                        <div>
                          <h5 className="total-price">{item?.product?.title}</h5>
                          <p className="total-price">{item?.color?.color}</p>
                        </div>
                      </div>
                      <div className='flex-grow-1'>
                        <h5 className='total'>{(item?.price * item?.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h5>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div className='border-bottom py-4'>
              <div className='d-flex justify-content-between align-items-center'>
                <p className='total'>Tổng tiền hàng</p>
                <p className='total-price'>{(totalAmount ? totalAmount : 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
              </div>
              <div className='d-flex justify-content-between align-items-center'>
                <p className='mb-0 total'>Phí vận chuyển</p>
                <p className='mb-0 total-price'>{(0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
              </div>
            </div>
            <div className='d-flex justify-content-between align-items-center py-4'>
              <h4 className='total'>Tổng thanh toán</h4>
              <h5 className='total-price'>{(totalAmount ? totalAmount : 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Checkout