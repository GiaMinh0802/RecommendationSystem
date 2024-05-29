import React, { useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Meta from '../components/Meta'
import Container from '../components/Container'
import check from '../images/v.png'
import cross from '../images/x.png'
import { removeCart } from '../features/cart/cartSlice'
import { createOrder, returnPayment } from '../features/order/orderSlice'

const VNPayReturn = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const query = location.search
    const orderState = useSelector(state => state?.order?.status)

    const shippingInfo = JSON.parse(localStorage.getItem('shippingInfo'))
    const totalAmount = localStorage.getItem('totalAmount')
    const cartProductState = JSON.parse(localStorage.getItem('cartProductState'))
    const typePayment = localStorage.getItem('typePayment')

    useEffect(() => {
        dispatch(returnPayment(query)).then(
            action => {
                if (action.payload.code === "00") {
                    dispatch(createOrder({ totalPrice: totalAmount, shippingInfo, orderItems: cartProductState, typePayment }))
                    dispatch(removeCart())
                }
                localStorage.removeItem('shippingInfo')
                localStorage.removeItem('totalAmount')
                localStorage.removeItem('cartProductState')
                localStorage.removeItem('typePayment')
            }
        )
    }, [])

    return (
        <>
            <Meta title={"HMart E-Commerce"} />
            <Container class1='wishlist-wrapper py-5 home-wrapper-2'>
                <div className="row justify-content-center align-items-center">
                    {
                        orderState?.code === "00" ?
                            (
                                <>
                                    <div className='text-center fs-3'>Thanh Toán Thành Công</div>
                                    <p className='text-center mt-2 mb-3'>Đơn hàng của quý khách đã được thanh toán! <br /> Bạn có thể theo dõi đơn hàng ở mục Đơn Hàng</p>
                                    <img src={check} alt="" style={{ width: '230px', height: '200px', marginTop: '20px' }} />
                                    <div style={{ textAlign: 'center', marginTop: '30px' }}>
                                        <Link to='/order' className='button' style={{ width: '200px' }}>Đơn Hàng</Link>
                                    </div>
                                </>
                            )
                            :
                            (
                                <>
                                    <div className='text-center fs-3'>Thanh Toán Thất Bại</div>
                                    <p className='text-center mt-2 mb-3'>Giao dịch không thành công! <br /> Vui lòng thực hiện lại việc thanh toán!</p>
                                    <img src={cross} alt="" style={{ width: '230px', height: '200px', marginTop: '20px' }} />
                                    <div style={{ textAlign: 'center', marginTop: '30px' }}>
                                        <Link to='/cart' className='button' style={{ width: '200px' }}>Giỏ Hàng</Link>
                                    </div>
                                </>
                            )
                    }

                </div>
            </Container>
        </>
    )
}

export default VNPayReturn