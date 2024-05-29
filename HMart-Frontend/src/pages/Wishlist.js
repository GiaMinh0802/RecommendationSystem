import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import cross from '../images/cross.svg'
import noProduct from '../images/noproduct.png'
import Container from '../components/Container'
import { getWishlist, addToWishlist } from '../features/wishlist/wishlistSlice'

const Wishlist = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        GetUserWishlist()
    }, [])
    const GetUserWishlist = () => {
        dispatch(getWishlist())
    }
    const wishlistState = useSelector((state) => state?.wishlist?.wishlists)

    const removeFromWishlist = (id) => {
        dispatch(addToWishlist({ idProd: id }))
        setTimeout(() => {
            dispatch(getWishlist())
        }, 300)
    }
    return (
        <>
            <Meta title={"Sản Phẩm Yêu Thích"} />
            <BreadCrumb title='Sản Phẩm Yêu Thích' />
            <Container class1="wishlist-wrapper py-5 home-wrapper-2">
                <div className="row">
                    {
                        wishlistState && wishlistState?.length === 0 && (<div className='text-center fs-3'>No Data</div>)
                    }
                    {
                        wishlistState && wishlistState?.map((item, index) => {
                            return (
                                <div className="col-3" key={index}>
                                    <div className="wishlist-card position-relative">
                                        <img onClick={() => { removeFromWishlist(item?.product?._id) }} src={cross} alt="cross" className="position-absolute cross img-fluid" />
                                        <div className="wishlist-card-image bg-white">
                                            <img src={item?.product?.images && item?.product?.images[0]?.url ? item?.product?.images[0].url : noProduct} className='img-fluid d-block mx-auto' width={160} alt="watch" />
                                        </div>
                                        <div className='py-3 px-3'>
                                            <h5 className='title'>{item?.product?.title}</h5>
                                            <h6 className='price'>{item?.product?.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h6>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </Container>
        </>
    )
}

export default Wishlist