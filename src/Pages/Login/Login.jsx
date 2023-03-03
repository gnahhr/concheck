import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { login } from '../../Hooks/login';
import Toast from '../../Components/General/Toast';

//Image Assets
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFingerprint, faUserCheck } from '@fortawesome/free-solid-svg-icons'
import LogoM from '../../assets/images/concheck-logo-m.png';

const Login = ({setUser}) => {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

    //Toast
    const [ showToast, setShowToast ] = useState(false);
    const [ toastMsg, setToastMsg ] = useState("");
    const [ toastType, setToastType ] = useState("");

  const setFunctions = {
    "email": setEmail,
    "password": setPassword
  }

  const handleOnChange = (e) => {
    setFunctions[e.target.name](e.target.value);
  }

  const nav = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    const query = await login(email, password);
    if (query.statusCode === 200) {
      const token = query.response.data;
      setToastMsg()
      localStorage.setItem('token', token);
      setUser(token)
      nav('/');
    } else {
      
    }
  };

  return (
    <main className="main-component">
        <div className="hero">
            <div className="hero-logo">
                <img src={LogoM} alt="" />
            </div>
            <div className="hero-text">
                <h1>Login</h1>
                <h2 className="form-sub">Sign in to continue.</h2>
            </div>
        </div>

        <form action="post">
            <div className="field">
                <div className="upper-field">
                    <label htmlFor="email">Email</label>
                </div>
                <div className="lower-field">
                    <FontAwesomeIcon icon={faUserCheck} className="form-icon"/>
                    <input type="email" name="email" id="email" value={email} onChange={e => handleOnChange(e)} />
                </div>
            </div>
            <div className="field">
                <div className="upper-field">
                    <label htmlFor="password">PASSWORD</label>
                </div>
                <div className="lower-field">
                    <FontAwesomeIcon icon={faFingerprint} className="form-icon"/>
                    <input type="password" name="password" id="password" value={password} onChange={e => handleOnChange(e)}/>
                </div>
            </div>
            <div className="buttons">
                <input type="submit" value="Log in" onClick={e => loginUser(e)} />
                <a href="#" className="forgot-password">Forgot Password?</a>
            </div>
        </form>
    </main>
  )
}

export default Login