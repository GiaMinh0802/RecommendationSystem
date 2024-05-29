import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import ProductCard from '../components/ProductCard'
import Container from '../components/Container'
import ReactPaginate from 'react-paginate';
import { getProducts } from '../features/product/productSlice'


const OurStore = () => {
    const dispatch = useDispatch()

    const [grid, setGrid] = useState(4)
    const productState = useSelector((state) => state?.product?.products)
    const [brands, setBrands] = useState([])
    const [categories, setCategories] = useState([])

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(12);

    //Filter States
    const [category, setCategory] = useState(null)
    const [brand, setBrand] = useState(null)
    const [minPrice, setMinPrice] = useState(null)
    const [maxPrice, setMaxPrice] = useState(null)
    const [sort, setSort] = useState('title')

    useEffect(() => {
        let newBrands = []
        let newCategories = []
        for (let i = 0; i < productState.length; i++) {
            const element = productState[i];
            newBrands.push(element.brand.title)
            newCategories.push(element.category.title)
        }
        setBrands(newBrands)
        setCategories(newCategories)
    }, [productState])

    useEffect(() => {
        GetProducts()
    }, [sort, brand, category, minPrice, maxPrice])

    const GetProducts = () => {
        dispatch(getProducts({ sort, brand, category, minPrice, maxPrice, fields: "_id,title,brand,images,description,price,totalRating,category" }))
    }

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = productState.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(productState.length / recordsPerPage)

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <>
            <Meta title={"Cửa Hàng"} />
            <BreadCrumb title='Cửa Hàng' />
            <Container class1="store-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-3">
                        <div className='filter-card mb-3'>
                            <h3 className="filter-title">Shop By Categories</h3>
                            <div>
                                <ul className='ps-0'>
                                    {
                                        categories && [...new Set(categories)].map((item, index) => {
                                            return <li key={index} onClick={() => setCategory(item)}>{item}</li>
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className='filter-card mb-3'>
                            <h3 className="filter-title">Filter By</h3>
                            <div>
                                <h5 className="sub-title">Price</h5>
                                <div className='d-flex align-items-center gap-10'>
                                    <div className="form-floating">
                                        <input onChange={(e) => setMinPrice(e.target.value)} type="number" className="form-control" id="floatingInput" placeholder='From' />
                                        <label htmlFor="floatingInput">From</label>
                                    </div>
                                    <div className="form-floating">
                                        <input onChange={(e) => setMaxPrice(e.target.value)} type="number" className="form-control" id="floatingInput1" placeholder='To' />
                                        <label htmlFor="floatingInput1">To</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='filter-card mb-3'>
                            <h3 className="filter-title">Product Brands</h3>
                            <div>
                                <div className='product-tags d-flex flex-wrap align-items-center gap-10'>
                                    {
                                        brands && [...new Set(brands)].map((item, index) => {
                                            return <span key={index} onClick={() => setBrand(item)} className="badge bg-light text-secondary rounded-3 py-2 px-3">{item}</span>
                                        })
                                    }
                                </div >
                            </div>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="filter-sort-grid mb-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center gap-10">
                                    <p className="mb-0 d-block" style={{ "width": "100px" }}>Sort By:</p>
                                    <select onChange={(e) => setSort(e.target.value)} name="" defaultValue={"manual"} id="" className="form-control form-select">
                                        <option value="title">Alphabetically, A-Z</option>
                                        <option value="-title">Alphabetically, Z-A</option>
                                        <option value="price">Price, low to high</option>
                                        <option value="-price">Price, high to low</option>
                                        <option value="createdAt">Date, old to new</option>
                                        <option value="-createdAt">Date, new to old</option>
                                    </select>
                                </div>
                                <div className='d-flex align-items-center gap-10'>
                                    <p className="totalproducts mb-0">{productState.length} Products</p>
                                    <div className="d-flex gap-10 align-items-center grid">
                                        <img onClick={() => { setGrid(3) }} src="images/gr4.svg" className='d-block img-fluid' alt="grid" />
                                        <img onClick={() => { setGrid(4) }} src="images/gr3.svg" className='d-block img-fluid' alt="grid" />
                                        <img onClick={() => { setGrid(6) }} src="images/gr2.svg" className='d-block img-fluid' alt="grid" />
                                        <img onClick={() => { setGrid(12) }} src="images/gr.svg" className='d-block img-fluid' alt="grid" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="products-list pb-5">
                            <div className="d-flex gap-10 flex-wrap">
                                <ProductCard data={currentRecords ? currentRecords : []} grid={grid} />
                            </div>
                            <div className='d-flex justify-content-center'>
                                <ReactPaginate
                                    nextLabel="Next >"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={3}
                                    marginPagesDisplayed={2}
                                    pageCount={nPages}
                                    previousLabel="< Previous"
                                    pageClassName="page-item"
                                    pageLinkClassName="page-link"
                                    previousClassName="page-item"
                                    previousLinkClassName="page-link"
                                    nextClassName="page-item"
                                    nextLinkClassName="page-link"
                                    breakLabel="..."
                                    breakClassName="page-item"
                                    breakLinkClassName="page-link"
                                    containerClassName="pagination"
                                    activeClassName="active"
                                    renderOnZeroPageCount={null}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )

}

export default OurStore