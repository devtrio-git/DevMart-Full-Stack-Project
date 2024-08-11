import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/auth-layout';
import styles from './auth.module.scss';
import TextInput from '../../components/inputs/text-input';
import { Link, useNavigate } from 'react-router-dom';
import PrimaryButton from '../../components/buttons/primary-button';
import { useDispatch } from 'react-redux';
import { Helpers } from '../../services/helpers';
import axios from 'axios';
import { addUser } from '../../redux/features/user-slice';

const SignUpPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ name:"", email: "", password: "" });
    const [authError, setAuthError] = useState("");
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const onSubmitSignUp = async (e) => {
        e.preventDefault();
        let emailError, passwordError,nameError = "";
        if (!Helpers.validateEmail(email)) {
            emailError = "Invalid Email"
          }
          if (!Helpers.validatePassword(password)) {
            passwordError = "Password must be atleast 8 characters"
          }
          if (!Helpers.validateName(name)) {
            nameError = "Name must be atleast 3 characters"
          }
          if (emailError || passwordError || nameError) {
            setErrors({ email: emailError, password:  passwordError, name: nameError });
          }else{
            setLoader(true);
            try {
                const payload = { email, password, name };
                const response = await axios.post("https://dev-mart-server.vercel.app/api/user/signup", payload)
        
                console.log(response?.data?.data, "<-- login response")
                dispatch(addUser(response?.data?.data))
                setErrors({ email: "", password: "",name:"" })
                navigate("/")
                setLoader(false);
        
              } catch (error) {
                console.log(error.response)
                setAuthError(error?.response?.data?.message)
                setLoader(false);
              }
          }
    }
    return (
        <AuthLayout>
            <div>
                <h1 className='auth_heading'>Create an account</h1>
                <p className='auth_title mt-3'>Enter your details below</p>
                <form className="mt-3">
                    <TextInput 
                    styles={{  }} 
                    value={name}
                    onChange={setName}
                    placeholder="Name" 
                    type="text"
                    required
                    err_msg={errors.name}
                    ></TextInput>

                    <TextInput 
                    styles={{ marginTop: '18px' }} 
                    value={email}
                    onChange={setEmail}
                    placeholder="Email" 
                    type="email"
                    required
                    err_msg={errors.email}
                    ></TextInput>

                    <TextInput 
                    styles={{ marginTop: '18px' }} 
                    value={password}
                    onChange={setPassword}
                    placeholder="Password" 
                    type="password"
                    required
                    err_msg={errors.password}
                     ></TextInput>

                    <div className={styles.button_wrapper}>
                    {authError && <div className='text-end text-danger'><small>{authError}</small></div>}
                    <PrimaryButton loading={loader?true: false} disabled={loader?true:false} onClick={onSubmitSignUp}>Create Account</PrimaryButton>
                    </div>
                </form>

                <span>Already have an account? <Link className={styles.login_link} to='/auth/login'>Login</Link></span>
            </div>
        </AuthLayout>
    )
}

export default SignUpPage;
