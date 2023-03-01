import React from 'react'

const TaskItem = ({taskName, taskStart, taskEnd, taskId, setModalData, setModal}) => {

  const formatDate = (date) => {
        return date.split("T")[0];
  }

   return ( 
    <tr>
        <td>{taskName}</td>
        <td>{formatDate(taskStart)}</td>
        <td>{formatDate(taskEnd)}</td>
        <td className="btn-group">
            <div className="btn">Edit</div>
            <div className="btn">Delete</div>
        </td>
    </tr>
  )
}

export default TaskItem