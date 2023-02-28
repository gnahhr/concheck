import { useState, useEffect } from 'react'
import { Chart } from "react-google-charts";

import { getAllTasks } from '../../Hooks/task';

import './Dashboard.css';

function daysToMilliseconds(days) {
    return days * 24 * 60 * 60 * 1000;
}

  const rows = [
    [
      "Research",
      "Find sources",
      new Date(2015, 1, 2),
      new Date(2015, 4, 2),
      null,
      0,
      null,
    ],
    [
      "Write",
      "Write paper",
      new Date(2015, 2, 3),
      new Date(2015, 3, 4),
      daysToMilliseconds(3),
      0,
      null,
    ],
    [
      "Cite",
      "Create bibliography",
      new Date(2015, 3, 0),
      new Date(2015, 4, 0),
      daysToMilliseconds(1),
      0,
      null,
    ],

  ];

const chartData = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ];

const chartOptions = {
    title: "Hatdog"
};

const barData = [
    ['City', '2010 Population', '2000 Population'],
    ['New York City, NY', 8175000, 8008000],
    ['Los Angeles, CA', 3792000, 3694000],
    ['Chicago, IL', 2695000, 2896000],
    ['Houston, TX', 2099000, 1953000],
    ['Philadelphia, PA', 1526000, 1517000]
];

const barOptions = {
    chart: {
        title: 'Population of Largest U.S. Cities'
    },
    hAxis: {
        title: 'Total Population',
        minValue: 0,
    },
    vAxis: {
        title: 'City'
    },
};

const Dashboard = ({projId}) => {
  const [ tasks, setTasks ] = useState([]);
  const [ taskData, setTaskData ] = useState([]);

  const handleGetTasks = async () => {
    const response = await getAllTasks(projId);
    const tasks = response.data;

    setTasks(() => tasks.map(task => [
      task._id,
      task.taskName,
      new Date(task.startDate),
      new Date(task.endDate),
      null,
      null
    ]))

    const columns = [
      { type: "string", label: "Task ID" },
      { type: "string", label: "Task Name" },
      { type: "date", label: "Start Date" },
      { type: "date", label: "End Date" },
      { type: "number", label: "Duration" },
      { type: "number", label: "Percent Complete" },
      { type: "string", label: "Dependencies" },
    ];

    const rows = tasks.map(task => [
      task._id,
      task.taskName,
      new Date(task.startDate),
      new Date(task.endDate),
      null,
      0,
      null
    ])

    setTaskData([columns, ...rows])
  }

  useEffect(() => {
    handleGetTasks();
  }, [])

  return (
    <main className="main-component dashboard-main">
        <h1 className="text-center">Dashboard</h1>
        <Chart
            chartType="Gantt"
            data={taskData}
            width="100%"
            legendToggle
            />

        <Chart
            chartType="PieChart"
            data={chartData}
            options={chartOptions}
            width={"100%"}
            />

        <Chart
            chartType="BarChart"
            width="100%"
            data={barData}
            options={barOptions}
        />
    </main>
  )
}

export default Dashboard