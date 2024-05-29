import React, { useEffect, useState } from 'react'
import Container from '../components/Container'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getOrder } from '../features/order/orderSlice'


const Orders = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const orderState = useSelector(state => state?.order?.orders)
    const [activeTab, setActiveTab] = useState('Tất cả')

    useEffect(() => {
        dispatch(getOrder())
    }, [])

    const formatDate = (date) => {
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(date).toLocaleDateString('vi-VN', options);
    }

    const convertStatus = (status) => {
        let convert
        if (status === "Processing") {
            convert = "Đang xử lý"
        } else if (status === "Shipped") {
            convert = "Vận chuyển"
        } else if (status === "Delivered") {
            convert = "Hoàn thành"
        } else {
            convert = "Đã hủy"
        }
        return convert
    }

    const handleTabClick = (event, tabTitle) => {
        event.preventDefault()
        setActiveTab(tabTitle)
    }

    return (
        <>
            <Meta title={"Cửa Hàng"} />
            <BreadCrumb title='Cửa Hàng' />
            <Container class1="store-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-2">
                    </div>
                    <div className="col-8">
                        <section className="filter-order">
                            <Link className={activeTab === 'Tất cả' ? "tab active-tab" : "tab"} title="Tất cả" aria-role="tab" aria-selected="true" aria-controls="olp_panel_id-0.45227349079214485" onClick={(event) => handleTabClick(event, 'Tất cả')}>
                                <span className="text-filter-order">Tất cả</span>
                            </Link>
                            <Link className={activeTab === 'Đang xử lý' ? "tab active-tab" : "tab"} title="Đang xử lý" aria-role="tab" aria-selected="false" aria-controls="olp_panel_id-0.8304248279740902" onClick={(event) => handleTabClick(event, 'Đang xử lý')}>
                                <span className="text-filter-order">Đang xử lý</span>
                            </Link>
                            <Link className={activeTab === 'Vận chuyển' ? "tab active-tab" : "tab"} title="Vận chuyển" aria-role="tab" aria-selected="false" aria-controls="olp_panel_id-0.8188030080706012" onClick={(event) => handleTabClick(event, 'Vận chuyển')}>
                                <span className="text-filter-order">Vận chuyển</span>
                            </Link>
                            <Link className={activeTab === 'Hoàn thành' ? "tab active-tab" : "tab"} title="Hoàn thành" aria-role="tab" aria-selected="false" aria-controls="olp_panel_id-0.47172621502759693" onClick={(event) => handleTabClick(event, 'Hoàn thành')}>
                                <span className="text-filter-order">Hoàn thành</span>
                            </Link>
                            <Link className={activeTab === 'Đã hủy' ? "tab active-tab" : "tab"} title="Đã hủy" aria-role="tab" aria-selected="false" aria-controls="olp_panel_id-0.3496823036171899" onClick={(event) => handleTabClick(event, 'Đã hủy')}>
                                <span className="text-filter-order">Đã hủy</span>
                            </Link>
                        </section>
                        <section className='main-order'>
                            {
                                Array.isArray(orderState) && orderState?.map((item, index) => {
                                    return (
                                        <>
                                            <div key={index} className='card-order'>
                                                <div>
                                                    <div className='J632se'>
                                                        <section>
                                                            <div className="P2JMvg">
                                                                <div className="RBPP9y">
                                                                    <div className="UDaMW3" tabindex="0">{formatDate(item?.orderAt)}</div>
                                                                </div>
                                                                <div className="jgIyoX">
                                                                    <div className="bv3eJE" tabindex="0">{convertStatus(item?.status)}</div>
                                                                </div>
                                                            </div>
                                                        </section>
                                                        <div className="line"></div>
                                                        <section>
                                                            <div>
                                                                {
                                                                    item?.orderItems?.map((it, ind) => {
                                                                        return (
                                                                            <>
                                                                                <div key={ind} className="item-order">
                                                                                    <div className="FNHV0p">
                                                                                        <div>
                                                                                            <section>
                                                                                                <div className="mZ1OWk">
                                                                                                    <div className="dJaa92">
                                                                                                        <img src={it?.product?.images[0]?.url} className="gQuHsZ" alt="" tabindex="0" />
                                                                                                        <div className="nmdHRf">
                                                                                                            <div>
                                                                                                                <div className="zWrp4w"><span className="DWVWOJ" tabindex="0">{it?.product?.title}</span></div>
                                                                                                            </div>
                                                                                                            <div>
                                                                                                                <div className="rsautk" tabindex="0">Màu sắc: {it?.color?.color}</div>
                                                                                                                <div className="j3I_Nh" tabindex="0">x{it?.quantity}</div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="ylYzwa" tabindex="0">
                                                                                                        <div className="YRp1mm">
                                                                                                            <span className="nW_6Oi PNlXhK">{it?.product?.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </section>
                                                                                        </div>
                                                                                        <div className="PB3XKx"></div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="line"></div>
                                                                            </>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        </section>
                                                    </div>
                                                </div>
                                                <div class="peteXU">
                                                    <div class="IVFywZ HmaSt0">
                                                    </div>
                                                    <div class="IVFywZ fT_AQM">
                                                    </div>
                                                </div>
                                                <div class="yyqgYp">
                                                    <div class="iwUeSD">
                                                        <button onClick={() => { navigate('/product/' + item?.orderItems[0]?.product._id); window.location.reload() }} class="stardust-button stardust-button--primary QY7kZh">Đánh giá</button>
                                                    </div>
                                                    <section className='po9nwN'>
                                                        <div className='NWUSQP'>
                                                            <label class="juCcT0">Thành tiền:</label>
                                                            <div class="t7TQaf" tabindex="0">{(item?.totalPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                                                        </div>
                                                    </section>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }

                        </section>
                    </div>
                    <div className="col-2">
                    </div>
                </div>
            </Container >
        </>

    )
}

export default Orders