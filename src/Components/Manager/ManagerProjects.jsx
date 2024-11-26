import React, { useState } from 'react'
import Button from '../../UI/Button'
import ManagerTaskBoard from './ManagerTaskBoard';

export default function ManagerProjects({projects}) {
  const [index,setIndex] = useState(null); 

  const [tasks, setTasks] = useState([
    { employee: "Sairaj Rajput", tasks: [{ name: "Develop Backend", status: "Ongoing" }] },
    { employee: "Sanket Ganorkar", tasks: [{ name: "Design Frontend", status: "Not Completed" }] },
  ]);

  // Function to handle task status change
  const handleStatusChange = (employeeIndex, taskIndex, newStatus) => {
    const updatedTasks = [...tasks];
    updatedTasks[employeeIndex].tasks[taskIndex].status = newStatus;
    setTasks(updatedTasks);
  };

  // Function to add a new task for an employee
  const addTask = (employeeIndex) => {
    const taskName = prompt("Enter the task name:");
    if (taskName) {
      const updatedTasks = [...tasks];
      updatedTasks[employeeIndex].tasks.push({ name: taskName, status: "Not Completed" });
      setTasks(updatedTasks);
    }
  };

  // Function to delete a task for an employee
  const deleteTask = (employeeIndex, taskIndex) => {
    const updatedTasks = [...tasks];
    updatedTasks[employeeIndex].tasks.splice(taskIndex, 1);
    setTasks(updatedTasks);
  };



  let content = null; 
  let heading = null; 
  if(index){
    heading = <h1>Task Board</h1>; 
    content = <ManagerTaskBoard deleteTask ={deleteTask} tasks={tasks} handleStatusChange={handleStatusChange} addTask={addTask}  projects={projects}/>;
  }
  else{
    heading = <h1>Your Projects</h1>; 
    content = projects.map((user,index) => {
        return(
            <div className='project' key={index}>
                <label>Project Name: {user.name}</label>
                <label>Project Status: 
                <p className={`status ${user.ProjectStatus.toLowerCase()}`}>{user.ProjectStatus}</p>
                </label>
                <label>Assigned Date: {user.Starting_Date}</label>
                <Button className='edit-project-button' onSubmit={() => setIndex(index+1)}>Edit Project</Button>
            </div>
        )
   });
  }

  return (
        <>
          {heading}
          <div className='admin-projects'>
                {content}
          </div>
        </>
  )
}
