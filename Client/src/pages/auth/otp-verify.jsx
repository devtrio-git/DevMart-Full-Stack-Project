import React, { useEffect, useState } from 'react'
import AuthLayout from '../../components/layouts/auth-layout';
import styles from './auth.module.scss';
import PrimaryButton from '../../components/buttons/primary-button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../../services/constant';
import OtpInput from 'react-otp-input';

const OtpVerify = () => {
    const [authError, setAuthError] = useState("");
    const [loader, setLoader] = useState(false);
    const email = useSelector(state=> state.user.email);
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    useEffect(()=>{
        if(!email){
            navigate("/auth/sign-up")
        }
    })
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        let otpError = "";

        if (otp.length < 6) {
            otpError = "OTP code required"
        }
        if (otpError) {
            setAuthError(otpError)
        } else {
            setLoader(true);
            try {
                const payload = { email, otp };
                const response = await axios.post(baseUrl + "/user/verify-otp", payload)
                if (response?.data?.status == "success") {
                    console.log(response, "<-- otp success")
                    setAuthError("");
                    alert(response?.data?.message);
                    navigate("/auth/reset-password")
                } else {
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
                <h1 className='auth_heading'>Verify</h1>
                <p className='auth_title mt-3'>Your code was sent to you via email</p>
                <form className="mt-3">
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        placeholder='000000'
                        containerStyle={'otp-container'}
                        inputStyle={'otp-inputs'}
                        renderSeparator={<span>&nbsp;</span>}
                        renderInput={(props) => <input {...props} />}
                    />

                    <div className={styles.button_wrapper}>

                        {authError && <div className='text-end text-danger'><small>{authError}</small></div>}
                        <PrimaryButton loading={loader ? true : false} disabled={loader ? true : false} onClick={handleVerifyOtp}>Verify</PrimaryButton>
                    </div>
                </form>

            </div>

        </AuthLayout>
    )
}

export default OtpVerify;
