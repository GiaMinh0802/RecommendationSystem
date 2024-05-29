import React, { useEffect } from 'react'
import { Table } from "antd"
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../features/product/productSlice';
import { Link } from "react-router-dom";

const columns = [
    {
        title: "STT",
        dataIndex: "key",
    },
    {
        title: "Tên Sản Phẩm",
        dataIndex: "title",
        sorter: (a, b) => a.title.length - b.title.length,
        align: 'center'
    },
    {
        title: "Màu Sắc",
        dataIndex: "color",
    },
    {
        title: "Thương Hiệu",
        dataIndex: "brand",
        sorter: (a, b) => a.brand.length - b.brand.length,
        align: 'center'
    },
    {
        title: "Danh Mục",
        dataIndex: "category",
        sorter: (a, b) => a.category.length - b.category.length,
        align: 'center'
    },
    {
        title: "Giá Tiền",
        dataIndex: "price",
        sorter: (a, b) => a.price - b.price,
        align: 'right'
    },
    {
        title: "Action",
        dataIndex: "action",
        align: 'center'
    },
];

const ProductList = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProducts())
    }, [])
    const productState = useSelector((state) => state.product.products);
    const data1 = [];
    for (let i = 0; i < productState.length; i++) {
        data1.push({
            key: i + 1,
            title: productState[i].title,
            brand: productState[i].brand.title,
            category: productState[i].category.title,
            color: productState[i].colors.map((color) => <div style={{ backgroundColor: color.title, width: '20px', height: '20px', borderRadius: '50%', display: 'inline-block', marginRight: '5px', border: '1px solid black' }}></div>),
            price: `${productState[i].price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`,
            action: (
                <>
                    <Link to="/" className=" fs-3 text-danger">
                        <BiEdit />
                    </Link>

                    <Link className="ms-3 fs-3 text-danger" to="/">
                        <AiFillDelete />
                    </Link>
                </>
            ),
        })
    }
    return (
        <div>
            <h3 className='mb-4 title'>Sản Phẩm</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default ProductList