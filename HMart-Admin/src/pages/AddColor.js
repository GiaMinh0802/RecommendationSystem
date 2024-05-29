import { React, useEffect } from "react"
import CustomInput from "../components/CustomInput"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import * as yup from "yup"
import { useFormik } from "formik"
import { createColor, getAColor, resetState, updateAColor } from "../features/color/colorSlice"
let schema = yup.object().shape({
    title: yup.string().required("Bắt buộc"),
    color: yup.string().required("Bắt buộc"),
})

const AddColor = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const getColorId = location.pathname.split("/")[3]
    const newColor = useSelector((state) => state.color)
    const { isSuccess, isError, isLoading, createdColor, updatedColor, colorInfo } = newColor

    useEffect(() => {
        if (getColorId !== undefined) {
            dispatch(getAColor(getColorId))
        } else {
            dispatch(resetState())
        }
    }, [getColorId])

    useEffect(() => {
        if (isSuccess && createdColor) {
            toast.success("Thêm Màu thành công!")
        }
        if (isSuccess && updatedColor) {
            toast.success("Cập nhật Màu thành công!")
            navigate("/admin/list-color");
        }
        if (isError) {
            toast.error("Đã xảy ra lỗi!")
        }
    }, [isSuccess, isError, isLoading, createdColor])

    console.log(colorInfo)

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: colorInfo?.title || "",
            color: colorInfo?.color || "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (getColorId !== undefined) {
                const data = { id: getColorId, colorData: values }
                dispatch(updateAColor(data))
                dispatch(resetState())
            } else {
                dispatch(createColor(values))
                formik.resetForm()
                setTimeout(() => {
                    dispatch(resetState())
                }, 300)
            }
        },
    })

    return (
        <div>
            <h3 className="mb-4 title">
                {getColorId !== undefined ? "Cập Nhật" : "Thêm"} Màu Sắc
            </h3>
            <div className="">
                <form onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type="text"
                        label="Nhập Màu Sắc"
                        onCh={formik.handleChange("color")}
                        onBl={formik.handleBlur("color")}
                        val={formik.values.color}
                        id="color"
                    />
                    <div className="error">
                        {formik.touched.color && formik.errors.color}
                    </div>
                    <CustomInput
                        type="text"
                        label="Nhập HTML Màu Sắc"
                        onCh={formik.handleChange("title")}
                        onBl={formik.handleBlur("title")}
                        val={formik.values.title}
                        id="title"
                    />
                    <div className="error">
                        {formik.touched.title && formik.errors.title}
                    </div>
                    <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>
                        {getColorId !== undefined ? "Cập nhật" : "Thêm"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddColor