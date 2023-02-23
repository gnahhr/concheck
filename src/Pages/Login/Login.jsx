import React from 'react';

//Image Assets
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFingerprint, faUserCheck } from '@fortawesome/free-solid-svg-icons'
import LogoM from '../../assets/images/concheck-logo-m.png';

const Login = () => {
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

        <form action="">
            <div className="field">
                <div className="upper-field">
                    <label htmlFor="username">USERNAME</label>
                </div>
                <div className="lower-field">
                    <FontAwesomeIcon icon={faUserCheck} className="form-icon"/>
                    <input type="text" name="username" id="username" />
                </div>
            </div>
            <div className="field">
                <div className="upper-field">
                    <label htmlFor="password">PASSWORD</label>
                </div>
                <div className="lower-field">
                    <FontAwesomeIcon icon={faFingerprint} className="form-icon"/>
                    <input type="password" name="password" id="password" />
                </div>
            </div>
            <div className="buttons">
                <input type="submit" value="Log in" />
                <a href="#" className="forgot-password">Forgot Password?</a>
            </div>
        </form>

        <div className="footer">
            <div className="prompt">
                <p>Don't have an account?</p>
                <a href="#">Sign Up</a>
            </div>
        </div>
    </main>
  )
}

export default Login