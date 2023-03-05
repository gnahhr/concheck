import { useState, useEffect } from 'react';
import { addTask, editTask, getTaskById } from '../../Hooks/task';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'


const Task = ({taskId, projId, showTask, setTaskId, showToast, setToastData}) => {
  const [ taskName, setTaskName ] = useState("");
  const [ startDate, setStartDate ] = useState("");
  const [ endDate, setEndDate ] = useState(""); 

  const setFunctions = {
    "task-name": setTaskName,
    "start-date": setStartDate,
    "end-date": setEndDate
  }
  

  const onChangeValue = (e) => {
    setFunctions[e.target.name](e.target.value);
  }

  const handleAddTask = async (e) => {
    e.preventDefault();

    const sDate = new Date(startDate);
    const eDate = new Date(endDate);

    if (sDate > eDate) {
      setToastData({
        toastType: "warning",
        toastMsg: "Start date should be earlier than end date."
      })
      showToast(true);
      return;
    }

    if (!taskName || taskName === "") {
      setToastData({
        toastType: "warning",
        toastMsg: "Add a task name."
      })
      showToast(true);
      return;
    }

    const data = {
        "taskName": taskName,
        "startDate": startDate,
        "endDate": endDate,
    }

    const response = await addTask(projId, data);

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
    showTask(false);
  };

  const handleEditTask = async (e) => {
    
    const sDate = new Date(startDate);
    const eDate = new Date(endDate);

    if (sDate > eDate) {
      setToastData({
        toastType: "warning",
        toastMsg: "Start date should be earlier than end date."
      })
      showToast(true);
      return;
    }

    if (!taskName || taskName === "") {
      setToastData({
        toastType: "warning",
        toastMsg: "Add a task name."
      })
      showToast(true);
      return;
    }
    
    const data = {
        "taskName": taskName,
        "startDate": startDate,
        "endDate": endDate,
    }

    const response = await editTask(taskId, data);
    const toastMsg = response.response.message;

    let toastType;
    
    if (response.statusCode === 200) {
      toastType = "success";
    } else {
      toastType = "warning";
    }

    setToastData({
      toastType: toastType,
      toastMsg: toastMsg,
    })

    showToast(true);
    showTask(false);
  }

  const handleGetTaskById = async () => {
    const response = await getTaskById(taskId);
    const data = response.response.data;

    setTaskName(data.taskName);
    setStartDate(formatDate(new Date (data.startDate)));
    setEndDate(formatDate(new Date (data.endDate)));
  };

  const handleToggleModal = (e) => {
    e.preventDefault();
    setTaskId(undefined);
    showTask(false);
  }

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  }

  useEffect(() => {
    if (taskId) handleGetTaskById();
  }, [])

  return (
    <div className="modal-wrapper">
      <div className="modal-content">
        <FontAwesomeIcon icon={faClose} className="icon icon-trim exit" onClick={e => handleToggleModal(e)}/>
        <div className="modal-header">
            <h2>
                <span>
                    {taskId ? "Edit Task" : "Add Task"}
                </span>
            </h2>
            
        </div>
        <form method="post">
            <div className="form-input">  
                <label htmlFor="task-name">Task Name:</label>
                <input type="text" name="task-name" id="task-name" value={taskName} onChange={e => onChangeValue(e)} required/>
            </div>
            <div className="form-input">
                <label htmlFor="start-date">Start Date:</label>
                <input type="date" name="start-date" id="start-date" value={startDate} onChange={e => onChangeValue(e)} required/>
            </div>
            <div className="form-input">
                <label htmlFor="end-date">End Date:</label>
                <input type="date" name="end-date" id="end-date" value={endDate} onChange={e => onChangeValue(e)} required/>
            </div>

            {taskId ? 
            <div className="btn" onClick={e => handleEditTask(e)}>
              <span>Edit Task</span>
            </div>
            :
            <div className="btn" onClick={e => handleAddTask(e)}>
              <span>Add Task</span>
            </div>
            }

        </form>
      </div>
    </div>
  )
}

export default Task