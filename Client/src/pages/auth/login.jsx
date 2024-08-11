import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/auth-layout';
import styles from './auth.module.scss';
import TextInput from '../../components/inputs/text-input';
import PrimaryButton from '../../components/buttons/primary-button';
import { Link, useNavigate } from 'react-router-dom';
import { Helpers } from '../../services/helpers';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../../redux/features/user-slice';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [authError, setAuthError] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    let emailError, passwordError = "";

    if (!Helpers.validateEmail(email)) {
      emailError = "Invalid Email"
    }
    if (!Helpers.validatePassword(password)) {
      passwordError = "Password must be atleast 8 characters"
    }

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError })
    } else {
      setLoader(true);
      try {
        const payload = { email, password };
        const response = await axios.post("https://dev-mart-server.vercel.app/api/user/login", payload)

        console.log(response?.data?.data, "<-- login response")
        dispatch(addUser(response?.data?.data))
        setErrors({ email: "", password: "" })
        navigate("/")
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
        <h1 className='auth_heading'>Log into Dev Mart</h1>
        <p className='auth_title mt-3'>Enter your details below</p>
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

          <TextInput
            styles={{ marginBottom: '5px', marginTop: "20px" }}
            value={password}
            onChange={setPassword}
            placeholder="Password"
            type="password"
            required
            err_msg={errors.password}
          >

          </TextInput>

          <small><Link className={styles.forget_password_link} to='/auth/login'>Forgot Password</Link></small>
          <div className={styles.button_wrapper}>

            {authError && <div className='text-end text-danger'><small>{authError}</small></div>}
            <PrimaryButton loading={loader ? true : false} disabled={loader ? true : false} onClick={onSubmitLogin}>Log In</PrimaryButton>
          </div>
        </form>
        <span>Create a new account? <Link className={styles.login_link} to='/auth/sign-up'>Sign up</Link></span>

      </div>

    </AuthLayout>
  )
}

export default LoginPage;
