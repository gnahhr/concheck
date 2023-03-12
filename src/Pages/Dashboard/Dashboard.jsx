import { useState, useEffect } from 'react'
import { Chart } from "react-google-charts";
import { CSVDownload } from 'react-csv';

import TaskItem from '../../Components/Task/TaskItem';
import Task from '../../Components/Task/Task';
import Toast from '../../Components/General/Toast';

import { getAllTasks } from '../../Hooks/task';
import { getAllDailyReport } from '../../Hooks/dailyReport';
import { downloadWeekly, downloadSummary } from '../../Hooks/project';
import './Dashboard.css';

const Dashboard = ({}) => {
  const [ taskData, setTaskData ] = useState([]);
  const [ ganttData, setGanttData ] = useState([]);
  const [ showAddTask, setShowAddTask ] = useState(false);
  const [ pieData, setPieData ] = useState([]);
  const [ taskId, setTaskId ] = useState(undefined);
  const [ ganttHeight, setGanttHeight ] = useState();
  const [ downloadData, setDownloadData ] = useState();

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
        task.percentageDone ? task.percentageDone : 0,
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

    const handleDownload = async (e, type) => {
      e.preventDefault();

      let response;

      if (type === 2){
        response = await downloadWeekly(projId);
      } else if (type === 1){
        response = await downloadSummary(projId);
      }

      if (response.status !== 200) {
        setToastData({
          toastType: "warning",
          toastMsg: "Failed to fetch download."
        });
        setShowToast(true);
      }
      
      setDownloadData(response.data);
    }

    const handleShowAddTask = (e) => {
      e.preventDefault();
      setShowAddTask(true);
    };

  useEffect(() => {
    handleGetTasks();
    handlePieData();
    if (taskData) setGanttHeight(taskData.length < 3 ? 70 : 40);
  }, [])

  useEffect(() => {
    handleGetTasks();
    handlePieData();
    if (taskData) setGanttHeight(taskData.length < 3 ? 70 : 40);
  }, [showAddTask, showToast])

  useEffect(() => {
    if (downloadData) setTimeout(() => {setDownloadData()}, 2000);
  }, [downloadData])

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
            width="80"
            height="100"
            options={{
              height: ganttData.length * ganttHeight,
              gantt: {
                trackHeight: 30
              }
            }}
            />
            }
        </div>


        <div className="tasks">
          <h1>Tasks</h1>
          <div className="wrapper">
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
            </div>
            <div className="btn-group">
              <div className="btn" onClick={e => handleShowAddTask(e)}>Add Task</div>
            </div>
        </div>

        <div className="pie-chart">
          <h1>Causes of Delay</h1>
          <div className="wrapper">
            {pieData.length === 0 ?
            <h3>No Delay Data yet.</h3>
            :
            <div className="chart-wrapper">
              <Chart
                  chartType="PieChart"
                  data={pieData}
                  width={"25rem"}
                  />
            </div>
            }
          </div>
        </div>
        </div>

        <div className="btn-group">
          <div className="btn" onClick={e => handleDownload(e, 1)}>
            Download Summary
          </div>
          <div className="btn" onClick={e => handleDownload(e, 1)}>
            Download Weekly
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
        {downloadData && <CSVDownload data={downloadData} target="_blank"/>}
    </main>
  )
}

export default Dashboard