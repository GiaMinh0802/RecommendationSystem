import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from 'react-router-dom'
import Meta from '../components/Meta'
import Marquee from 'react-fast-marquee'
import Container from '../components/Container'
import { services } from '../utils/Data'
import ReactStars from 'react-rating-stars-component'
import wish from '../images/wish.svg'
import view from '../images/view.svg'
import noProduct from '../images/noproduct.png'
import { getProducts, getProductsForRecommenders } from '../features/product/productSlice'
import { getWishlist, addToWishlist } from '../features/wishlist/wishlistSlice'
import { getCart } from '../features/cart/cartSlice'

const Home = () => {
  const productState = useSelector(state => state?.product?.products)
  const productRecommenderState = useSelector((state) => state?.product?.productsRecommenders)
  const authState = useSelector(state => state?.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    loadPage()
  }, [])
  const loadPage = () => {
    dispatch(getProductsForRecommenders())
    dispatch(getCart())
    dispatch(getWishlist())
    dispatch(getProducts({ limit: 8, page: 1 }))
  }
  const AddToWishlist = (id) => {
    dispatch(addToWishlist({"idProd": id}))
  }
  return (
    <>
      <Meta title={"HMart E-Commerce"} />
      <Container class1='home-wrapper-1 py-5'>
        <div className="row">
          <div className="col-6">
            <div className="main-banner position-relative">
              <img src="images/main-banner-1.jpg" className='img-fluid rounded-3' alt="main banner" />
              <div className="main-banner-content position-absolute">
                <h4>SUPERCHARGED FOR PROS</h4>
                <h5>iPad S13+ Pro</h5>
                <p>From $999.00 or $41.62/mo</p>
                <Link className='button'>BUY NOW</Link>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
              <div className="small-banner position-relative">
                <img src="images/catbanner-01.jpg" className='img-fluid rounded-3' alt="main banner" />
                <div className="small-banner-content position-absolute">
                  <h4>Best Sale</h4>
                  <h5>Laptops Max</h5>
                  <p>From $1699.00 or <br /> $64.62/mo</p>
                </div>
              </div>
              <div className="small-banner position-relative">
                <img src="images/catbanner-03.jpg" className='img-fluid rounded-3' alt="main banner" />
                <div className="small-banner-content position-absolute">
                  <h4>NEW ARRIVAL</h4>
                  <h5>Buy iPad Air</h5>
                  <p>From $599.00 or <br /> $49.91/mo for 12 mo</p>
                </div>
              </div>
              <div className="small-banner position-relative">
                <img src="images/catbanner-02.jpg" className='img-fluid rounded-3' alt="main banner" />
                <div className="small-banner-content position-absolute">
                  <h4>15% OFF</h4>
                  <h5>Smartwatch 7</h5>
                  <p>Shop the latest band <br /> styles and colors</p>
                </div>
              </div>
              <div className="small-banner position-relative">
                <img src="images/catbanner-04.jpg" className='img-fluid rounded-3' alt="main banner" />
                <div className="small-banner-content position-absolute">
                  <h4>FREE ENGRAVING</h4>
                  <h5>AirPods Max</h5>
                  <p>High-fidelity playback & <br /> ultra-low distortion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1='home-wrapper-2 py-5'>
        <div className="row">
          <div className="col-12">
            <div className="services d-flex align-items-center justify-content-between">
              {
                services?.map((i, j) => {
                  return (
                    <div className='d-flex align-items-center gap-15' key={j}>
                      <img src={i.image} alt="services" />
                      <div>
                        <h6>{i.title}</h6>
                        <p className='mb-0'>{i.tagline}</p>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </Container>
      <Container class1='home-wrapper-2 py-5'>
        <div className="row">
          <div className="col-12">
            <div className="categories d-flex flex-wrap justify-content-between align-items-center">
              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Điện Thoại</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/phone.jpg" alt="phone" />
              </div>
              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Tablet</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/tablet.jpg" alt="tablet" />
              </div>
              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Laptop</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/laptop.jpg" alt="laptop" />
              </div>
              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>SmartWatch</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/watch.jpg" alt="smartwatch" />
              </div>
              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Máy Ảnh</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Loa</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/speaker.jpg" alt="speaker" />
              </div>
              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Tai Nghe</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/headphone.jpg" alt="headphone" />
              </div>
              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Phụ Kiện</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/acc.jpg" alt="accessories" />
              </div>
            </div>
          </div>
        </div>
      </Container>
      {
        authState?.user === null ? null :
          <Container class1='featured-wrapper py-5 home-wrapper-2'>
            <div className="row">
              <div className="col-12">
                <h3 className="section-heading">For You</h3>
              </div>
              <div className="row">
                {
                  productRecommenderState && productRecommenderState?.map((item, index) => {
                    return (
                      <div key={index} className="col-3" style={{ marginBottom: '20px' }}>
                        <div className="product-card position-relative">
                          <div className="wishlist-icon position-absolute">
                            <button className='border-0 bg-transparent' onClick={(e) => { AddToWishlist(item?._id) }}>
                              <img src={wish} alt="wishlist" />
                            </button>
                          </div>
                          <div className="product-image">
                            <img src={item?.images[1]?.url ? item?.images[1]?.url : noProduct} className='img-fluid mx-auto' alt="productimg" />
                            <img src={item?.images[0]?.url ? item?.images[0]?.url : noProduct} className='img-fluid mx-auto' alt="productimg" />
                          </div>  
                          <div className="product-details">
                            <h6 className="brand">{item?.brand?.title}</h6>
                            <h5 className="product-title">
                              {item?.title}
                            </h5>
                            <ReactStars count={5} size={24} value={item?.totalRating} edit={false} activeColor='#ffd700' />
                            <p className="price">{item?.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                          </div>
                          <div className="action-bar position-absolute">
                            <div className="d-flex flex-column gap-15">
                              <button className='border-0 bg-transparent'>
                                <img onClick={() => navigate('/product/' + item?._id)} src={view} alt="view" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </Container>
      }

      <Container class1='famous-wrapper py-5 home-wrapper-2'>
        <div className="row">
          <div className="col-3">
            <div className="famous-card position-relative">
              <img src="images/famous-1.png" className='img-fluid' alt="famous" />
              <div className="famous-content position-absolute">
                <h5>BIG SCREEN</h5>
                <h6>Smart Watch Series 7</h6>
                <p>From $399 or $16.62/mo. for 24 mo.</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img src="images/famous-2.png" className='img-fluid' alt="famous" />
              <div className="famous-content position-absolute">
                <h5 className='text-dark'>STUDIO DISPLAY</h5>
                <h6 className='text-dark'>600 nits of brightness</h6>
                <p className='text-dark'>27-inch 5K Retina display</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img src="images/famous-3.png" className='img-fluid' alt="famous" />
              <div className="famous-content position-absolute">
                <h5 className='text-dark'>SMARTPHONES</h5>
                <h6 className='text-dark'>Smartphone 15 Pro</h6>
                <p className='text-dark'>From $999.00 or $41.62/mo. for 24 mo.</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img src="images/famous-4.png" className='img-fluid' alt="famous" />
              <div className="famous-content position-absolute">
                <h5 className='text-dark'>HOME SPEAKERS</h5>
                <h6 className='text-dark'>Room-filling sound</h6>
                <p className='text-dark'>From $699 or $116.58/mo. for 12 mo.</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1='popular-wrapper py-5 home-wrapper-2'>
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">New Products</h3>
          </div>
          <div className="row">
            {
              productState && productState?.map((item, index) => {
                return (
                  <div key={index} className="col-3" style={{ marginBottom: '20px' }}>
                    <div className="product-card position-relative">
                      <div className="wishlist-icon position-absolute">
                        <button className='border-0 bg-transparent' onClick={(e) => { AddToWishlist(item?._id) }}>
                          <img src={wish} alt="wishlist" />
                        </button>
                      </div>
                      <div className="product-image">
                        <img src={item?.images[1]?.url ? item?.images[1]?.url : noProduct} className='img-fluid mx-auto' alt="productimg" />
                        <img src={item?.images[0]?.url ? item?.images[0]?.url : noProduct} className='img-fluid mx-auto' alt="productimg" />
                      </div>
                      <div className="product-details">
                        <h6 className="brand">{item?.brand?.title}</h6>
                        <h5 className="product-title">
                          {item?.title}
                        </h5>
                        <ReactStars count={5} size={24} value={item?.totalRating} edit={false} activeColor='#ffd700' />
                        <p className="price">{item?.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                      </div>
                      <div className="action-bar position-absolute">
                        <div className="d-flex flex-column gap-15">
                          <button className='border-0 bg-transparent'>
                            <img onClick={() => navigate('/product/' + item?._id)} src={view} alt="view" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </Container>
      <Container class1='marque-wrapper home-wrapper-2 py-5'>
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className='d-flex'>
                <div className='mx-4 w-25'>
                  <img src="images/brand-01.png" alt="brand" />
                </div>
                <div className='mx-4 w-25'>
                  <img src="images/brand-02.png" alt="brand" />
                </div>
                <div className='mx-4 w-25'>
                  <img src="images/brand-03.png" alt="brand" />
                </div>
                <div className='mx-4 w-25'>
                  <img src="images/brand-04.png" alt="brand" />
                </div>
                <div className='mx-4 w-25'>
                  <img src="images/brand-05.png" alt="brand" />
                </div>
                <div className='mx-4 w-25'>
                  <img src="images/brand-06.png" alt="brand" />
                </div>
                <div className='mx-4 w-25'>
                  <img src="images/brand-07.png" alt="brand" />
                </div>
                <div className='mx-4 w-25'>
                  <img src="images/brand-08.png" alt="brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Home