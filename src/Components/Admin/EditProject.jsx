import React, { useState } from 'react'
import './EditProject.css'
import Button from '../../UI/Button'
import EditProjectIndividually from './EditProjectIndividually';

export default function EditProject({projects}) {
  console.log(projects);
  const [index,setIndex] = useState(null); 
  let content = null; 
  let content1 = null; 
  if(index){
    content = <EditProjectIndividually data={projects[index-1]} />
    content1 = 'Project Details';
  }
  else{
    content1 = 'Your Projects'; 
    content = projects.map((user,index) => {
      return(
        <div className='project' key={index}>
          <label>Project Name: {user.name}</label>
          <label>Project Status: {user.ProjectStatus}</label>
          <label>Project manager: {user.Project_Manager}</label>
          <Button onSubmit={() => setIndex(index+1)} className='edit-project-button'>Edit Project</Button>
      </div>
      )
    });
  }

  return (
    <>
        <div>
          <h1>{content1}</h1>
          <div className='admin-projects'>
              {content}
          </div>
        </div>
    </>
  )
}
