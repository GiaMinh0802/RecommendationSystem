import React from 'react'
import { Link } from 'react-router-dom'
import { BsLinkedin, BsGithub, BsYoutube, BsInstagram } from 'react-icons/bs'

const Footer = () => {
  return (
    <>
      <footer className='py-4'>
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h4 className='text-white mb-4'>Liên Hệ Chúng Tôi</h4>
              <div>
                <address className='text-white fs-6'>
                  Demo Store <br />
                  Số 1 Võ Văn Ngân, Thành Phố Thủ Đức, <br />
                  Thành Phố Hồ Chí Minh
                </address>
                <a href="tel:+84 782711867" className='mt-3 d-block mb-1 text-white'>
                  +84 - 782 711 867
                </a>
                <a href="mailto:hmartecommerce@gmail.com" className='mt-2 d-block mb-0 text-white'>
                  hmartecommerce@gmail.com
                </a>
                <div className="social_icons d-flex align-items-center gap-30 mt-4">
                  <a className='text-white' href="/#">
                    <BsLinkedin className='fs-4' />
                  </a>
                  <a className='text-white' href="/#">
                    <BsGithub className='fs-4' />
                  </a>
                  <a className='text-white' href="/#">
                    <BsInstagram className='fs-4' />
                  </a>
                  <a className='text-white' href="/#">
                    <BsYoutube className='fs-4' />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-3">
              <h4 className='text-white mb-4'>Thông Tin</h4>
              <div className='footer-link d-flex flex-column'>
                <Link className='text-white py-2 mb-1'>Chính Sách Bảo Mật</Link>
                <Link className='text-white py-2 mb-1'>Chính Sách Hoàn Tiền</Link>
                <Link className='text-white py-2 mb-1'>Chính Sách Vận Chuyển</Link>
                <Link className='text-white py-2 mb-1'>Điều Khoản & Điều Kiện</Link>
              </div>
            </div>
            <div className="col-3">
              <h4 className='text-white mb-4'>Tài Khoản</h4>
              <div className='footer-link d-flex flex-column'>
                <Link to='/contact' className='text-white py-2 mb-1'>Về Chúng Tôi</Link>
                <Link className='text-white py-2 mb-1'>Câu Hỏi Thường Gặp</Link>
                <Link className='text-white py-2 mb-1'>Liên Hệ</Link>
              </div>
            </div>
            <div className="col-2">
              <h4 className='text-white mb-4'>Liên Kết</h4>
              <div className='footer-link d-flex flex-column'>
                <Link className='text-white py-2 mb-1'>Laptops</Link>
                <Link className='text-white py-2 mb-1'>Tai Nghe</Link>
                <Link className='text-white py-2 mb-1'>Tablets</Link>
                <Link className='text-white py-2 mb-1'>Đồng Hồ</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className='py-4'>
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white">
                &copy; {new Date().getFullYear()}; Powered by HMart ECommerce
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer