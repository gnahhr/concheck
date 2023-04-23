import { useState, useEffect } from 'react'
import { Chart } from "react-google-charts";

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
  const [ weeklyData, setWeeklyData ] = useState();
  const [ summaryData, setSummaryData ] = useState();
  const [ ganttColors, setGanttColors ] = useState([]);

  const projId = sessionStorage.getItem("selProjId");

  // Toast States
  const [ showToast, setShowToast ] = useState(false);
  const [ toastData, setToastData ] = useState(); 

  const ganttPalette = {
    "ongoing": {
      "color": "#0033cc",
      "dark": "#002db3",
      "light": "#3385ff"
    },
    "delayed": {
      "color": "#cc0000",
      "dark": "#800000",
      "light": "#ff3333"
    },
    "completed": {
      "color": "#00cc66",
      "dark": "#009933",
      "light": "#33ff33"
    },
  };

  const handleGetTasks = async () => {
    const response = await getAllTasks(projId);
    const tasks = response.data;
    setTaskData(tasks);

    if (tasks) {
      let ganttOrderInit = [];

      let rows = tasks.map(task => {
        let startDate = new Date(task.startDate);

        if (ganttOrderInit.length === 0) {
          ganttOrderInit.push({date: startDate, type: task.remarks});
        } else if (ganttOrderInit[0].date > startDate && ganttOrderInit.filter(item => item.type === task.remarks).length === 0) {
          ganttOrderInit.unshift({date: startDate, type: task.remarks});
        } else if (ganttOrderInit[ganttOrderInit.length-1].date > startDate && ganttOrderInit.filter(item => item.type === task.remarks).length === 0) {
          const temp = ganttOrderInit[ganttOrderInit.length-1];
          ganttOrderInit[ganttOrderInit.length-1] = {date: startDate, type: task.remarks}
          ganttOrderInit.push(temp);
        }

        return ([
          task._id,
          task.taskName,
          task.remarks,
          new Date(task.startDate),
          new Date(task.endDate),
          null,
          task.percentageDone ? task.percentageDone : 0,
          null
        ])
      })

      const colorTemp = [];
      ganttOrderInit.forEach(item => colorTemp.push(ganttPalette[item.type]));

      setGanttColors(colorTemp);
      
      const columns = [
        { type: "string", label: "Task ID" },
        { type: "string", label: "Task Name" },
        { type: "string", label: "Status" },
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

    const handleDownload = async () => {
      const weeklyDownload = await downloadWeekly(projId);
      const summaryDownload = await downloadSummary(projId);
      setWeeklyData(`data:text/csv;charset=utf-8,${(weeklyDownload.data.response.data)}`)
      setSummaryData(`data:text/csv;charset=utf-8,${(summaryDownload.data.response.data)}`)
    }

    const handleShowAddTask = (e) => {
      e.preventDefault();
      setShowAddTask(true);
    };

  useEffect(() => {
    handleGetTasks();
    handlePieData();
    if (taskData) setGanttHeight(taskData.length < 3 ? 70 : 40);
    handleDownload();
  }, [])

  useEffect(() => {
    handleGetTasks();
    handlePieData();
    if (taskData) setGanttHeight(taskData.length < 3 ? 70 : 40);
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
            width="80"
            height="100"
            options={{
              height: ganttData.length * ganttHeight,
              gantt: {
                trackHeight: 30,
                palette: ganttColors
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
                  height={"25vh"}
                  />
            </div>
            }
          </div>
        </div>
        </div>

        <div className="btn-group">
          <a href={summaryData}
             className="btn"
             download={`${projId}-summary.csv`}
             target="_blank">Download Summary</a>
          <a href={weeklyData}
             className="btn"
             download={`${projId}-weekly.csv`}
             target="_blank">Download Weekly</a>
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
        {/* {downloadData && <CSVDownload data={downloadData} target="_blank"/>} */}
    </main>
  )
}

export default Dashboard