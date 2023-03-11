import React from 'react'
import { deleteProject } from '../../Hooks/project.js';
import { deleteCompany } from '../../Hooks/company.js';
import { deleteAdmin } from '../../Hooks/admin.js';
import { deleteTask } from '../../Hooks/task';
import { deleteEngineer } from '../../Hooks/engineer.js';
import { deleteCrew } from '../../Hooks/crew';

const DeleteModal = ({id, type, setToastData, showToast, showDelete}) => {

  const handleDelete = async (e) => {
    e.preventDefault();
    
    let response, toastMsg, toastType;

    switch(type) {
      case "project":
          response = await deleteProject(id);
          break;
      case "company":
          response = await deleteCompany(id);
          break;
      case "engineer":
          response = await deleteEngineer(id);
          break;
      case "admin":
          response = await deleteAdmin(id);
          break;
      case "task":
          response = await deleteTask(id);
          break;
      case "crew":
          response = await deleteCrew(id);
      default:
          break;
    }

    if (response.data.statusCode === 200) {
      toastType = "success";
    } else {
      toastType = "warning";
    } 

    if (type === "crew" || type === "task") {
      toastMsg = response.data.response.message;
    } else {
      toastMsg = response.data.message;
    }

    setToastData({
      toastMsg: toastMsg,
      toastType: toastType,
    });

    showToast(true);
    showDelete(false);
  }

  const handleCancel = () => {
    showDelete(false);
  }

  return (
    <div className="modal-wrapper">
        <div className="modal-content">
            <h3>Are you sure you want to delete?</h3>
            <div className="btn-group">
                <div className="btn" onClick={e => handleDelete(e)}><span>Yes</span></div>
                <div className="btn red-btn" onClick={e => handleCancel(e)}><span>Cancel</span></div>
            </div>
        </div>
    </div>
  )
}

export default DeleteModal
