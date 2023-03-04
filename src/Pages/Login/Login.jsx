import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { login } from '../../Hooks/login';
import Toast from '../../Components/General/Toast';

import './Login.css';
//Image Assets
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFingerprint, faUserCheck } from '@fortawesome/free-solid-svg-icons'
import LogoM from '../../assets/images/concheck-logo-m.png';

const Login = ({setUser}) => {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  //Toast
  const [ showToast, setShowToast ] = useState(false);
  const [ toastData, setToastData ] = useState({});

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

    let toastType, toastMsg;

    const query = await login(email, password);
    toastMsg = query.response.message;
    if (query.statusCode === 200) {
      const token = query.response.data;
      toastType = "success";
      localStorage.setItem('token', token);
      setUser(token);
      window.location.reload();

    } else {
      toastType = "warning";
    }
    setToastData({
      toastType: toastType,
      toastMsg: toastMsg
    })
    setShowToast(true);
  };

  return (
    <main className="login-page">
        <div className="logo">
                <img src={LogoM} alt="" />
        </div>
        <div className="form-wrapper">
          <div className="hero-text">
            <h1>Login</h1>
            <h2 className="form-sub">Sign in to continue.</h2>
          </div>

          <form action="post">
              <div className="field">
                  <div className="left-field">
                      <label htmlFor="email">EMAIL</label>
                      <FontAwesomeIcon icon={faUserCheck} className="form-icon"/>
                  </div>
                  <div className="right-field">
                      <input type="email" name="email" id="email" value={email} onChange={e => handleOnChange(e)} />
                  </div>
              </div>
              <div className="field">
                  <div className="left-field">
                      <label htmlFor="password">PASSWORD</label>
                      <FontAwesomeIcon icon={faFingerprint} className="form-icon"/>
                  </div>
                  <div className="right-field">
                      <input type="password" name="password" id="password" value={password} onChange={e => handleOnChange(e)}/>
                  </div>
              </div>
              <div className="buttons">
                  <input type="submit" value="Log in" onClick={e => loginUser(e)} />
                  {/* <a href="#" className="forgot-password">Forgot Password?</a> */}
              </div>
          </form>
        </div>

        {showToast && <Toast message={toastData.toastMsg}
                             toastType={toastData.toastType}
                             showToast={setShowToast}
                             toastState={showToast}/>}
    </main>
  )
}

export default Login