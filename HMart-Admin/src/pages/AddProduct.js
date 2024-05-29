import { React, useEffect, useState } from 'react'
import CustomInput from '../components/CustomInput'
import ReactQuill from 'react-quill'
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import 'react-quill/dist/quill.snow.css'
import { toast } from "react-toastify"
import { useDispatch, useSelector } from 'react-redux'
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/category/categorySlice";
import { getColors } from "../features/color/colorSlice";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { createProducts, resetState } from "../features/product/productSlice";

let schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().required('Price is required'),
    brand: Yup.string().required("Brand is required"),
    category: Yup.string().required("Category is required"),
    color: Yup
        .array()
        .min(1, "Pick at least one color")
        .required("Color is Required"),
    quantity: Yup.number().required("Quantity is required"),
})

const AddProduct = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [color, setColor] = useState([])
    const [images, setImages] = useState([])

    useEffect(() => {
        dispatch(getBrands())
        dispatch(getCategories())
        dispatch(getColors());
    }, [])

    const brandState = useSelector((state) => state.brand.brands)
    const categoryState = useSelector((state) => state.category.categories)
    const colorState = useSelector((state) => state.color.colors)
    const imgState = useSelector((state) => state.upload.images)
    const newProduct = useSelector((state) => state.product)
    const { isSuccess, isError, isLoading, createdProduct } = newProduct

    useEffect(() => {
        if (isSuccess && createdProduct) {
            toast.success("Product Added Successfullly!");
        }
        if (isError) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError, isLoading]);

    const coloropt = []
    colorState.forEach((i) => {
        coloropt.push({
            label: i.title,
            value: i._id,
        })
    })

    const img = [];
    imgState.forEach((i) => {
        img.push({
            public_id: i.public_id,
            url: i.url,
        })
    })

    useEffect(() => {
        formik.values.color = color ? color : " "
        formik.values.images = img
    }, [color, img]);

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            price: "",
            brand: "",
            category: "",
            tags: "",
            color: "",
            quantity: "",
            images: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(createProducts(values))
            formik.resetForm()
            setColor(null)
            imgState = []
            setTimeout(() => {
                dispatch(resetState())
            }, 3000)
        }
    })
    const handleColors = (e) => {
        setColor(e);
    };
    return (
        <div>
            <h3 className="mb-4 title">Thêm Sản Phẩm</h3>
            <div className="">
                <form onSubmit={formik.handleSubmit} className='d-flex gap-3 flex-column'>
                    <CustomInput
                        type="text"
                        label="Tên sản phẩm"
                        name="title"
                        onCh={formik.handleChange("title")}
                        onBl={formik.handleBlur("title")}
                        val={formik.values.title}
                    />
                    <div className="error">
                        {formik.touched.title && formik.errors.title}
                    </div>

                    <div className=''>
                        <ReactQuill
                            placeholder='Mô tả sản phẩm'
                            theme='snow'
                            name="description"
                            onChange={formik.handleChange("description")}
                            value={formik.values.description}
                        />
                    </div>
                    <div className="error">
                        {formik.touched.description && formik.errors.description}
                    </div>

                    <CustomInput
                        type="number"
                        label="Giá sản phẩm"
                        name="price"
                        onCh={formik.handleChange("price")}
                        onBl={formik.handleBlur("price")}
                        val={formik.values.price}
                    />
                    <div className="error">
                        {formik.touched.price && formik.errors.price}
                    </div>

                    <select
                        name="brand"
                        onChange={formik.handleChange("brand")}
                        onBlur={formik.handleBlur("brand")}
                        value={formik.values.brand}
                        className="form-control py-3 mb-3"
                    >
                        <option value="" disabled>Chọn Nhãn hàng</option>
                        {brandState.map((i, j) => {
                            return <option key={j} value={i.title}>{i.title}</option>
                        })}
                    </select>
                    <div className="error">
                        {formik.touched.brand && formik.errors.brand}
                    </div>

                    <select
                        name="category"
                        onChange={formik.handleChange("category")}
                        onBlur={formik.handleBlur("category")}
                        value={formik.values.category}
                        className="form-control py-3 mb-3"
                    >
                        <option value="" disabled>Chọn Phân loại</option>
                        {categoryState.map((i, j) => {
                            return <option key={j} value={i.title}>{i.title}</option>
                        })}
                    </select>
                    <div className="error">
                        {formik.touched.category && formik.errors.category}
                    </div>

                    <Select
                        name="color"
                        mode="multiple"
                        allowClear
                        className="w-100"
                        placeholder="Chọn màu sắc"
                        defaultValue={color}
                        onChange={(i) => handleColors(i)}
                        options={coloropt}
                    />
                    <div className="error">
                        {formik.touched.color && formik.errors.color}
                    </div>

                    <CustomInput
                        type="number"
                        label="Số lượng sản phẩm"
                        name="quantity"
                        onCh={formik.handleChange("quantity")}
                        onBl={formik.handleBlur("quantity")}
                        val={formik.values.quantity}
                    />
                    <div className="error">
                        {formik.touched.quantity && formik.errors.quantity}
                    </div>
                    <div className="bg-white border-1 p-5 text-center">
                        <Dropzone onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>
                                            Kéo thả files vào đây hoặc click để chọn file
                                        </p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                    <div className="showimages d-flex flex-wrap gap-3">
                        {imgState?.map((i, j) => {
                            return (
                                <div className=" position-relative" key={j}>
                                    <button
                                        type="button"
                                        onClick={() => dispatch(delImg(i.public_id))}
                                        className="btn-close position-absolute"
                                        style={{ top: "10px", right: "10px" }}
                                    ></button>
                                    <img src={i.url} alt="" width={200} height={200} />
                                </div>
                            )
                        })}
                    </div>
                    <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>
                        Thêm
                    </button>
                </form>
            </div>
        </div >
    )
}

export default AddProduct