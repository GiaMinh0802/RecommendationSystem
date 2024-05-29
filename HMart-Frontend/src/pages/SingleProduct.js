import React, { useEffect, useState } from 'react'
import ReactStars from 'react-rating-stars-component'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import ProductCard from '../components/ProductCard'
import ReactImageZoom from 'react-image-zoom'
import Color from '../components/Color'
import { AiOutlineHeart } from 'react-icons/ai'
import Container from '../components/Container'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from "react-toastify"
import { getOrder } from '../features/order/orderSlice'
import { getProducts, getProduct } from '../features/product/productSlice'
import { getCart, addToCart } from '../features/cart/cartSlice'
import { getRating, ratingProduct } from '../features/rating/ratingSlice'

const SingleProduct = () => {
    const [color, setColor] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [starReview, setStarReview] = useState(0)
    const [commentReview, setCommentReview] = useState("")
    const [alreadyAdded, setAlreadyAdded] = useState(false)
    const [orderedProduct, setorderedProduct] = useState(false)
    const location = useLocation()
    const idProd = location.pathname.split("/")[2]
    const idUser = useSelector((state) => state?.auth?.user?._id)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const productState = useSelector((state) => state?.product?.product)
    const productsState = useSelector((state) => state?.product?.products)
    const cartState = useSelector(state => state?.cart?.carts)
    const orderState = useSelector(state => state?.order?.orders)
    const ratingState = useSelector(state => state?.rating?.ratings)

    useEffect(() => {
        dispatch(getProduct(idProd))
        dispatch(getRating(idProd))
        dispatch(getCart())
        dispatch(getOrder())
        dispatch(getProducts({ limit: 12, page: 1 }))
    }, [])

    useEffect(() => {
        for (let index = 0; index < cartState.length; index++) {
            if (idProd === cartState[index]?.product?._id) {
                setAlreadyAdded(true)
            }
        }
    })

    useEffect(() => {
        for (let i = 0; i < orderState.length; i++) {
            let order = orderState[i]
            for (let j = 0; j < order.orderItems.length; j++) {
                let products = order?.orderItems[j]
                if (idProd === products.product._id) {
                    setorderedProduct(true)
                }
            }
        }
    })

    const uploadCart = () => {
        if (color === null) {
            toast.error("Vui lòng chọn màu!")
            return false
        } else {
            dispatch(addToCart({ idProd: productState?._id, quantity, color, price: productState?.price }))
            navigate('/cart')
            window.location.reload()
        }
    }

    const RatingProduct = () => {
        if (starReview === 0) {
            toast.error("Vui lòng chọn số sao!")
            return false
        } else {
            dispatch(ratingProduct({ idProd: idProd, starReview, commentReview }))
            setTimeout(() => {
                dispatch(getProduct(idProd))
            }, 300)
        }
    }

    const linkimg = "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg"
    const props = {
        width: 400,
        height: 600,
        zoomWidth: 600,
        img: productState?.images[0]?.url ? productState?.images[0]?.url : linkimg
    }
    const copyToClipboard = (text) => {
        var textField = document.createElement("textarea")
        textField.innerText = text
        document.body.appendChild(textField)
        textField.select()
        document.execCommand("copy")
        textField.remove()
    }

    const [similarProduct, setSimilarProduct] = useState()
    useEffect(() => {
        setSimilarProduct(productsState)
    }, [productsState])

    return (
        <>
            <Meta title={productState?.title} />
            <BreadCrumb title={productState?.title} />
            <Container class1="main-product-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-6">
                        <div className="main-product-image">
                            <div>
                                <ReactImageZoom {...props} />
                            </div>
                        </div>
                        <div className="other-product-images d-flex flex-wrap gap-15">
                            {productState?.images.map((item, index) => {
                                return (
                                    <div>
                                        <img src={item?.url} className='img-fluid' alt="watch" />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="main-product-details">
                            <div className="border-bottom">
                                <h3 className='title'>{productState?.title}</h3>
                            </div>
                            <div className="border-bottom py-3">
                                <p className='price'>{productState?.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                <div className="d-flex align-items-center gap-10">
                                    <ReactStars count={5} size={24} value={productState?.totalRating ? productState?.totalRating : 0} edit={false} activeColor='#ffd700' />
                                    <p className='mb-0 t-review'>({ratingState?.length} Đánh giá)</p>
                                </div>
                                {
                                    orderedProduct && (<a className='review-btn' href="#review">Đánh giá sản phẩm</a>)
                                }

                            </div>
                            <div className="py-3">
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Thương hiệu :</h3>
                                    <p className='product-data'>{productState?.brand.title}</p>
                                </div>
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Danh mục :</h3>
                                    <p className='product-data'>{productState?.category.title}</p>
                                </div>
                                {
                                    alreadyAdded === false &&
                                    <>
                                        <div className='d-flex gap-10 flex-column mt-2 mb-3'>
                                            <h3 className='product-heading'>Màu sắc :</h3>
                                            <Color setColor={setColor} colorData={productState?.colors} />
                                        </div>
                                    </>
                                }
                                <div className='d-flex align-items-center gap-15 flex-row mt-2 mb-3'>
                                    {
                                        alreadyAdded === false &&
                                        <>
                                            <h3 className='product-heading'>Số lượng :</h3>
                                            <div className=''>
                                                <input type="number" name='' min={1} max={999} className='form-control' style={{ width: "70px" }} id='' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                                            </div>
                                        </>
                                    }
                                    <div className={alreadyAdded ? "ms-0" : "ms-5" + 'd-flex align-items-center gap-30 ms-5'}>
                                        <button className='button border-0' type='submit' onClick={() => { alreadyAdded ? navigate('/cart') : uploadCart() }}>
                                            {alreadyAdded ? "Đến Giỏ Hàng" : "Thêm Vào Giỏ Hàng"}
                                        </button>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center gap-15'>
                                    <div>
                                        <a href="/wishlist">
                                            <AiOutlineHeart className='fs-5 me-2' />
                                            Sản phẩm yêu thích
                                        </a>
                                    </div>
                                </div>

                                <div className='d-flex gap-10 align-items-center my-3'>
                                    <h3 className='product-heading'>Linh sản phẩm :</h3>
                                    <a href='#/' onClick={() => { copyToClipboard(window.location.href) }}>
                                        Copy Link Sản Phẩm
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="description-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h4>Mô tả sản phẩm</h4>
                        <div className="bg-white p-3">
                            <p dangerouslySetInnerHTML={{
                                __html: productState?.description
                            }}>
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="reviews-wrapper home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 id="review">Đánh Giá Sản Phẩm</h3>
                        <div className="review-inner-wrapper">
                            <div className="review-head d-flex justify-content-between align-items-end">
                                <div>
                                    <h4 className='mb-2'>Khách Hàng Đánh Giá</h4>
                                    <div className='d-flex align-items-center gap-10'>
                                        <ReactStars count={5} size={24} value={productState?.totalRating ? productState?.totalRating : 0} edit={false} activeColor='#ffd700' />
                                        <p className='mb-0'>Dựa vào {ratingState?.length} đánh giá</p>
                                    </div>
                                </div>
                            </div>
                            {
                                orderedProduct && (
                                    <div className="review-form py-4">
                                        <h4>Đánh giá sản phẩm</h4>
                                        <form className='d-flex flex-column gap-15'>
                                            <div>
                                                <ReactStars type='number' name='star' value={starReview} onChange={(e) => setStarReview(e)} count={5} size={24} edit={true} activeColor='#ffd700' />
                                            </div>
                                            <div>
                                                <textarea type='text' name="comment" value={commentReview} onChange={(e) => setCommentReview(e.target.value)} className='w-100 form-control' cols="30" rows="4" placeholder='Hãy chia sẻ nhận xét cho sản phẩm này bạn nhé!'></textarea>
                                            </div>
                                            <div className='d-flex justify-content-end'>
                                                <button className='button border-0' onClick={() => RatingProduct()}>Gửi đánh giá</button>
                                            </div>
                                        </form>
                                    </div>
                                )
                            }
                            <div className="reviews mt-4">
                                {
                                    ratingState && ratingState.slice(0, 10)?.map((item, index) => {
                                        return (
                                            <div className="review" key={index}>
                                                <div className="d-flex gap-10 align-items-center">
                                                    <h6 className='mb-0'>{item?.user._id === idUser ? "Tôi" : item?.user?.firstname + " " + item?.user?.lastname}</h6>
                                                </div>
                                                <ReactStars count={5} size={24} value={item?.star} edit={false} activeColor='#ffd700' />
                                                <p className='mt-3'>{item?.comment}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="popular-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading">Similar Products</h3>
                    </div>
                    <div className="row">
                        <ProductCard data={similarProduct} />
                    </div>
                </div>

            </Container>
        </>
    )
}

export default SingleProduct