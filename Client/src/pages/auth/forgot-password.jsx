import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/auth-layout';
import styles from './auth.module.scss';
import TextInput from '../../components/inputs/text-input';
import PrimaryButton from '../../components/buttons/primary-button';
import { Link, useNavigate } from 'react-router-dom';
import { Helpers } from '../../services/helpers';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addEmailForOtp, addUser } from '../../redux/features/user-slice';
import { baseUrl } from '../../services/constant';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: ""});
  const [authError, setAuthError] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    let emailError = "";

    if (!Helpers.validateEmail(email)) {
      emailError = "Invalid Email"
    }
    if (emailError) {
      setErrors({ email: emailError })
    } else {
      setLoader(true);
      try {
        const payload = { email };
        const response = await axios.post( baseUrl+"/user/forgot-password", payload)
        if(response?.data?.status == "success"){
            console.log(response, "<-- otp response")
            dispatch(addEmailForOtp(email))
            setErrors({ email: "" })
            alert(response?.data?.message);
            navigate("/auth/otp-verify")
        }else{
            alert(response?.data?.message)
        }
        setLoader(false);

      } catch (error) {
        console.log(error.response)
        console.log("------------")
        setAuthError(error?.response?.data?.message)
        setLoader(false);
      }

    }


  }

  return (
    <AuthLayout>
      <div>
        <h1 className='auth_heading'>Forgot Password</h1>
        <p className='auth_title mt-3'>Enter your email address for otp-code verification</p>
        <form className="mt-3">

          <TextInput
            styles={{ marginBottom: '0px' }}
            value={email}
            onChange={setEmail}
            placeholder="Email"
            type="email"
            required
            err_msg={errors.email}
          ></TextInput>
          <div className={styles.button_wrapper}>

            {authError && <div className='text-end text-danger'><small>{authError}</small></div>}
            <PrimaryButton loading={loader ? true : false} disabled={loader ? true : false} onClick={handleSendOtp}>Send Otp</PrimaryButton>
          </div>
        </form>
        <span>Create a new account? <Link className={styles.login_link} to='/auth/sign-up'>Sign up</Link></span>

      </div>

    </AuthLayout>
  )
}

export default ForgotPasswordPage;
