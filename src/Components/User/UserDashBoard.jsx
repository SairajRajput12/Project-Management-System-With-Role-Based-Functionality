import React, { useState } from 'react'
import SideBoard from '../../UI/SideBoard'
import DashBoard from '../../UI/DashBoard'
import ViewBoard from '../../UI/ViewBoard'
import Button from '../../UI/Button'
import UserProjects from './UserProjects'
import ViewUserProjects from './ViewUserProjects'

export default function UserDashBoard() {
  const [currentTab,setTab] = useState('your-project'); 
  const [projects,setProjects] = useState( [
    {name:'GTA 3',ProjectStatus:'Completed',Project_Manager:'Lezley Benzes',Starting_Date:'01/01/1994',Ending_Date:'12/07/1997',user:[{user_name:'sairaj rajput',progress:'80%'},{user_name:'sanket ganorkar',progress:'90%'},{user_name:'vilas rabad',progress:'95%'},{user_name:'sahil renapurkar',progress:'98%'},{user_name:'tushar kalaskar',progress:'69%'}]}, 
    {name:'GTA Vice City',ProjectStatus:'Completed',Project_Manager:'Lezley Benzes',Starting_Date:'01/01/1998',Ending_Date:'12/07/2002',user:[{user_name:'sairaj rajput',progress:'80%'},{user_name:'sanket ganorkar',progress:'90%'},{user_name:'vilas rabad',progress:'95%'},{user_name:'sahil renapurkar',progress:'98%'},{user_name:'tushar kalaskar',progress:'69%'}]}, 
    {name:'GTA San Andrease',ProjectStatus:'inprogress',Project_Manager:'Lezley Benzes',Starting_Date:'01/01/1998',Ending_Date:'12/07/2002',user:[{user_name:'sairaj rajput',progress:'80%'},{user_name:'sanket ganorkar',progress:'90%'},{user_name:'vilas rabad',progress:'95%'},{user_name:'sahil renapurkar',progress:'98%'},{user_name:'tushar kalaskar',progress:'69%'}]}, 
    {name:'GTA 4',ProjectStatus:'Completed',Project_Manager:'Lezley Benzes',Starting_Date:'01/01/1998',Ending_Date:'12/07/2002',user:[{user_name:'sairaj rajput',progress:'80%'},{user_name:'sanket ganorkar',progress:'90%'},{user_name:'vilas rabad',progress:'95%'},{user_name:'sahil renapurkar',progress:'98%'},{user_name:'tushar kalaskar',progress:'69%'}]}, 
    {name:'GTA 5',ProjectStatus:'Completed',Project_Manager:'Lezley Benzes',Starting_Date:'01/01/1998',Ending_Date:'12/07/2002',user:[{user_name:'sairaj rajput',progress:'80%'},{user_name:'sanket ganorkar',progress:'90%'},{user_name:'vilas rabad',progress:'95%'},{user_name:'sahil renapurkar',progress:'98%'},{user_name:'tushar kalaskar',progress:'69%'}]}
 ]);

 let content = null; 
 if(currentTab === 'user-projects'){
    content = <UserProjects projects={projects} />
 }
 else{
    content =  <ViewUserProjects projects={projects} />
 }


  return (
    <DashBoard>
        <SideBoard>
          <Button onSubmit={() => setTab('user-projects')} className="project-button">Your Projects</Button>
          <Button onSubmit={() => setTab('sairaj-is-best')} className="project-button">View Projects</Button>
        </SideBoard>
        <ViewBoard>
            {content}
        </ViewBoard>
    </DashBoard>
  )
}
