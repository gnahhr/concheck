import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { createAdmin, editAdmin, getAdminById } from '../../Hooks/admin';
import Toast from '../General/Toast';

const Admin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // ID
    const { id } = useParams();
    const checkId = id === undefined;

    //Toast
    const [ showToast, setShowToast ] = useState(false);
    const [ toastMsg, setToastMsg ] = useState("");
    const [ toastType, setToastType ] = useState("");

    // Nav
    const nav = useNavigate();

    const setFunctions = {
        "email": setEmail,
        "password": setPassword,
    }
    
      const onValueChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
    
        setFunctions[name](value);
    }

    const handleCreateAdmin = async (e) => {
        e.preventDefault();
        
        const data = {
          "email": email,
          "password": password,
        }

        let toastMsg;

        if (!password) toastMsg = "Password is required.";
        if (!email) toastMsg = "Email is required.";

        if (!password || !email) {
          setToastMsg(toastMsg);
          setToastType("warning");
          setShowToast(true);
          return;
        }
        
        const response = await createAdmin(data);
        toastMsg = response.data.response.message;
        if (response.data.statusCode === 200) {
          setToastType("success");
        } else {
          setToastType("warning");
        }
        
        setToastMsg(toastMsg);
        setShowToast(true);
        if (response.data.statusCode !== 400) setTimeout(() => {nav('/')}, 1500);
    }

    const handleEditAdmin = async (e) => {
        e.preventDefault();

        const data = {
          "email": email,
          "password": password
        }
    
        const response = await editAdmin(id, data);

        if (response.data.statusCode === 200) {
          setToastType("success");
        } else {
          setToastType("warning");
        }
        setShowToast(true);
        setToastMsg(response.data.response.message);

    }

    const handleGetAdmin = async () => {
      const response = await getAdminById(id);
      setEmail(response.response.data.email);
    }

    useEffect(() => {
      if (!checkId){
        handleGetAdmin();
      }
    }, [])

  return (
    <main>
      <h2>Admin</h2>
      <div className="main-component">
        <form method="post">
              <div className={`form-input`}>
                  <label htmlFor="email">Email:</label>
                  <input type="email" name="email" id="email" value={email} onChange={(e) => onValueChange(e)}/>
              </div>
              <div className={`form-input`}>
                  <label htmlFor="password">Password:</label>
                  <input type="password" name="password" id="password" value={password} onChange={(e) => onValueChange(e)}/>
              </div>
              {checkId ? 
              <div className="btn" onClick={e => handleCreateAdmin(e)}>
                <span>Add Admin Account</span>
              </div>
              :
              <div className="btn" onClick={e => handleEditAdmin(e)}>
                <span>Edit Admin Account</span>
              </div>
              }
        </form>
      </div>
      {showToast && <Toast message={toastMsg} toastType={toastType} toastState={showToast} showToast={setShowToast}/>}
    </main>
  )
}

export default Admin