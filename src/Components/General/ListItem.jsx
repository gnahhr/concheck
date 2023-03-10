import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DeleteModal from './DeleteModal';
import './ListItem.css';

const ListItem = ({name, image, id, showToast, type, setToastData, setSelectedProject, setSelectedEngineer, editable = true}) => {
  const [ showDelete, setShowDelete ] = useState(false);

  const nav = useNavigate();

  const toggleDelete = (e) => {
    e.preventDefault();

    setShowDelete(!showDelete)
  }

  const handleEdit = (e) => {
    e.preventDefault();

    nav(`/${type}/${id}`);
  }

  const handleSelect = (e) => {
    if (type == "project") {
      e.preventDefault();

      sessionStorage.setItem("selProjId", id);
      sessionStorage.setItem("selProjName", name);

      if (!editable) {
        nav(`/${type}/${id}`);
      } else {
        setSelectedProject({
          id: id,
          name: name
        })
      }
  
    } else if (type === "engineer") {
      setSelectedEngineer({id: id})
      sessionStorage.setItem("selEngId", id);
    }
  }

  return (
    <>
    <div className="list-item" onClick={e => handleSelect(e)}>
        {image && <img src={image} alt={name} />}
        <h2>{name}</h2>
        {editable &&
        <div className="btn-group">
          <div className="btn" onClick={e => handleEdit(e)}>Edit</div>  
          <div className="btn red-btn" onClick={e => toggleDelete(e)}>Delete</div>  
        </div>
        }
    </div>
    {showDelete && <DeleteModal type={type}
                                id={id}
                                setToastData={setToastData}
                                showToast={showToast}
                                showDelete={setShowDelete}/>}
    </>
  )
}

export default ListItem