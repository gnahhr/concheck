import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import { login } from '../../Hooks/login';

//Image Assets
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFingerprint, faUserCheck } from '@fortawesome/free-solid-svg-icons'
import LogoM from '../../assets/images/concheck-logo-m.png';

const Login = ({setUser, setRoleId, setUserId}) => {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

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

    console.log(query.response.data);
    if (query.statusCode === 200) {
      console.log(query.response.message);

      const decoded = jwtDecode(query.response.data);

      localStorage.setItem('token', query.response.data);
      localStorage.setItem('roleId', decoded.roleId);
      localStorage.setItem('id', decoded._id);

      if (decoded.roleId === "3") {
        localStorage.setItem('id', decoded.EngineerId);
        localStorage.setItem('firstName', decoded.firstName);
      }

      setUser(query.response.data);
      setRoleId(Number(decoded.roleId));
      setUserId(Number(decoded._id));
      nav('/');
    } else {
      alert(query.data.message);
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

        {/* <div className="footer">
            <div className="prompt">
                <p>Don't have an account?</p>
            </div>
        </div> */}
    </main>
  )
}

export default Login