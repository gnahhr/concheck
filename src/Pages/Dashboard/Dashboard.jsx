import { useState, useEffect } from 'react'
import { Chart } from "react-google-charts";

import TaskItem from '../../Components/Task/TaskItem';
import Task from '../../Components/Task/Task';
import Toast from '../../Components/General/Toast';

import { getAllTasks } from '../../Hooks/task';
import { getAllDailyReport } from '../../Hooks/dailyReport';
import { downloadCSV } from '../../Hooks/project';
import './Dashboard.css';

function daysToMilliseconds(days) {
    return days * 24 * 60 * 60 * 1000;
}

const Dashboard = ({}) => {
  const [ taskData, setTaskData ] = useState([]);
  const [ ganttData, setGanttData ] = useState([]);
  const [ showAddTask, setShowAddTask ] = useState(false);
  const [ pieData, setPieData ] = useState([]);
  const [ taskId, setTaskId ] = useState(undefined);
  const projId = sessionStorage.getItem("selProjId");

  // Toast States
  const [ showToast, setShowToast ] = useState(false);
  const [ toastData, setToastData ] = useState(); 

  const handleGetTasks = async () => {
    const response = await getAllTasks(projId);
    const tasks = response.data;
    setTaskData(tasks);

    if (tasks) {
      let rows = tasks.map(task => [
        task._id,
        task.taskName,
        new Date(task.startDate),
        new Date(task.endDate),
        null,
        0,
        null
      ])
  
      const columns = [
        { type: "string", label: "Task ID" },
        { type: "string", label: "Task Name" },
        { type: "date", label: "Start Date" },
        { type: "date", label: "End Date" },
        { type: "number", label: "Duration" },
        { type: "number", label: "Percent Complete" },
        { type: "string", label: "Dependencies" },
      ];
  
      setGanttData([columns, ...rows])
    }

  }

  const handlePieData = async (e) => {
    const response = await getAllDailyReport(projId);
    const data = response.response.message;
    let tally = {}
    let chartData = [
      ["Delay", "Hours Delay"],
    ];

    if (data.length > 0 || data.length){
      data.forEach(task => {
        let delay = task.causeOfDelay;
        let hours = task.hoursDelay;
        tally[delay] = tally[delay] ? tally[delay] + tally[hours] : hours;
      })

      for(let field in tally) {
        chartData.push([field, tally[field]]);
      }

      setPieData(chartData);
    };
    }

    const handleDownload = async (e) => {
      e.preventDefault();
      const response = await downloadCSV(projId);
      console.log(response);
    }

    const handleShowAddTask = (e) => {
      e.preventDefault();
      setShowAddTask(true);
    };

  useEffect(() => {
    handleGetTasks();
    handlePieData();
  }, [])

  useEffect(() => {
    handleGetTasks();
    handlePieData();
  }, [showAddTask, showToast])

  return (
    <main>
        <h1 className="text-center">Dashboard</h1>
        <div className="main-component dashboard-main">
        <div className="gantt-chart">
          <h1>Gantt Chart</h1>
          {!taskData ? 
          <h3>No Task Yet.</h3>
          :
          <Chart
          chartType="Gantt"
          data={ganttData}
          width="100%"
          legendToggle
          />
        }
        </div>


        <div className="tasks">
          <h1>Tasks</h1>
            {!taskData ?
            <h3>No Tasks yet. Add a task.</h3>
            :
            <table>
              <thead>
                <th>Task Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Action</th>
              </thead>
              <tbody>
                {taskData && taskData.map(task => <TaskItem key={task.taskId}
                                                            taskId={task.taskId}
                                                            taskName={task.taskName}
                                                            taskStart={task.startDate}
                                                            taskEnd={task.endDate}
                                                            showModal={setShowAddTask}
                                                            setTaskId={setTaskId}
                                                            showToast={setShowToast}
                                                            setToastData={setToastData}/>)}
                                                            
              </tbody>
            </table>
            }
            <div className="btn" onClick={e => handleShowAddTask(e)}>Add Task</div>
        </div>

        <div className="pie-chart">
          <h1>Causes of Delay</h1>
          {pieData.length === 0 ?
          <h3>No Delay Data yet.</h3>
          :
          <Chart
              chartType="PieChart"
              data={pieData}
              width={"100%"}
              />
          }
        </div>
        </div>
        <div className="btn-group download-btn">
          <div className="btn" onClick={e => handleDownload(e)}>
            Download CSV
          </div>
        </div>
        
        {showAddTask && <Task taskId={taskId}
                              projId={projId}
                              showTask={setShowAddTask}
                              setTaskId={setTaskId}
                              showToast={setShowToast}
                              setToastData={setToastData}
                              />}

        {showToast && <Toast message={toastData.toastMsg}
                                    toastType={toastData.toastType}
                                    showToast={setShowToast}
                                    toastState={showToast}/>}
    </main>
  )
}

export default Dashboard