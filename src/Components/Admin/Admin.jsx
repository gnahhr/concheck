import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
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
          "roleId": 1
        }
    
        const response = await createAdmin(data);

        if (response.data.statusCode === 200) {
          setToastType("success");
        } else {
          setToastType("warning");
        }

        console.log(response);

        setToastMsg(response.data.response.message);
        setShowToast(true);
    }

    const handleEditAdmin = async (e) => {
        e.preventDefault();

        const data = {
          "email": email,
          "password": password
        }
    
        const response = await editAdmin(id, data);
        console.log(response);
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