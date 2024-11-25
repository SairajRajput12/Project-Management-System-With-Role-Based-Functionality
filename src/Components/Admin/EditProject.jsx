import React from 'react'
import './EditProject.css'
import Button from '../../UI/Button'

export default function EditProject({projects}) {
  console.log(projects);
  return (
    <>
        <div>
          <h1>Your Projects</h1>
          <div className='admin-projects'>
              {projects.map((user,index) => {
                return(
                  <div className='project' key={index}>
                    <label>Project Name: {user.name}</label>
                    <label>Project Status: {user.ProjectStatus}</label>
                    <label>Project manager: {user.Project_Manager}</label>
                    <Button className='edit-project-button'>Edit Project</Button>
                </div>
                )
              })}
          </div>
        </div>
    </>
  )
}
