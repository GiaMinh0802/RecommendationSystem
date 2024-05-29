import React from 'react'
import CustomInput from '../components/CustomInput'

const Forgotpassword = () => {
  return (
    <div className='py-5' style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-50 bg-white rounded-3 mx-auto p-4">
        <h4 className='text-center title'>Forgot Password</h4>
        <p className='text-center'>Please enter your register email to reset password</p>
        <form action="">
          <CustomInput type="text" label="Email Address" id="email" />
          <button className="border-0 px-3 py-2 text-white fw-bold w-100" type='submit' style={{ background: "#ffd333" }}>Send</button>
        </form>

      </div>
    </div>
  )
}

export default Forgotpassword