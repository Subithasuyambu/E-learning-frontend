import React, { useState } from 'react'
import './auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { UseData } from '../../context/UserContext';
import ReCAPTCHA from "react-google-recaptcha";

const Verify = () => {
    const [otp, setotp] = useState("");
    const { btnLoading, verifyOtp } = UseData();
    const [show, setShow] = useState();
    const navigate = useNavigate();
    function onChange(value) {
        console.log("Captcha value:", value);
        setShow(true);
      }

    const submitHandler = async (e) => {
        e.preventDefault();
        await verifyOtp(Number(otp), navigate);
    }
  return (
      <div className="auth-page">
          <div className="auth-form">
              <h2>Verify Account</h2>
              <form onSubmit={submitHandler}>
                  <label htmlFor='otp'>OTP</label>
                  <input type='number'
                      value={otp}
                      onChange={(e)=>setotp(e.target.value)}
                      required />
                   <ReCAPTCHA
    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
    onChange={onChange}
  />,
                   { show &&(<button disabled={btnLoading} type='submit' className='common-btn'>
                      {btnLoading ? "Please Wait" : "Verify"}</button>)}
              </form>
              <p>
                  Go to <Link to='/login'>Login Page</Link>
              </p>
          </div>

    </div>
  )
}

export default Verify