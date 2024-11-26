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
  const [projects,setProjects] = useState( [
    {name:'GTA 3',ProjectStatus:'Completed',Project_Manager:'Lezley Benzes',Starting_Date:'01/01/1994',Ending_Date:'12/07/1997',user:[{user_name:'sairaj rajput',progress:'80%'},{user_name:'sanket ganorkar',progress:'90%'},{user_name:'vilas rabad',progress:'95%'},{user_name:'sahil renapurkar',progress:'98%'},{user_name:'tushar kalaskar',progress:'69%'}]}, 
    {name:'GTA Vice City',ProjectStatus:'Completed',Project_Manager:'Lezley Benzes',Starting_Date:'01/01/1998',Ending_Date:'12/07/2002',user:[{user_name:'sairaj rajput',progress:'80%'},{user_name:'sanket ganorkar',progress:'90%'},{user_name:'vilas rabad',progress:'95%'},{user_name:'sahil renapurkar',progress:'98%'},{user_name:'tushar kalaskar',progress:'69%'}]}, 
    {name:'GTA San Andrease',ProjectStatus:'Ongoing',Project_Manager:'Lezley Benzes',Starting_Date:'01/01/1998',Ending_Date:'12/07/2002',user:[{user_name:'sairaj rajput',progress:'80%'},{user_name:'sanket ganorkar',progress:'90%'},{user_name:'vilas rabad',progress:'95%'},{user_name:'sahil renapurkar',progress:'98%'},{user_name:'tushar kalaskar',progress:'69%'}]}, 
    {name:'GTA 4',ProjectStatus:'Completed',Project_Manager:'Lezley Benzes',Starting_Date:'01/01/1998',Ending_Date:'12/07/2002',user:[{user_name:'sairaj rajput',progress:'80%'},{user_name:'sanket ganorkar',progress:'90%'},{user_name:'vilas rabad',progress:'95%'},{user_name:'sahil renapurkar',progress:'98%'},{user_name:'tushar kalaskar',progress:'69%'}]}, 
    {name:'GTA 5',ProjectStatus:'Completed',Project_Manager:'Lezley Benzes',Starting_Date:'01/01/1998',Ending_Date:'12/07/2002',user:[{user_name:'sairaj rajput',progress:'80%'},{user_name:'sanket ganorkar',progress:'90%'},{user_name:'vilas rabad',progress:'95%'},{user_name:'sahil renapurkar',progress:'98%'},{user_name:'tushar kalaskar',progress:'69%'}]}
  ]);

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
