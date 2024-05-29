import React, { useEffect } from "react"
import { Table } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { getOrder } from "../features/order/orderSlice"

const columns = [
    {
        title: "STT",
        dataIndex: "key",
    },
    {
        title: "Tên Sản Phẩm",
        dataIndex: "name",
        align: "center",
    },
    {
        title: "Thương Hiệu",
        dataIndex: "brand",
        align: "center",
    },
    {
        title: "Số Lượng",
        dataIndex: "count",
        align: "center",
    },
    {
        title: "Màu Sắc",
        dataIndex: "color",
        align: "center",
    },
    {
        title: "Giá Tiền",
        dataIndex: "price",
        align: "right",
    },
    {
        title: "Ngày Đặt Hàng",
        dataIndex: "date",
        align: "center",
    }
]

const ViewOrder = () => {
    const location = useLocation()
    const userId = location.pathname.split("/")[3]

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getOrder(userId))
    }, [userId])

    const orderState = useSelector((state) => state.order.orders)

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

    const data1 = []
    for (let i = 0; i < orderState?.orderItems?.length; i++) {
        data1.push({
            key: i + 1,
            name: orderState?.orderItems[i].product.title,
            brand: orderState?.orderItems[i].product.brand.title,
            count: orderState?.orderItems[i].quantity,
            price: orderState?.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
            color:  (<div style={{ backgroundColor: orderState?.orderItems[i].color.title, width: '20px', height: '20px', borderRadius: '50%', display: 'inline-block', marginRight: '5px', border: '1px solid black' }}></div>),
            date: formatDate(orderState?.orderAt)
        })
    }

    return (
        <div>
            <h3 className="mb-4 title">Chi Tiết Đơn Hàng</h3>
            <div>
                <Table columns={columns} dataSource={data1}/>
            </div>
        </div>
    );
}

export default ViewOrder