import React, { useEffect, useState } from 'react'; 
import DashBoard from '../../UI/DashBoard';
import SideBoard from '../../UI/SideBoard';
import ViewBoard from '../../UI/ViewBoard';
import '../Manager/ManagerDashBoard.css'; 
import Button from '../../UI/Button';
import ManagerProjects from './ManagerProjects';
import ViewManagerProjects from './ViewManagerProjects';
import handleSignout from '../../util/signout';
import { useNavigate } from 'react-router-dom';

export default function ManagerDashBoard() {
    const [currentTab,setTab] = useState('your-project'); 

    const [projects,setProjects] = useState([]);
    const navigate = useNavigate(); 

    console.log(projects)
    useEffect(() => {
      const token = localStorage.getItem('authToken');
      const role = localStorage.getItem('role'); 
      if (!token || role !== 'manager') {
        navigate('/'); 
      }

      const username = localStorage.getItem('current_user')
      // code to fetch the project data 
      const url = 'http://127.0.0.1:5000/fetch_manager_data'; 
      const fetch_Data = async () => {
        try{
          const response = await fetch(url,{
            method:'POST', 
            headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({ user_name:username }), 
         }); 
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          
          const result = await response.json();
          console.log(result['project_data'])
          setProjects(result['project_data']); 
        }
        catch (err) {
          console.log('error in fetching data')
        }
      };

      fetch_Data();
      console.log('data fetched succesfully !!');
      console.log(projects)
    }, [navigate]);

    const update_from_backend = async(index,tasks) => {
        console.log('update tasks from backend is called !');
        let project_name = projects[index].name
        try {
          console.log('Sending data to backend', tasks);
          const response = await fetch('http://127.0.0.1:5000/update_tasks', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ index:index,task_data:tasks,project_name:project_name }),
          });
    
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          const data = await response.json();
          console.log(data.message);
        } catch (error) {
          console.log('Error in connecting with backend server:', error.message);
        }
    } 

    function updateProjectViaIndex(index, tasks) {
      console.log('Updating the project at index:', index); 
      setProjects((prevData) => {
          // Create a copy of the array
          const data = [...prevData]; 
  
          // Create a new object for the project being updated
          const updatedProject = { ...data[index], Users: tasks };
  
          // Update the project at the given index
          data[index] = updatedProject;
          return data; 
        });
        update_from_backend(index,tasks); 
  }
  



    let content = null; 
    if(currentTab === 'your-projects'){
        content = (<ManagerProjects updateProjectViaIndex={updateProjectViaIndex} projects={projects} />);
    }
    else{
        content = (<ViewManagerProjects projects={projects} />)
    }
    

  return (
    <DashBoard>
        <SideBoard>
          <Button onSubmit={() => setTab('your-projects')} className="project-button">Your Projects</Button>
          <Button onSubmit={() => setTab('sairaj-is-best')} className="project-button">View Projects</Button>
          <Button className="project-button" onSubmit={handleSignout}>Signout</Button>
        </SideBoard>
        <ViewBoard>
            {content}
        </ViewBoard>
    </DashBoard>
  )
}
