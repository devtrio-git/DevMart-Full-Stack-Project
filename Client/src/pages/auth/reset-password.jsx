import React, { useEffect, useState } from 'react'
import AuthLayout from '../../components/layouts/auth-layout';
import styles from './auth.module.scss';
import TextInput from '../../components/inputs/text-input';
import PrimaryButton from '../../components/buttons/primary-button';
import { useNavigate } from 'react-router-dom';
import { Helpers } from '../../services/helpers';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { removeEmailForOtp } from '../../redux/features/user-slice';
import { baseUrl } from '../../services/constant';

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [authError, setAuthError] = useState("");
    const [loader, setLoader] = useState(false);
    const email = useSelector(state => state?.user?.email);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!email) {
            navigate("/auth/login")
        }
    })


    const handleResetPassword = async (e) => {
        e.preventDefault();
        let error = "";

        if (!Helpers.validatePassword(password)) {
            error = "Password must be atleast 8 characters"
        }

        if (error) {
            setAuthError(error)
        } else {
            setLoader(true);
            try {
                const payload = { email, password };
                const response = await axios.post(baseUrl + "/user/reset-password", payload)
                if (response?.data?.status == "success") {
                    console.log(response, "<-- otp response")
                    dispatch(removeEmailForOtp())
                    setAuthError("")
                    alert(response?.data?.message);
                    navigate("/auth/login")
                } else {
                    alert(response?.data?.message)
                }

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
                <h1 className='auth_heading'>Reset Password</h1>
                <p className='auth_title mt-3'>Enter your new password</p>
                <form className="mt-3">


                    <TextInput
                        styles={{ marginBottom: '5px', marginTop: "20px" }}
                        value={password}
                        onChange={setPassword}
                        placeholder="Password"
                        type="password"
                    >

                    </TextInput>

                    <div className={styles.button_wrapper}>

                        {authError && <div className='text-end text-danger'><small>{authError}</small></div>}
                        <PrimaryButton loading={loader ? true : false} disabled={loader ? true : false} onClick={handleResetPassword}>Reset Password</PrimaryButton>
                    </div>
                </form>

            </div>

        </AuthLayout>
    )
}

export default ResetPassword;
