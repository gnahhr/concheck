import { useState, useEffect } from 'react';
import { addTask, editTask, getTaskById } from '../../Hooks/task';

const Task = ({taskId, projId, closeModal}) => {
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

    const data = {
        "taskName": taskName,
        "startDate": startDate,
        "endDate": endDate,
        "_id": projId
    }

    const response = await addTask(data);

    console.log(response);
  };

  const handleGetTaskById = async () => {
    const response = await getTaskById(taskId);
    console.log(response);
  };

  const handleToggleModal = (e) => {
    e.preventDefault();

    closeModal(!true);
  }

  useEffect(() => {
    console.log("taskId: " + taskId);
    if (taskId) handleGetTaskById();
  }, [])

  return (
    <div className="modal-wrapper">
      <div className="modal-content">
        <div className="modal-header">
            <h2>
                <span>
                    {taskId ? "Edit Task" : "Add Task"}
                </span>
            </h2>
            <div className="exit" onClick={e => handleToggleModal(e)}>
                X
            </div>
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

            <div className="btn" onClick={e => handleAddTask(e)}>
                <span>Add Task</span>
            </div>

        </form>
      </div>
    </div>
  )
}

export default Task