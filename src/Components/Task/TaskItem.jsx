import React from 'react'
import { deleteTask } from '../../Hooks/task';

const TaskItem = ({taskName, taskStart, taskEnd, taskId, setTaskId, showModal, showToast, setToastData}) => {

  const formatDate = (date) => {
        const newDate = new Date(date);
        return `${newDate.getMonth()+1}/${newDate.getDate()}/${newDate.getFullYear()}`;
  }

  const handleDelete = async () => {
    const response = await deleteTask(taskId);

    let toastType;
    if (response.statusCode === 200) {
      toastType = "success";
    } else {
      toastType = "warning";
    }

    const toastMsg = response.response.message;

    setToastData({
      toastType: toastType,
      toastMsg: toastMsg,
    })
    showToast(true);
  };

  const handleEditButton = (e) => {
    e.preventDefault();
    setTaskId(taskId);
    showModal(true);
  }

   return ( 
    <tr>
        <td>{taskName}</td>
        <td>{formatDate(taskStart)}</td>
        <td>{formatDate(taskEnd)}</td>
        <td className="btn-group">
            <div className="btn" onClick={e => handleEditButton(e)}>Edit</div>
            <div className="btn" onClick={e => handleDelete(e)}>Delete</div>
        </td>
    </tr>
  )
}

export default TaskItem