import React from 'react'
import CustomInput from '../components/CustomInput'

const Resetpassword = () => {
  return (
    <div className='py-5' style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-50 bg-white rounded-3 mx-auto p-4">
        <h4 className='text-center title'>Reset Password</h4>
        <p className='text-center'>Please enter your new password</p>
        <form action="">
          <CustomInput type="password" label="New Password" id="pass" />
          <CustomInput type="password" label="Confirm Password" id="confirmpass" />
          <button className="border-0 px-3 py-2 text-white fw-bold w-100" type='submit' style={{ background: "#ffd333" }}>Login</button>
        </form>

      </div>
    </div>
  )
}

export default Resetpassword