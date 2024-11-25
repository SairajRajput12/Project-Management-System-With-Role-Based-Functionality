import React, { useState } from 'react';
import DashBoard from '../../UI/DashBoard';
import SideBoard from '../../UI/SideBoard';
import ViewBoard from '../../UI/ViewBoard';
import Button from '../../UI/Button';
import CreateProject from './CreateProject';
import ViewProjectDashboard from './ViewProjectDashboard';
import EditProject from './EditProject';

const projects = [
  {name:'GTA 3',ProjectStatus:'Completed',Project_Manager:'Lezley Benzes',Starting_Date:'01/01/1994',Ending_Date:'12/07/1997',user:['sairaj rajput','sanket ganorkar','vilas rabad','sahil renapurkar','tushar kalaskar']}, 
  {name:'GTA Vice City',ProjectStatus:'Completed',Project_Manager:'Lezley Benzes',Starting_Date:'01/01/1998',Ending_Date:'12/07/2002',user:['sairaj rajput','sanket ganorkar','vilas rabad','sahil renapurkar','tushar kalaskar']}, 
  {name:'GTA San Andrease',ProjectStatus:'Ongoing',Project_Manager:'Lezley Benzes',Starting_Date:'01/01/1998',Ending_Date:'12/07/2002',user:['sairaj rajput','sanket ganorkar','vilas rabad','sahil renapurkar','tushar kalaskar']}, 
  {name:'GTA 4',ProjectStatus:'Completed',Project_Manager:'Lezley Benzes',Starting_Date:'01/01/1998',Ending_Date:'12/07/2002',user:['sairaj rajput','sanket ganorkar','vilas rabad','sahil renapurkar','tushar kalaskar']}, 
  {name:'GTA 5',ProjectStatus:'Completed',Project_Manager:'Lezley Benzes',Starting_Date:'01/01/1998',Ending_Date:'12/07/2002',user:['sairaj rajput','sanket ganorkar','vilas rabad','sahil renapurkar','tushar kalaskar']}
]

export default function AdminDashBoard() {
  const [currentState,changeState] = useState('create-project'); 
  let content = null; 
  if(currentState === 'create-project'){
    content = <CreateProject />
  }
  else if(currentState === 'view-project'){
    content = <ViewProjectDashboard projects={projects} />
  }
  else{
    content = <EditProject projects={projects} />
  }

  return (
    <>
      <DashBoard>
        <SideBoard>
          <Button onSubmit = {() => changeState('create-project')} className="project-button">Create Project</Button>
          <Button onSubmit = {() => changeState('view-project')} className="project-button">View Project Status</Button>
          <Button onSubmit = {() => changeState('sairaj-is-best')} className="project-button">Edit Project</Button>
        </SideBoard>
        <ViewBoard>
            {content}
        </ViewBoard>
      </DashBoard>
    </>
  );
}
