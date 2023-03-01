import { useState, useEffect } from 'react'
import { Chart } from "react-google-charts";
import TaskItem from '../../Components/Task/TaskItem';

import { getAllTasks } from '../../Hooks/task';
import { getAllDailyReport } from '../../Hooks/dailyReport';

import './Dashboard.css';

function daysToMilliseconds(days) {
    return days * 24 * 60 * 60 * 1000;
}

const Dashboard = ({}) => {
  const [ taskData, setTaskData ] = useState([]);
  const [ ganttData, setGanttData ] = useState([]);
  const [ pieData, setPieData ] = useState([]);
  const projId = sessionStorage.getItem("selProjId");

  const handleGetTasks = async () => {
    const response = await getAllTasks(projId);
    const tasks = response.data;
    setTaskData(tasks);
    if (tasks.length > 0) {
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

  useEffect(() => {
    handleGetTasks();
    handlePieData();
  }, [])

  return (
    <main className="main-component dashboard-main">
        <h1 className="text-center">Dashboard</h1>
        <div className="gantt-chart">
          <h1>Gantt Chart</h1>
          {taskData.length > 0 ? 
          <Chart
              chartType="Gantt"
              data={ganttData}
              width="100%"
              legendToggle
              />
          :
          <h1>No Task Yet.</h1>
        }
        </div>

        <div className="pie-chart">
          <h1>Causes of Delay</h1>
          <Chart
              chartType="PieChart"
              data={pieData}
              width={"100%"}
              />
        </div>

        <div className="tasks">
          <h1>Tasks</h1>
            <table>
              <thead>
                <th>Task Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Action</th>
              </thead>
              <tbody>
                {taskData && taskData.map(task => <TaskItem key={task.id}
                                                            taskId={task.id}
                                                            taskName={task.taskName}
                                                            taskStart={task.startDate}
                                                            taskEnd={task.endDate}/>)}
                                                            
              </tbody>
            </table>
        </div>

    </main>
  )
}

export default Dashboard