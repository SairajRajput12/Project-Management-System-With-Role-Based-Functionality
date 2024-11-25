import React, { useState } from 'react';
import DashBoard from '../../UI/DashBoard';
import SideBoard from '../../UI/SideBoard';
import ViewBoard from '../../UI/ViewBoard';
import Button from '../../UI/Button';
import '../Admin/AdminDashBoard.css';
import Form from '../../UI/Form';

export default function AdminDashBoard() {
  const [projectUsers, setProjectUsers] = useState([]);

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('');

  const addUser = (e) => {
    e.preventDefault();
    if (!userName || !userEmail || !userRole) {
      alert('All fields are required!');
      return;
    }
    setProjectUsers([
      ...projectUsers,
      { Name: userName, Email: userEmail, Role: userRole }
    ]);
    // Clear the form inputs
    setUserName('');
    setUserEmail('');
    setUserRole('');
  };

  return (
    <>
      <DashBoard>
        <SideBoard>
          <Button className="project-button">Create Project</Button>
          <Button className="project-button">Current Projects</Button>
          <Button className="project-button">Edit Project</Button>
        </SideBoard>
        <ViewBoard>
          <h1>Create Project Form</h1>
          <div className="project-form-container">
            <Form className="project-form">
              <label htmlFor="projectName">Enter the project name: </label>
              <input type="text" id="projectName" placeholder="Project Name" />

              <label htmlFor="description">Enter the Description:</label>
              <textarea id="description" placeholder="Description"></textarea>

              <label htmlFor="startDate">Start Date:</label>
              <input type="date" id="startDate" />

              <label htmlFor="endDate">End Date:</label>
              <input type="date" id="endDate" />

              <div className="form-actions">
                <Button className="submit-button">Submit</Button>
              </div>
            </Form>

            <h3>Add User</h3>
            <Form className="add-user">
              <label>Name of User</label>
              <input
                type="text"
                placeholder="Enter user's name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />

              <label>Email of User</label>
              <input
                type="email"
                placeholder="Enter user's email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />

              <label>Role of the User</label>
              <input
                type="text"
                placeholder="Enter user's role"
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
              />

              <Button className="submit-button" onSubmit={(e) => addUser(e)}>
                Add User
              </Button>
            </Form>

            {projectUsers.length != 0 && <h3>Project Users</h3>}
            <div className="project-users">
              {projectUsers.map((user, index) => (
               <>
                <div key={index} className="user">
                    <p>
                        <strong>Name:</strong> {user.Name}
                    </p>
                    <p>
                        <strong>Email:</strong> {user.Email}
                    </p>
                    <p>
                        <strong>Role:</strong> {user.Role}
                    </p>
                </div>
               </>
              ))}
            </div>
          </div>
        </ViewBoard>
      </DashBoard>
    </>
  );
}
