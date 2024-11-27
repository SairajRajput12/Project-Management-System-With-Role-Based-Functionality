import React, { useEffect, useState } from 'react';
import DashBoard from '../../UI/DashBoard';
import SideBoard from '../../UI/SideBoard';
import ViewBoard from '../../UI/ViewBoard';
import Button from '../../UI/Button';
import CreateProject from './CreateProject';
import ViewProjectDashboard from './ViewProjectDashboard';
import EditProject from './EditProject';
import handleSignout from '../../util/signout';
import { Navigate, useNavigate } from 'react-router-dom';



export default function AdminDashBoard() {
  const navigate = useNavigate(); 
  const [projects,setProjects] = useState([]);

  const [currentState,changeState] = useState('create-project'); 
  const [userRole, setUserRole] = useState(null);
  const [useToken, setUseToken] = useState(null);


  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Retrieve user role from localStorage
      const role = localStorage.getItem('userRole');
      setUseToken(token);
    }
    else{
      navigate('/'); 
    }

    // code to fetch the project data 
    const url = 'http://127.0.0.1:5000/fetch_data'; 
    const fetch_Data = async () => {
      try{
        const response = await fetch(url); 
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const result = await response.json();
        setProjects(result.project_data); 
      }
      catch (err) {
        setError(err.message);
      }
    };

    fetch_Data(); 
  }, [navigate]);

  

  function updateProjectByIndex(index, newData) {
    setProjects((prevProjects) =>
      prevProjects.map((project, i) => (i === index ? { ...project, ...newData } : project))
    );
  }
  

  let content = null; 
  if(currentState === 'create-project'){
    content = <CreateProject />
  }
  else if(currentState === 'view-project'){
    content = <ViewProjectDashboard projects={projects} />
  }
  else{
    content = <EditProject updateProjectByIndex={updateProjectByIndex} projects={projects} />
  }

  return (
    <>
      <DashBoard>
        <SideBoard>
          <Button onSubmit = {() => changeState('create-project')} className="project-button">Create Project</Button>
          <Button onSubmit = {() => changeState('view-project')} className="project-button">View Project Status</Button>
          <Button onSubmit = {() => changeState('sairaj-is-best')} className="project-button">Edit Project</Button>
          <Button className="project-button" onSubmit={handleSignout}>Signout</Button>
        </SideBoard>
        <ViewBoard>
            {content}
        </ViewBoard>
      </DashBoard>
    </>
  );
}
