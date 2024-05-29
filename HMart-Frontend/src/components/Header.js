import React, { useEffect, useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'
import wishlist from '../images/wishlist.svg'
import user from '../images/user.svg'
import cart from '../images/cart.svg'
import menu from '../images/menu.svg'
import { useDispatch, useSelector } from 'react-redux'
import { Typeahead } from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import { getProduct } from '../features/product/productSlice'
import { getCategories } from '../features/category/categorySlice'
import { getCart } from '../features/cart/cartSlice'
import { getWishlist } from '../features/wishlist/wishlistSlice'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cartState = useSelector(state => state?.cart?.carts)
  const wishlistState = useSelector(state => state?.wishlist?.wishlists)
  const authState = useSelector(state => state?.auth)
  const productState = useSelector(state => state?.product?.products)
  const categoryState = useSelector(state => state?.category?.categories)
  const [productOpt, setProductOpt] = useState([])
  const [paginate, setPaginate] = useState(true)
  const [total, setTotal] = useState(null)

  useEffect(() => {
    dispatch(getCategories())
  }, [])

  useEffect(() => {
    dispatch(getCart())
    dispatch(getWishlist())
  }, [])

  useEffect(() => {
    let data = []
    for (let i = 0; i < productState.length; i++) {
      const element = productState[i]
      data.push({ id: i, prod: element?._id, name: element?.title })
    }
    setProductOpt(data)
  }, [productState])

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
    window.location.reload()
  }

  const handleOurStore = () => {
    navigate('/product')
    window.location.reload()
  }

  return (
    <>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h2>
                <Link to='/' className='text-white'>HMart</Link>
              </h2>
            </div>
            <div className="col-5">
              <div class="input-group">
                <Typeahead
                  id='pagination-example'
                  onPaginate={() => console.log('Results paginated')}
                  onChange={(selected) => {
                    navigate(`/product/${selected[0]?.prod}`)
                    dispatch(getProduct(selected[0]?.prod))
                  }}
                  options={productOpt}
                  paginate={paginate}
                  labelKey={"name"}
                  minLength={2}
                  placeholder='Tìm kiếm sản phẩm...'
                />
                <span class="input-group-text p-3" id="basic-addon2">
                  <BsSearch className='fs-6' />
                </span>
              </div>
            </div>
            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                </div>
                {
                  authState?.user !== null ?
                    <>
                      <div>
                        <Link to='/wishlist' className='d-flex align-items-center gap-10 text-white'>
                          <img src={wishlist} alt="wishlist" />
                          <div className='d-flex flex-column gap-10'>
                            <span className="badge bg-white text-dark">{wishlistState?.length ? wishlistState?.length : 0}</span>
                            <p className='mb-0' style={{ color: '#131921' }}>0</p>
                          </div>
                        </Link>
                      </div>
                      <div>
                        <Link to='/cart' className='d-flex align-items-center gap-10 text-white'>
                          <img src={cart} alt="cart" />
                          <div className='d-flex flex-column gap-10'>
                            <span className="badge bg-white text-dark">{cartState?.length ? cartState?.length : 0}</span>
                            <p className='mb-0' style={{ color: '#131921' }}>0</p>
                          </div>
                        </Link>
                      </div>
                    </>
                    : null
                }
                <div>
                  <Link to={authState?.user === null ? '/login' : "/profile"} className='d-flex align-items-center gap-10 text-white'>
                    <img src={user} alt="user" />
                    {
                      authState?.user === null ? <p className='mb-0 text-center'>Đăng Nhập <br /> Tài Khoản</p> : <p className='mb-0'>Xin chào,<br />{authState.user.lastname}</p>
                    }
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="header header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
                  <div className="dropdown">
                    <button class="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      <img src={menu} alt="" />
                      <span className='me-2 d-inline-block'>Danh Mục</span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      {
                        categoryState && categoryState?.map((item, index) => {
                          return (
                            <li key={index}><Link className="dropdown-item text-white" to="">{item?.title}</Link></li>
                          )
                        })
                      }
                    </ul>
                  </div>
                </div>
                <div className='menu-links'>
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to='/'>Trang Chủ</NavLink>
                    <NavLink onClick={handleOurStore}>Cửa Hàng</NavLink>
                    {
                      authState?.user === null ? null :
                        <>
                          <NavLink to='/order'>Đơn Hàng</NavLink>
                          <NavLink to='/login' onClick={handleLogout}>Đăng Xuất</NavLink>
                        </>

                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header