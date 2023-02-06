import React from 'react'

//Image Assets
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFingerprint, faUserCheck } from '@fortawesome/free-solid-svg-icons'
import LogoM from '../../assets/images/concheck-logo-m.png';

const Register = () => {
  return (
    <>
        <div className="hero">
            <div className="hero-logo">
                <img src={LogoM} alt="" />
            </div>
            <div className="hero-text">
                <h1>Register</h1>
                <h2 className="form-sub">Already Registered? <a href="#">Log in here.</a></h2>
            </div>
        </div>

        <form action="">
            <div className="field">
                <div className="upper-field">
                    <label htmlFor="fname">FIRST NAME</label>
                </div>
                <div className="lower-field">
                    <FontAwesomeIcon icon={faUserCheck} className="form-icon"/>
                    <input type="text" name="fname" id="fname" />
                </div>
            </div>
            <div className="field">
                <div className="upper-field">
                    <label htmlFor="lname">LAST NAME</label>
                </div>
                <div className="lower-field">
                    <FontAwesomeIcon icon={faUserCheck} className="form-icon"/>
                    <input type="text" name="lname" id="lname" />
                </div>
            </div>
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
                <input type="submit" value="Sign Up" />
            </div>
        </form>

        <div className="footer">
            <div className="prompt">
            </div>
        </div>
    </>
  )
}

export default Register