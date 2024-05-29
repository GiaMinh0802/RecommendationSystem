import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import Container from '../components/Container'
import { AiFillDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { getCart, removeProductCart, updateCart } from '../features/cart/cartSlice'

const Cart = () => {
    const dispatch = useDispatch()
    const [productUpdateDetail, setProductUpdateDetail] = useState(null)
    const [totalAmount, setTotalAmount] = useState(null)
    const cartState = useSelector(state => state?.cart?.carts)
    useEffect(() => {
        dispatch(getCart())
    }, [])
    useEffect(() => {
        if (productUpdateDetail !== null) {
            dispatch(updateCart({ idProd: productUpdateDetail?.cartItemId, quantity: productUpdateDetail?.quantity }))
            setTimeout(() => {
                dispatch(getCart())
            }, 200)
        }
    }, [productUpdateDetail])
    useEffect(() => {
        let sum = 0
        for (let i = 0; i < cartState?.length; i++) {
            sum = sum + (cartState[i].quantity * cartState[i].product?.price)
        }
        setTotalAmount(sum)
    }, [cartState])
    const RemoveFromCart = (id) => {
        dispatch(removeProductCart(id))
        setTimeout(() => {
            dispatch(getCart())
        }, 200)
    }

    return (
        <>
            <Meta title={"Giỏ Hàng"} />
            <BreadCrumb title='Giỏ Hàng' />
            <Container class1="cart-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="cart-header py-3 d-flex justify-content-between align-items-center">
                            <h4 className='cart-col-1'>Sản phẩm</h4>
                            <h4 className='cart-col-2'>Giá</h4>
                            <h4 className='cart-col-3'>Số lượng</h4>
                            <h4 className='cart-col-4'>Tổng</h4>
                        </div>
                        {
                            Array.isArray(cartState) && cartState.length === 0 && (<div className='text-center fs-3'>No Data</div>)
                        }
                        {
                            Array.isArray(cartState) && cartState?.map((item, index) => {
                                return (
                                    <>
                                        <div key={index} className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
                                            <div className='cart-col-1 gap-15 d-flex align-items-center'>
                                                <div className='w-25'>
                                                    <img src={item?.product?.images[0].url} className='img-fluid' alt="productimg" />
                                                </div>
                                                <div className='w-75'>
                                                    <p>{item?.productId?.title}</p>
                                                    <p className='d-flex gap-3'>Màu:
                                                        <ul className='colors ps-0'>
                                                            <li style={{ backgroundColor: item?.color?.title }}></li>
                                                        </ul>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='cart-col-2'>
                                                <h5 className="price">{item?.product?.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h5>
                                            </div>
                                            <div className='cart-col-3 d-flex align-items-center gap-15'>
                                                <div>
                                                    <input onChange={(e) => { setProductUpdateDetail({ cartItemId: item?.product._id, quantity: e.target.value }) }} className='form-control' type="number" min={1} max={999} value={productUpdateDetail?.quantity ? productUpdateDetail?.quantity : item?.quantity} />
                                                </div>
                                                <div>
                                                    <AiFillDelete onClick={() => RemoveFromCart(item?.product._id)} className='text-danger' />
                                                </div>
                                            </div>
                                            <div className='cart-col-4'>
                                                <h5 className="price">{(item?.product?.price * item?.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h5>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                    <div className="col-12 py-2">
                        <div className="d-flex justify-content-between align-items-baseline">
                            {
                                (totalAmount !== null && totalAmount !== 0) &&


                                (<>
                                    <Link to='/product' className='button'>Tiếp tục mua sắm</Link>
                                    <div className='d-flex flex-column align-items-end'>
                                        <h4>Tạm tính: {totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h4>
                                        <p>Phí vận chuyển được tính khi thanh toán</p>
                                        <Link to='/checkout' className='button'>Thanh toán</Link>
                                    </div>
                                </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Cart