import React, { useState } from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FiEdit } from 'react-icons/fi'

let schema = yup.object().shape({
    firstname: yup.string().required('FirstName is required'),
    lastname: yup.string().required('LastName is required'),
    email: yup.string().email("Email should be valid"),
    mobile: yup.string().required('Mobile is required')
})

const Profile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userState = useSelector(state => state.auth.user)
    const [edit, setEdit] = useState(true)
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstname: userState?.firstname,
            lastname: userState?.lastname,
            email: userState?.email,
            mobile: userState?.mobile,
        },
        validationSchema: schema,
        onSubmit: (values) => {
            // dispatch(updateUser(values))
            setEdit(true)
        }
    })

    return (
        <>
            <Meta title={"My Profile"} />
            <BreadCrumb title='My Profile' />
            <Container class1="cart-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center">
                            <h3 className='my-3'>Update Profile</h3>
                            <FiEdit className='fs-3' onClick={() => setEdit(edit ? false : true)} />
                        </div>
                    </div>
                    <div className="col-12">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-3">
                                <label className='form-label'>First Name</label>
                                <input type="text" className='form-control' name='firstname' disabled={edit}
                                    value={formik.values.firstname}
                                    onChange={formik.handleChange('firstname')}
                                    onBlur={formik.handleBlur('firstname')}
                                />
                                <div className='error'>
                                    {formik.touched.firstname && formik.errors.firstname}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className='form-label'>Last Name</label>
                                <input type="text" className='form-control' name='lastname' disabled={edit}
                                    value={formik.values.lastname}
                                    onChange={formik.handleChange('lastname')}
                                    onBlur={formik.handleBlur('lastname')}
                                />
                                <div className='error'>
                                    {formik.touched.lastname && formik.errors.lastname}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className='form-label'>Email Address</label>
                                <input type="email" className='form-control' name='email' readOnly
                                    value={formik.values.email}
                                    onChange={formik.handleChange('email')}
                                    onBlur={formik.handleBlur('email')}
                                />
                                <div className='error'>
                                    {formik.touched.email && formik.errors.email}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className='form-label'>Mobile No</label>
                                <input type="number" className='form-control' name='mobile' disabled={edit}
                                    value={formik.values.mobile}
                                    onChange={formik.handleChange('mobile')}
                                    onBlur={formik.handleBlur('mobile')}
                                />
                                <div className='error'>
                                    {formik.touched.mobile && formik.errors.mobile}
                                </div>
                            </div>
                            {
                                edit === false && <button className='btn btn-primary' type='submit'>Save</button>
                            }
                        </form>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Profile