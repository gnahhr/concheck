import { useState } from 'react';

import DeleteModal from '../General/DeleteModal';


const TaskItem = ({taskName, taskStart, taskEnd, taskId, setTaskId, showModal, showToast, setToastData}) => {
  const [ showDelete, setShowDelete ] = useState(false);

  const formatDate = (date) => {
        const newDate = new Date(date);
        return `${newDate.getMonth()+1}/${newDate.getDate()}/${newDate.getFullYear()}`;
  }

  const handleDelete = async () => {
    setShowDelete(!showDelete);
  };

  const handleEditButton = (e) => {
    e.preventDefault();
    setTaskId(taskId);
    showModal(true);
  }

  return ( 
     <>
     <tr>
        <td>{taskName}</td>
        <td>{formatDate(taskStart)}</td>
        <td>{formatDate(taskEnd)}</td>
        <td className="btn-group">
            <div className="btn" onClick={e => handleEditButton(e)}>Edit</div>
            <div className="btn" onClick={e => handleDelete(e)}>Delete</div>
        </td>
    </tr>

    {showDelete && <DeleteModal type={"task"}
                                id={taskId}
                                setToastData={setToastData}
                                showToast={showToast}
                                showDelete={setShowDelete}/>}
    </>
  )
}

export default TaskItem