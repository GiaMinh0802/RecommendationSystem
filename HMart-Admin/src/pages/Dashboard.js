import React, { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { BsArrowDownRight, BsArrowUpRight } from 'react-icons/bs'
import { getStatistics } from '../features/order/orderSlice'
import { Column } from '@ant-design/plots'
import { Table } from "antd"

const columns = [
  {
    title: "STT",
    dataIndex: "key",
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
    title: "Tổng Tiền",
    dataIndex: "total",
    align: "right",
  },
]

const Dashboard = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getStatistics())
  }, []);

  const statisticsState = useSelector((state) => state?.order?.statistics)

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

  const data1 = []
  for (let i = 0; i < statisticsState?.recentOrders.length; i++) {
    data1.push({
      key: i + 1,
      date: formatDate(statisticsState?.recentOrders[i].orderAt),
      status: formatStatus(statisticsState?.recentOrders[i].status),
      total: statisticsState?.recentOrders[i].totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
    })
  }

  const data = [
    {
      type: 'Jan',
      sales: statisticsState?.revenueByMonth[0],
    },
    {
      type: 'Feb',
      sales: statisticsState?.revenueByMonth[1],
    },
    {
      type: 'Mar',
      sales: statisticsState?.revenueByMonth[2],
    },
    {
      type: 'Apr',
      sales: statisticsState?.revenueByMonth[3],
    },
    {
      type: 'May',
      sales: statisticsState?.revenueByMonth[4],
    },
    {
      type: 'Jun',
      sales: statisticsState?.revenueByMonth[5],
    },
    {
      type: 'Jul',
      sales: statisticsState?.revenueByMonth[6],
    },
    {
      type: 'Aug',
      sales: statisticsState?.revenueByMonth[7],
    },
    {
      type: 'Sept',
      sales: statisticsState?.revenueByMonth[8],
    },
    {
      type: 'Oct',
      sales: statisticsState?.revenueByMonth[9],
    },
    {
      type: 'Nov',
      sales: statisticsState?.revenueByMonth[10],
    },
    {
      type: 'Dev',
      sales: statisticsState?.revenueByMonth[11],
    },
  ];
  const config = {
    data,
    xField: 'type',
    yField: 'sales',
    color: ({ type }) => {
      return "#ffd333"
    },
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Tháng',
      },
      sales: {
        alias: 'Thu nhập',
      },
    },
  };
  return (
    <div>
      <h3 className='mb-4 title'>Dashboard</h3>
      <div className='d-flex justify-content-between align-items-center gap-3'>
        <div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
          <div>
            <p className='desc'>Doanh Thu</p>
            <h4 className='mb-0 sub-title'>{statisticsState?.totalRevenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            {
              statisticsState?.percentRevenue > 0
                ?
                <h6 className='green'>
                  <BsArrowUpRight /> {Math.abs(statisticsState?.percentRevenue)}%
                </h6>
                :
                <h6 className='red'>
                  <BsArrowDownRight /> {Math.abs(statisticsState?.percentRevenue)}%
                </h6>
            }
          </div>
        </div>
        <div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
          <div>
            <p className='desc'>Sản Phẩm Đã Bán</p>
            <h4 className='mb-0 sub-title'>{statisticsState?.totalProduct}</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            {
              statisticsState?.percentProduct > 0
                ?
                <h6 className='green'>
                  <BsArrowUpRight /> {Math.abs(statisticsState?.percentProduct)}%
                </h6>
                :
                <h6 className='red'>
                  <BsArrowDownRight /> {Math.abs(statisticsState?.percentProduct)}%
                </h6>
            }
          </div>
        </div>
        <div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
          <div>
            <p className='desc'>Đơn Hàng</p>
            <h4 className='mb-0 sub-title'>{statisticsState?.numberOrder}</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            {
              statisticsState?.percentOrder > 0
                ?
                <h6 className='green'>
                  <BsArrowUpRight /> {Math.abs(statisticsState?.percentOrder)}%
                </h6>
                :
                <h6 className='red'>
                  <BsArrowDownRight /> {Math.abs(statisticsState?.percentOrder)}%
                </h6>
            }
          </div>
        </div>
      </div>
      <div className="mt-4 flex-grow-1">
        <h3 className='mb-5 title'>Thống Kê Doanh Thu</h3>
        <div>
          <Column {...config} />;
        </div>
      </div>
      <div className='mt-4 flex-grow-1'>
        <h3 className='mb-5 title'>Đơn Hàng Gần Đây</h3>
        <div>
          <Table columns={columns} dataSource={data1} pagination={false} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard