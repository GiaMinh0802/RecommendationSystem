import React, { useEffect } from "react"
import { Table } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getOrders } from "../features/order/orderSlice"

const columns = [
    {
        title: "STT",
        dataIndex: "key",
    },
    {
        title: "Tên Khách Hàng",
        dataIndex: "name",
    },
    {
        title: "Tổng Tiền",
        dataIndex: "amount",
        align: "right",
    },
    {
        title: "Ngày Đặt Hàng",
        dataIndex: "date",
        align: "center",
    },
    {
        title: "Tình Trạng",
        dataIndex: "status",
        align: "center",
    },
    {
        title: "Thanh Toán",
        dataIndex: "payment",
        align: "center",
    },
    {
        title: "",
        dataIndex: "action",
        align: "center",
    }
];

const Orders = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrders());
    }, []);
    const orderState = useSelector((state) => state.order.orders);

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

    const formatStatus = (status) => {
        switch (status) {
            case "Processing":
                return "Đang xử lý"
            case "Shipped":
                return "Vận chuyển"
            case "Delivered":
                return "Hoàn thành"
            case "Cancelled":
                return "Đã hủy"
        }
    }

    const data1 = [];
    for (let i = 0; i < orderState.length; i++) {
        data1.push({
            key: i + 1,
            name: orderState[i].shippingInfo.firstname + " " + orderState[i].shippingInfo.lastname,
            amount: orderState[i].totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
            date: formatDate(orderState[i].orderAt),
            status: formatStatus(orderState[i].status),
            payment: orderState[i].typePayment,
            action: (<a href={`/admin/order/${orderState[i]._id}`} className="btn btn-primary" >Chi Tiết</a>)

        });
    }
    return (
        <div>
            <h3 className='mb-4 title'>Đơn Hàng</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default Orders